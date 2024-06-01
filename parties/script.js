(() => {
    
    const config = {
        minRadius: 5,
        maxRadius: 15,
        sphereRad: 300,
        bigRadius: 25,
        mouseSize: 100,
        massFactor: 0.002,
        defcolor: `rgba(250, 10, 30, 0.9)`,
        smooth: 0.85, //friction to reduce speed
    }

    const TWO_PI = Math.PI * 2;

    const canvas = this.document.querySelector(`canvas`);
    const ctx = canvas.getContext(`2d`);
    let w, h, mouse, dots;

    class Dot {
        constructor(rad) {
            this.pos = {x: mouse.x, y: mouse.y}; //position
            this.vel = {x: 0, y: 0}; //velocity
            this.radius = rad || random(config.minRadius, config.maxRadius);
            this.mass = this.radius * config.massFactor;
            this.color = config.defcolor;
        }

        draw(x, y) {
            this.pos.x = x ? x : this.pos.x + this.vel.x;
            this.pos.y = y ? y : this.pos.y + this.vel.y;

            createCircle(this.pos.x, this.pos.y, this.radius, true, this.color);
            createCircle(this.pos.x, this.pos.y, this.radius, false, config.defcolor);
        }
    }

    function updateDots() {
        for (let i = 1; i < dots.length; i++) {
            let acc = { x: 0, y: 0}; //acceleration
            for (let j = 0; j < dots.length; j++) {
                if (i == j) continue;
                let [a, b] = [dots[i], dots[j]];

                let delta = {x: b.pos.x - a.pos.x, y: b.pos.y - a.pos.y};
                //расстояние от т.а до т.в по теореме Пифагора
                let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1;
            
                let force = (dist - config.sphereRad) / dist * b.mass;

                if (j == 0) {
                    const alpha = config.mouseSize / dist;
                    a.color = `rgba(250, 10, 30, ${alpha})`;

                    dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass : a.mass;
                }

                acc.x+= delta.x * force;
                acc.y+= delta.y * force;
            }

            dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass;
            dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass;
        }

        dots.map(e => {
            e == dots[0] ? e.draw(mouse.x, mouse.y) : e.draw()
        });
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

        dots.push(new Dot(config.bigRadius));
    }

    function loop() {
        ctx.clearRect(0, 0, w, h);
        //add new dot
        if (mouse.down) {
            dots.push(new Dot());
        }

        updateDots();
        
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