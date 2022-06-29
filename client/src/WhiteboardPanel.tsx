import { IconButton } from '@material-ui/core';
import React from 'react';

const colors = [
	'yellow',
	'orange',
	'red',
	'pink',
	'violet',
	'blue',
	'green',
	'gray'
];

interface IWhiteboardPanelProps {
	setMarkerColor: (color: string) => void;
}

function WhiteboardPanel({ setMarkerColor }: IWhiteboardPanelProps) {
	const displayColorIcons = colors.map((color) => {
		return (
			<IconButton
				style={{
					backgroundColor: color,
					width: '5px',
					height: '5px',
					marginRight: '2px',
					borderRadius: 1
				}}
				key={color}
				onClick={() => setMarkerColor(color)}
			></IconButton>
		);
	});

	return <div style={{ padding: 10 }}>{displayColorIcons}</div>;
}

export default WhiteboardPanel;
