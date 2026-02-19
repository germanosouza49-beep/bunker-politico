(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;
    let particles = [];
    let packets = [];
    let mouse = { x: -1000, y: -1000 };

    const colors = ['#8B2FC9', '#A855F7', '#9333EA', '#6B21A8'];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        packets = [];
        const num = Math.min(80, Math.floor((w * h) / 15000));
        for (let i = 0; i < num; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseAlpha: Math.random() * 0.5 + 0.3,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                connections: []
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Update and draw particles & connections
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            p.phase += p.speed;
            let alpha = p.baseAlpha + Math.sin(p.phase) * 0.2;
            if (alpha < 0.1) alpha = 0.1;

            // Calculate mouse interaction
            let dxM = mouse.x - p.x;
            let dyM = mouse.y - p.y;
            let distM = Math.sqrt(dxM * dxM + dyM * dyM);

            let currentR = p.r;
            if (distM < 250) {
                currentR = p.r + (p.r * 1.5) * (1 - distM / 250);
            }

            // Draw glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentR * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.floor(alpha * 0.08 * 255).toString(16).padStart(2, '0');
            ctx.fill();

            // Draw core
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Connections
            p.connections = [];
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    p.connections.push(p2);
                    p2.connections.push(p);
                    let lineAlpha = alpha * (1 - dist / 200);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(107, 33, 168, ${lineAlpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse connection
            if (distM < 150) {
                let mAlpha = alpha * 0.3 * (1 - distM / 150);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(139, 47, 201, ${mAlpha})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
            }

            // Randomly spawn data packet
            if (Math.random() < 0.03 && p.connections.length > 0 && packets.length < 20) {
                let target = p.connections[Math.floor(Math.random() * p.connections.length)];
                packets.push({
                    x: p.x, y: p.y,
                    startX: p.x, startY: p.y,
                    endX: target.x, endY: target.y,
                    progress: 0,
                    speed: Math.random() * 0.005 + 0.005,
                    target: target
                });
            }
        }

        // Draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            let pk = packets[i];
            // Update target pos since it moves
            pk.endX = pk.target.x;
            pk.endY = pk.target.y;

            pk.progress += pk.speed;
            if (pk.progress >= 1) {
                packets.splice(i, 1);
                continue;
            }

            pk.x = pk.startX + (pk.endX - pk.startX) * pk.progress;
            pk.y = pk.startY + (pk.endY - pk.startY) * pk.progress;

            let pAlpha = Math.sin(pk.progress * Math.PI);

            ctx.beginPath();
            ctx.arc(pk.x, pk.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${pAlpha})`;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Also move glow div
        const glowDiv = document.getElementById('bnkr-mouse-glow');
        if (glowDiv) {
            glowDiv.style.top = e.clientY + 'px';
            glowDiv.style.left = e.clientX + 'px';
        }
    });
    window.addEventListener('mouseout', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    resize();
    requestAnimationFrame(draw);
})();
