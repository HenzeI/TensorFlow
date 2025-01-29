const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const result = document.getElementById('result');
const captureButton = document.getElementById('capture');
const insertButton = document.getElementById('insert');
const ctx = canvas.getContext('2d');

// create a reference for our file handle
let fileHandle;

async function getFile() {
  // open file picker, destructure the one element returned array
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  // run code with our fileHandle
}

getFile()

console.log(fileHandle);

async function setupCamera() {
    // Solicitar acceso a la cámara
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

async function loadModelAndPredict(image) {
    result.textContent = 'Cargando modelo...';
    // Cargar MobileNet
    const model = await mobilenet.load();

    // Realizar predicción
    const predictions = await model.classify(image);

    // Buscar si "perro" está en la clasificación
    const isDog = predictions.some(pred => pred.className.toLowerCase().includes('dog'));

    if (isDog) {
        result.textContent = '¡Es un perro! 🐶';
    } else {
        result.textContent = 'No es un perro. 🚫';
    }
}

captureButton.addEventListener('click', () => {
    // Ajustar el tamaño del canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar la imagen capturada en el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Usar el canvas como entrada para el modelo
    loadModelAndPredict(canvas);
});

// Inicializar la cámara al cargar la página
setupCamera();