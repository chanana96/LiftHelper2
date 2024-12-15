/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'form-bg': '#656565',
			},
			spacing: {
				0.5: '4px',
				1: '8px',
				2: '16px',
				3: '24px',
				4: '32px',
				5: '40px',
				6: '48px',
				7: '56px',
				8: '64px',
				9: '72px',
				10: '80px',
			},
		},
	},
	plugins: [],
};
