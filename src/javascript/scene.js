import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import diffuse from '../img/moon.png';
import bump from '../img/moon_normals.png';

const ThreeScene = () => {
    const sceneRef = useRef(null);
    let model, camera, scene, renderer, light, composer;

    useEffect(() => {
        const init = () => {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 1.5;
            camera.position.y = 0.4;

            scene = new THREE.Scene();

            light = new THREE.PointLight(0xfff2d2, 50);
            scene.add(light);
            
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
            model = new THREE.Mesh(geometry, material);
            scene.add(model);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio * 2);
            sceneRef.current.appendChild(renderer.domElement);

            window.addEventListener('resize', handleResize);
            handleResize();

            document.addEventListener('mousemove', onMouseMove);

            animate();
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        const animate = () => {
            requestAnimationFrame(animate);

            if (model) {
                model.rotation.y += 0.0001; 
                model.rotation.x += 0.0001; 
            }

            if (renderer) {
                renderer.render(scene, camera);
            }
        };
        const onMouseMove = (event) => {
            if (!model) return;
        
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
        
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
        
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));
            const center = new THREE.Vector3(0, 0, 0);
        
            const z = 4 - Math.abs(mouseX * 2);
        
            const sphereIntersection = center.clone().add(pos.sub(center).normalize().multiplyScalar(z));
        
            light.position.copy(sphereIntersection);
        };

        init();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            sceneRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={sceneRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }} />
    );
};

export default ThreeScene;
