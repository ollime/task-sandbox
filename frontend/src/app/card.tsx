import Draggable from "./Draggable";

interface Coordinates {
  x: number;
  y: number;
}

interface CardProps {
  position: Coordinates;
  label: string;
}

export default function Card({ position, label }: CardProps) {
  return (
    <Draggable id={label} position={position}>
      <div>{label}</div>
    </Draggable>
  );
}
