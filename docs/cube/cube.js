
// Define input fields for rotation and camera position
var inputX = document.getElementById('x');
var inputY = document.getElementById('y');
var inputZ = document.getElementById('z');

var inputCamX = document.getElementById('camX');
var inputCamY = document.getElementById('camY');
var inputScreenZ = document.getElementById('screenZ');

var inputRot = document.getElementById('rot');

// Set initial cam position
var initialCamX = window.innerWidth / 2;
var initialCamY = window.innerHeight / 2;

inputCamX.value = initialCamX;
inputCamY.value = initialCamY;

// Some basic vectors to display
var zeroVector = new Vector(50, 50, 50);

var xAxis = new Edge(
    zeroVector,
    new Vector(500, 50, 50)
);
var yAxis = new Edge(
    zeroVector,
    new Vector(50, 500, 50)
);
var zAxis = new Edge(
    zeroVector,
    new Vector(50, 50, 500)
);
var zPrimeAxis = new Edge(
    yAxis.d,
    new Vector(50, 500, 500)
);
var zPrimePrimeAxis = new Edge(
    xAxis.d,
    new Vector(500, 50, 500)
);

var camVector = new Vector(initialCamX, initialCamY, -1000);
var camDirVector = new Vector(initialCamX, initialCamY, -500);

var camLine = new Line(camVector, camDirVector);

// HTML5 canvas
var canvas = new Canvas(
    document.getElementById("canvas"),
    camVector
);

// A cube
var cube = new Body();
var max = 300;
var min = 150;

// Corners of the cube
var a = new Vector(min, min, min);
var b = new Vector(max, min, min);
var c = new Vector(min, max, min);
var d = new Vector(max, max, min);
var e = new Vector(min, min, max);
var f = new Vector(max, min, max);
var g = new Vector(min, max, max);
var h = new Vector(max, max, max);

// Edges between the corners
cube.addEdge(new Edge(a, b));
cube.addEdge(new Edge(a, c));
cube.addEdge(new Edge(b, d));
cube.addEdge(new Edge(c, d));

cube.addEdge(new Edge(e, f));
cube.addEdge(new Edge(e, g));
cube.addEdge(new Edge(f, h));
cube.addEdge(new Edge(g, h));

cube.addEdge(new Edge(a, e));
cube.addEdge(new Edge(b, f));
cube.addEdge(new Edge(c, g));
cube.addEdge(new Edge(d, h));

canvas.paintBody(cube, '#000000');

var currentCube = cube;

repaint();

/**
 * Rotates the cube by angles from input fields
 */
function rotateCube() {
    currentCube = cube.rotate(
        parseInt(inputX.value),
        parseInt(inputY.value),
        parseInt(inputZ.value)
    ).rotateAroundLine(
        camLine,
        inputRot.value
    );

    repaint();
}

/**
 * Reposition the camera to a position given by input fields
 */
function repositionCamera() {
    var newX = parseInt(inputCamX.value);
    var newY = parseInt(inputCamY.value);
    var newZ = parseInt(inputScreenZ.value);

    var newCamVector = new Vector(
        newX, newY, camVector.z
    );
    var newCamDirVector = new Vector(
        newX, newY, camVector.z + 500
    );

    canvas.setCameraVector(newCamVector);

    camLine = new Line(newCamVector, newCamDirVector);

    canvas.moveZAxisTo(newZ);

    // Also re-rotate the cube to
    repaint();
}

/**
 * Repaints the whole canvas
 */
function repaint() {
    canvas.clear();

    canvas.paintEdge(xAxis, '#a0a0a0');
    canvas.paintEdge(yAxis, '#a0a0a0');
    canvas.paintEdge(zAxis, '#a0a0a0');
    canvas.paintEdge(zPrimeAxis, '#a0a0a0');
    canvas.paintEdge(zPrimePrimeAxis, '#a0a0a0');

    canvas.paintBody(currentCube, '#000000');
}
