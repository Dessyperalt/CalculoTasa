/* Calculo Certificados de inversion
 * Copyright 2016 Desiree Peralta Encarnacion
 * DesireePeraltaE@gmail.com
 * https://github.com/Dessyperalt */

var col = 1;

function agregar()
{
	var table = document.getElementById("Inversion");
    
    var row = table.insertRow(col);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    var tasa = document.getElementById("Tasa").value;
    var meses = document.getElementById("Meses").value;
    var monto = document.getElementById("Monto").value;
    var Mensual = calculoMensual(tasa, monto).toFixed(2);
    var Resultado = calculoTotal(Mensual, meses).toFixed(2);

    cell1.innerHTML = monto;
    cell2.innerHTML = tasa;
    cell3.innerHTML = meses;
    cell4.innerHTML = Mensual;
    cell5.innerHTML = Resultado;

    col = col +1;

    document.getElementById("Tasa").value = "";
    document.getElementById("Meses").value = "";
    document.getElementById("Monto").value = "";

}

function borrar()
{
    var rowCount = document.getElementById("Inversion").rows.length - 1;
    if (rowCount != 0)
    {
        document.getElementById("Inversion").deleteRow(rowCount);
        col = col - 1 ;
    }
	
}

function calculoMensual(tasa, monto)
{
    return (monto*tasa/100) / 12;
}

function calculoTotal(monto, meses)
{
    return monto * meses;
}
//Crear y descargar archivo txt


function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.txt';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function generarTexto() {
    var texto = []; 
    texto.push('Monto,Tasa,Meses,Total Mensual,Total');

    tabla = document.getElementById("Inversion");
    var rowCount = document.getElementById("Inversion").rows.length;
    texto.push('\n');
    for (var i = 1; i  < rowCount; i++)
    {
        texto.push(tabla.rows[i].cells[0].innerHTML + ',');
        texto.push(tabla.rows[i].cells[1].innerHTML + ',');
        texto.push(tabla.rows[i].cells[2].innerHTML + ',');
        texto.push(tabla.rows[i].cells[3].innerHTML + ',');
        texto.push(tabla.rows[i].cells[4].innerHTML + ',');
        texto.push('\n');
    }

    return new Blob(texto, {
        type: 'text/plain'
    });
};

document.getElementById('imprimir').addEventListener('click', function () {
    descargarArchivo(generarTexto(), 'Certificado ' + (new Date()).toLocaleDateString() + '.csv');
}, false
);