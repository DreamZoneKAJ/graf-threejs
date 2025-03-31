import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fondo de la escena
scene.background = new THREE.Color(0x121212);

// Crear geometría y materiales para los cubos
const geometries = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshStandardMaterial({ color: 0x8F87F1 }), // Morado claro
    new THREE.MeshStandardMaterial({ color: 0xC68EFD }), // Lila
    new THREE.MeshStandardMaterial({ color: 0xFED2E2 })  // Rosa pastel
];

// Velocidades de rotación: lento, medio y rápido
const rotationSpeeds = [0.01, 0.02, 0.04];

// Crear los cubos
const cubes = materials.map((material, index) => {
    const cube = new THREE.Mesh(geometries, material);
    cube.position.x = (index - 1) * 2; // Distribuir los cubos en el eje X
    cube.rotationSpeed = rotationSpeeds[index]; // Asignar velocidad de rotación
    scene.add(cube);
    return cube;
});

// Agregar luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Posicionar la cámara
camera.position.z = 5;

// Función de animación con rotación y renderizado
function animate() {
    cubes.forEach(cube => {
        cube.rotation.x += cube.rotationSpeed; // Rotación con velocidad diferente
        cube.rotation.y += cube.rotationSpeed;
    });
    renderer.render(scene, camera);
}

// Iniciar la animación
renderer.setAnimationLoop(animate);
