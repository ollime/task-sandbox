interface ContextMenuProps {
  top: number;
  left: number;
}

export default function ContextMenu({ top, left }: ContextMenuProps) {
  const styles: React.CSSProperties = {
    position: "absolute",
    width: "200px",
    backgroundColor: "#383838",
    top: top,
    left: left,
  };

  return (
    <div style={styles}>
      <ul>
        <li>Edit</li>
        <li>Copy</li>
        <li>Delete</li>
      </ul>
    </div>
  );
}
