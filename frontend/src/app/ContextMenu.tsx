import { useState } from "react";
import { sizePreset } from "./card.types";

interface ContextMenuProps {
  top: number;
  left: number;
  currentSize?: string;
}

export default function ContextMenu({
  top,
  left,
  currentSize,
}: ContextMenuProps) {
  const [size, setSize] = useState<string>(currentSize ?? "smSquare");
  const liStyles = "p-2 hover:cursor-pointer hover:bg-black";
  const styles: React.CSSProperties = {
    position: "absolute",
    width: "200px",
    backgroundColor: "#383838",
    top: top,
    left: left,
    zIndex: 1000,
  };

  const radioBtns: React.ReactNode = Object.keys(sizePreset).map((item) => (
    <div key={item} onClick={() => handleClickRadio(item)}>
      <input
        type="radio"
        name="size"
        id={item}
        value={item}
        defaultChecked={item === size}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  ));

  function handleClickRadio(newSize: string) {
    setSize(newSize);
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <li className={`${liStyles} rounded-t-lg`} role="menuitem">
          Size
          {radioBtns}
        </li>
        <li className={liStyles} role="menuitem">
          Color
        </li>
        <li className={liStyles} role="menuitem">
          Delete
        </li>
        <li className={`${liStyles} rounded-b-lg`} role="menuitem">
          Archive
        </li>
      </ul>
    </div>
  );
}
