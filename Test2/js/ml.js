function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
         }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }

  }

previewFile();  //calls the function named previewFile()

function createCanvas(){
  var img = document.getElementById('imageTest');
  var canvas = document.getElementById('mycanvas');
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  var colors = [];
  for ( var i = 0; i < canvas.height; i++; ) {
    for ( var j = 0; j < canvas.width; j++; ) {
      colors.push(canvas.getContext('2d').getImageData(j, i, 1, 1).data);
    }
  }
  console.log(colors);
}
