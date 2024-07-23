import { EditorBtns } from "@/lib/constants";
import React from "react";

type Props = {};

const VideoPlaceholder = (props: Props) => {
	const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
		if (type === null) return;
		e.dataTransfer.setData("componentType", type);
	};
	return (
		<div
			draggable
			onDragStart={(e) => handleDragStart(e, "video")}
			className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				className="lucide lucide-youtube text-muted-foreground">
				<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
				<path d="m10 15 5-3-5-3z" />
			</svg>
		</div>
	);
};

export default VideoPlaceholder;
