class Obstacle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size; 
    }

    display() {
        image(obstacleImg, this.x, this.y, 80, 80);
    }
}