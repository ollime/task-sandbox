import Draggable from "./Draggable";
import { Coordinates } from "@dnd-kit/core/dist/types";

interface CardProps {
  position: Coordinates;
  label: string;
  color?: string;
}

export default function Card({ position, label, color }: CardProps) {
  return (
    <Draggable id={label} position={position} color={color}>
      <div>{label}</div>
    </Draggable>
  );
}
