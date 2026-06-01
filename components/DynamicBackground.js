'use client';

import React, { useEffect, useRef } from 'react';

export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const shapes = [];
    const shapeTypes = ['circle', 'square', 'triangle', 'plus', 'asterisk'];
    const colors = ['#018ABE', '#97CADB'];

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class Shape {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 25 + 12;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008;
        this.type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.8;
          this.y -= Math.sin(angle) * force * 1.8;
        }

        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.8;

        ctx.beginPath();
        if (this.type === 'circle') {
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        } else if (this.type === 'square') {
          ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else if (this.type === 'triangle') {
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(this.size / 2, this.size / 2);
          ctx.lineTo(-this.size / 2, this.size / 2);
          ctx.closePath();
        } else if (this.type === 'plus') {
          ctx.moveTo(-this.size / 2, 0);
          ctx.lineTo(this.size / 2, 0);
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(0, this.size / 2);
        } else if (this.type === 'asterisk') {
          ctx.moveTo(-this.size / 2, 0);
          ctx.lineTo(this.size / 2, 0);
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(0, this.size / 2);
          const diag = this.size * 0.35;
          ctx.moveTo(-diag, -diag);
          ctx.lineTo(diag, diag);
          ctx.moveTo(diag, -diag);
          ctx.lineTo(-diag, diag);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    const shapeCount = Math.min(25, Math.floor((width * height) / 45000));
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape());
    }

    const gridSpacing = 48;
    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#97CADB';
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.hypot(dx, dy);
          let dotRadius = 1;

          if (dist < 100) {
            dotRadius = 1 + (100 - dist) * 0.025;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.strokeStyle = 'rgba(1, 138, 190, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dist = Math.hypot(shapes[i].x - shapes[j].x, shapes[i].y - shapes[j].y);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }

      if (mouse.x !== -1000) {
        ctx.strokeStyle = 'rgba(151, 202, 219, 0.25)';
        ctx.lineWidth = 1.2;
        shapes.forEach((shape) => {
          const dist = Math.hypot(mouse.x - shape.x, mouse.y - shape.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(shape.x, shape.y);
            ctx.stroke();
          }
        });
      }

      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="dynamic-bg-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.45,
      }}
    />
  );
}
