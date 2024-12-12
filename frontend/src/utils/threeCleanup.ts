import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const cleanup = (
  scene: THREE.Scene, 
  renderer: THREE.WebGLRenderer, 
  controls?: OrbitControls
) => {
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      if (object.material instanceof THREE.Material) {
        object.material.dispose();
      } else if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      }
    }
  });

  renderer.dispose();
  renderer.domElement.remove();
  renderer.setAnimationLoop(null);
  
  if (controls) {
    controls.dispose();
  }
};