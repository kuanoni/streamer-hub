import useMediaQuery from './useMediaQuery';

const useBreakpoints = () => {
	const breakpoints = {
		isXxs: useMediaQuery('(max-width: 375px)'),
		isXs: useMediaQuery('(max-width: 640px)'),
		isSm: useMediaQuery('(max-width: 768px)'),
		isMd: useMediaQuery('(max-width: 1024px)'),
		isLg: useMediaQuery('(min-width: 1025px)'),
		active: 'xs',
	};

	if (breakpoints.isXs) breakpoints.active = 'xs';
	if (breakpoints.isSm) breakpoints.active = 'sm';
	if (breakpoints.isMd) breakpoints.active = 'md';
	if (breakpoints.isLg) breakpoints.active = 'lg';

	return breakpoints;
};

export default useBreakpoints;
