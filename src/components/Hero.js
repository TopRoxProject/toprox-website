import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? 'rgba(0,212,200,' : 'rgba(0,168,159,',
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,200,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-glow red" />
      <div className="hero-glow blue" />

      <div className="hero-content">
        <div className="hero-badge">Consultanță Business, GIS si IT · România</div>
        <h1 className="hero-title">
          Soluții IT<br />
          <span className="hero-title-accent">inteligente</span><br />
          pentru afacerea ta
        </h1>
        <p className="hero-sub">
          De la conformitate GDPR,<br className="hide-mobile" />
          până la cursuri de GIS, PM; Negociere.
        </p>
        <div className="hero-actions">
          <a href="#services" className="btn-primary">Descoperă serviciile</a>
          <a href="#contact" className="btn-ghost">Vorbim?</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">#1</span>
            <span className="stat-label">EXPERTIZA GIS IN ROMANIA /<br />CERTIFICARE INTERNATIONALA GISP</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">Top5%</span>
            <span className="stat-label">Planuri Strategice</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">28+</span>
            <span className="stat-label">Ani experiență</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
