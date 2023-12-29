// ThreeContainer.js
import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeContainer = () => {
    useEffect(() => {
        // 创建场景、相机和渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
    
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
    
        // 获取容器元素
        const container = document.getElementById('three-container');
        
        // 检查容器是否存在
        if (container) {
          container.appendChild(renderer.domElement);
        }
    
        // 创建一个立方体
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
    
        // 渲染循环
        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
    
        animate();
    
        // 清理函数
        return () => {
          if (container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      }, []);
    

  return <div id="three-container" className="absolute top-0 left-0 w-full h-full"></div>;
};

export default ThreeContainer;
