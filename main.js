import { convertToImage } from "../script/convertToImg.js";
import { GridStack, GridStackEngine, GridStackNod, GridStackMoveOpts } from 'gridstack';

// Variables
let input = document.getElementById('fileInput');
let imgDemo = document.getElementsByClassName('imgDemo')[0];
let canvas = document.getElementById('canvas');
let dim = canvas.getContext('2d');
let containerImg = document.getElementById('divContainer');
let containerAdd = document.getElementsByClassName('divBuscarImagenes')[0];
let containerBtn = document.getElementById('divBotonera');
let cropper;
let divCanvas = document.getElementsByClassName("divCanvas")[0];
let dataImg 

//Botones
let btnPreview = document.getElementById('btnPreview');
let btnAgregar = document.getElementById('btnAdd');
let btnCancel = document.getElementById('btnCancel');
let btnSend = document.getElementById('btnSend');


//Funciones
// Función para ocultar elementos actuales
function ocultarActual(){
    btnPreview.classList.add('hide');
    divCanvas.classList.add('hide');
    canvas.classList.add('hide');
}

// Función para mostrar vista previa
function mostrarVistaPrevia(){
    btnSend.classList.remove('hide');
    btnCancel.classList.remove('hide');
}

// Función para visualizar GIF de carga
function visualizarCarga (containerImg){
    let divResultados = document.createElement("div"); 
    divResultados.innerHTML = `<div class="divResult">
                                <img id="loadingGif"  src="./assets/cargando.gif" >
                            </div>`
    containerImg.appendChild(divResultados);
    return  document.getElementById('loadingGif');
}

// Función para ocultar GIF de carga
function ocultarCarga(loadingGif){
    loadingGif.classList.add('hide')
}

// Evento para el cambio de archivo en el input
input.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        // Crear un objeto FileReader para leer el archivo como una URL de datos
        const reader = new FileReader();
        imgDemo.classList.add('hide');
        containerAdd.classList.add('hide');
        reader.onload = function(e) {
            // Crear una nueva imagen en el lienzo
            const img = new Image();
            img.onload = function() {
                canvas.width = (img.width / img.height)*canvas.height;
                console.log(canvas.width);
                // Limpiar el lienzo antes de dibujar la nueva imagen
                dim.clearRect(0, 0, (img.width / img.height)*canvas.height, canvas.height);
                // Dibujar la imagen en el lienzo
                dim.drawImage(img, 0, 0, (img.width / img.height)*canvas.height, canvas.height);
                // Mostrar el elemento canvas
                canvas.classList.remove('hide');
                //canvas.style.display = 'block';
                cropper = new Cropper(canvas, {
                    aspectRatio: 1 / 1,
                    cropBoxResizable: true,
                    background:false,
                    movable:false,
                    zoomable:false,
                    cropper(event){
                        console.log(event.detail.x);
                        console.log(event.detail.y);
                    }
            });
            }
            // Asignar la URL de datos al src de la imagen
            img.src = e.target.result;
        };
        // Leer el archivo como una URL de datos
        reader.readAsDataURL(file);
    }
    containerImg.classList.remove('hide');
    btnPreview.classList.remove('hide');
});

// Evento para el botón de cancelar que retrocede a la página de inicio
btnCancel.addEventListener('click',function(){
    location.reload(); 
})


// Evento para el botón Agregar que abre el selector de archivos
btnAgregar.addEventListener('click', function() {
    input.click();
});

// Evento para el botón de vista previa que procesa y previsualiza la imagen
btnPreview.addEventListener('click', function(){
    ocultarActual();
    const gif = visualizarCarga(containerImg);
    const croppedCanvas = cropper.getCroppedCanvas();
    
    croppedCanvas.toBlob(function(blob) {
        // Crear una nueva solicitud HTTP con la imagen recortada en el cuerpo
        var formData = new FormData();
        formData.append('image', blob, 'filename.jpg');
        formData.set('size','300x300');
        fetch('http://127.0.0.1:5000/remove-bg', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dataImg = data.image;
            convertToImage(data.image, containerImg);
            ocultarCarga(gif);
            mostrarVistaPrevia();}
        )
        .catch(error => {
            console.error('Error al enviar la imagen:', error);
        });
    }, 'image/jpeg');

});

// Evento para el botón de enviar que registra los datos de la imagen (para procesamiento futuro)
btnSend.addEventListener('click', function(){
    console.log(dataImg);
    
    

})

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar GridStack
    const grid = GridStack.init({
        cellHeight: 80,
        verticalMargin: 10
    });
    grid.load(items);
    // Puedes agregar más widgets si es necesario
    grid.addWidget('<div><div class="grid-stack-item-content">Item 3</div></div>', { width: 4, height: 2 });
});

/* //Función para mostrar los resultados similares
function renderizarSimilares(i, divResultados){
    let newResult = document.createElement("div");
    newResult.innerHTML = `<div class="cardSimilar">
                                <img class="imgSimilar" src="${i}">
                            </div>`     
    divResultados.appendChild(newResult);
}  */






