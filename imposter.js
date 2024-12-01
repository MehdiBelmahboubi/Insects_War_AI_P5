class Imposter extends Insect {
    constructor(x, y) {
        super(x, y, false);
        this.isAlive = true;
    }

    runToClosestObstacle(obstacles) {
        if (!this.isAlive) return;

        let closestObstacle = null;
        let minDistance = Infinity;

        for (let obstacle of obstacles) {
            let distance = dist(this.x, this.y, obstacle.x, obstacle.y);
            if (distance < minDistance) {
                minDistance = distance;
                closestObstacle = obstacle;
            }
        }

        if (closestObstacle) {
            this.follow(closestObstacle.x, closestObstacle.y);

            if (minDistance < closestObstacle.size / 2) {
                this.disappear(); 
            }
        }
    }

    disappear() {
        this.isAlive = false;
    }

    display() {
        if (this.isAlive) {
            image(beeImg, this.x, this.y, 40, 40);
        }
    }
}