(() => {
    
    const config = {
        minRadius: 5,
        maxRadius: 15,
        massFactor: 0.002,
        defcolor: `rgba(250, 10, 30, 0.9)`,
    }

    const TWO_PI = Math.PI * 2;

    const canvas = this.document.querySelector(`canvas`);
    const ctx = canvas.getContext(`2d`);
    let w, h, mouse, dots;

    class Dot {
        constructor() {
            this.position = {x: mouse.x, y: mouse.y};
            this.speed = {x: 0, y: 0};
            this.radius = random(config.minRadius, config.maxRadius);
            this.mass = this.radius * config.massFactor;
            this.color = config.defcolor;
        }

        draw() {
            createCircle(this.position.x, this.position.y, this.radius, true, this.color);
            createCircle(this.position.x, this.position.y, this.radius, false, config.defcolor);
        }
    }

    function updateDots() {
        
    }

    function createCircle(x, y, radius, fill, color) {
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TWO_PI);
        ctx.closePath();

        fill ? ctx.fill() : ctx.stroke();
    }

    function init() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;

        mouse = { x: w / 2, y: h / 2, down: false };

        dots = []; // array for all dots 
    }

    function loop() {
        ctx.clearRect(0, 0, w, h);
        //add new dot
        if (mouse.down) {
            dots.push(new Dot());
        }
        dots.map(dot => dot.draw());
        window.requestAnimationFrame(loop);
    }

    init();
    loop();

    function setPosition({layerX, layerY}) {
        [mouse.x, mouse.y] = [layerX, layerY];
    }

    function isDown() {
        mouse.down = !mouse.down;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    canvas.addEventListener('mousemove', setPosition);
    window.addEventListener('mousedown', isDown);
    window.addEventListener('mouseup', isDown)
})();