// Lorenz Attractor
// @Michael Gunn


let points = [];
let sigmaSlider, rhoSlider, betaSlider;
let dtSlider;
let sigma, rho, beta;
let x, y, z;
let resetButton;
const xInit = 1;
const yInit = 1;
const zInit = 1;

function setup() {
    createCanvas(800, 600, WEBGL);
    // sigmaSlider = createSlider(1, 20, 10, 1);
    // rhoSlider = createSlider(1, 40, 28, 2);
    // betaSlider = createSlider(1, 4, 8.0 / 3.0, 1.0 / 3.0);
    resetButton = createButton('Reset');
    resetButton.mousePressed(reset);
    resetButton.position(140, height + 50);
    let l1 = createP('Time scale:');
    dtSlider = createSlider(0.005, 0.03, 0.01, 0.001);
    x = xInit;
    y = yInit;
    z = zInit;
    sigma = 10;
    rho = 28;
    // rho = 99.96
    beta = 8.0 / 3.0;
    // dt = 0.01;
    // translate(width / 2, height / 2);
    colorMode(HSB);
    translate(0, 0, -80);
}


// let scale = 3;

function draw() {
    background(0);
    // sigma = sigmaSlider.value();
    // rho = rhoSlider.value();
    // beta = betaSlider.value();


    // update position based on lorenz laws
    let dt = dtSlider.value();
    let dx = (sigma * (y - x)) * dt;
    let dy = (x * (rho - z) - y) * dt;
    let dz = (x * y - beta * z) * dt;


    x = x + dx;
    y = y + dy;
    z = z + dz;

    points.push(new p5.Vector(x, y, z));

    let camX = map(mouseX, 0, width, -200, 200);
    let camY = map(mouseY, 0, height, -200, 200);
    // camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);
    orbitControl(5, 5, 5); // Allows for mouse camera control using left and right click to pan and zoom
    scale(5);
    noFill();
    strokeWeight(3);
    // stroke(255);

    // let v = createVector(x, y, z);
    // point(x * scale, y * scale, z * scale);

    let hue = 0;
    // noFill();
    // beginShape();
    let prev = points[0];
    for (let pt of points) {
        stroke(hue, 255, 255); //Color changes every frame
        // curveVertex(pt.x, pt.y, pt.z);
        hue = (hue + 0.5) % 255;
        point(pt.x, pt.y, pt.z); // Include point as well as line to cover up edges between line segments
        if (prev != pt) {
            line(prev.x, prev.y, prev.z, pt.x, pt.y, pt.z); // Connect points along the curve with lines
        }
        prev = pt;
    }
    // endShape();
}


// Resets the drawing canvas and restarts the drawing with the initial values. 
// Also resets the camera position
function reset() {
    points = [];
    x = xInit;
    y = yInit;
    z = zInit;
    orbitControl(5, 5, 5);
}