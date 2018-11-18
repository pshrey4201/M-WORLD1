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
  for( var i = 0; i < canvas.height; i++ ) {
    colors.push( [] );
  }
  for ( i = 0; i < canvas.height; i++ ) {
    colors[i].push(canvas.getContext('2d').getImageData(0, i, canvas.width, 1).data);
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
  for( var i = 0; i < colors.length; i++ ) {
    rgba.push( [] );
  }
  for ( i = 0; i < colors.length; i++ ) {
    for ( j = 0; j < colors[i][0].length; j += 4){
      r = colors[i][0][j];
      g = colors[i][0][j + 1];
      b = colors[i][0][j + 2];
      a = colors[i][0][j + 3];
      rgba[i].push( [r, g, b, a] );
    }
  }
  for ( i = 0; i < rgba.length; i++ ){
    for ( j = 0; j < rgba[i].length; j++ ){
      sameColor = false;
      if ( differentColors.length == 0){
        aArray.splice(0,aArray.length)
        differentColors.push(aArray.concat(rgba[i][j]));
        differentColors[0].push(1);
      } else {
        for ( x = 0; x < differentColors.length; x++ ){
          if ( differentColors[x][0] === rgba[i][j][0] && differentColors[x][1] === rgba[i][j][1] && differentColors[x][2] === rgba[i][j][2] && differentColors[x][3] === rgba[i][j][3] ) {
            differentColors[x][4] += 1;
            sameColor = true;
          }
        }
        colorCounter = differentColors.length;
        if ( sameColor == false ){
          aArray.splice(0,aArray.length)
          differentColors.push(aArray.concat(rgba[i][j]));
          differentColors[colorCounter].push(1);
        }
      }
      }
    }
    console.log(differentColors);

  }
