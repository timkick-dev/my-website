
// Simple AI-style particle background + small form handler
document.addEventListener('DOMContentLoaded', () => {
  // Create a lightweight canvas particle system
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles;
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; initParticles(); }
  window.addEventListener('resize', resize);

  function initParticles(){
    particles = [];
    const count = Math.round(Math.min(120, Math.max(40, (w*h)/80000)));
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.8+0.2,
        vx: (Math.random()-0.5)*0.4,
        vy: (Math.random()-0.5)*0.4,
        hue: 180 + Math.random()*120
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0) p.x = w;
      if(p.x> w) p.x = 0;
      if(p.y<0) p.y = h;
      if(p.y> h) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = 'hsla('+Math.floor(p.hue)+',80%,65%,0.06)';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  resize();
  step();
});

// form handler (no backend): shows a thank you message
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const name = form.name.value || '';
  alert('Danke, ' + (name ? name + ', ' : '') + 'Ihre Anfrage wurde lokal erfasst. (Dies ist ein Demo‑Formular.)');
  form.reset();
}
