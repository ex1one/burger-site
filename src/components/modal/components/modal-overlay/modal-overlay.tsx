import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
	onClose?: VoidFunction;
}

export function ModalOverlay({ onClose }: ModalOverlayProps) {
	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		/>
	);
}
