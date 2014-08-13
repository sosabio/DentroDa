var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(FILE_URI) {
  console.log(FILE_URI);

  var smallImage = document.getElementById('smallImage');
  document.getElementById('msg').style.display = 'none';
  smallImage.src = FILE_URI;
}

function clearCache() {
  navigator.camera.cleanup();
}
 
var retries = 0;
function onCapturePhoto(fileURI) {
  var win = function (r) {
    clearCache();
    retries = 0;
    console.log('Sucesso.');
    onPhotoDataSuccess('http://dentroda.booweb.com.br/image/'+fileURI.substr(fileURI.lastIndexOf('/') + 1));
    //alert('Foto enviada com sucesso.');
  }

  var fail = function (error) {
    console.log('erro');
    if (retries == 0) {
      retries ++
      setTimeout(function() {
        onCapturePhoto(fileURI)
      }, 1000)
    } else {
      retries = 0;
      clearCache();
      alert('Erro ao enviar a foto!');
      alert(error);
    }
  }

  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
  console.log(options.fileName);
  options.mimeType = "text/plain";
  options.params = {};
  options.chunkedMode = false;

  document.getElementById('msg').style.display = 'block';

  var ft = new FileTransfer();
  ft.upload(fileURI, encodeURI("http://dentroda.booweb.com.br/envio.php"), win, fail, options);
}

function capturePhoto() {
  navigator.camera.getPicture(onCapturePhoto, onFail, { quality: 100, destinationType: destinationType.FILE_URI });
}

function onFail(message) {
  alert(message);
}