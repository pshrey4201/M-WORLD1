var a = [];
var b = [];
for( i = 0; i <= 10; i++ ){
  a[i] = Math.random();
  b[i] = Math.random();
}
var ab = new Array(10);
for (i = 0; i < 10; i++) {
  ab[i] = new Array(2);
  for (j = 0; j < 2; j++) {
    ab[i][0] = a[i];
    ab[i][1] = b[i];
  }
}
// var table = [1][9];

// table = [ a + b ];
console.log("<pre>")
 console.table(ab);
 console.log("</pre>")
