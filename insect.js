class Insect {
    constructor(x, y, isLeader = false) {
        this.x = x; 
        this.y = y; 
        this.speedX = 2; 
        this.speedY = 2;
        this.isLeader = isLeader;
        this.maxSpeed = 2; 
        this.spacing = 40;  
        this.velocity = createVector(this.speedX, this.speedY);
        this.acceleration = createVector(0, 0);
    }

    move(insects, index) {
        if (snakeMode) {  
            if (this.isLeader) {
                let desired = createVector(mouseX - this.x, mouseY - this.y);
                desired.setMag(this.maxSpeed);
                let steer = p5.Vector.sub(desired, this.velocity);
                steer.limit(0.1);  
                this.acceleration.add(steer);
            } else {
                if (index > 0) {
                    let previousVehicle = insects[index - 1];
                    let desired = createVector(previousVehicle.x - this.x, previousVehicle.y - this.y);

                    if (desired.mag() > this.spacing) {
                        desired.setMag(this.maxSpeed);  
                    } else {
                        desired.setMag(this.maxSpeed * 0.5);  
                    }

                    let steer = p5.Vector.sub(desired, this.velocity);
                    steer.limit(0.1);  
                    this.acceleration.add(steer);
                }
            }

            this.velocity.add(this.acceleration);
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.acceleration.mult(0);
        } else {
            if (this.isLeader || !leaderMode) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;
            }
        }
    }

    display() {
        image(insectImg, this.x, this.y, 40, 40);  
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

    // Avoid obstacles in the environment
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
}
