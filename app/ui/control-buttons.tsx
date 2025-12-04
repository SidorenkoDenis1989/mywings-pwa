import { ReactNode, useState } from 'react';
interface ControlButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
	onSave?: () => void;
	onCancel?: () => void;
	onReorder?: () => void;
}

export const ControlButtons = ({onSave, onCancel, onReorder, ...props}: ControlButtonsProps) => {
	const [isReordering, setIsReordering] = useState<boolean>(false);
	const onSaveHandler = () => {
		onSave && onSave();
		setIsReordering(false);
	}

	const onCancelHandler = () => {
		onCancel && onCancel();
		setIsReordering(false);
	}

	return (
		<div style={{
			...props.style,
			marginBottom: '15px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			gap: '10px'
		}}>
			{isReordering && (
				<button onClick={onSaveHandler}>
					Save
				</button>
			)}
			{isReordering && (
				<button onClick={onCancelHandler}>
					Cancel
				</button>
			)}
			{!isReordering && (
				<button 
					onClick={() => setIsReordering(true)}
				>
					Reorder Tiles
				</button>			
			)}
		</div>
	);
}