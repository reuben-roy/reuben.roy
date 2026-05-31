'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './HeroBackground3D.module.css';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export default function HeroBackground3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (reducedMotion || isMobile || !supportsWebGL()) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.12,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const accentGeometry = new THREE.BufferGeometry();
    const accentPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      accentPositions[i * 3] = positions[i * 3] * 0.85;
      accentPositions[i * 3 + 1] = positions[i * 3 + 1] * 0.85;
      accentPositions[i * 3 + 2] = positions[i * 3 + 2] * 0.85;
    }
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));

    const accentMaterial = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const accentParticles = new THREE.Points(accentGeometry, accentMaterial);
    scene.add(accentParticles);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;
    let frameId = null;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', resize);
    resize();

    const positionAttr = geometry.getAttribute('position');

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isVisible || !isTabVisible) return;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      camera.position.x = mouseX * 1.5;
      camera.position.y = -mouseY * 1;
      camera.lookAt(0, 0, 0);

      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(positions[i * 3]) > 30) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1;
      }

      positionAttr.needsUpdate = true;
      particles.rotation.y += 0.0004;
      accentParticles.rotation.y -= 0.00025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      geometry.dispose();
      accentGeometry.dispose();
      material.dispose();
      accentMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.canvas} aria-hidden="true" />;
}
