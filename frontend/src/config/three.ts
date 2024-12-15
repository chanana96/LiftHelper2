export const three = {
	camera: {
		fov: 75,
		near: 0.1,
		far: 1000,
	},
	controls: {
		minDistance: 0.8,
		maxDistance: 1.2,
		minPolarAngle: Math.PI / 2,
		maxPolarAngle: Math.PI / 2,
	},
	lights: {
		ambient: {
			color: 0xffffff,
			intensity: 0.5,
		},
		directional: {
			color: 0xffffff,
			intensity: 1,
			position: [5, 5, 5],
		},
	},
};
