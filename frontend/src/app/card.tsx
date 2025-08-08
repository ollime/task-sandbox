import Draggable from "./Draggable";
import { Coordinates } from "@dnd-kit/core/dist/types";

interface CardProps {
  position: Coordinates;
  label: string;
  color?: string;
  activeId: string;
}

export default function Card({ position, label, color, activeId }: CardProps) {
  return (
    <Draggable
      id={label}
      position={position}
      color={color}
      isActive={label === activeId}
    >
      <div>{label}</div>
    </Draggable>
  );
}
