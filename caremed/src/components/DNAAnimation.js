
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DNAAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!window.WebGLRenderingContext) {
            console.error('WebGL is not supported on your browser.');
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        const blue = 0xFFFFFF;
        const yellow = 0xFFFFFF;

        camera.position.z = 50;

        const tubeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 6, 32);
        const blueMaterial = new THREE.MeshBasicMaterial({ color: blue });
        const yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });

        const dna = new THREE.Object3D();
        const holder = new THREE.Object3D();

        for (let i = 0; i <= 33; i++) {
            const blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
            blueTube.rotation.z = 90 * Math.PI / 180;
            blueTube.position.x = -2;

            const yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
            yellowTube.rotation.z = 90 * Math.PI / 180;
            yellowTube.position.x = 3;

            const row = new THREE.Object3D();
            row.add(blueTube);
            row.add(yellowTube);

            row.position.y = i * 2;
            row.rotation.y = 10 * i * Math.PI / 180;

            dna.add(row);
        }

        dna.position.y = -40;
        dna.position.x = 20;
        dna.rotation.x = 0; // Поворот ДНК вокруг оси x (в градусах)
        dna.rotation.y = 0; // Поворот ДНК вокруг оси y (в радианах)
        dna.rotation.z = 45 * Math.PI / 180; // Поворот ДНК вокруг оси z (в градусах)
        scene.add(dna);

        holder.add(dna);
        holder.position.x = 15;
        scene.add(holder);

        const render = () => {
            requestAnimationFrame(render);
            holder.rotation.y += 0.02; // Вращение вокруг оси y
            renderer.render(scene, camera);
        };

        render();

        // Обработчик изменения размера окна
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Очистка при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return <div ref={canvasRef} />;
};

export default DNAAnimation;
