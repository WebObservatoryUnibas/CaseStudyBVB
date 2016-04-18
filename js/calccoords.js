// used for chart 3 mapbox. this function calculates the central
// viewpoint for the map. The two arguments are starting point and endpoint
// of the lines on the route layer.

function calckos(a,b){
    var xx = (a[0]+b[0]) /2;
    var yy = (a[1]+b[1]) /2;
    return [yy,xx];
}

console.log(calckos([7.589101,47.554645],[7.591686,47.577321]));
