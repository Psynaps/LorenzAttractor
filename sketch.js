// Lorenz Attractor
// @Michael Gunn



function setup() {
    createCanvas(600, 400, WEBGL);
    sigmaSlider = createSlider(1, 20, 10, 1);
    rhoSlider = createSlider(1, 40, 28, 2);
    betaSlider = createSlider(1, 4, 8.0 / 3.0, 1.0 / 3.0);
    dtSlider = createSlider(0.001, 0.05, 0.01, 0.001);
    x = 0.01;
    y = 0.00;
    z = 0.0;
    dt = 0.01;
    translate(width / 2, height / 2);
    // scale(20);
    noFill();
}

let points = [];
let sigmaSlider, rhoSlider, betaSlider;
let dtSlider;
let x, y, z;
let scale = 3;

function draw() {
    background(0);
    stroke(255);
    noFill();

    // point(100, 100)
    let dx = (sigmaSlider.value() * (y - x)) * dt;
    let dy = (x * (rhoSlider.value() - z) - y) * dt;
    let dz = (x * y - betaSlider.value() * z) * dt;


    x = x + dx;
    y = y + dy;
    z = z + dz;
    console.log(x, y, z);
    let v = createVector(x, y, z);
    point(x * scale, y * scale, z * scale);
    points.push(v);
    beginShape();
    for (let pt of points) {
        // vertex(pt.x * scale, pt.y * scale, pt.z * scale);
        point(pt.x * scale, pt.y * scale, pt.z * scale);
    }
    endShape();
}