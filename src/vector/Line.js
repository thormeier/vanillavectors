/**
 * A line
 * @param l0 Support vector
 * @param l  Another vector on the line, direction vector will be calculated
 * @constructor
 */
var Line = function (l0, l) {
    this.l0 = l0;
    this.l = l.minus(l0); // Calculate direction vector
    this.lPrime = l;
};

/**
 * Rotates the line by two given angles
 * @param alpha Angle alpha
 * @param beta  Angle beta
 */
Line.prototype.rotate = function (alpha, beta) {
    if (alpha > 0) {
        this.l = this.l.rotate('x', alpha);
    }

    if (beta > 0) {
        this.l = this.l.rotate('z', beta);
    }
};

/**
 * Rotates the whole line around another line by a given angle
 * @param line
 * @param angle
 * @returns {Line}
 */
Line.prototype.rotateAroundLine = function (line, angle) {
    return new Line(
        this.l0.rotateAroundLine(line, angle),
        this.lPrime.rotateAroundLine(line, angle)
    );
};
