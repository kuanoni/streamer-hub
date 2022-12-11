import Link from 'next/link';
import { keyframes, styled, theme } from 'stiches.config';

const Container = styled(Link, {
	position: 'absolute',
	left: '50%',
	bottom: '.5rem',
	height: '100%',
	aspectRatio: 1,
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gridTemplateRows: 'repeat(4, 1fr)',
	borderRadius: 10,
	overflow: 'hidden',
	transition: '.2s ease',
	'&:hover': {
		transform: 'scale(1.05) translateY(-2px)',
		boxShadow: '0 0 10px 1px yellow',
	},
});

const Text = styled('span', {
	position: 'absolute',
	width: '100%',
	height: '100%',
	fontStyle: 'italic',
	fontSize: '2rem',
	fontWeight: 100,
	zIndex: 1,
	svg: {
		width: '100%',
		height: '100%',
		padding: 5,
		fill: theme.colors.textLight,
		stroke: theme.colors.textLight,
	},
});

const wavey = keyframes({
	'0%, 100%': {
		opacity: 1,
	},
	'60%': {
		opacity: 1.2,
	},
	'80%': {
		opacity: 0.6,
	},
});

const Square = styled('div', {
	width: '100%',
	height: '100%',
	animation: `${wavey} 5s ease infinite`,
	variants: {
		color: {
			1: { backgroundColor: '#5a0da3' },
			2: { backgroundColor: '#8c15db' },
			3: { backgroundColor: '#b102fc' },
			4: { backgroundColor: '#9c5ef2' },
			5: { backgroundColor: '#6517ed' },
			6: { backgroundColor: '#7642bf' },
			7: { backgroundColor: '#7b2dce' },
			8: { backgroundColor: '#701bd1' },
			9: { backgroundColor: '#9722f7' },
			10: { backgroundColor: '#551bba' },
			11: { backgroundColor: '#bd4cff' },
			12: { backgroundColor: '#7737e5' },
			13: { backgroundColor: '#5316ce' },
			14: { backgroundColor: '#9046ea' },
			15: { backgroundColor: '#7220c9' },
			16: { backgroundColor: '#753bcc' },
		},
		wave: {
			1: { animationDelay: '0s' },
			2: { animationDelay: '0.1s' },
			3: { animationDelay: '0.3s' },
			4: { animationDelay: '0.5s' },
			5: { animationDelay: '0.7s' },
			6: { animationDelay: '0.9s' },
			7: { animationDelay: '1.1s' },
		},
	},
});

const BrandLogo = () => {
	return (
		<Container href={'/'} title='Streamer Hub'>
			<Text>
				<svg width='93.3' height='82.201' viewBox='0 0 93.3 82.201' xmlns='http://www.w3.org/2000/svg'>
					<g id='svgGroup' stroke-linecap='round' fill-rule='evenodd' font-size='9pt' stroke-width='0.5mm'>
						<path d='M 91.2 3.001 Q 92.1 21.301 92.7 43.951 Q 93.3 66.601 93.3 82.201 A 12.099 12.099 0 0 1 92.412 82.165 Q 91.922 82.129 91.366 82.056 A 25.146 25.146 0 0 1 90.65 81.951 Q 89.1 81.701 87.7 81.401 Q 87.7 76.038 87.629 69.258 A 1884.422 1884.422 0 0 0 87.55 62.801 Q 87.4 52.001 87.1 41.501 A 359.998 359.998 0 0 0 77.943 41.611 Q 73.599 41.722 69.723 41.944 A 218.411 218.411 0 0 0 69.6 41.951 A 178.915 178.915 0 0 0 60.241 42.728 A 147.514 147.514 0 0 0 55 43.401 Q 55.1 52.101 55.35 60.451 A 401.727 401.727 0 0 0 55.657 68.27 Q 55.846 72.098 56.1 75.501 A 14.223 14.223 0 0 1 54.439 75.808 A 17.227 17.227 0 0 1 53.5 75.901 Q 52.209 75.993 51.089 75.915 A 13.671 13.671 0 0 1 50.9 75.901 Q 50 59.101 49.55 42.051 Q 49.1 25.001 49.1 5.801 A 11.072 11.072 0 0 1 49.76 5.635 Q 50.102 5.56 50.488 5.494 A 19.853 19.853 0 0 1 50.75 5.451 Q 51.7 5.301 52.7 5.301 A 13.958 13.958 0 0 1 53.449 5.32 Q 53.906 5.344 54.3 5.401 Q 55 5.501 55.8 5.701 Q 55.325 11.117 55.076 19.377 A 450.558 450.558 0 0 0 55.05 20.251 Q 54.8 29.101 54.9 39.301 A 153.015 153.015 0 0 1 69.939 37.405 A 164.483 164.483 0 0 1 70 37.401 Q 77.8 36.801 87 36.701 Q 86.7 26.101 86.25 17.351 Q 85.8 8.601 85.3 3.101 Q 86.372 2.771 87.069 2.645 A 6.207 6.207 0 0 1 87.35 2.601 A 11.689 11.689 0 0 1 88.85 2.501 A 12.77 12.77 0 0 1 88.9 2.501 A 5.744 5.744 0 0 1 89.736 2.559 A 4.78 4.78 0 0 1 90.2 2.651 Q 90.659 2.765 91.002 2.91 A 3.369 3.369 0 0 1 91.2 3.001 Z M 34 48.801 Q 36 51.701 36.95 55.151 A 26.284 26.284 0 0 1 37.766 59.717 A 32.434 32.434 0 0 1 37.9 62.701 Q 37.9 70.701 32.95 75.701 A 16.659 16.659 0 0 1 22.337 80.602 A 22.59 22.59 0 0 1 20.2 80.701 A 20.655 20.655 0 0 1 13.582 79.692 A 16.688 16.688 0 0 1 5.25 73.451 A 25.472 25.472 0 0 1 1.438 65.371 Q 0.45 61.879 0.141 57.719 A 52.912 52.912 0 0 1 0 53.801 A 11.74 11.74 0 0 1 1.792 52.956 A 14.137 14.137 0 0 1 2.7 52.651 Q 4.2 52.201 5.8 52.101 Q 5.7 63.401 9.45 69.701 A 14.26 14.26 0 0 0 12.4 73.287 Q 15.572 76.001 20.1 76.001 A 12.648 12.648 0 0 0 24.138 75.383 A 10.485 10.485 0 0 0 28.65 72.401 A 12.353 12.353 0 0 0 31.598 66.331 A 17.558 17.558 0 0 0 31.9 63.001 A 23.957 23.957 0 0 0 31.531 58.721 A 20.371 20.371 0 0 0 31 56.501 Q 30.1 53.501 28.2 51.001 A 23.226 23.226 0 0 0 26.548 48.976 A 29.762 29.762 0 0 0 25 47.401 Q 23.527 46.005 20.611 43.828 A 134.776 134.776 0 0 0 18.8 42.501 Q 14.879 39.56 12.693 37.587 A 31.001 31.001 0 0 1 11.8 36.751 A 27.604 27.604 0 0 1 9.633 34.384 A 21.525 21.525 0 0 1 8.2 32.401 Q 6.2 29.401 5.25 25.951 A 26.107 26.107 0 0 1 4.457 21.589 A 33.364 33.364 0 0 1 4.3 18.301 A 25.616 25.616 0 0 1 4.862 12.769 Q 5.9 8.078 8.85 4.901 A 15.06 15.06 0 0 1 17.992 0.219 A 21.377 21.377 0 0 1 21.1 0.001 A 19.78 19.78 0 0 1 25.565 0.475 Q 29.61 1.412 32.2 4.201 A 15.343 15.343 0 0 1 34.493 7.538 Q 36.308 11 37.503 16.417 A 66.534 66.534 0 0 1 38 18.901 Q 36.9 19.501 35.65 19.801 Q 34.742 20.019 33.491 20.131 A 26.886 26.886 0 0 1 32.5 20.201 A 48.587 48.587 0 0 0 31.803 15.948 Q 30.741 10.974 28.8 8.351 A 8.757 8.757 0 0 0 22.883 4.857 A 13.289 13.289 0 0 0 20.8 4.701 Q 15.7 4.701 13 8.101 Q 10.938 10.698 10.451 15.104 A 26.407 26.407 0 0 0 10.3 18.001 A 25.077 25.077 0 0 0 10.601 21.963 A 20.364 20.364 0 0 0 11.2 24.601 Q 12.1 27.601 14 30.201 Q 15.4 32.001 17.3 33.801 Q 19.2 35.601 23.5 38.901 Q 27.386 41.734 29.535 43.65 A 27.579 27.579 0 0 1 30.45 44.501 A 26.677 26.677 0 0 1 32.631 46.895 A 21.555 21.555 0 0 1 34 48.801 Z' />
					</g>
				</svg>
			</Text>
			<Square wave={1} color={1} />
			<Square wave={2} color={2} />
			<Square wave={3} color={3} />
			<Square wave={4} color={4} />
			<Square wave={2} color={5} />
			<Square wave={3} color={6} />
			<Square wave={4} color={7} />
			<Square wave={5} color={8} />
			<Square wave={3} color={9} />
			<Square wave={4} color={10} />
			<Square wave={5} color={11} />
			<Square wave={6} color={12} />
			<Square wave={4} color={13} />
			<Square wave={5} color={14} />
			<Square wave={6} color={15} />
			<Square wave={7} color={16} />
		</Container>
	);
};

export default BrandLogo;
