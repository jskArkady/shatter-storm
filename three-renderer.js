(() => {
'use strict';

const THREE_NS = globalThis.THREE;
if (!THREE_NS) return;
const ShatterLogic = globalThis.ShatterLogic || {};
const { isBrickDepthMeshEnabled = () => true } = ShatterLogic;

const {
    AdditiveBlending,
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    Color,
    CircleGeometry,
    Group,
    InstancedMesh,
    Line,
    LineBasicMaterial,
    LineLoop,
    LineSegments,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    OrthographicCamera,
    PlaneGeometry,
    Points,
    PointsMaterial,
    Scene,
    Sprite,
    SpriteMaterial,
    WebGLRenderer,
} = THREE_NS;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rand = (min, max) => Math.random() * (max - min) + min;

function createLineMaterial(color, opacity = 0.22) {
    return new LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: AdditiveBlending,
        depthWrite: false,
    });
}

function createPointsMaterial(color, size, opacity = 0.45) {
    return new PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        blending: AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: false,
    });
}

function circleLine(radius, segments, material) {
    const positions = [];
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    return new LineLoop(geometry, material);
}

function lineStrip(material, count) {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
    return new Line(geometry, material);
}

function pointsCloud(material, count) {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
    return new Points(geometry, material);
}

function setPoint(geometry, index, x, y, z = 0) {
    const array = geometry.attributes.position.array;
    const offset = index * 3;
    array[offset] = x;
    array[offset + 1] = y;
    array[offset + 2] = z;
}

function createSoftDisc(color, radius, opacity) {
    return new Mesh(
        new CircleGeometry(radius, 48),
        new MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            blending: AdditiveBlending,
            depthWrite: false,
        }),
    );
}

function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new CanvasTexture(canvas);
}

function traceRoundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
}

function createRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(64, 64, 26, 64, 64, 62);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.52, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.68, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.82, 'rgba(255,255,255,0.22)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return new CanvasTexture(canvas);
}

function createBrickFlashTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 128, 64);
    context.fillStyle = 'rgba(255,255,255,0.94)';
    context.shadowColor = 'rgba(255,255,255,1)';
    context.shadowBlur = 18;
    traceRoundedRect(context, 12, 10, 104, 44, 12);
    context.fill();
    context.shadowBlur = 0;
    return new CanvasTexture(canvas);
}

function createSlashTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 32, 256, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.16, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.84, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.strokeStyle = gradient;
    context.lineWidth = 14;
    context.lineCap = 'round';
    context.shadowColor = 'rgba(255,255,255,0.9)';
    context.shadowBlur = 18;
    context.beginPath();
    context.moveTo(18, 44);
    context.lineTo(238, 20);
    context.stroke();
    context.shadowBlur = 0;
    return new CanvasTexture(canvas);
}

function createGameplayBrickTexture(style) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 48;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 128, 48);

    if (style === 'wireframe') {
        context.strokeStyle = 'rgba(255,255,255,0.98)';
        context.lineWidth = 2.5;
        traceRoundedRect(context, 3, 2.5, 122, 43, 4);
        context.stroke();
        context.strokeStyle = 'rgba(255,255,255,0.8)';
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(8, 24);
        context.lineTo(120, 24);
        context.stroke();
        return new CanvasTexture(canvas);
    }

    const fill = context.createLinearGradient(0, 4, 0, 44);
    fill.addColorStop(0, 'rgba(255,255,255,0.96)');
    fill.addColorStop(0.42, 'rgba(255,255,255,0.82)');
    fill.addColorStop(1, 'rgba(255,255,255,0.56)');
    context.fillStyle = fill;
    traceRoundedRect(context, 2, 2, 124, 44, 5);
    context.fill();

    context.strokeStyle = 'rgba(255,255,255,0.24)';
    context.lineWidth = 1.5;
    traceRoundedRect(context, 2.5, 2.5, 123, 43, 4.5);
    context.stroke();

    switch (style) {
        case 'wetGlass':
            context.fillStyle = 'rgba(255,255,255,0.18)';
            context.fillRect(7, 6, 16, 36);
            break;
        case 'forgedMetal':
            context.fillStyle = 'rgba(255,255,255,0.2)';
            context.fillRect(6, 5, 116, 3);
            context.fillStyle = 'rgba(0,0,0,0.22)';
            context.fillRect(6, 40, 116, 3);
            break;
        case 'lacquerTile':
            context.fillStyle = 'rgba(255,255,255,0.12)';
            context.fillRect(8, 6, 52, 3);
            break;
        case 'chargedPanel':
            context.strokeStyle = 'rgba(255,255,255,0.34)';
            context.lineWidth = 1.5;
            context.beginPath();
            context.moveTo(8, 39);
            context.lineTo(120, 8);
            context.stroke();
            break;
        case 'toyBlock':
            context.fillStyle = 'rgba(255,255,255,0.24)';
            context.fillRect(8, 6, 112, 4);
            context.fillStyle = 'rgba(0,0,0,0.12)';
            context.fillRect(10, 37, 108, 3);
            break;
        case 'bioShell':
            context.strokeStyle = 'rgba(255,255,255,0.24)';
            context.lineWidth = 1.4;
            context.beginPath();
            context.moveTo(8, 28);
            context.bezierCurveTo(40, 2, 86, 44, 120, 18);
            context.stroke();
            break;
        case 'monolithSlab':
            context.fillStyle = 'rgba(255,255,255,0.14)';
            context.fillRect(7, 6, 114, 3);
            context.fillStyle = 'rgba(0,0,0,0.26)';
            context.fillRect(7, 38, 114, 3);
            context.strokeStyle = 'rgba(255,255,255,0.16)';
            context.lineWidth = 1.2;
            traceRoundedRect(context, 2.5, 2.5, 123, 43, 3);
            context.stroke();
            break;
        default:
            context.fillStyle = 'rgba(255,255,255,0.18)';
            context.fillRect(8, 6, 112, 3);
            break;
    }

    return new CanvasTexture(canvas);
}

function buildNeonScene(width, height) {
    const group = new Group();
    const grid = new LineSegments(new BufferGeometry(), createLineMaterial('#00eeff', 0.18));
    const positions = [];
    for (let x = -width / 2; x <= width / 2; x += 42) {
        positions.push(x, -height / 2, -40, x, height / 2, -40);
    }
    for (let y = -height / 2; y <= height / 2; y += 42) {
        positions.push(-width / 2, y, -40, width / 2, y, -40);
    }
    grid.geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    group.add(grid);

    const stars = pointsCloud(createPointsMaterial('#ff33cc', 3.2, 0.32), 90);
    const starMeta = [];
    for (let i = 0; i < 90; i++) {
        const x = rand(-width / 2, width / 2);
        const y = rand(-height / 2, height / 2);
        setPoint(stars.geometry, i, x, y, -80);
        starMeta.push({ x, y, drift: rand(6, 18), phase: rand(0, Math.PI * 2) });
    }
    group.add(stars);

    return {
        group,
        setPalette(palette) {
            grid.material.color.set(palette.accent);
            stars.material.color.set(palette.text2);
        },
        update(time) {
            grid.rotation.z = Math.sin(time * 0.12) * 0.03;
            grid.position.y = Math.sin(time * 0.55) * 8;
            const array = stars.geometry.attributes.position.array;
            for (let i = 0; i < starMeta.length; i++) {
                const meta = starMeta[i];
                array[i * 3 + 1] = meta.y + Math.sin(time * 0.9 + meta.phase) * meta.drift;
            }
            stars.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildForgeScene(width, height) {
    const group = new Group();
    const bars = [];
    for (let i = 0; i < 6; i++) {
        const bar = new Mesh(
            new PlaneGeometry(150, height * 0.92),
            new MeshBasicMaterial({
                color: '#ff8b3d',
                transparent: true,
                opacity: 0.08,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        bar.position.x = -width * 0.42 + i * (width / 5);
        group.add(bar);
        bars.push(bar);
    }

    const heatLines = [];
    for (let i = 0; i < 7; i++) {
        const line = lineStrip(createLineMaterial('#ffcf6b', 0.16), 40);
        group.add(line);
        heatLines.push({ line, band: i });
    }

    return {
        group,
        setPalette(palette) {
            for (const bar of bars) bar.material.color.set(palette.accent);
            for (const entry of heatLines) entry.line.material.color.set(palette.text3);
        },
        update(time) {
            bars.forEach((bar, index) => {
                bar.scale.x = 0.95 + Math.sin(time * 0.8 + index) * 0.12;
                bar.position.y = Math.sin(time * 0.6 + index * 0.4) * 12;
            });
            for (const entry of heatLines) {
                for (let i = 0; i < 40; i++) {
                    const x = -width / 2 + i * (width / 39);
                    const baseY = -height * 0.42 + entry.band * 85;
                    const y = baseY + Math.sin(time * 2 + i * 0.3 + entry.band * 0.6) * 7;
                    setPoint(entry.line.geometry, i, x, y, -20);
                }
                entry.line.geometry.attributes.position.needsUpdate = true;
            }
        },
    };
}

function buildShrineScene(width, height) {
    const group = new Group();
    const discs = [
        createSoftDisc('#ffb3c7', 230, 0.08),
        createSoftDisc('#f2d0ff', 190, 0.06),
        createSoftDisc('#ff8fa8', 280, 0.05),
    ];
    discs[0].position.set(-width * 0.18, height * 0.16, -30);
    discs[1].position.set(width * 0.24, height * 0.1, -30);
    discs[2].position.set(0, -height * 0.2, -40);
    discs.forEach(disc => group.add(disc));

    const petals = pointsCloud(createPointsMaterial('#ffb3c7', 5.4, 0.34), 54);
    const petalMeta = [];
    for (let i = 0; i < 54; i++) {
        petalMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            drift: rand(12, 30),
            speed: rand(16, 34),
            phase: rand(0, Math.PI * 2),
        });
    }
    group.add(petals);

    return {
        group,
        setPalette(palette) {
            discs[0].material.color.set(palette.text2);
            discs[1].material.color.set(palette.text3);
            discs[2].material.color.set(palette.accent);
            petals.material.color.set(palette.text2);
        },
        update(time) {
            discs[0].scale.setScalar(1 + Math.sin(time * 0.45) * 0.04);
            discs[1].scale.setScalar(1 + Math.sin(time * 0.4 + 1.4) * 0.05);
            discs[2].scale.setScalar(1 + Math.sin(time * 0.35 + 2.1) * 0.03);

            for (let i = 0; i < petalMeta.length; i++) {
                const petal = petalMeta[i];
                const y = ((petal.y - time * petal.speed + height / 2) % height) - height / 2;
                const x = petal.x + Math.sin(time * 0.9 + petal.phase) * petal.drift;
                setPoint(petals.geometry, i, x, y, -12);
            }
            petals.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildStormScene(width, height) {
    const group = new Group();
    const rain = new LineSegments(new BufferGeometry(), createLineMaterial('#6bb3ff', 0.22));
    const rainCount = 80;
    const rainArray = new Float32Array(rainCount * 6);
    const rainMeta = [];
    for (let i = 0; i < rainCount; i++) {
        rainMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            speed: rand(240, 420),
            length: rand(18, 36),
        });
    }
    rain.geometry.setAttribute('position', new BufferAttribute(rainArray, 3));
    group.add(rain);

    const lightning = lineStrip(createLineMaterial('#ffffff', 0.55), 9);
    group.add(lightning);

    const stormGlow = createSoftDisc('#5ea1ff', 220, 0.05);
    stormGlow.position.set(width * 0.22, height * 0.18, -40);
    group.add(stormGlow);

    return {
        group,
        setPalette(palette) {
            rain.material.color.set(palette.accent);
            lightning.material.color.set('#ffffff');
            stormGlow.material.color.set(palette.accent);
        },
        update(time) {
            const rainPositions = rain.geometry.attributes.position.array;
            for (let i = 0; i < rainMeta.length; i++) {
                const drop = rainMeta[i];
                const y = ((drop.y - time * drop.speed + height / 2) % height) - height / 2;
                const base = i * 6;
                rainPositions[base] = drop.x;
                rainPositions[base + 1] = y;
                rainPositions[base + 2] = -15;
                rainPositions[base + 3] = drop.x + 16;
                rainPositions[base + 4] = y - drop.length;
                rainPositions[base + 5] = -15;
            }
            rain.geometry.attributes.position.needsUpdate = true;

            const flash = Math.max(0, Math.sin(time * 2.4) - 0.78);
            const lightningPositions = lightning.geometry.attributes.position.array;
            const originX = width * (Math.sin(time * 0.27) * 0.14);
            for (let i = 0; i < 9; i++) {
                const y = height / 2 - i * 90;
                const x = originX + Math.sin(time * 5 + i * 0.9) * (18 + i * 4);
                lightningPositions[i * 3] = x;
                lightningPositions[i * 3 + 1] = y;
                lightningPositions[i * 3 + 2] = -5;
            }
            lightning.geometry.attributes.position.needsUpdate = true;
            lightning.material.opacity = flash > 0.02 ? clamp(flash * 2.2, 0, 0.85) : 0;
            stormGlow.material.opacity = 0.04 + flash * 0.16;
            stormGlow.scale.setScalar(1 + flash * 0.24);
        },
    };
}

function buildAuroraPopScene(width, height) {
    const group = new Group();
    const sun = createSoftDisc('#ffec75', 180, 0.14);
    sun.position.set(width * 0.32, height * 0.18, -96);
    group.add(sun);

    const ribbons = [];
    for (let i = 0; i < 4; i++) {
        const line = lineStrip(createLineMaterial('#ffffff', 0.2), 22);
        group.add(line);
        ribbons.push({ line, lane: i });
    }

    const balloons = [];
    for (let i = 0; i < 5; i++) {
        const glow = createSoftDisc('#ffd7ec', 54 + (i % 2) * 12, 0.12);
        glow.position.set(-width * 0.34 + i * 160, height * 0.06 + (i % 3) * 42, -28 - i * 8);
        group.add(glow);
        const string = lineStrip(createLineMaterial('#fffaf5', 0.18), 8);
        group.add(string);
        balloons.push({ glow, string, lane: i });
    }

    const confetti = pointsCloud(createPointsMaterial('#fffaf5', 5.4, 0.32), 72);
    const confettiMeta = [];
    for (let i = 0; i < 72; i++) {
        confettiMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            speed: rand(8, 18),
            sway: rand(8, 24),
            phase: rand(0, Math.PI * 2),
        });
    }
    group.add(confetti);

    return {
        group,
        setPalette(palette) {
            sun.material.color.set(palette.accent);
            ribbons.forEach((entry, index) => entry.line.material.color.set(index % 2 === 0 ? palette.text2 : palette.text3));
            balloons.forEach((entry, index) => entry.glow.material.color.set(index % 3 === 0 ? palette.text2 : index % 3 === 1 ? palette.text3 : palette.accent));
            balloons.forEach(entry => entry.string.material.color.set(palette.text1));
            confetti.material.color.set(palette.text1);
        },
        update(time, snapshot) {
            const pulse = snapshot?.depthPulse ?? 0;
            sun.scale.setScalar(1 + pulse * 0.18 + Math.sin(time * 0.6) * 0.03);
            ribbons.forEach(entry => {
                const baseY = -height * 0.08 + entry.lane * 70;
                for (let i = 0; i < 22; i++) {
                    const x = -width / 2 + i * (width / 21);
                    const y = baseY + Math.sin(time * 1.4 + i * 0.34 + entry.lane) * (18 + entry.lane * 2);
                    setPoint(entry.line.geometry, i, x, y, -42);
                }
                entry.line.geometry.attributes.position.needsUpdate = true;
            });
            balloons.forEach(entry => {
                entry.glow.position.y += Math.sin(time * 1 + entry.lane) * 0.45;
                const gx = entry.glow.position.x;
                const gy = entry.glow.position.y;
                for (let i = 0; i < 8; i++) {
                    const t = i / 7;
                    setPoint(
                        entry.string.geometry,
                        i,
                        gx + Math.sin(time * 1.6 + t * 5 + entry.lane) * 6,
                        gy - 42 - t * 76,
                        -26,
                    );
                }
                entry.string.geometry.attributes.position.needsUpdate = true;
            });
            for (let i = 0; i < confettiMeta.length; i++) {
                const mote = confettiMeta[i];
                const y = ((mote.y + time * mote.speed + height / 2) % height) - height / 2;
                setPoint(
                    confetti.geometry,
                    i,
                    mote.x + Math.sin(time * 0.8 + mote.phase) * mote.sway,
                    y,
                    -10,
                );
            }
            confetti.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildPrismLagoonScene(width, height) {
    const group = new Group();
    const sun = createSoftDisc('#8ef3ff', 210, 0.12);
    sun.position.set(width * 0.28, height * 0.2, -104);
    group.add(sun);

    const water = new Mesh(
        new PlaneGeometry(width * 1.05, height * 0.56),
        new MeshBasicMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.08,
            blending: AdditiveBlending,
            depthWrite: false,
        }),
    );
    water.position.set(0, -height * 0.22, -54);
    group.add(water);

    const ripples = [];
    for (let i = 0; i < 5; i++) {
        const line = lineStrip(createLineMaterial('#8ef3ff', 0.18), 30);
        group.add(line);
        ripples.push({ line, lane: i });
    }

    const prisms = [];
    for (let i = 0; i < 4; i++) {
        const prism = new Mesh(
            new BoxGeometry(38 + i * 12, 180 + (i % 2) * 34, 24),
            new MeshBasicMaterial({
                color: '#ffffff',
                transparent: true,
                opacity: 0.12,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        prism.position.set(-width * 0.32 + i * 190, height * 0.02 + (i % 3) * 24, -22 - i * 6);
        prism.rotation.z = i % 2 === 0 ? -0.14 : 0.14;
        group.add(prism);
        prisms.push(prism);
    }

    const motes = pointsCloud(createPointsMaterial('#f7fffe', 4.8, 0.26), 58);
    const motesMeta = [];
    for (let i = 0; i < 58; i++) {
        motesMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            speed: rand(6, 16),
            sway: rand(4, 14),
            phase: rand(0, Math.PI * 2),
        });
    }
    group.add(motes);

    return {
        group,
        setPalette(palette) {
            sun.material.color.set(palette.accent);
            water.material.color.set(palette.text1);
            ripples.forEach((entry, index) => entry.line.material.color.set(index % 2 === 0 ? palette.accent : palette.text3));
            prisms.forEach((prism, index) => prism.material.color.set(index % 2 === 0 ? palette.text2 : palette.text1));
            motes.material.color.set(palette.text1);
        },
        update(time, snapshot) {
            const pulse = snapshot?.depthPulse ?? 0;
            sun.scale.setScalar(1 + pulse * 0.2 + Math.sin(time * 0.8) * 0.025);
            water.scale.x = 1 + pulse * 0.24;
            water.scale.y = 1 + Math.sin(time * 1.1) * 0.04;
            ripples.forEach(entry => {
                const baseY = -height * 0.18 + entry.lane * 62;
                for (let i = 0; i < 30; i++) {
                    const x = -width / 2 + i * (width / 29);
                    const y = baseY + Math.sin(time * 1.3 + i * 0.26 + entry.lane) * 14;
                    setPoint(entry.line.geometry, i, x, y, -30);
                }
                entry.line.geometry.attributes.position.needsUpdate = true;
            });
            prisms.forEach((prism, index) => {
                prism.position.y = height * 0.02 + (index % 3) * 24 + Math.sin(time * 0.6 + index) * 8;
                prism.rotation.z += (index % 2 === 0 ? -1 : 1) * 0.0012;
            });
            for (let i = 0; i < motesMeta.length; i++) {
                const mote = motesMeta[i];
                const y = ((mote.y - time * mote.speed + height / 2) % height) - height / 2;
                setPoint(
                    motes.geometry,
                    i,
                    mote.x + Math.cos(time * 0.9 + mote.phase) * mote.sway,
                    y,
                    -8,
                );
            }
            motes.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildDioramaScene(width, height) {
    const group = new Group();
    const wall = new Mesh(
        new PlaneGeometry(width * 0.8, height * 0.62),
        new MeshBasicMaterial({
            color: '#fff5d9',
            transparent: true,
            opacity: 0.1,
            blending: AdditiveBlending,
            depthWrite: false,
        }),
    );
    wall.position.set(0, height * 0.04, -110);
    group.add(wall);

    const floor = new Mesh(
        new PlaneGeometry(width * 0.92, height * 0.52),
        new MeshBasicMaterial({
            color: '#ffcf66',
            transparent: true,
            opacity: 0.1,
            blending: AdditiveBlending,
            depthWrite: false,
        }),
    );
    floor.position.set(0, -height * 0.24, -40);
    floor.rotation.x = -1.08;
    group.add(floor);

    const sidePanels = [-1, 1].map(sign => {
        const panel = new Mesh(
            new PlaneGeometry(width * 0.18, height * 0.6),
            new MeshBasicMaterial({
                color: '#fff1c2',
                transparent: true,
                opacity: 0.08,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        panel.position.set(sign * width * 0.34, -height * 0.02, -78);
        panel.rotation.y = sign * 0.72;
        group.add(panel);
        return panel;
    });

    const props = [];
    const propPalette = ['#ffcf66', '#8fe6ff', '#ff8d67'];
    for (let i = 0; i < 7; i++) {
        const prop = new Mesh(
            new BoxGeometry(46 + (i % 3) * 16, 32 + (i % 2) * 14, 22),
            new MeshBasicMaterial({
                color: propPalette[i % propPalette.length],
                transparent: true,
                opacity: 0.16,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        prop.position.set(-width * 0.28 + i * 92, -height * 0.28 + (i % 2) * 10, -12 - (i % 3) * 8);
        prop.rotation.x = -0.24;
        prop.rotation.y = (i % 2 === 0 ? -1 : 1) * 0.18;
        group.add(prop);
        props.push(prop);
    }

    const dust = pointsCloud(createPointsMaterial('#fff5d9', 4.4, 0.28), 56);
    const dustMeta = [];
    for (let i = 0; i < 56; i++) {
        dustMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            phase: rand(0, Math.PI * 2),
            drift: rand(6, 16),
        });
    }
    group.add(dust);

    return {
        group,
        setPalette(palette) {
            wall.material.color.set(palette.text1);
            floor.material.color.set(palette.accent);
            sidePanels[0].material.color.set(palette.text2);
            sidePanels[1].material.color.set(palette.text3);
            props.forEach((prop, index) => prop.material.color.set(index % 2 === 0 ? palette.text2 : palette.text3));
            dust.material.color.set(palette.text1);
        },
        update(time, snapshot) {
            const pulse = snapshot?.depthPulse ?? 0;
            wall.scale.setScalar(1 + pulse * 0.24);
            floor.scale.x = 1 + pulse * 0.34;
            floor.scale.y = 1 + pulse * 0.18;
            group.rotation.z = Math.sin(time * 0.18) * 0.012;
            props.forEach((prop, index) => {
                prop.position.y = -height * 0.28 + (index % 2) * 10 + Math.sin(time * 0.9 + index) * 6;
                prop.rotation.y += Math.sin(time * 0.35 + index) * 0.0008;
            });
            for (let i = 0; i < dustMeta.length; i++) {
                const mote = dustMeta[i];
                setPoint(
                    dust.geometry,
                    i,
                    mote.x + Math.cos(time * 0.7 + mote.phase) * mote.drift,
                    mote.y + Math.sin(time * 0.8 + mote.phase) * mote.drift * 0.5,
                    -22,
                );
            }
            dust.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildBiomechScene(width, height) {
    const group = new Group();
    const membranes = [
        createSoftDisc('#6cffba', 220, 0.08),
        createSoftDisc('#83ffc8', 170, 0.06),
        createSoftDisc('#b4ffd8', 260, 0.05),
    ];
    membranes[0].position.set(-width * 0.18, height * 0.08, -60);
    membranes[1].position.set(width * 0.14, -height * 0.02, -42);
    membranes[2].position.set(width * 0.24, -height * 0.22, -70);
    membranes.forEach(membrane => group.add(membrane));

    const rings = [];
    [90, 150, 220].forEach((radius, index) => {
        const ring = circleLine(radius, 84, createLineMaterial('#83ffc8', 0.22));
        ring.scale.set(1.2 - index * 0.12, 0.74 + index * 0.08, 1);
        ring.rotation.z = index * 0.38;
        group.add(ring);
        rings.push(ring);
    });

    const tendrils = [];
    for (let i = 0; i < 4; i++) {
        const line = lineStrip(createLineMaterial('#b4ffd8', 0.18), 28);
        group.add(line);
        tendrils.push({ line, lane: i });
    }

    const spores = pointsCloud(createPointsMaterial('#6cffba', 5.6, 0.3), 62);
    const sporeMeta = [];
    for (let i = 0; i < 62; i++) {
        sporeMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            speed: rand(10, 24),
            sway: rand(6, 18),
            phase: rand(0, Math.PI * 2),
        });
    }
    group.add(spores);

    return {
        group,
        setPalette(palette) {
            membranes[0].material.color.set(palette.accent);
            membranes[1].material.color.set(palette.text2);
            membranes[2].material.color.set(palette.text3);
            rings.forEach((ring, index) => ring.material.color.set(index === 1 ? palette.text3 : palette.accent));
            tendrils.forEach((entry, index) => entry.line.material.color.set(index % 2 === 0 ? palette.text2 : palette.text3));
            spores.material.color.set(palette.accent);
        },
        update(time, snapshot) {
            const pulse = 1 + Math.sin(time * 1.8) * 0.04 + (snapshot?.depthPulse ?? 0) * 0.22;
            membranes[0].scale.setScalar(pulse);
            membranes[1].scale.setScalar(1 + Math.sin(time * 1.4 + 0.8) * 0.05 + (snapshot?.depthPulse ?? 0) * 0.18);
            membranes[2].scale.setScalar(1 + Math.sin(time * 1.2 + 1.7) * 0.06 + (snapshot?.depthPulse ?? 0) * 0.2);
            rings.forEach((ring, index) => {
                ring.rotation.z += 0.0024 + index * 0.0008;
            });
            tendrils.forEach(entry => {
                for (let i = 0; i < 28; i++) {
                    const x = -width / 2 + i * (width / 27);
                    const baseY = -height * 0.24 + entry.lane * 120;
                    const y = baseY + Math.sin(time * 1.5 + i * 0.28 + entry.lane) * 26;
                    setPoint(entry.line.geometry, i, x, y, -18);
                }
                entry.line.geometry.attributes.position.needsUpdate = true;
            });
            for (let i = 0; i < sporeMeta.length; i++) {
                const mote = sporeMeta[i];
                const y = ((mote.y + time * mote.speed + height / 2) % height) - height / 2;
                setPoint(
                    spores.geometry,
                    i,
                    mote.x + Math.sin(time * 0.9 + mote.phase) * mote.sway,
                    y,
                    -8,
                );
            }
            spores.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function buildMonolithScene(width, height) {
    const group = new Group();
    const floor = new Mesh(
        new PlaneGeometry(width * 0.96, height * 0.72),
        new MeshBasicMaterial({
            color: '#d9d1c2',
            transparent: true,
            opacity: 0.08,
            blending: AdditiveBlending,
            depthWrite: false,
        }),
    );
    floor.position.set(0, -height * 0.22, -46);
    floor.rotation.x = -1.18;
    group.add(floor);

    const slabs = [];
    for (let i = 0; i < 5; i++) {
        const slab = new Mesh(
            new BoxGeometry(70 + i * 12, 320 + i * 24, 34),
            new MeshBasicMaterial({
                color: '#d9d1c2',
                transparent: true,
                opacity: 0.11,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        slab.position.set(-width * 0.32 + i * 160, -height * 0.04 + (i % 2) * 22, -30 - i * 6);
        slab.rotation.x = -0.1;
        slab.rotation.y = (i % 2 === 0 ? -1 : 1) * 0.14;
        group.add(slab);
        slabs.push(slab);
    }

    const rails = [];
    for (let i = 0; i < 7; i++) {
        const line = lineStrip(createLineMaterial('#d9d1c2', 0.12), 2);
        group.add(line);
        rails.push({ line, lane: i });
    }

    const dust = pointsCloud(createPointsMaterial('#f2eee6', 3.6, 0.24), 46);
    const dustMeta = [];
    for (let i = 0; i < 46; i++) {
        dustMeta.push({
            x: rand(-width / 2, width / 2),
            y: rand(-height / 2, height / 2),
            speed: rand(12, 24),
        });
    }
    group.add(dust);

    return {
        group,
        setPalette(palette) {
            floor.material.color.set(palette.text2);
            slabs.forEach((slab, index) => slab.material.color.set(index % 2 === 0 ? palette.text2 : palette.text3));
            rails.forEach((entry, index) => entry.line.material.color.set(index % 2 === 0 ? palette.text3 : palette.accent));
            dust.material.color.set(palette.text1);
        },
        update(time, snapshot) {
            const pulse = snapshot?.depthPulse ?? 0;
            floor.scale.x = 1 + pulse * 0.28;
            floor.scale.y = 1 + pulse * 0.18;
            slabs.forEach((slab, index) => {
                slab.position.y = -height * 0.04 + (index % 2) * 22 + Math.sin(time * 0.38 + index) * 5;
                slab.scale.y = 1 + pulse * (0.12 + index * 0.01);
            });
            rails.forEach(entry => {
                const startX = -width / 2 + entry.lane * (width / 6);
                setPoint(entry.line.geometry, 0, startX, -height / 2, -16);
                setPoint(entry.line.geometry, 1, startX * 0.18, 0, -68);
                entry.line.geometry.attributes.position.needsUpdate = true;
            });
            for (let i = 0; i < dustMeta.length; i++) {
                const mote = dustMeta[i];
                const y = ((mote.y - time * mote.speed + height / 2) % height) - height / 2;
                setPoint(dust.geometry, i, mote.x, y, -6);
            }
            dust.geometry.attributes.position.needsUpdate = true;
        },
    };
}

function getBackgroundThemeProfile(themeKey) {
    switch (themeKey) {
        case 'auroraPop':
            return { pulseScale: 0.05, shakeScale: 0.38 };
        case 'prismLagoon':
            return { pulseScale: 0.06, shakeScale: 0.4 };
        case 'diorama':
            return { pulseScale: 0.08, shakeScale: 0.55 };
        case 'biomech':
            return { pulseScale: 0.07, shakeScale: 0.5 };
        case 'monolith':
            return { pulseScale: 0.09, shakeScale: 0.42 };
        default:
            return { pulseScale: 0.03, shakeScale: 0.45 };
    }
}

function getGameplayThemeProfile(themeKey) {
    switch (themeKey) {
        case 'diorama':
            return { depthX: 7, depthY: 9, depthScale: 1.08, depthOpacity: 0.3, depthTint: 0.42, pulseScale: 0.05, lightBoost: 0.18 };
        case 'biomech':
            return { depthX: 6, depthY: 7, depthScale: 1.12, depthOpacity: 0.28, depthTint: 0.36, pulseScale: 0.045, lightBoost: 0.14 };
        case 'monolith':
            return { depthX: 10, depthY: 14, depthScale: 1.16, depthOpacity: 0.38, depthTint: 0.28, pulseScale: 0.065, lightBoost: 0.08 };
        default:
            return { depthX: 4, depthY: 5, depthScale: 1.04, depthOpacity: 0.16, depthTint: 0.34, pulseScale: 0.02, lightBoost: 0 };
    }
}

class ShatterThreeBackgroundRenderer {
    constructor({ canvas, width, height }) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.ready = false;
        this.maxParticles = 500;
        this.maxTrails = 200;
        this.maxTrailPoints = 12;
        this.maxImpactBursts = 96;

        if (!canvas) return;

        try {
            this.renderer = new WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            canvas.style.display = 'none';
            return;
        }

        this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.5));
        this.renderer.setSize(width, height, false);
        this.renderer.setClearColor(0x000000, 0);

        this.scene = new Scene();
        this.camera = new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1200);
        this.camera.position.set(0, 0, 500);
        this.stageRoot = new Group();
        this.scene.add(this.stageRoot);
        this.themeScenes = {
            neon: buildNeonScene(width, height),
            forge: buildForgeScene(width, height),
            shrine: buildShrineScene(width, height),
            storm: buildStormScene(width, height),
            auroraPop: buildAuroraPopScene(width, height),
            prismLagoon: buildPrismLagoonScene(width, height),
            diorama: buildDioramaScene(width, height),
            biomech: buildBiomechScene(width, height),
            monolith: buildMonolithScene(width, height),
        };

        for (const handler of Object.values(this.themeScenes)) {
            handler.group.visible = false;
            this.stageRoot.add(handler.group);
        }

        this.flashPlane = new Mesh(
            new PlaneGeometry(width, height),
            new MeshBasicMaterial({
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        this.flashPlane.position.z = 260;
        this.stageRoot.add(this.flashPlane);

        this.effectsRoot = new Group();
        this.stageRoot.add(this.effectsRoot);

        this.particleTexture = createParticleTexture();
        this.ringTexture = createRingTexture();
        this.particleSprites = Array.from({ length: this.maxParticles }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.particleTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 120;
            this.effectsRoot.add(sprite);
            return sprite;
        });

        this.trailLines = Array.from({ length: this.maxTrails }, () => {
            const geometry = new BufferGeometry();
            geometry.setAttribute(
                'position',
                new BufferAttribute(new Float32Array(this.maxTrailPoints * 3), 3),
            );
            geometry.setDrawRange(0, 0);
            const line = new Line(geometry, createLineMaterial('#ffffff', 0.24));
            line.visible = false;
            line.position.z = 90;
            this.effectsRoot.add(line);
            return line;
        });

        this.impactSprites = Array.from({ length: this.maxImpactBursts }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.ringTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 110;
            this.effectsRoot.add(sprite);
            return sprite;
        });

        this.activeThemeKey = null;
        this.ready = true;
    }

    isReady() {
        return this.ready;
    }

    updateTheme(themeKey, palette) {
        if (themeKey === this.activeThemeKey) return;
        this.activeThemeKey = themeKey;
        for (const [key, handler] of Object.entries(this.themeScenes)) {
            handler.group.visible = key === themeKey;
        }
        const handler = this.themeScenes[themeKey];
        if (handler) handler.setPalette(palette);
    }

    toSceneX(x) {
        return x - this.width / 2;
    }

    toSceneY(y) {
        return this.height / 2 - y;
    }

    updateParticles(snapshot) {
        if (!snapshot.useThreeEffects) {
            for (const sprite of this.particleSprites) sprite.visible = false;
            return;
        }

        const styleScale = {
            chip: [1.4, 0.62],
            bubble: [1.2, 1.2],
            ember: [1.05, 1.05],
            petal: [1.45, 0.82],
            shard: [1.3, 0.92],
            confetti: [1.5, 0.5],
            spore: [1.4, 1.4],
            dustShard: [1.8, 0.42],
            spark: [1.0, 1.0],
        };
        const [sx, sy] = styleScale[snapshot.particleStyle] || styleScale.spark;
        const activeCount = Math.min(snapshot.particles.length, this.particleSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const particle = snapshot.particles[i];
            const sprite = this.particleSprites[i];
            const baseScale = particle.size * (2.6 + particle.life * 1.8);
            sprite.visible = true;
            sprite.position.x = this.toSceneX(particle.x);
            sprite.position.y = this.toSceneY(particle.y);
            sprite.material.color.set(particle.color);
            sprite.material.opacity = clamp(particle.life * 0.92, 0, 0.95);
            sprite.material.rotation = snapshot.time * 0.7 + i * 0.17;
            sprite.scale.set(baseScale * sx, baseScale * sy, 1);
        }

        for (let i = activeCount; i < this.particleSprites.length; i++) {
            this.particleSprites[i].visible = false;
        }
    }

    updateTrails(snapshot) {
        if (!snapshot.useThreeEffects) {
            for (const trailLine of this.trailLines) trailLine.visible = false;
            return;
        }

        const trailOpacity = {
            vector: 0.28,
            bubbleWake: 0.2,
            ember: 0.22,
            inkRibbon: 0.28,
            arc: 0.34,
            ribbonArc: 0.3,
            tendon: 0.24,
            slabEcho: 0.18,
            plasma: 0.26,
        };
        const trailColor = snapshot.effectFlags.megaBall
            ? snapshot.themeColors.megaBall
            : snapshot.effectFlags.fireBall
                ? snapshot.themeColors.fireBall
                : snapshot.themeColors.ballGlow;
        const opacity = trailOpacity[snapshot.trailStyle] ?? 0.26;
        const activeCount = Math.min(snapshot.balls.length, this.trailLines.length);

        for (let i = 0; i < activeCount; i++) {
            const ball = snapshot.balls[i];
            const trailLine = this.trailLines[i];
            const trail = ball.trail || [];
            const pointCount = Math.min(trail.length, this.maxTrailPoints);
            if (pointCount < 2) {
                trailLine.visible = false;
                continue;
            }

            const positions = trailLine.geometry.attributes.position.array;
            trailLine.visible = true;
            trailLine.material.color.set(trailColor);
            trailLine.material.opacity = opacity;
            trailLine.material.transparent = true;

            for (let j = 0; j < pointCount; j++) {
                const point = trail[trail.length - pointCount + j];
                positions[j * 3] = this.toSceneX(point.x);
                positions[j * 3 + 1] = this.toSceneY(point.y);
                positions[j * 3 + 2] = 0;
            }
            trailLine.geometry.setDrawRange(0, pointCount);
            trailLine.geometry.attributes.position.needsUpdate = true;
        }

        for (let i = activeCount; i < this.trailLines.length; i++) {
            this.trailLines[i].visible = false;
        }
    }

    updateImpactBursts(snapshot) {
        if (!snapshot.useThreeEffects) {
            for (const sprite of this.impactSprites) sprite.visible = false;
            return;
        }

        const activeCount = Math.min(snapshot.impactBursts.length, this.impactSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const burst = snapshot.impactBursts[i];
            const sprite = this.impactSprites[i];
            const progress = 1 - burst.life;
            const diameter = burst.baseRadius * (1.6 + progress * 2.8) * 2;
            sprite.visible = true;
            sprite.position.x = this.toSceneX(burst.x);
            sprite.position.y = this.toSceneY(burst.y);
            sprite.material.color.set(burst.color);
            sprite.material.opacity = clamp(burst.life * 0.72, 0, 0.82);
            sprite.scale.set(diameter, diameter, 1);
        }

        for (let i = activeCount; i < this.impactSprites.length; i++) {
            this.impactSprites[i].visible = false;
        }
    }

    updateEffects(snapshot) {
        this.updateParticles(snapshot);
        this.updateTrails(snapshot);
        this.updateImpactBursts(snapshot);
    }

    render(snapshot) {
        if (!this.ready || !snapshot) return;
        this.updateTheme(snapshot.themeKey, snapshot.palette);

        const handler = this.themeScenes[snapshot.themeKey];
        const profile = getBackgroundThemeProfile(snapshot.themeKey);
        if (handler) handler.update(snapshot.time, snapshot);
        this.updateEffects(snapshot);

        this.flashPlane.material.opacity = clamp(snapshot.flashAlpha * 0.35, 0, 0.28);
        this.stageRoot.position.x = snapshot.backgroundShakeX ?? (snapshot.shakeX * profile.shakeScale);
        this.stageRoot.position.y = snapshot.backgroundShakeY !== undefined
            ? -snapshot.backgroundShakeY
            : -snapshot.shakeY * profile.shakeScale;
        this.stageRoot.scale.setScalar(1 + (snapshot.depthPulse ?? 0) * profile.pulseScale);

        this.renderer.render(this.scene, this.camera);
    }
}

class ShatterThreeGameplayRenderer {
    constructor({ canvas, width, height }) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.ready = false;
        this.maxBricks = 1600;
        this.maxBalls = 220;
        this.activeBrickStyle = null;
        this.activeThemeKey = null;
        this.dummy = new Object3D();
        this.instanceColor = new Color('#ffffff');
        this.depthColor = new Color('#000000');
        this.brickTextureCache = {};

        if (!canvas) return;

        try {
            this.renderer = new WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            canvas.style.display = 'none';
            return;
        }

        this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.5));
        this.renderer.setSize(width, height, false);
        this.renderer.setClearColor(0x000000, 0);

        this.scene = new Scene();
        this.camera = new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1200);
        this.camera.position.set(0, 0, 500);
        this.gameplayRoot = new Group();
        this.scene.add(this.gameplayRoot);

        this.brickMaterial = new MeshBasicMaterial({
            map: createGameplayBrickTexture('glass'),
            transparent: true,
            depthWrite: false,
        });
        this.brickDepthMaterial = new MeshBasicMaterial({
            map: createGameplayBrickTexture('glass'),
            transparent: true,
            opacity: 0.16,
            depthWrite: false,
        });
        this.glowTexture = createParticleTexture();
        this.brickDepthMesh = new InstancedMesh(new PlaneGeometry(1, 1), this.brickDepthMaterial, this.maxBricks);
        this.brickDepthMesh.count = 0;
        this.gameplayRoot.add(this.brickDepthMesh);
        this.brickMesh = new InstancedMesh(new PlaneGeometry(1, 1), this.brickMaterial, this.maxBricks);
        this.brickMesh.count = 0;
        this.gameplayRoot.add(this.brickMesh);

        this.brickLightSprites = Array.from({ length: this.maxBricks }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.glowTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 22;
            this.gameplayRoot.add(sprite);
            return sprite;
        });

        this.ballGlowSprites = Array.from({ length: this.maxBalls }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.glowTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 42;
            this.gameplayRoot.add(sprite);
            return sprite;
        });

        this.ballCoreSprites = Array.from({ length: this.maxBalls }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.glowTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 48;
            this.gameplayRoot.add(sprite);
            return sprite;
        });

        this.ready = true;
    }

    isReady() {
        return this.ready;
    }

    toSceneX(x) {
        return x - this.width / 2;
    }

    toSceneY(y) {
        return this.height / 2 - y;
    }

    updateTheme(brickStyle) {
        if (brickStyle === this.activeBrickStyle) return;
        this.activeBrickStyle = brickStyle;
        if (!this.brickTextureCache[brickStyle]) {
            this.brickTextureCache[brickStyle] = createGameplayBrickTexture(brickStyle);
        }
        this.brickMaterial.map = this.brickTextureCache[brickStyle];
        this.brickDepthMaterial.map = this.brickTextureCache[brickStyle];
        this.brickMaterial.needsUpdate = true;
        this.brickDepthMaterial.needsUpdate = true;
    }

    updateBricks(snapshot) {
        const profile = getGameplayThemeProfile(snapshot.themeKey);
        const useDepthMesh = isBrickDepthMeshEnabled(snapshot.themeKey);
        const activeCount = Math.min(snapshot.brickBodies.length, this.maxBricks);
        this.brickDepthMaterial.opacity = useDepthMesh
            ? profile.depthOpacity + (snapshot.depthPulse ?? 0) * 0.22
            : 0;

        for (let i = 0; i < activeCount; i++) {
            const brick = snapshot.brickBodies[i];
            this.dummy.position.set(
                this.toSceneX(brick.x + brick.width / 2),
                this.toSceneY(brick.y + brick.height / 2),
                32,
            );
            this.dummy.scale.set(brick.width, brick.height, 1);
            this.dummy.updateMatrix();
            this.brickMesh.setMatrixAt(i, this.dummy.matrix);
            this.brickMesh.setColorAt(i, this.instanceColor.set(brick.color));

            if (useDepthMesh) {
                this.dummy.position.set(
                    this.toSceneX(brick.x + brick.width / 2) + profile.depthX,
                    this.toSceneY(brick.y + brick.height / 2) - profile.depthY,
                    22,
                );
                this.dummy.scale.set(brick.width * profile.depthScale, brick.height * profile.depthScale, 1);
                this.dummy.updateMatrix();
                this.brickDepthMesh.setMatrixAt(i, this.dummy.matrix);
                this.brickDepthMesh.setColorAt(i, this.depthColor.set(brick.color).multiplyScalar(profile.depthTint));
            }
        }

        this.brickDepthMesh.count = useDepthMesh ? activeCount : 0;
        if (useDepthMesh) {
            this.brickDepthMesh.instanceMatrix.needsUpdate = true;
            if (this.brickDepthMesh.instanceColor) this.brickDepthMesh.instanceColor.needsUpdate = true;
        }
        this.brickMesh.count = activeCount;
        this.brickMesh.instanceMatrix.needsUpdate = true;
        if (this.brickMesh.instanceColor) this.brickMesh.instanceColor.needsUpdate = true;

        for (let i = 0; i < activeCount; i++) {
            const brick = snapshot.brickBodies[i];
            const light = this.brickLightSprites[i];
            light.visible = true;
            light.position.x = this.toSceneX(brick.x + brick.width / 2);
            light.position.y = this.toSceneY(brick.y + brick.height / 2);
            light.material.color.set(brick.color);
            light.material.opacity = brick.lightAlpha;
            light.scale.set(
                brick.width * (brick.lightScale + profile.lightBoost),
                brick.height * (brick.lightScale + 0.65 + profile.lightBoost),
                1,
            );
        }

        for (let i = activeCount; i < this.brickLightSprites.length; i++) {
            this.brickLightSprites[i].visible = false;
        }
    }

    updateBalls(snapshot) {
        const activeCount = Math.min(snapshot.ballBodies.length, this.maxBalls);

        for (let i = 0; i < activeCount; i++) {
            const ball = snapshot.ballBodies[i];
            const glow = this.ballGlowSprites[i];
            const core = this.ballCoreSprites[i];
            const showGlow = ball.glowAlpha > 0.001;

            glow.visible = showGlow;
            glow.position.x = this.toSceneX(ball.x);
            glow.position.y = this.toSceneY(ball.y);
            glow.material.color.set(ball.color);
            glow.material.opacity = ball.glowAlpha;
            glow.scale.set(ball.radius * 5.2, ball.radius * 5.2, 1);

            core.visible = true;
            core.position.x = this.toSceneX(ball.x);
            core.position.y = this.toSceneY(ball.y);
            core.material.color.set(ball.color);
            core.material.opacity = ball.coreAlpha ?? 0.96;
            core.scale.set(ball.radius * (ball.coreScale ?? 2.25), ball.radius * (ball.coreScale ?? 2.25), 1);
        }

        for (let i = activeCount; i < this.ballGlowSprites.length; i++) {
            this.ballGlowSprites[i].visible = false;
            this.ballCoreSprites[i].visible = false;
        }
    }

    render(snapshot) {
        if (!this.ready || !snapshot) return;
        const profile = getGameplayThemeProfile(snapshot.themeKey);
        this.updateTheme(snapshot.brickStyle || 'glass');
        this.gameplayRoot.position.x = snapshot.useThreeGameplay ? (snapshot.gameplayShakeX ?? 0) : 0;
        this.gameplayRoot.position.y = snapshot.useThreeGameplay ? -(snapshot.gameplayShakeY ?? 0) : 0;
        this.gameplayRoot.scale.setScalar(snapshot.useThreeGameplay ? 1 + (snapshot.depthPulse ?? 0) * profile.pulseScale : 1);
        if (snapshot.useThreeGameplay) {
            this.updateBricks(snapshot);
            this.updateBalls(snapshot);
        } else {
            this.brickDepthMesh.count = 0;
            this.brickMesh.count = 0;
            for (const light of this.brickLightSprites) light.visible = false;
            for (const glow of this.ballGlowSprites) glow.visible = false;
            for (const core of this.ballCoreSprites) core.visible = false;
        }
        this.renderer.render(this.scene, this.camera);
    }
}

class ShatterThreeOverlayRenderer {
    constructor({ canvas, width, height }) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.ready = false;
        this.maxBrickFlashes = 160;
        this.maxItemGlows = 48;
        this.maxBulletGlows = 24;
        this.maxImpactSlices = 120;

        if (!canvas) return;

        try {
            this.renderer = new WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            canvas.style.display = 'none';
            return;
        }

        this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.5));
        this.renderer.setSize(width, height, false);
        this.renderer.setClearColor(0x000000, 0);

        this.scene = new Scene();
        this.camera = new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1200);
        this.camera.position.set(0, 0, 500);
        this.overlayRoot = new Group();
        this.scene.add(this.overlayRoot);

        this.flashPlane = new Mesh(
            new PlaneGeometry(width, height),
            new MeshBasicMaterial({
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }),
        );
        this.flashPlane.position.z = 220;
        this.overlayRoot.add(this.flashPlane);

        this.brickFlashTexture = createBrickFlashTexture();
        this.haloTexture = createParticleTexture();
        this.slashTexture = createSlashTexture();
        this.brickFlashSprites = Array.from({ length: this.maxBrickFlashes }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.brickFlashTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 140;
            this.overlayRoot.add(sprite);
            return sprite;
        });

        this.impactSliceSprites = Array.from({ length: this.maxImpactSlices }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.slashTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 146;
            this.overlayRoot.add(sprite);
            return sprite;
        });

        this.itemGlowSprites = Array.from({ length: this.maxItemGlows }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.haloTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 118;
            this.overlayRoot.add(sprite);
            return sprite;
        });

        this.bulletGlowSprites = Array.from({ length: this.maxBulletGlows }, () => {
            const sprite = new Sprite(new SpriteMaterial({
                map: this.haloTexture,
                color: '#ffffff',
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending,
                depthWrite: false,
            }));
            sprite.visible = false;
            sprite.position.z = 122;
            this.overlayRoot.add(sprite);
            return sprite;
        });

        this.comboPulseSprite = new Sprite(new SpriteMaterial({
            map: this.haloTexture,
            color: '#ffffff',
            transparent: true,
            opacity: 0,
            blending: AdditiveBlending,
            depthWrite: false,
        }));
        this.comboPulseSprite.visible = false;
        this.comboPulseSprite.position.z = 132;
        this.overlayRoot.add(this.comboPulseSprite);

        this.paddleAuraSprite = new Sprite(new SpriteMaterial({
            map: this.haloTexture,
            color: '#ffffff',
            transparent: true,
            opacity: 0,
            blending: AdditiveBlending,
            depthWrite: false,
        }));
        this.paddleAuraSprite.visible = false;
        this.paddleAuraSprite.position.z = 126;
        this.overlayRoot.add(this.paddleAuraSprite);

        this.ready = true;
    }

    isReady() {
        return this.ready;
    }

    toSceneX(x) {
        return x - this.width / 2;
    }

    toSceneY(y) {
        return this.height / 2 - y;
    }

    updateBrickFlashes(snapshot) {
        const activeCount = Math.min(snapshot.brickFlashes.length, this.brickFlashSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const flash = snapshot.brickFlashes[i];
            const sprite = this.brickFlashSprites[i];
            sprite.visible = true;
            sprite.position.x = this.toSceneX(flash.x);
            sprite.position.y = this.toSceneY(flash.y);
            sprite.material.opacity = clamp(flash.alpha * 0.95, 0, 0.88);
            sprite.scale.set(flash.width + 14, flash.height + 10, 1);
        }

        for (let i = activeCount; i < this.brickFlashSprites.length; i++) {
            this.brickFlashSprites[i].visible = false;
        }
    }

    updateItemGlows(snapshot) {
        const activeCount = Math.min(snapshot.itemGlows.length, this.itemGlowSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const glow = snapshot.itemGlows[i];
            const sprite = this.itemGlowSprites[i];
            const diameter = glow.radius * 3.1;
            sprite.visible = true;
            sprite.position.x = this.toSceneX(glow.x);
            sprite.position.y = this.toSceneY(glow.y);
            sprite.material.color.set(glow.color);
            sprite.material.opacity = clamp(glow.alpha * 0.92, 0, 0.52);
            sprite.scale.set(diameter, diameter, 1);
        }

        for (let i = activeCount; i < this.itemGlowSprites.length; i++) {
            this.itemGlowSprites[i].visible = false;
        }
    }

    updateImpactSlices(snapshot) {
        const activeCount = Math.min(snapshot.impactSlices.length, this.impactSliceSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const slice = snapshot.impactSlices[i];
            const sprite = this.impactSliceSprites[i];
            sprite.visible = true;
            sprite.position.x = this.toSceneX(slice.x);
            sprite.position.y = this.toSceneY(slice.y);
            sprite.material.color.set(slice.color);
            sprite.material.opacity = clamp(slice.life * 0.86, 0, 0.82);
            sprite.material.rotation = slice.angle;
            sprite.scale.set(
                slice.length,
                slice.thickness * (1.2 + (1 - slice.life) * 0.6),
                1,
            );
        }

        for (let i = activeCount; i < this.impactSliceSprites.length; i++) {
            this.impactSliceSprites[i].visible = false;
        }
    }

    updateBulletGlows(snapshot) {
        const activeCount = Math.min(snapshot.bulletGlows.length, this.bulletGlowSprites.length);

        for (let i = 0; i < activeCount; i++) {
            const glow = snapshot.bulletGlows[i];
            const sprite = this.bulletGlowSprites[i];
            const diameter = glow.radius * 2.8;
            sprite.visible = true;
            sprite.position.x = this.toSceneX(glow.x);
            sprite.position.y = this.toSceneY(glow.y);
            sprite.material.color.set(glow.color);
            sprite.material.opacity = clamp(glow.alpha, 0, 0.46);
            sprite.scale.set(diameter, diameter * 1.4, 1);
        }

        for (let i = activeCount; i < this.bulletGlowSprites.length; i++) {
            this.bulletGlowSprites[i].visible = false;
        }
    }

    updatePaddleAura(snapshot) {
        const aura = snapshot.paddleAura;
        if (!aura) {
            this.paddleAuraSprite.visible = false;
            return;
        }

        this.paddleAuraSprite.visible = true;
        this.paddleAuraSprite.position.x = this.toSceneX(aura.x);
        this.paddleAuraSprite.position.y = this.toSceneY(aura.y);
        this.paddleAuraSprite.material.color.set(aura.color);
        this.paddleAuraSprite.material.opacity = clamp(aura.alpha, 0, 0.42);
        this.paddleAuraSprite.scale.set(aura.width, aura.height * 1.5, 1);
    }

    updateComboPulse(snapshot) {
        const pulse = snapshot.comboPulse;
        if (!pulse) {
            this.comboPulseSprite.visible = false;
            return;
        }

        const width = (84 + pulse.text.length * 11) * pulse.scale;
        const height = 54 * pulse.scale;
        this.comboPulseSprite.visible = true;
        this.comboPulseSprite.position.x = this.toSceneX(pulse.x);
        this.comboPulseSprite.position.y = this.toSceneY(pulse.y);
        this.comboPulseSprite.material.color.set(pulse.color);
        this.comboPulseSprite.material.opacity = clamp(pulse.alpha * 0.42, 0, 0.5);
        this.comboPulseSprite.material.rotation = Math.sin(snapshot.time * 1.8) * 0.05;
        this.comboPulseSprite.scale.set(width, height, 1);
    }

    render(snapshot) {
        if (!this.ready || !snapshot) return;

        this.flashPlane.material.opacity = clamp(snapshot.overlayFlashAlpha * 1.15, 0, 0.42);
        this.overlayRoot.position.x = snapshot.overlayShakeX ?? 0;
        this.overlayRoot.position.y = -(snapshot.overlayShakeY ?? 0);
        this.overlayRoot.scale.setScalar(1 + (snapshot.depthPulse ?? 0) * 0.025);
        this.updateBrickFlashes(snapshot);
        this.updateImpactSlices(snapshot);
        this.updateItemGlows(snapshot);
        this.updateBulletGlows(snapshot);
        this.updatePaddleAura(snapshot);
        this.updateComboPulse(snapshot);

        this.renderer.render(this.scene, this.camera);
    }
}

globalThis.ShatterThreeBackgroundRenderer = ShatterThreeBackgroundRenderer;
globalThis.ShatterThreeGameplayRenderer = ShatterThreeGameplayRenderer;
globalThis.ShatterThreeOverlayRenderer = ShatterThreeOverlayRenderer;
})();
