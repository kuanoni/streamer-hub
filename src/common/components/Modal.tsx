import React, { useEffect, useRef, useState } from 'react';

interface props {
	isOpen: Boolean;
	setIsOpen: Function;
	children: React.ReactNode;
}

import { createPortal } from 'react-dom';
import { styled } from '@stitches/react';
import { keyframes } from 'stiches.config';

const fadeIn = keyframes({
	'0%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
	'100%': { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
});

const StyledOverlay = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'fixed',
	backgroundColor: 'rgba(0, 0, 0, 0.3)',
	zIndex: 100,
	inset: '0 0 0 0',
	animation: `${fadeIn} .5s`,
});

const moveIn = keyframes({
	'0%': {
		opacity: 0,
		transform: 'translateY(-50px)',
	},
	'100%': {
		opacity: 1,
		transform: 'translateY(0px)',
	},
});

const StyledModal = styled('div', {
	display: 'flex',
	animation: `${moveIn} .25s`,
});

const Modal = ({ isOpen, setIsOpen, children }: props) => {
	const portalRef = useRef<Element | null>(null);
	const overlayRef = useRef(null);
	const [mounted, setMounted] = useState(false);

	const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
		if (overlayRef.current === e.target) setIsOpen(false);
	};

	useEffect(() => {
		portalRef.current = document.querySelector<HTMLElement>('#portal');
		setMounted(true);
	}, []);

	if (!isOpen) return <></>;

	return mounted && portalRef.current
		? createPortal(
				<StyledOverlay ref={overlayRef} onMouseDown={handleOverlayClick}>
					<StyledModal>{children}</StyledModal>
				</StyledOverlay>,
				portalRef.current
		  )
		: null;
};

export default Modal;
