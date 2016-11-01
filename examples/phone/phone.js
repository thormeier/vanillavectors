var inputX = document.getElementById('x');
var inputY = document.getElementById('y');
var inputZ = document.getElementById('z');

var xCoordsField = document.getElementById('xCoords');
var yCoordsField = document.getElementById('yCoords');
var zCoordsField = document.getElementById('zCoords');

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

// Set initial cam position
var initialCamX = window.innerWidth / 2;
var initialCamY = window.innerHeight / 2;

var camVector = new Vector(initialCamX, initialCamY, -1000);

// HTML5 canvas
var canvas = new Canvas(
    document.getElementById("canvas"),
    camVector
);

// Phone measurements
var phoneZPos = 200;
var phoneWidth = 250;
var phoneHeight = 500;
var phoneDepth = 80;

// position phone at the center of the screen, laying down and pointing forward

// Phone front
var phoneFrontTopLeft = new Vector(
    initialCamX - (phoneWidth / 2),
    initialCamY + (phoneDepth / 2),
    phoneZPos + phoneHeight
);
var phoneFrontTopRight = new Vector(
    initialCamX + (phoneWidth / 2),
    initialCamY + (phoneDepth / 2),
    phoneZPos + phoneHeight
);
var phoneFrontBottomLeft = new Vector(
    initialCamX - (phoneWidth / 2),
    initialCamY + (phoneDepth / 2),
    phoneZPos
);
var phoneFrontBottomRight = new Vector(
    initialCamX + (phoneWidth / 2),
    initialCamY + (phoneDepth / 2),
    phoneZPos
);

// Phone back
var phoneBackTopLeft = new Vector(
    initialCamX - (phoneWidth / 2),
    initialCamY - (phoneDepth / 2),
    phoneZPos + phoneHeight
);
var phoneBackTopRight = new Vector(
    initialCamX + (phoneWidth / 2),
    initialCamY - (phoneDepth / 2),
    phoneZPos + phoneHeight
);
var phoneBackBottomLeft = new Vector(
    initialCamX - (phoneWidth / 2),
    initialCamY - (phoneDepth / 2),
    phoneZPos
);
var phoneBackBottomRight = new Vector(
    initialCamX + (phoneWidth / 2),
    initialCamY - (phoneDepth / 2),
    phoneZPos
);

// The phone as a body
var phone = new Body();
phone.addEdge(new Edge(phoneFrontTopLeft, phoneFrontTopRight));
phone.addEdge(new Edge(phoneFrontTopLeft, phoneFrontBottomLeft));
phone.addEdge(new Edge(phoneFrontTopRight, phoneFrontBottomRight));
phone.addEdge(new Edge(phoneFrontBottomLeft, phoneFrontBottomRight));

phone.addEdge(new Edge(phoneBackTopLeft, phoneBackTopRight));
phone.addEdge(new Edge(phoneBackTopLeft, phoneBackBottomLeft));
phone.addEdge(new Edge(phoneBackTopRight, phoneBackBottomRight));
phone.addEdge(new Edge(phoneBackBottomLeft, phoneBackBottomRight));

phone.addEdge(new Edge(phoneFrontTopLeft, phoneBackTopLeft));
phone.addEdge(new Edge(phoneFrontTopRight, phoneBackTopRight));
phone.addEdge(new Edge(phoneFrontBottomLeft, phoneBackBottomLeft));
phone.addEdge(new Edge(phoneFrontBottomRight, phoneBackBottomRight));

// Rotation axes and edges to display
var phoneRotateYAxis = new Line(
    new Vector(initialCamX, initialCamY - 100, phoneZPos + (phoneHeight / 2)),
    new Vector(initialCamX, initialCamY + 100, phoneZPos + (phoneHeight / 2))
);
var phoneRotateYAxisEdge = new Edge(
    new Vector(initialCamX, initialCamY - 100, phoneZPos + (phoneHeight / 2)),
    new Vector(initialCamX, initialCamY + 100, phoneZPos + (phoneHeight / 2))
);
var phoneRotateXAxis = new Line(
    new Vector(initialCamX - 10, initialCamY, phoneZPos + (phoneHeight / 2)),
    new Vector(initialCamX + 10, initialCamY, phoneZPos + (phoneHeight / 2))
);

var phoneRotateXAxisEdge = new Edge(
    new Vector(initialCamX - 100, initialCamY, phoneZPos + (phoneHeight / 2)),
    new Vector(initialCamX + 100, initialCamY, phoneZPos + (phoneHeight / 2))
);

var phoneRotateZAxis = new Line(
    new Vector(initialCamX, initialCamY, phoneZPos + (phoneHeight / 2) + 10),
    new Vector(initialCamX, initialCamY, phoneZPos + (phoneHeight / 2) - 10)
);

// Initial painting
paint(phone);

/**
 * Repaints the whole canvas
 * @param phone
 */
function paint(phone) {
    canvas.clear();

    canvas.paintEdge(xAxis, '#a0a0a0');
    canvas.paintEdge(yAxis, '#a0a0a0');
    canvas.paintEdge(zAxis, '#a0a0a0');

    canvas.paintEdge(phoneRotateYAxisEdge, '#a0a0a0');
    canvas.paintEdge(phoneRotateXAxisEdge, '#a0a0a0');

    canvas.paintBody(phone, '#000000');
}

/**
 * Rotates the phone
 */
function rotatePhone() {
    var xAngle = parseInt(inputX.value);
    var yAngle = parseInt(inputY.value);
    var zAngle = parseInt(inputZ.value);

    xCoordsField.value = xAngle;
    yCoordsField.value = yAngle;
    zCoordsField.value = zAngle;

    var phonePrime = phone;
    if (xAngle != 0) {
        phonePrime = phonePrime.rotateAroundLine(phoneRotateXAxis, xAngle);
    }

    if (yAngle != 0) {
        phonePrime = phonePrime.rotateAroundLine(phoneRotateYAxis, yAngle);
    }

    if (zAngle != 0) {
        phonePrime = phonePrime.rotateAroundLine(phoneRotateZAxis, zAngle);
    }

    paint(phonePrime);
}

// Auto-rotate functionality
var autoRotateInput = document.querySelector('#autorot');
var isAutoRotating = false;
var inputs = [
    {
        'input': inputX,
        'back' : false
    },
    {
        'input': inputY,
        'back' : false
    },
    {
        'input': inputZ,
        'back' : false
    }
];
function autoRotateSwitch() {
    if (autoRotateInput.checked) {
        isAutoRotating = true;
        autoRotate(1, 30);
    } else {
        isAutoRotating = false;
    }
}

function autoRotate(degreeStep, interval) {
    for (var i = 0; i < inputs.length; i++) {
        var max = inputs[i].input.max;
        var min = inputs[i].input.min;

        if (inputs[i].back) {
            if (min < inputs[i].input.value - degreeStep) {
                inputs[i].input.value = Number(inputs[i].input.value) - degreeStep;
            } else {
                inputs[i].input.value = min;
                inputs[i].back = false;
            }
        } else {
            if (max > Number(inputs[i].input.value) + degreeStep) {
                inputs[i].input.value = Number(inputs[i].input.value) + degreeStep;
            } else {
                inputs[i].input.value = max;
                inputs[i].back = true;
            }
        }
    }

    rotatePhone();

    if (isAutoRotating) {
        setTimeout(function () {
            autoRotate(degreeStep, interval)
        }, interval);
    }
}
