var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);


// device APIs are available
//
function onDeviceReady() {
  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  //console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
  onCapturePhoto(imageData);
}

function clearCache() {
    navigator.camera.cleanup();
}
 
var retries = 0;
function onCapturePhoto(fileURI) {
  var win = function (r) {
    clearCache();
    retries = 0;
    alert('Sucesso!');
    console.log('Sucesso.')
  }

  var fail = function (error) {
    console.log('error');
    if (retries == 0) {
      retries ++
      setTimeout(function() {
        onCapturePhoto(fileURI)
      }, 1000)
    } else {
      retries = 0;
      clearCache();
      alert('Erro ao enviar a foto!');
    }
  }

  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
  options.mimeType = "image/jpeg";
  options.params = {}; // if we need to send parameters to the server request
  var ft = new FileTransfer();
  ft.upload(fileURI, encodeURI("http://dentroda.booweb.com.br/envio.php"), win, fail, options);
}
// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 10, destinationType: destinationType.DATA_URL });
}

// Called if something bad happens.
//
function onFail(message) {
  alert(message);
}