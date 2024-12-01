class Insect {
    constructor(x, y, isLeader = false) {
        this.x = x; 
        this.y = y; 
        this.speedX = 2; 
        this.speedY = 2;
        this.isLeader = isLeader;
    }

    move() {
        if (this.isLeader || !leaderMode) {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
    }

    follow(targetX, targetY) {
        let angle = atan2(targetY - this.y, targetX - this.x);
        this.x += cos(angle) * 2; 
        this.y += sin(angle) * 2;
        
    }

    avoidOthers(insects) {
        let separationForceX = 0;
        let separationForceY = 0;
        const desiredSeparation = 40; 

        for (let other of insects) {
            if (other !== this) {
                let distance = dist(this.x, this.y, other.x, other.y);

                if (distance < desiredSeparation) {
                    let angle = atan2(this.y - other.y, this.x - other.x);
                    separationForceX += cos(angle);
                    separationForceY += sin(angle);
                }
            }
        }

        this.x += separationForceX;
        this.y += separationForceY;
    }

    avoidObstacles(obstacles) {
        const safeDistance = 50;
        let avoidanceForce = createVector(0, 0); 
    
        for (let obstacle of obstacles) {
            let obstaclePosition = createVector(obstacle.x, obstacle.y);
            let currentPosition = createVector(this.x, this.y);
    
            let distance = currentPosition.dist(obstaclePosition);
            if (distance < safeDistance + obstacle.size / 2) {
                let direction = p5.Vector.sub(currentPosition, obstaclePosition); 
                direction.normalize(); 
                direction.mult(2); 
                avoidanceForce.add(direction); 
            }
        }
    
        this.x += avoidanceForce.x; 
        this.y += avoidanceForce.y;
    }
    

    display() {
        image(insectImg, this.x, this.y, 40, 40);
    }
}