'use client';

import * as React from 'react';

export interface DotGridSpotlightProps {
  className?: string;
  spacing?: number;
  baseRadius?: number;
  activeRadius?: number;
  interactionRadius?: number;
}

export function DotGridSpotlight({
  className = '',
  spacing = 12,
  baseRadius = 0.7,
  activeRadius = 1.7,
  interactionRadius = 150,
}: DotGridSpotlightProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !parent || !context) return;

    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let frame: number | null = null;
    let dotColor = '';
    let activeDotColor = '';

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      dotColor = styles.getPropertyValue('--dot-color').trim();
      activeDotColor = styles.getPropertyValue('--dot-active-color').trim();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;
      for (let x = offsetX; x <= width; x += spacing) {
        for (let y = offsetY; y <= height; y += spacing) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const factor = pointer.active ? Math.max(0, 1 - distance / interactionRadius) : 0;
          context.globalAlpha = 0.58 + factor * 0.42;
          context.beginPath();
          context.arc(x, y, baseRadius + (activeRadius - baseRadius) * factor, 0, Math.PI * 2);
          context.fillStyle = factor > 0 ? activeDotColor : dotColor;
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const requestDraw = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        draw();
        frame = null;
      });
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      readColors();
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      requestDraw();
    };
    const onPointerLeave = () => {
      pointer.active = false;
      requestDraw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      readColors();
      requestDraw();
    });
    resizeObserver.observe(parent);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    resize();

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [activeRadius, baseRadius, interactionRadius, spacing]);

  return <canvas ref={canvasRef} aria-hidden className={`dot-grid-spotlight ${className}`} />;
}