// Wait until DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const uploadBtn = document.getElementById('uploadBtn');
//     const cameraBtn = document.getElementById('cameraBtn');
//     const detectBtn = document.getElementById('detectBtn');
  
//     uploadBtn.addEventListener('click', () => {
//       alert("Upload button clicked");
//       // Add file input logic here
//     });
  
//     cameraBtn.addEventListener('click', () => {
//       alert("Camera access coming soon!");
//       // Add camera capture logic here
//     });
  
//     detectBtn.addEventListener('click', () => {
//       alert("Gender detection in progress...");
//       // Add detection logic here
//     });
//   });
const uploadBtn = document.getElementById('uploadBtn');
const cameraBtn = document.getElementById('cameraBtn');
const detectBtn = document.getElementById('detectBtn');
const imageInput = document.getElementById('imageInput');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const message = document.getElementById('message');

let mode = null;
let imageCaptured = false;


uploadBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', () => {
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
        video.style.display = 'none';
        imageCaptured = true;
        mode = 'upload';
        message.textContent = '';
      };
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
});


cameraBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    canvas.style.display = 'none';
    imageCaptured = false;
    mode = 'camera';
    message.textContent = '';


    video.addEventListener('click', () => {
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.style.display = 'block';
      imageCaptured = true;
      message.textContent = '';
    });
  } catch (err) {
    alert('Camera access denied or not available.');
  }
});


detectBtn.addEventListener('click', () => {
  if (!mode) {
    message.textContent = 'Please select an image or open camera first.';
    return;
  }
  if (!imageCaptured) {
    message.textContent = mode === 'camera'
      ? 'Please capture an image from the camera.'
      : 'Please upload an image.';
    return;
  }

  message.textContent = '';
 
  alert('Gender detection logic goes here!');
});
