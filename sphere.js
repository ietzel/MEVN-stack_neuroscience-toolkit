let initVals = [12, 12, 12, 50, 255, 255];
let radius = initVals[0], detailX = initVals[1], detailY = initVals[2], aL = initVals[3], dL = initVals[4], pL = initVals[5];
let attributes = [radius, detailX, detailY, aL, dL, pL];

function setup() {
    createCanvas(360, 360, WEBGL);  
    attributes[0] = createSlider(0, 360, 120);
    attributes[0].position(0, height-45);
    attributes[0].style('width', '80px');
    for(var i=2; i<=attributes.length-3; i++) {
        attributes[i-1] = createSlider(0, 24, initVals[i-1]);
        attributes[i-1].position(0, height + 15*(i-4));
        attributes[i-1].style('width', '80px');
    }
    for(var i=4; i<=attributes.length; i++) {
      attributes[i-1] = createSlider(0, 255, initVals[i-1]);
      attributes[i-1].position(0, height + 15*(i-4));
      attributes[i-1].style('width', '80px');
  }
}

function draw() {
  background(0);
  let locX = mouseX-(height/2), locY = mouseY-(width/2);
  ambientLight(attributes[3].value());
  directionalLight(attributes[4].value(), 0, 0, 0.25, 0.25, 0);
  pointLight(0, 0, attributes[5].value(), locX, locY, attributes[5].value());
  specularMaterial(250);
  translate(width/24, height/24, 0);
  ambientMaterial(250);
  sphere(attributes[0].value(), attributes[1].value(), attributes[2].value());
  push();
}