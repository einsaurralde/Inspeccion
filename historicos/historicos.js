const SUPABASE_URL =
"https://tltqmkhrtfxgygnaztjv.supabase.co";

const SUPABASE_KEY =
"sb_publishable_VohCUSPfWmA4OLjnze8dlg_IFrrNukv";

const supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


let chartCumplimiento = null;
let inspeccionesActuales = [];
consultarInspecciones();

async function consultarInspecciones(){

    try{

        let query = supabaseClient
        .from("inspecciones_cabecera")
        .select("*");

        const desde =
        document.getElementById("fechaDesde").value;

        const hasta =
        document.getElementById("fechaHasta").value;

        const establecimiento =
        document.getElementById("establecimiento").value;

        if(desde){
            query = query.gte("fecha", desde);
        }

        if(hasta){
            query = query.lte("fecha", hasta);
        }

        if(establecimiento){

            query = query.ilike(
                "establecimiento",
                `%${establecimiento}%`
            );

        }

        const { data, error } =
        await query.order(
            "fecha",
            { ascending:false }
        );

        if(error){
            throw error;
        }

        inspeccionesActuales = data;

        mostrarTabla(data);

        generarGrafico(data);

    }
    catch(error){

        console.error(error);
        alert(error.message);

    }

}

async function reimprimirPDF(id){

    try{

        const { data: cabecera, error: errorCab } =
        await supabaseClient
            .from("inspecciones_cabecera")
            .select("*")
            .eq("id", id)
            .single();

        if(errorCab){
            throw errorCab;
        }

        const { data: detalles, error: errorDet } =
        await supabaseClient
            .from("inspeccion_detalle")
            .select("*")
            .eq("inspeccion_id", id);

        if(errorDet){
            throw errorDet;
        }

        // GENERAR PDF HISTÓRICO
        await generarPDFHistorico(
        cabecera,
        detalles
        );

        //generarPDFHistorico(cabecera, detalles);

    }
    catch(error){

        console.error(error);
        alert(error.message);

    }

}

function mostrarTabla(datos){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Establecimiento</th>
                <th>Responsable</th>
                <th>Cumplimiento</th>
                <th>NC</th>
                <th>Parcial</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;

    datos.forEach(item=>{

        html += `
            <tr>
                <td>${item.fecha}</td>
                <td>${item.establecimiento}</td>
                <td>${item.responsable || ""}</td>
                <td>${item.cumplimiento}%</td>
                <td>${item.no_conformes}</td>
                <td>${item.parciales}</td>

                <td>

                    <button
                        onclick="verHallazgos(${item.id})">

                        Ver Hallazgos

                    </button>

                    <button onclick="reimprimirPDF(${item.id})">
                        
                        PDF

                    </button>

                </td>

            </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "resultadoInspecciones"
    ).innerHTML = html;

}

async function verHallazgos(id){

    const { data, error } =
    await supabaseClient
    .from("inspeccion_detalle")
    .select("*")
    .eq("inspeccion_id", id);

    if(error){

        alert(error.message);
        return;

    }

    let html = `
    <div class="card">

    <h3>Hallazgos Detectados</h3>

    <table>

        <tr>
            <th>Categoría</th>
            <th>Item</th>
            <th>Resultado</th>
            <th>Hallazgo</th>
        </tr>
    `;

    data.forEach(h=>{

        html += `
        <tr>

            <td>${h.categoria || ""}</td>

            <td>${h.item || ""}</td>

            <td>${h.resultado || ""}</td>

            <td>${h.hallazgo || ""}</td>

        </tr>
        `;

    });

    html += `
    </table>
    </div>
    `;

    document.getElementById(
        "detalleHallazgos"
    ).innerHTML = html;

}

function generarGrafico(datos){

    const labels = datos.map(
        d => d.establecimiento
    );

    const cumplimiento = datos.map(
        d => d.cumplimiento
    );

    if(chartCumplimiento){

        chartCumplimiento.destroy();

    }

    const canvas =
    document.getElementById(
        "graficoCumplimiento"
    );

    chartCumplimiento =
    new Chart(canvas,{

        type:'bar',

        data:{

            labels,

            datasets:[{

                label:'% Cumplimiento',

                data:cumplimiento,

                backgroundColor:'#28a745'

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{
                    beginAtZero:true,
                    max:100
                }

            }

        }

    });
    } // <- CERRAR generarGrafico
    
    ///Exportar a excel
    async function exportarExcel(){

    try{

        if(inspeccionesActuales.length === 0){

            alert("No existen datos para exportar");
            return;
        }

        // HOJA 1 - RESUMEN

        const resumen = inspeccionesActuales.map(item => ({

            Fecha: item.fecha,
            Establecimiento: item.establecimiento,
            Responsable: item.responsable,
            Conformes: item.conformes,
            NoConformes: item.no_conformes,
            Parciales: item.parciales,
            NoAplica: item.no_aplica,
            Cumplimiento: item.cumplimiento

        }));


        // HOJA 2 - HALLAZGOS

        const idsInspecciones =
            inspeccionesActuales.map(i => i.id);

        const { data: hallazgos, error } =
            await supabaseClient
                .from("inspeccion_detalle")
                .select("*")
                .in("inspeccion_id", idsInspecciones);

        if(error){
            throw error;
        }

        const hallazgosExcel = hallazgos.map(h => {

            const inspeccion =
                inspeccionesActuales.find(
                    i => i.id === h.inspeccion_id
                );

            return {

                Fecha:
                    inspeccion?.fecha || "",

                Establecimiento:
                    inspeccion?.establecimiento || "",

                Categoria:
                    h.categoria || "",

                Item:
                    h.item || "",

                Resultado:
                    h.resultado || "",

                Hallazgo:
                    h.hallazgo || ""

            };
        });


        // CREAR EXCEL

        const workbook =
            XLSX.utils.book_new();

        const hojaResumen =
            XLSX.utils.json_to_sheet(
                resumen
            );

        const hojaHallazgos =
            XLSX.utils.json_to_sheet(
                hallazgosExcel
            );

        XLSX.utils.book_append_sheet(
            workbook,
            hojaResumen,
            "Resumen"
        );

        XLSX.utils.book_append_sheet(
            workbook,
            hojaHallazgos,
            "Hallazgos"
        );


        // AJUSTAR ANCHO COLUMNAS

        hojaResumen["!cols"] = [
            { wch: 15 },
            { wch: 25 },
            { wch: 20 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 }
        ];

        hojaHallazgos["!cols"] = [
            { wch: 15 },
            { wch: 25 },
            { wch: 20 },
            { wch: 60 },
            { wch: 15 },
            { wch: 80 }
        ];



        // NOMBRE DEL ARCHIVO

        const fecha =
            new Date()
            .toISOString()
            .slice(0,10);

        XLSX.writeFile(
            workbook,
            `Historico_Inspecciones_${fecha}.xlsx`
        );

    }
    catch(error){

        console.error(error);

        alert(
            "Error al exportar: " +
            error.message
        );

    }

}
///
async function generarGraficoPDF(resultado){

    return new Promise((resolve) => {

        const canvas =
        document.createElement("canvas");

        canvas.width = 500;
        canvas.height = 500;

        const ctx =
        canvas.getContext("2d");

        new Chart(ctx, {

            type: "pie",

            data: {

                labels: [
                    "Conformes",
                    "Parciales",
                    "No Conformes",
                    "N/A"
                ],

                datasets: [{

                    data: [

                        resultado.conformes,
                        resultado.parciales,
                        resultado.noConformes,
                        resultado.noAplica

                    ],

                    backgroundColor: [

                        "#28a745",
                        "#ffc107",
                        "#dc3545",
                        "#6c757d"

                    ],

                    borderColor: "#ffffff",
                    borderWidth: 2

                }]

            },

            options: {

                responsive: false,

                animation: {

                    onComplete: () => {

                        const imagen =
                        canvas.toDataURL("image/png");

                        resolve(imagen);

                    }

                },

                plugins: {

                    legend: {

                        position: "bottom",

                        labels: {

                            font: {

                                size: 12

                            }

                        }

                    },

                    title: {

                        display: true,

                        text: "Distribución de Resultados"

                    }

                }

            }

        });

    });

}

async function generarPDFHistorico(cabecera, hallazgos){

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const establecimiento =
        cabecera.establecimiento || "-";

    const responsable =
        cabecera.responsable || "-";

    const inspector =
        cabecera.inspector || "-";

    const observaciones =
        cabecera.observaciones || "-";

    const fecha =
        new Date(cabecera.fecha)
        .toLocaleDateString("es-PY");

    const resultado = {

        conformes:
            Number(cabecera.conformes || 0),

        parciales:
            Number(cabecera.parciales || 0),

        noConformes:
            Number(cabecera.no_conformes || 0),

        noAplica:
            Number(cabecera.no_aplica || 0),

        porcentaje:
            Number(cabecera.cumplimiento || 0)

    };

    resultado.total =
          resultado.conformes
        + resultado.parciales
        + resultado.noConformes
        + resultado.noAplica;

    if(resultado.porcentaje >= 90){

        resultado.estado = "EXCELENTE";

    }else if(resultado.porcentaje >= 80){

        resultado.estado = "BUENO";

    }else if(resultado.porcentaje >= 70){

        resultado.estado = "REGULAR";

    }else{

        resultado.estado = "DEFICIENTE";

    }

    let colorEstado = [220,53,69];

    if(resultado.porcentaje >= 90){

        colorEstado = [25,135,84];

    }else if(resultado.porcentaje >= 80){

        colorEstado = [255,193,7];

    }else if(resultado.porcentaje >= 70){

        colorEstado = [255,140,0];

    }

    // ENCABEZADO

    doc.setFillColor(0,51,102);
    doc.rect(0,0,210,28,"F");

    doc.setTextColor(255,255,255);

    doc.setFontSize(18);
    doc.text(
        "VERIFICACIÓN SANITARIA DINAVISA",
        15,
        15
    );

    doc.setFontSize(11);

    doc.text(
        "Lista de Verificación DINAVISA",
        15,
        23
    );

    doc.setTextColor(0,0,0);

    let y = 40;

    // DATOS GENERALES

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");

    doc.text(
        "DATOS GENERALES",
        15,
        y
    );

    y += 10;

    doc.setFont(undefined,"normal");
    doc.setFontSize(10);

    doc.text(`Fecha: ${fecha}`,15,y);
    y += 6;

    doc.text(`Inspector: ${inspector}`,15,y);
    y += 6;

    doc.text(`Establecimiento: ${establecimiento}`,15,y);
    y += 6;

    doc.text(`Responsable: ${responsable}`,15,y);

    // RESUMEN EJECUTIVO

    y += 15;

    doc.setFont(undefined,"bold");
    doc.setFontSize(14);

    doc.text(
        "RESUMEN EJECUTIVO",
        15,
        y
    );

    y += 8;

    doc.setFont(undefined,"normal");
    doc.setFontSize(10);

    const resumen = `
Durante la inspección se evaluaron ${resultado.total} controles aplicables.
Se registraron ${resultado.conformes} controles conformes y ${resultado.noConformes} controles no conformes.
Además se registraron ${resultado.parciales} controles parciales.
Adicionalmente, ${resultado.noAplica} controles fueron catalogados como N/A.
El porcentaje de cumplimiento obtenido fue de ${resultado.porcentaje.toFixed(2)}%.
La evaluación general corresponde a: ${resultado.estado}.
`;

    const resumenLineas =
        doc.splitTextToSize(
            resumen,
            180
        );

    doc.text(
        resumenLineas,
        15,
        y
    );

    y += (resumenLineas.length * 6) + 10;

    // PAGINA 2

    doc.addPage();

    y = 20;

    doc.setFillColor(0,51,102);

    doc.rect(
        0,
        0,
        210,
        25,
        "F"
    );

    doc.setTextColor(255,255,255);

    doc.setFontSize(18);

    doc.text(
        "RESUMEN DE CUMPLIMIENTO",
        15,
        16
    );

    doc.setTextColor(0,0,0);

    doc.setFontSize(10);

    doc.text(
        `Fecha: ${fecha}`,
        15,
        35
    );

    doc.text(
        `Inspector: ${inspector}`,
        120,
        35
    );

    y = 50;

    const imagenGrafico =
        await generarGraficoPDF(resultado);

    doc.addImage(
        imagenGrafico,
        "PNG",
        60,
        y,
        90,
        90
    );

    y += 100;

    doc.setFontSize(9);

    doc.setFillColor(40,167,69);
    doc.rect(15,y,4,4,"F");

    doc.text(
        `Conformes (${resultado.conformes})`,
        22,
        y + 3
    );

    doc.setFillColor(255,193,7);
    doc.rect(65,y,4,4,"F");

    doc.text(
        `Parciales (${resultado.parciales})`,
        72,
        y + 3
    );

    doc.setFillColor(220,53,69);
    doc.rect(115,y,4,4,"F");

    doc.text(
        `No Conf. (${resultado.noConformes})`,
        122,
        y + 3
    );

    doc.setFillColor(108,117,125);
    doc.rect(175,y,4,4,"F");

    doc.text(
        `N/A (${resultado.noAplica})`,
        182,
        y + 3
    );

    y += 10;

    doc.setDrawColor(200);
    doc.setFillColor(245,245,245);

    doc.roundedRect(
        15,
        y,
        180,
        45,
        3,
        3,
        "FD"
    );

    doc.text(
        `${resultado.porcentaje.toFixed(2)}%`,
        105,
        y + 12,
        {align:"center"}
    );

    doc.setFontSize(9);

    doc.text(
        "CUMPLIMIENTO GENERAL",
        105,
        y + 19,
        {align:"center"}
    );

    doc.setTextColor(
        colorEstado[0],
        colorEstado[1],
        colorEstado[2]
    );

    doc.setFontSize(16);
    doc.setFont(undefined,"bold");

    doc.text(
        resultado.estado,
        105,
        y + 30,
        {align:"center"}
    );

    doc.setTextColor(0,0,0);

    y += 60;

    doc.setFontSize(12);

    doc.text(
        "DETALLE DE RESULTADOS",
        20,
        y
    );

    y += 10;

    const resumenDatos = [

        ["Conformes", resultado.conformes],
        ["Parciales", resultado.parciales],
        ["No Conformes", resultado.noConformes],
        ["N/A", resultado.noAplica],
        ["Evaluados", resultado.total]

    ];

    resumenDatos.forEach((fila,index)=>{

        const filaY = y + (index * 8);

        doc.rect(20,filaY,80,8);
        doc.rect(100,filaY,30,8);

        doc.text(
            fila[0],
            25,
            filaY + 6
        );

        doc.text(
            String(fila[1]),
            112,
            filaY + 6
        );

    });

    // HALLAZGOS

    doc.addPage();

    y = 20;

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");

    doc.text(
        "HALLAZGOS DETECTADOS",
        15,
        y
    );

    y += 10;

    if(hallazgos.length === 0){

        doc.setFont(undefined,"normal");

        doc.text(
            "No se detectaron hallazgos.",
            15,
            y
        );

    }else{

        hallazgos.forEach((hallazgo,index)=>{

            if(y > 250){

                doc.addPage();
                y = 20;

            }

            doc.setFont(undefined,"bold");

            doc.text(
                `Hallazgo ${index + 1}`,
                15,
                y
            );

            y += 8;

            doc.setFont(undefined,"normal");

            const texto =
                hallazgo.item ||
                hallazgo.hallazgo ||
                "-";

            const lineas =
                doc.splitTextToSize(
                    texto,
                    160
                );

            doc.text(
                lineas,
                20,
                y
            );

            y += (lineas.length * 5);

            y += 10;
        });

    }

    // OBSERVACIONES

    y += 15;

    doc.setFont(undefined,"bold");

    doc.text(
        "OBSERVACIONES",
        15,
        y
    );

    y += 8;

    doc.setFont(undefined,"normal");

    const obs =
        doc.splitTextToSize(
            observaciones,
            180
        );

    doc.text(
        obs,
        15,
        y
    );

    y += (obs.length * 6) + 30;

    if(y < 250){

        doc.line(
            60,
            y,
            140,
            y
        );

        doc.text(
            inspector,
            90,
            y + 8,
            {align:"center"}
        );

        doc.text(
            "Inspector Responsable",
            90,
            y + 15,
            {align:"center"}
        );

    }

    const paginas =
        doc.internal.getNumberOfPages();

    for(let i = 1; i <= paginas; i++){

        doc.setPage(i);

        doc.setFontSize(8);

        doc.text(
            `VERIFICACIÓN SANITARIA DINAVISA | Página ${i} de ${paginas}`,
            15,
            290
        );

    }

    doc.save(
        `DINAVISA_HISTORICO_${cabecera.id}.pdf`
    );

}