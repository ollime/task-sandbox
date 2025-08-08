import Draggable from "./Draggable";
import { Coordinates } from "@dnd-kit/core/dist/types";

interface CardProps {
  position: Coordinates;
  size?: Coordinates;
  label: string;
  color?: string;
  activeId: string;
}

export default function Card({
  position,
  label,
  color,
  activeId,
  size = { x: 100, y: 100 },
}: CardProps) {
  return (
    <Draggable
      id={label}
      position={position}
      color={color}
      isActive={label === activeId}
    >
      <div
        className="flex flex-1 items-center justify-center"
        style={{ height: size.y, width: size.x }}
      >
        {label}
      </div>
    </Draggable>
  );
}
