var vidcapture, ctracker, drawcanvas;
var positions;
var drop = [];
let angle = 0;
let photo1;
let photo2;
let photo3;
//https://i.pinimg.com/originals/19/8d/ae/198daeda14097d45e417e62ff283f10e.png
//http://pngimg.com/image/13434

function preload() {
    photo1 = loadImage('/images/smile.png');
    photo2 = loadImage('/images/cloud.png');
    photo3 = loadImage('/images/sun.png');
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("p5canvas");

    vidcapture = createCapture(VIDEO);
    vidcapture.size(width, height);
    vidcapture.hide();
    ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(vidcapture.elt);

    circleMask = createGraphics(50, 50);

    drawcanvas = document.getElementById('defaultCanvas0');
    for (var i = 0; i < 200; i++) {
        drop[i] = new Drop();
    }
}

function getVideoFaceData() {
    positions = ctracker.getCurrentPosition();
}

function showTracking() {
    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(255, 0, 255);
        ellipse(positions[i][0], positions[i][1], 10, 10);
    }
}

function Drop() {
    this.x = random(0, width);
    this.y = random(0, -height);

    this.show = function () {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, random(1, 5), random(1, 5));
    }
    this.update = function () {
        this.speed = random(5, 10);
        this.gravity = 1.05;
        this.y = this.y + this.speed * this.gravity;

        if (this.y > height) {
            this.y = random(0, -height);
            this.gravity = 0;
        }
    }
}

function showDrop() {
    for (var i = 0; i < 200; i++) {
        drop[i].show();
        drop[i].update();
    }
}

function draw() {
    getVideoFaceData();
    translate(vidcapture.width, 0);
    scale(-1, 1);
    image(vidcapture, 0, 0, width, height);

    if (positions.length > 0) {
        if (dist(positions[60][0], positions[60][1], positions[57][0], positions[57][1]) > 25) {
            image(photo1, positions[32][0] - 12, positions[32][1] - 12, 25, 25);
            image(photo1, positions[27][0] - 12, positions[27][1] - 12, 25, 25);
            image(photo3, positions[33][0] - 150, positions[33][1] - 500, 300, 300);

            fill(0, 0, 0, 10);
            rect(0, 0, width, height);
        } else {
            fill(0, 0, 0, 191);
            rect(0, 0, width, height);
            showDrop();
            image(photo2, positions[33][0] - 150, positions[33][1] - 500, 300, 300);
        }
    }

    //    if (positions) {
    //        positions.forEach(function (pos) {
    //            ellipse(pos[0], pos[1], 3);
    //        })
    //    }
}
