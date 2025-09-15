import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNodes = () => {
      const nodes: Node[] = [];
      const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
      
      nodesRef.current = nodes;
    };

    const drawNode = (node: Node, ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00A859';
      ctx.shadowColor = '#00A859';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawConnection = (node1: Node, node2: Node, ctx: CanvasRenderingContext2D, distance: number) => {
      const opacity = Math.max(0, 1 - distance / 150);
      ctx.beginPath();
      ctx.moveTo(node1.x, node1.y);
      ctx.lineTo(node2.x, node2.y);
      ctx.strokeStyle = `rgba(0, 168, 89, ${opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const updateNodes = () => {
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y <= 0 || node.y >= canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateNodes();

      // Draw connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            drawConnection(nodesRef.current[i], nodesRef.current[j], ctx, distance);
          }
        }
      }

      // Draw nodes
      nodesRef.current.forEach(node => drawNode(node, ctx));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createNodes();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default NeuralBackground;