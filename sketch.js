let bg;
let insects = []; 
let obstacles =[];
let imposters = [];
let beeImg,obstacleImg,insectImg;
let imposter;
let leaderMode = false; 
let mouseMode = false;
let imposterMode = false;
let snakeMode = false;

function preload() {
    bg = loadImage('./assets/background.png');
    insectImg = loadImage('./assets/insect.png');
    beeImg=loadImage('./assets/bee.png');
    obstacleImg=loadImage('./assets/obstacle.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    imposter= new Imposter(random(width), random(height), true);
    leader= new Insect(random(width), random(height), true);

    for (let i = 0; i < 30; i++) {
        insects.push(new Insect(random(width), random(height), false));
    }
}

function draw() {
    image(bg, 0, 0, width, height);

    for (let obstacle of obstacles) {
        obstacle.display();
    }

    if(snakeMode){
        for (let i = 0; i < insects.length; i++) {
            insects[i].move(insects, i);
            insects[i].display();
        }
    }
    else if (leaderMode) {
        leader.move();
        leader.display();
        leader.avoidObstacles(obstacles);
        leader.avoidOthers(insects);
        for (let insect of insects) {
            insect.follow(leader.x, leader.y);
            insect.avoidOthers(insects);
            insect.avoidObstacles(obstacles);
            insect.move();
            insect.display();
        }
    } else if (mouseMode) {
        for (let insect of insects) {
            insect.follow(mouseX, mouseY);
            insect.avoidOthers(insects);
            insect.avoidObstacles(obstacles);
            insect.display();
        }
    } 
    else {
        for (let insect of insects) {
            insect.avoidOthers(insects);
            insect.avoidObstacles(obstacles);
            insect.move();
            insect.display();
        }
    }
}

function mousePressed() {
    let newObstacle = new Obstacle(mouseX, mouseY, random(50, 100));
    obstacles.push(newObstacle);
}

function keyPressed() {
    if (key === 'L' || key === 'l') {
        leaderMode = !leaderMode;
        document.getElementById('currentMode').innerText = leaderMode ? "Current Mode: Leader Mode" : "Current Mode: Default";
    }
    if (key === 'M' || key === 'm') {
        mouseMode = !mouseMode; 
        document.getElementById('currentMode').innerText = mouseMode ? "Current Mode: Mouse Mode" : "Current Mode: Default";
    }
    if (key === 'I' || key === 'i') {
        let newImposter = new Imposter(random(width), random(height));
        imposters.push(newImposter);
        document.getElementById('currentMode').innerText = "Imposter Add";
    }
    if (key === 'S' || key === 's') {
        snakeMode = !snakeMode;
        document.getElementById('currentMode').innerText = mouseMode ? "Current Mode: Snake Mode Activated" : "Current Mode: Default";
    }
}