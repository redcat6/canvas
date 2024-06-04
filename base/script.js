(() => {
    const canvas = this.document.querySelector(`canvas`);
    const ctx = canvas.getContext(`2d`);
    /* let w, h;*/
    w = canvas.width = 400; //innerWidth;
    h = canvas.height = 300; //innerHeight;
    ctx.fillStyle = 'rgba(250, 10, 30, 0.9)';
    ctx.fillRect(100, 50, 150, 75);

    ctx.fillStyle = 'rgba(10, 50, 250, 0.9)';
    ctx.fillRect(150, 100, 150, 75);

    ctx.strokeStyle = 'rgba(50, 250, 250, 1)';
    ctx.lineWidth = "3";
    ctx.rect(200, 150, 150, 75);
    ctx.stroke();

}) (); 
