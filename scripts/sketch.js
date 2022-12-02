class PointLorenz {
    sigma;
    ro;
    betta;
  
    x = 0.01; 
    y = 0; 
    z = 0;
    #dx;
    #dy;
    #dz;
    #dt = 0.01;

    constructor(sigma, ro, betta) {
        this.sigma = sigma;
        this.ro = ro;
        this.betta = betta;
    }
    
    updateCords() {
        this.#dx = this.sigma * (this.y - this.x) * this.#dt;
        this.#dy = (this.x * (this.ro - this.z) - this.y) * this.#dt;
        this.#dz = (this.x * this.y - this.betta * this.z) * this.#dt;       
        
        this.x += this.#dx; 
        this.y += this.#dy;
        this.z += this.#dz; 

        return createVector(this.x, this.y, this.z);
    };
}

let points = [];

let sigma = 10;
let ro = 28;
let betta = 8 /3;

let r, g, b = 255;

let pointC;

let camX, camY, camZ;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pointC = new PointLorenz(sigma, ro, betta); 
    camZ = 200;
}

function draw() {
    background(0);
    rectMode(CENTER);
    strokeWeight(.5);

    points.push(pointC.updateCords());

    camX = map(mouseX, 0, windowWidth, -200, 200)
    camY = map(mouseY, 0, windowHeight, -200, 200)
    if (keyIsPressed && key == "w") camZ -= 10;
    if (keyIsPressed && key == "s") camZ += 10;
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
    
    noFill();
    beginShape();
    for (let p of points) {
        r = map(p.x, 0, 255, 0, windowWidth);
        g = map(p.y, 0, 255, 0, windowHeight); 
        stroke(r, g, b);
        vertex(p.x, p.y, p.z);
    }  
    endShape();

}