/**
 * A basic body consisting of edges
 * @constructor
 */
var Body = function () {
    this.edges = [];
};

/**
 * Add an edge to this body
 * @param edge The new edge
 */
Body.prototype.addEdge = function (edge) {
    this.edges.push(edge)
};

/**
 * Rotates the body by 3 given angles
 * @param xAngle X-axis rotation
 * @param yAngle Y-axis rotation
 * @param zAngle Z-axis totation
 * @returns {Body}
 */
Body.prototype.rotate = function (xAngle, yAngle, zAngle) {
    var newBody = new Body();

    for (var i = 0; i < this.edges.length; i++) {
        newBody.addEdge(new Edge(
            this.edges[i].s.rotate('x', xAngle)
                .rotate('y', yAngle)
                .rotate('z', zAngle),
            this.edges[i].d.rotate('x', xAngle)
                .rotate('y', yAngle)
                .rotate('z', zAngle)
        ));
    }

    return newBody;
};

/**
 * Rotates the body around a line by a given angle
 * @param line
 * @param angle
 * @returns {Body}
 */
Body.prototype.rotateAroundLine = function (line, angle) {
    var newBody = new Body();

    for (var i = 0; i < this.edges.length; i++) {
        newBody.addEdge(new Edge(
            this.edges[i].s.rotateAroundLine(line, angle),
            this.edges[i].d.rotateAroundLine(line, angle)
        ));
    }

    return newBody;
};