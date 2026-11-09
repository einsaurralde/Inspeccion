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
        "Sistema eficaz de evacuación de efluentes y aguas residuales, utilización de agua potable y análisis anual"
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
        "Ausencia de manipuladores enfermos",
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
        "Registros de producción y distribución",
        "Registros de temperatura",
        "Registros de control de MP e insumos",
        "Registros de limpieza y capacitación",
        "Programa anual de mantenimiento",
        "Procedimientos de limpieza y retiro de productos",
        "Procedimientos de BPM y capacitación",
        "Certificados médicos del personal",
        "Análisis anual de agua"
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
                    <th width="120">No Conforme</th>

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
                    required>

            </td>

            <td class="text-center">

                <input
                    type="radio"
                    name="item${contador}"
                    value="noconforme">

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
    let noConformes = 0;

    seleccionados.forEach(control => {

        if(control.value === "conforme"){
            conformes++;
        }else{
            noConformes++;
        }

    });

    const total =
    conformes + noConformes;

    let porcentaje = 0;

    if(total > 0){

        porcentaje =
        (conformes / total) * 100;

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
            No Conformes:
            <strong>${noConformes}</strong>
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
        total,
        conformes,
        noConformes,
        porcentaje,
        estado
    };

}

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

                hallazgos.push(item);

            }

            indice++;

        });

    });

    return hallazgos;

}

function generarPDF(){

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
Se verificaron ${resultado.total} controles.

${resultado.conformes} fueron conformes.

${resultado.noConformes} fueron no conformes.

Cumplimiento general: ${resultado.porcentaje.toFixed(2)}%.

Calificación: ${resultado.estado}.
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
        ["Conformes", resultado.conformes],
        ["No Conformes", resultado.noConformes],
        ["Cumplimiento", resultado.porcentaje.toFixed(2)+"%"]

    ];

    indicadores.forEach((fila,index)=>{

        const filaY =
        y + (index * 8);

        doc.rect(
            15,
            filaY,
            100,
            8
        );

        doc.line(
            70,
            filaY,
            70,
            filaY + 8
        );

        doc.text(
            fila[0],
            20,
            filaY + 5
        );

        doc.text(
            String(fila[1]),
            75,
            filaY + 5
        );

    });

    y += 45;

    // Hallazgos

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

        y += 10;

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

            y += 6;

            doc.setFont(undefined,"normal");

            const lineas =
            doc.splitTextToSize(
                hallazgo,
                170
            );

            doc.text(
                lineas,
                20,
                y
            );

            y += (lineas.length * 6) + 5;

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
            285
        );

    }

    const nombreArchivo =
    fecha
    ? `DINAVISA_${fecha.replaceAll("-","")}.pdf`
    : "DINAVISA_Informe.pdf";

    doc.save(nombreArchivo);

}
