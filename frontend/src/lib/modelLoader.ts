import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ModelDimensions {
	size: THREE.Vector3;
	center: THREE.Vector3;
}
interface ModelSetup {
	controls: OrbitControls;
	animate: () => void;
}
export const setupModel = (
	scene: THREE.Scene,
	camera: THREE.Camera,
	renderer: THREE.WebGLRenderer,
	onModelLoad?: () => void,
): ModelSetup => {
	const loader = new GLTFLoader();
	let controls: OrbitControls;

	loader.load(
		'/body.glb',
		(gltf) => {
			const model = gltf.scene;
			setupClickableAreas(model);
			const { size, center } = centerModel(model, scene);
			setupRenderer(renderer, size);
			setupCamera(camera, size);
			controls = setupControls(camera, renderer, size);
			setupEventListeners(renderer, model, camera);

			if (onModelLoad) onModelLoad();
		},
		undefined,
		console.error,
	);

	const animate = () => {
		if (controls) {
			controls.update();
		}
		renderer.render(scene, camera);
	};

	return { controls, animate };
};

const setupClickableAreas = (model: THREE.Group) => {
	model.traverse((child) => {
		if ((child as THREE.Mesh).isMesh && child.name.includes('hamstring')) {
			child.userData.clickable = true;
			child.userData.route = '/muscles/hamstring';
		}
	});
};

const centerModel = (model: THREE.Group, scene: THREE.Scene): ModelDimensions => {
	const box = new THREE.Box3().setFromObject(model);
	const size = box.getSize(new THREE.Vector3());
	const center = box.getCenter(new THREE.Vector3());

	model.position.set(-center.x, -center.y, -center.z);
	scene.add(model);

	return { size, center };
};

const setupRenderer = (renderer: THREE.WebGLRenderer, size: THREE.Vector3) => {
	const aspectRatio = size.x / size.y;
	const desiredHeight = window.innerHeight / 2;
	const desiredWidth = desiredHeight * aspectRatio;
	renderer.setSize(desiredWidth, desiredHeight, false);
};

const setupCamera = (camera: THREE.Camera, size: THREE.Vector3) => {
	if (camera instanceof THREE.PerspectiveCamera) {
		const maxDim = Math.max(size.x, size.y, size.z);
		camera.position.z = maxDim * 1;
		camera.lookAt(0, size.y / 2, 0);

		const aspectRatio = size.x / size.y;
		const desiredHeight = window.innerHeight / 2;
		const desiredWidth = desiredHeight * aspectRatio;
		camera.aspect = desiredWidth / desiredHeight;
		camera.updateProjectionMatrix();
	}
};

const setupControls = (
	camera: THREE.Camera,
	renderer: THREE.WebGLRenderer,
	size: THREE.Vector3,
): OrbitControls => {
	const controls = new OrbitControls(camera, renderer.domElement);
	const maxDim = Math.max(size.x, size.y, size.z);

	controls.target.set(0, size.y / 6, 0);
	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI / 2;
	controls.minDistance = maxDim * 0.3;
	controls.maxDistance = maxDim;

	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.5;

	controls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: null,
	};

	controls.update();
	return controls;
};

const setupEventListeners = (
	renderer: THREE.WebGLRenderer,
	model: THREE.Group,
	camera: THREE.Camera,
) => {
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	renderer.domElement.addEventListener('click', (event) => {
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(model.children, true);

		if (intersects.length > 0) {
			const clickedObject = intersects[0].object;
			if (clickedObject.userData.clickable) {
				window.location.href = clickedObject.userData.route;
			}
		}
	});

	renderer.domElement.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		return false;
	});

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = '50%';
	renderer.domElement.style.left = '50%';
	renderer.domElement.style.transform = 'translate(-50%, -50%)';
};
