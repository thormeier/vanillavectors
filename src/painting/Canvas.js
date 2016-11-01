/**
 * The Canvas element
 * @param c            The canvas element
 * @param cameraVector Vector, where the camera is
 * @constructor
 */
var Canvas = function (c, cameraVector) {
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    this.context = c.getContext("2d");
    this.c = c;

    // Plane is used to project vectors upon, this will then be painted on the canvas
    this.plane = new Plane(
        new Vector(0, 0, 0),
        new Vector(c.width, 0, 0),
        new Vector(0, c.height, 0)
    );

    this.cameraVector = cameraVector;
};

/**
 * Move the canvases Z-axis
 * @param z The new z coordinate
 */
Canvas.prototype.moveZAxisTo = function (z) {
    this.plane = new Plane(
        new Vector(0, 0, z),
        new Vector(this.c.width, 0, z),
        new Vector(0, this.c.height, z)
    );
};

/**
 * Sets a new camera vector
 * @param cameraVector
 */
Canvas.prototype.setCameraVector = function (cameraVector) {
    this.cameraVector = cameraVector;
};

/**
 * Paint a line
 * @param fromX       STart X coord
 * @param fromY       Start Y coord
 * @param toX         End X coord
 * @param toY         End Y coord
 * @param strokeColor Color of the line
 */
Canvas.prototype.paint = function (fromX, fromY, toX, toY, strokeColor) {
    this.context.beginPath();
    this.context.lineJoin = "round";
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY);
    this.context.strokeStyle = strokeColor;
    this.context.stroke();
};

/**
 * Paint an edge
 * @param edge        The edge to paint
 * @param strokeColor Color of the painted edge
 */
Canvas.prototype.paintEdge = function (edge, strokeColor) {
    var startLine = new Line(this.cameraVector, edge.s);
    var line = new Line(this.cameraVector, edge.d);

    var startPoint = this.plane.getIntersectionWith(startLine);
    var point = this.plane.getIntersectionWith(line);

    this.paint(
        startPoint.x, startPoint.y,
        point.x, point.y,
        strokeColor
    );
};

/**
 * Paints a body
 * @param body
 * @param strokeColor
 */
Canvas.prototype.paintBody = function (body, strokeColor) {
    for (var i = 0; i < body.edges.length; i++) {
        this.paintEdge(body.edges[i], strokeColor);
    }
};

/**
 * Clear the whole canvas
 */
Canvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.c.width, this.c.height);
};
