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
  for( var i = 0, canvasHeight = canvas.height; i < canvasHeight; i++ ) {
    colors[colors.length] =  [];
    colors[i][0] = canvas.getContext('2d').getImageData(0, i, canvas.width, 1).data;
  }
  console.log(colors);
  identifyShapes(colors);
}
function identifyShapes( colors ){
  var backgroundColor;
  var shapeColor;
  var r, g, b, a;
  var rgba = [];
  var differentColors = [];
  var colorCounter = 0;
  var max;
  var sameColor;
  var color;
  var aArray = [];
  var spliceOne = function(arr, index) {
                         var len=arr.length;
                         if (!len) { return }
                         while (index<len) {
                               arr[index] = arr[index+1]; index++ }
                         arr.length--;
                };
  for( var i = 0, colorsLength = colors.length; i < colorsLength; i++ ) {
    rgba[rgba.length] = [];
  }
  for ( i = 0, j = 0, colorsHeight = colors.length, colorsWidth = colors[i][0].length; i < colorsHeight && j < colorsWidth; j += 4, i = ( j == colorsWidth ) ? i + 1 : i, j = ( j == colorsWidth ) ? j = 0 : j ) {
    r = colors[i][0][j];
    g = colors[i][0][j + 1];
    b = colors[i][0][j + 2];
    a = colors[i][0][j + 3];
    rgba[i][rgba[i].length] = [r, g, b, a];
  }
  colors.splice(0, colors.length);
  for ( i = 0, j = 0, height = rgba.length, width = rgba[i].length; i < height && j < width; j++, i = ( j == width ) ? i + 1 : i, j = ( j == width ) ? j = 0 : j ) {
      sameColor = false;
      if ( differentColors.length == 0){
        spliceOne(aArray, 0);
        differentColors[differentColors.length] = aArray.concat(rgba[i][j]);
        differentColors[0][4] = 1;
      } else {
        for ( x = 0, differentColorsLength = differentColors.length; x < differentColorsLength; x++ ){
          if ( differentColors[x][0] === rgba[i][j][0] && differentColors[x][1] === rgba[i][j][1] && differentColors[x][2] === rgba[i][j][2] && differentColors[x][3] === rgba[i][j][3] ) {
            differentColors[x][4] += 1;
            sameColor = true;
          }
        }
        colorCounter = differentColors.length;
        if ( sameColor == false ){
          spliceOne(aArray, 0);
          differentColors[differentColors.length] = aArray.concat(rgba[i][j]);
          differentColors[colorCounter][4] = 1;
        }
      }
      }
    console.log(differentColors);

  }
