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

  // console.log(document.cookie);
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
  var sameColor = 0;
  var color;
  for( var i = 0; i < colors.length; i++ ) {
    rgba.push( [] );
  }
  for ( i = 0; i < colors.length; i++ ) {
    for ( j = 0; j < colors[i][0].length; j += 4){
      r = colors[i][0][j];
      g = colors[i][0][j + 1];
      b = colors[i][0][j + 2];
      a = colors[i][0][j + 3];
      // console.log(r, g, b, a);
      rgba[i].push( [r, g, b, a] );
    }
  }
  console.log(rgba);
  for ( i = 0; i < rgba.length; i++ ){
    for ( j = 0; j < rgba[i].length; j++ ){
      if ( differentColors.length == 0){
        colorCounter = 0;
        differentColors.push(rgba[i][j]);
        differentColors[0].push(1);
        console.log(differentColors[0]);
      } else if ( differentColors[0][0] === rgba[i][j][0] && differentColors[0][1] === rgba[i][j][1] && differentColors[0][2] === rgba[i][j][2] && differentColors[0][3] === rgba[i][j][3] ) {
        max = differentColors[0][4];
        differentColors[0][4] = max + 1;
        colorCounter = 0;
      } else {
        colorCounter += 1;
        for ( x = 0; x < differentColors.length; x++ ){
          if ( differentColors[x][0] === rgba[i][j][0] && differentColors[x][1] === rgba[i][j][1] && differentColors[x][2] === rgba[i][j][2] && differentColors[x][3] === rgba[i][j][3] ) {
            colorCounter = x;
            max = differentColors[colorCounter][4];
            differentColors[colorCounter][4] = max + 1;
            sameColor = 1;
          }
        }
        if ( sameColor == 0 ){
          differentColors.push(rgba[i][j]);
          differentColors[colorCounter].push(1);
        }
      }
      }
    }
    console.log(differentColors);
  }
