import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import diffuse from '../img/moon.png';
import bump from '../img/moon_normals.png';

const ThreeScene = () => {
    const sceneRef = useRef(null);
    const modelRef = useRef(null);
    const cameraRef = useRef(null);
    const sceneRef3D = useRef(null);
    const rendererRef = useRef(null);
    const lightRef = useRef(null);

    useEffect(() => {
        const init = () => {
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 1.5;
            camera.position.y = 0.4;
            cameraRef.current = camera;

            const scene = new THREE.Scene();
            sceneRef3D.current = scene;

            const light = new THREE.PointLight(0xfff2d2, 50);
            scene.add(light);
            lightRef.current = light;
            
            const textureLoader = new THREE.TextureLoader();

            const texture = textureLoader.load(diffuse);
            const normalMap = textureLoader.load(bump);

            const material = new THREE.MeshStandardMaterial({
                map: texture,
                normalMap: normalMap,
                roughness: 0.8,
                metalness: 0.1,
            });

            const geometry = new THREE.SphereGeometry(1, 128, 128);
            const model = new THREE.Mesh(geometry, material);
            scene.add(model);
            modelRef.current = model;

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio * 2);
            rendererRef.current = renderer;

            if (sceneRef.current) {
                sceneRef.current.appendChild(renderer.domElement);
            }

            window.addEventListener('resize', handleResize);
            document.addEventListener('mousemove', onMouseMove);

            animate();
        };

        const handleResize = () => {
            if (rendererRef.current && cameraRef.current) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                rendererRef.current.setSize(width, height);
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }
        };

        const animate = () => {
            if (!rendererRef.current || !sceneRef3D.current || !cameraRef.current) return;

            requestAnimationFrame(animate);

            if (modelRef.current) {
                modelRef.current.rotation.y += 0.0001; 
                modelRef.current.rotation.x += 0.0001; 
            }

            rendererRef.current.render(sceneRef3D.current, cameraRef.current);
        };

        const onMouseMove = (event) => {
            if (!modelRef.current || !cameraRef.current || !lightRef.current) return;
        
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(cameraRef.current);
        
            const dir = vector.sub(cameraRef.current.position).normalize();
            const distance = -cameraRef.current.position.z / dir.z;
        
            const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));
            const center = new THREE.Vector3(0, 0, 0);
        
            const z = 4 - Math.abs(mouseX * 2);
        
            const sphereIntersection = center.clone().add(pos.sub(center).normalize().multiplyScalar(z));
        
            lightRef.current.position.copy(sphereIntersection);
        };

        init();

        return () => {
            if (rendererRef.current) {
                document.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('resize', handleResize);

                if (sceneRef.current) {
                    sceneRef.current.removeChild(rendererRef.current.domElement);
                }

                rendererRef.current.dispose();

                if (modelRef.current) {
                    modelRef.current.geometry.dispose();
                    modelRef.current.material.dispose();
                }
            }
        };
    }, []);

    return (
        <div ref={sceneRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />
    );
};

export default ThreeScene;