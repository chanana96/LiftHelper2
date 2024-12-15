import { useRef, useEffect } from 'react';
import { useThreeScene } from 'hooks/useThreeScene';
import { setupModel } from 'lib/modelLoader';
import { cleanup } from 'utils/threeCleanup';

export const ModelViewer = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { initScene } = useThreeScene();

	useEffect(() => {
		if (!containerRef.current) return;

		const { scene, camera, renderer } = initScene();
		const { controls, animate } = setupModel(scene, camera, renderer);
		containerRef.current.appendChild(renderer.domElement);

		renderer.setAnimationLoop(animate);

		return () => cleanup(scene, renderer, controls);
	}, []);

	return <div ref={containerRef} className='relative w-full h-[600px]' />;
};
