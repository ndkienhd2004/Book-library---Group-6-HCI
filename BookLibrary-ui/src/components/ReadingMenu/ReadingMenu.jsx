const ReadingMenu = ({ x, y, selectedText, onClose }) => {
  if (!selectedText) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: "#FFD700",
        border: "2px solid #FF4500",
        padding: "8px",
        borderRadius: "5px",
        zIndex: 99999,
        whiteSpace: "nowrap",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <div
        onClick={() => navigator.clipboard.writeText(selectedText)}
        style={{ cursor: "pointer", padding: "5px" }}
      >
        📋 Sao chép
      </div>
      <div onClick={onClose} style={{ cursor: "pointer", padding: "5px" }}>
        🔖 Đánh dấu
      </div>
      <div onClick={onClose} style={{ cursor: "pointer", padding: "5px" }}>
        📝 Ghi chú
      </div>
    </div>
  );
};

export default ReadingMenu;
