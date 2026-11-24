// ========================================
// LISTA DE VERIFICACIÓN DINAVISA
// 
// ========================================

const checklist = [

{
    seccion: "INSTALACIONES",
    items: [
        "Zonas exentas de olores objetables, humo, polvo y otros contaminantes",
        "Las instalaciones eléctricas y fuentes de luz protegidas",
        "Áreas limpias en general, ausencia de objetos no utilizados para la producción"
    ]
},

{
    seccion: "AREA DE MANIPULACION Y ALMACENAMIENTO",
    items: [
        "Los pisos, paredes, techo en buen estado de materiales lavables, resistentes y sin grietas",
        "Aberturas, que impidan la acumulación de suciedad, con protección anti-plagas",
        "Lavatorio de manos en área de manipulación, provisto de insumos certificados y etiquetados adecuadamente",
        "Ventilación adecuada",
        "Utensilios y equipos, en buen estado y limpios",
        "Almacenamiento de Insumos, MP y PT sobre pallets de plástico, separados de la pared"
    ]
},

{
    seccion: "ABASTECIMIENTO DE AGUA",
    items: [
        "Sistema eficaz de evacuación de efluentes y aguas residuales",
        "Análisis de agua vigente"
    ]
},

{
    seccion: "ALMACENAMIENTO DE DESECHOS, PRODUCTOS DEVUELTOS Y SUBPRODUCTOS",
    items: [
        "Basureros sin acumulación de basura",
        "Zona de almacenamiento de desechos limpia y ordenada",
        "Productos devueltos almacenados en sectores separados y señalizados",
        "Subproductos almacenados adecuadamente"
    ]
},

{
    seccion: "VESTUARIOS Y SANITARIOS",
    items: [
        "Buena iluminación, ventilación y mobiliario",
        "Instalación sanitaria con elementos para lavado de manos"
    ]
},

{
    seccion: "ALMACENAMIENTO Y TRANSPORTE DE MP Y PT",
    items: [
        "Control de temperatura disponible",
        "Materias primas almacenadas adecuadamente",
        "Productos almacenados sobre tarimas o estantes",
        "Vehículos en condiciones higiénicas",
        "Carga y descarga fuera del área de elaboración"
    ]
},

{
    seccion: "HIGIENE Y SALUD DEL PERSONAL",
    items: [
        "Análisis clínico anual vigente",
        "No se observan hábitos antihigiénicos",
        "Uniformes utilizados correctamente",
        "Ingreso de visitas con medidas de higiene"
    ]
},

{
    seccion: "MATERIAS PRIMAS Y ENVASES",
    items: [
        "Materias primas y aditivos en correcto estado",
        "Envases almacenados correctamente"
    ]
},

{
    seccion: "LIMPIEZA Y DESINFECCION",
    items: [
        "Productos de limpieza autorizados",
        "Áreas limpias y desinfectadas",
        "Transportes limpios y en buen estado"
    ]
},

{
    seccion: "CONTROL DE PLAGAS",
    items: [
        "Sin señales de plagas",
        "Sustancias peligrosas identificadas"
    ]
},

{
    seccion: "PROCEDIMIENTOS Y REGISTROS",
    items: [
        "Registros de control de producción",
        "Registros de distribución",
        "Registros de control de T °C de equipos",
        "Registros de control de camiones",
        "Registros de control de ambiente y humedad",
        "Registros de control de MP e insumos",
        "Controles laboratoriales internos",
        "Registros de limpiezas de áreas/sanitarios",
        "Registros de capacitación",
        "Programas anuales de mantenimiento de equipos, capacitación, fumigación",
        "Certificados médicos del personal",
        "Análisis anual de agua",
        "Documentos de fumigación",
        "Procedimiento de ingreso y egreso del personal / visitantes",
        "Procedimiento de recepción y almacenamiento de materia prima",
        "Procedimiento para manejo y disposición de residuos",
        "Procedimiento buenas prácticas de manufactura",
        "Procedimiento de limpieza de áreas y equipos",
        "Procedimiento de salud ocupacional",
        "Procedimiento de capacitación al personal",
        "Procedimiento de control de producto terminado y retiro de productos",
        "Procedimiento de mantenimiento",
        "Procedimiento de distribución",
        "Procedimiento de habilitación y evaluación de proveedores",
        "Procedimiento de trazabilidad"
    ]
}

];

// ========================================
// GENERAR CHECKLIST
// ========================================

const contenedor =
document.getElementById("contenedorChecklist");

let contador = 1;

checklist.forEach(grupo => {

    //// Mostrar campos
    window.mostrarDetalle = function(indice, mostrar){

    const fila =
        document.getElementById(
            `detalle${indice}`
        );

    if(!fila){
        console.log(
            "No existe:",
            `detalle${indice}`
        );
        return;
    }

    fila.style.display =
        mostrar
        ? "table-row"
        : "none";
    };


    ////

    let html = `

    <div class="mb-4">

        <span class="badge badge-seccion">
            ${grupo.seccion}
        </span>

        <table class="table table-bordered mt-2">

            <thead class="table-dark">

                <tr>

                    <th>Verificación</th>
                    <th width="120">Conforme</th>
                    <th width="100">Parcial</th>
                    <th width="120">No Conforme</th>
                    <th width="120">N/A</th>

                </tr>

            </thead>

            <tbody>

    `;

    grupo.items.forEach(item => {

        html += `

        <tr>
            <td>${item}</td>

            <td class="text-center">
                <input
                type="radio"
                name="item${contador}"
                value="conforme"
                 required
                onchange="mostrarDetalle(${contador}, false)">
            </td>

            <td class="text-center">
                <input
                type="radio"
                name="item${contador}"
                value="parcial"
                onchange="mostrarDetalle(${contador}, false)">
            </td>

            <td class="text-center">
                <input
                type="radio"
                name="item${contador}"
                value="noconforme"
                onchange="mostrarDetalle(${contador}, true)">
            </td>

            <td class="text-center">
                <input
                type="radio"
                name="item${contador}"
                value="na"
                onchange="mostrarDetalle(${contador}, false)">
            </td>
        </tr>

        <tr id="detalle${contador}" class="fila-detalle" style="display:none;">
        <td colspan="5">

            <div class="detalle-hallazgo">

                <div class="mb-2">
                    <label><strong>Acción Correctiva</strong></label>
                    <input
                    type="text"
                    class="form-control"
                    id="accion${contador}">
                </div>

                <div class="mb-2">
                    <label><strong>Responsable Acción</strong></label>
                    <input
                    type="text"
                    class="form-control"
                    id="responsable${contador}">
                </div>

                <div>
                    <label><strong>Fecha Compromiso</strong></label>
                    <input
                    type="date"
                    class="form-control"
                    id="fechaCompromiso${contador}">
                </div>

            </div>

        </td>
    </tr>

        `;

        contador++;

    });

    html += `

            </tbody>

        </table>

    </div>

    `;

    contenedor.innerHTML += html;


});

// ========================================
// CALCULAR RESULTADO
// ========================================

const form =
document.getElementById("inspectionForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    calcularResultado();

});

function calcularResultado(){

    const seleccionados =
    document.querySelectorAll(
        'input[type="radio"]:checked'
    );

    let conformes = 0;
    let parciales = 0;
    let noConformes = 0;
    let noAplica = 0;

    seleccionados.forEach(control => {

        if(control.value === "conforme"){

            conformes++;

        }else if(control.value === "parcial"){

            parciales++;
    
        }else if(control.value === "noconforme"){

            noConformes++;

        }else if(control.value === "na"){

            noAplica++;

        }

    });

    const totalEvaluados =
        conformes + parciales + noConformes;

        // Conforme = 1 punto
        // Parcial = 0.5 puntos
        // No Conforme = 0 puntos

    const puntosObtenidos =
        (conformes * 1) +
        (parciales * 0.5);

    const puntosPosibles =
        totalEvaluados * 1;

        let porcentaje = 0;

    if(puntosPosibles > 0){
         porcentaje =
         (puntosObtenidos / puntosPosibles) * 100;
    }


    let estado = "";

    if(porcentaje >= 90){

        estado = "EXCELENTE";

    }else if(porcentaje >= 80){

        estado = "BUENO";

    }else if(porcentaje >= 70){

        estado = "REGULAR";

    }else{

        estado = "DEFICIENTE";

    }

    document
        .getElementById(
            "resultadoCumplimiento"
        )
        .innerHTML = `
        <div class="alert alert-info">

            <h5>Resultado General</h5>

            <p>
                Conformes:
                <strong>${conformes}</strong>
            </p>

            <p>
                Parciales:
                <strong>${parciales}</strong>
            </p>

            <p>
                No Conformes:
                <strong>${noConformes}</strong>
            </p>

            <p>
                No Aplica:
                <strong>${noAplica}</strong>
            </p>

            <p>
                Total Evaluados:
                <strong>${totalEvaluados}</strong>
            </p>

            <p>
                Cumplimiento:
                <strong>${porcentaje.toFixed(2)}%</strong>
            </p>

            <p>
                Calificación:
                <strong>${estado}</strong>
            </p>

        </div>
    `;

    return {
        total: totalEvaluados,
        conformes,
        parciales,
        noConformes,
        noAplica,
        porcentaje,
        estado
    };

}

// ==============================
// CONFIGURACIÓN SUPABASE
// ==============================
  
    const SUPABASE_URL =
    "https://tltqmkhrtfxgygnaztjv.supabase.co";

    const SUPABASE_KEY =
    "sb_publishable_VohCUSPfWmA4OLjnze8dlg_IFrrNukv";

    if (!window.supabase) {
     throw new Error(
        "La librería Supabase no fue cargada"
     );
    }

    const supabaseClient =
    window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
    );

        
// ========================================
// GENERAR PDF
// ========================================

document
.getElementById("btnPDF")
.addEventListener(
    "click",
    generarPDF
);

// ========================================
// OBTENER HALLAZGOS
// ========================================

function obtenerHallazgos(){

    const hallazgos = [];

    let indice = 1;

    checklist.forEach(grupo => {

        grupo.items.forEach(item => {

            const respuesta =
            document.querySelector(
                `input[name="item${indice}"]:checked`
            );

            if(
                respuesta &&
                respuesta.value === "noconforme"
            ){

                hallazgos.push({
                item: item,
                    accion_correctiva:
                        document.getElementById(`accion${indice}`)?.value || "",
                    responsable_accion:
                        document.getElementById(`responsable${indice}`)?.value || "",
                    fecha_compromiso:
                        document.getElementById(`fechaCompromiso${indice}`)?.value || null
                });

            }

            indice++;

        });

    });

    return hallazgos;

}
// GRAFICOS //    
function generarGrafico(resultado){
    
    const canvas =
    document.getElementById("graficoPDF");

    const ctx =
    canvas.getContext("2d");

    Chart.getChart(canvas)?.destroy();

    new Chart(ctx, {
        type: "doughnut",
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
                ]
            }]
        },
        options: {
            responsive: false,
            animation: false,
            cutout: "70%",
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(
                canvas.toDataURL(
                    "image/png"
                )
            );

        }, 500);

    });

}

///GUARDAR
async function guardarInspeccion() {

    const resultado = calcularResultado();

    const cabecera = {

        establecimiento:
            document.getElementById("establecimiento").value,

        responsable:
            document.getElementById("responsable").value,

        inspector:
            document.getElementById("inspector").value,

        observaciones:
            document.getElementById("observaciones").value,

        conformes:
            resultado.conformes,

        parciales:
            resultado.parciales,

        no_conformes:
            resultado.noConformes,

        no_aplica:
            resultado.noAplica,

        cumplimiento:
            resultado.porcentaje,

        estado:
            resultado.estado
    };

    const { data, error } = await supabaseClient
        .from("inspecciones_cabecera")
        .insert([cabecera])
        .select();

    if (error) {
        console.error(error);
        throw error;
    }

    const inspeccionId = data[0].id;

    await guardarDetalle(inspeccionId);

    return inspeccionId;
}

async function guardarDetalle(inspeccionId) {

    const hallazgos = obtenerHallazgos();

    if (hallazgos.length === 0) return;

        const detalles = hallazgos.map(h => ({

            inspeccion_id: inspeccionId,

            item: h.item,

            categoria: "General",

            resultado: "No Conforme",

            hallazgo: h.item,

            accion_correctiva:
            h.accion_correctiva,

            responsable_accion:
            h.responsable_accion,

            fecha_compromiso:
            h.fecha_compromiso,

            estado: "Pendiente"
        }));

    const { error } = await supabaseClient
        .from("inspeccion_detalle")
        .insert(detalles);

    if (error) {
        console.error("Error guardando detalle:", error);
        throw error;
    }

    console.log(`${detalles.length} hallazgos guardados`);
}

///FIN GUARDAR


let generandoPDF = false;

// ========================================
// GENERAR PDF
// ========================================
    document
    .getElementById("btnPDF")
    .addEventListener(
    "click",
    generarPDF
);

async function generarPDF(){

    if(generandoPDF){
        return;
    }

    generandoPDF = true;

    try{

        // 1. Guardar datos en Supabase
        await guardarInspeccion();

        const resultado =
        calcularResultado();

        const hallazgos =
        obtenerHallazgos();

        const { jsPDF } =
        window.jspdf;

        const doc =
        new jsPDF();

        const establecimiento =
        document.getElementById("establecimiento").value || "-";

        const responsable =
        document.getElementById("responsable").value || "-";

        const inspector =
        document.getElementById("inspector").value || "-";

        const fecha =
        document.getElementById("fecha").value || "-";

        const observaciones =
        document.getElementById("observaciones").value || "-";

        let colorEstado = [220,53,69];

        if(resultado.porcentaje >= 90){

        colorEstado = [25,135,84];

        }
         else if(resultado.porcentaje >= 80){

        colorEstado = [255,193,7];

        }
    
        else if(resultado.porcentaje >= 70){

        colorEstado = [255,140,0];

        }

    // Encabezado

    doc.setFillColor(0,51,102);
    doc.rect(0,0,210,28,"F");

    doc.setTextColor(255,255,255);

    doc.setFontSize(18);
    doc.text("VERIFICACIÓN SANITARIA DINAVISA",15,15);

    doc.setFontSize(11);
    doc.text(
        "Lista de Verificación DINAVISA",
        15,
        23
    );

    doc.setTextColor(0,0,0);

    let y = 40;

    // Datos generales

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");

    doc.text(
        "DATOS GENERALES",
        15,
        y
    );

    y += 10;

    doc.setFontSize(10);
    doc.setFont(undefined,"normal");

    doc.text(`Fecha: ${fecha}`,15,y);
    y += 6;

    doc.text(`Inspector: ${inspector}`,15,y);
    y += 6;

    doc.text(`Establecimiento: ${establecimiento}`,15,y);
    y += 6;

    doc.text(`Responsable: ${responsable}`,15,y);

    // Resumen ejecutivo

    y += 15;

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");

    doc.text(
        "RESUMEN EJECUTIVO",
        15,
        y
    );

    y += 8;

    doc.setFontSize(10);
    doc.setFont(undefined,"normal");

    const resumen = `
    Durante la inspección se evaluaron ${resultado.total} controles aplicables.

    Se registraron ${resultado.conformes} controles conformes y ${resultado.noConformes} controles no conformes.

    Además se registraron ${resultado.parciales} controles parciales.

    Adicionalmente, ${resultado.noAplica} controles fueron catalogados como N/A (No Aplica), por no corresponder a las condiciones observadas durante la verificación.

    El porcentaje de cumplimiento obtenido fue de ${resultado.porcentaje.toFixed(2)}%.

    De acuerdo con los criterios establecidos, la calificación general de la inspección es: ${resultado.estado}.
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

    // Indicadores

 const indicadores = [
    ["Evaluados", resultado.total],
    ["Parciales", resultado.parciales],
    ["Conformes", resultado.conformes],
    ["No Conformes", resultado.noConformes],
    ["No Aplica", resultado.noAplica],
    ["Cumplimiento", resultado.porcentaje.toFixed(2) + "%"]
 ];


    

    // ========================================
    // PAGINA EJECUTIVA DE INDICADORES
    // ========================================

    doc.addPage();

    y = 20;

    // Título

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

    // Fecha

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
    await generarGrafico(resultado);

    doc.addImage(
    imagenGrafico,
    "PNG",
    60,
    y,
    90,
    90
    );

    y += 100;

    // Leyenda manual

    doc.setFontSize(9);

    // Conformes
    doc.setFillColor(40,167,69);
    doc.rect(15, y, 4, 4, "F");
    doc.text(
    `Conformes (${resultado.conformes})`,
    22,
    y + 3
    );

    // Parciales
    doc.setFillColor(255,193,7);
    doc.rect(65, y, 4, 4, "F");
    doc.text(
    `Parciales (${resultado.parciales})`,
    72,
    y + 3
    );

    // No Conformes
    doc.setFillColor(220,53,69);
    doc.rect(115, y, 4, 4, "F");
    doc.text(
    `No Conf. (${resultado.noConformes})`,
    122,
    y + 3
    );

    // N/A
    doc.setFillColor(108,117,125);
    doc.rect(175, y, 4, 4, "F");
    doc.text(
    `N/A (${resultado.noAplica})`,
    182,
    y + 3
    );

    y += 10;


    doc.setDrawColor(200);
    doc.setFillColor(245,245,245);

    if(y > 200){

        doc.addPage();

        y = 20;

    }
    doc.roundedRect(
        15,
        y,
        180,
        45,
        3,
        3,
        "FD"
    );

    //doc.setFontSize(20);
   // doc.setFont(undefined,"bold");

    doc.text(
    `${resultado.porcentaje.toFixed(2)}%`,
    105,
    y + 12,
    { align: "center" }
    );

    doc.setFontSize(9);
    doc.setFont(undefined,"normal");

    doc.text(
    "CUMPLIMIENTO GENERAL",
    105,
    y + 19,
    { align: "center" }
    );

    doc.setTextColor(
    colorEstado[0],
    colorEstado[1],
    colorEstado[2],
    colorEstado[3],
    );

doc.setFontSize(16);
doc.setFont(undefined,"bold");

doc.text(
    resultado.estado,
    105,
    y + 30,
    { align: "center" }
);

doc.setTextColor(0,0,0);

y += 60;

doc.setFontSize(12);
doc.setFont(undefined,"bold");

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

    const filaY =
    y + (index * 8);

    doc.rect(
        20,
        filaY,
        80,
        8
    );

    doc.rect(
        100,
        filaY,
        30,
        8
    );

    doc.text(
        fila[0],
        25,
        filaY + 7
    );

    doc.text(
        String(fila[1]),
        112,
        filaY + 7
    );

});

doc.addPage();

y = 20;


    // Hallazgos

    doc.setFontSize(14);
    doc.setFont(undefined,"bold");
   
    if(y > 220){

    doc.addPage();

    y = 20;

    }
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

        y += 10;

    }else{

            hallazgos.forEach((hallazgo, index) => {

            doc.setFont(undefined,"bold");

            doc.text(
            `Hallazgo ${index + 1}`,
            15,
            y
            );

            y += 8;

            doc.setFont(undefined,"normal");

            const itemTexto =
            hallazgo.item || "";

            const itemLineas =
            doc.splitTextToSize(
            itemTexto,
            160
            );

            doc.text(
            itemLineas,
            20,
            y
            );

            y += itemLineas.length * 5;

            // PREPARA EL TEXTO DE HALLAZGOS

            // Acción Correctiva
            doc.setFont(undefined,"bold");
            doc.text(
            "Acción Correctiva:",
            20,
            y
            );

            y += 5;

            doc.setFont(undefined,"normal");
            doc.text(
            hallazgo.accion_correctiva || "-",
            25,
            y
            );

            y += 8;

            // Responsable
            doc.setFont(undefined,"bold");
            doc.text(
            "Responsable:",
            20,
            y
            );

            y += 5;

            doc.setFont(undefined,"normal");
            doc.text(
            hallazgo.responsable_accion || "-",
            25,
            y
            );

            y += 8;

            // Fecha Compromiso
            doc.setFont(undefined,"bold");
            doc.text(
            "Fecha Compromiso:",
            20,
            y
            );

            y += 5;

            doc.setFont(undefined,"normal");

            const fechaCompromiso =
            hallazgo.fecha_compromiso
            ? new Date(hallazgo.fecha_compromiso)
            .toLocaleDateString("es-PY")
            : "-";

            doc.text(
            fechaCompromiso,
            25,
            y
            );

            y += 12;

            //PREPARA EL TEXTO DE HALLAZGOS

            y += 15;
        });

    }

    // Observaciones

    if(y > 220){

        doc.addPage();

        y = 20;

    }

    doc.setFont(undefined,"bold");

    doc.text(
        "OBSERVACIONES",
        15,
        y
    );

    y += 8;

    doc.setFont(undefined,"normal");

    const observacionesLineas =
    doc.splitTextToSize(
        observaciones,
        180
    );

    doc.text(
        observacionesLineas,
        15,
        y
    );

    // Firma

    y += (observacionesLineas.length * 6) + 30;

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
            {
                align:"center"
            }
        );

        doc.text(
            "Inspector Responsable",
            90,
            y + 15,
            {
                align:"center"
            }
        );

    }

    // Pie

    const paginas =
    doc.internal.getNumberOfPages();

    for(let i=1;i<=paginas;i++){

        doc.setPage(i);

        doc.setFontSize(8);

        doc.text(
            `VERIFICACIÓN SANITARIA DINAVISA | Página ${i} de ${paginas}`,
            15,
            290
        );

    }

    const nombreArchivo =
    fecha
    ? `DINAVISA_${fecha.replaceAll("-","")}.pdf`
    : "DINAVISA_Informe.pdf";

doc.save(nombreArchivo);

}
finally{

    generandoPDF = false;

}

}
