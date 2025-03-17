import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ReadingMenu from "../ReadingMenu/ReadingMenu";

const BookDetails = ({ book }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [menu, setMenu] = useState(null);
  const [selectedText, setSelectedText] = useState("");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const documentContainer = document.getElementById("pdf-container"); // Khung PDF
      if (!documentContainer) return;

      const docRect = documentContainer.getBoundingClientRect();
      const scrollX = documentContainer.scrollLeft;
      const scrollY = documentContainer.scrollTop;

      const menuWidth = 125;
      const menuHeight = 122;
      const margin = 16; // Khoảng cách menu với chữ

      let posX = rect.left - docRect.left + scrollX;
      let posY = rect.top - docRect.top + scrollY;

      // Giới hạn vị trí trong documentContainer
      const maxX = docRect.width - menuWidth - margin;
      const maxY = docRect.height - menuHeight - margin;
      const midX = docRect.width / 2;
      const midY = docRect.height / 2;

      // Điều chỉnh hướng hiển thị thông minh
      if (posX < midX) {
        // Nếu click bên trái màn hình → Hiển thị bên phải chữ
        posX = Math.min(posX + rect.width + margin, maxX);
      } else {
        // Nếu click bên phải màn hình → Hiển thị bên trái chữ
        posX = Math.max(posX - menuWidth - margin, margin);
      }

      if (posY < midY) {
        // Nếu click gần mép trên → Hiển thị phía dưới chữ
        posY = Math.min(posY + rect.height + margin, maxY);
      } else {
        // Nếu click gần mép dưới → Hiển thị phía trên chữ
        posY = Math.max(posY - menuHeight - margin, margin);
      }

      setSelectedText(text);
      setMenu({ x: posX, y: posY });
    }
  };

  useEffect(() => {
    const handleSelectionClear = () => {
      const selection = window.getSelection();
      if (!selection.toString().trim()) {
        setTimeout(() => setMenu(null), 200);
      }
    };

    document.addEventListener("selectionchange", handleSelectionClear);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionClear);
  }, []);

  return (
    <div style={{ overflow: "visible", position: "relative" }}>
      <div
        id="pdf-container"
        onMouseUp={handleMouseUp}
        style={{
          position: "relative",
          padding: "20px",
          userSelect: "text",
          zIndex: 1,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        {menu && (
          <ReadingMenu
            x={menu.x}
            y={menu.y}
            selectedText={selectedText}
            onClose={() => setMenu(null)}
          />
        )}
      </div>
      <p>
        Page {pageNumber} of {numPages || "?"}
      </p>
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber <= 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber >= numPages}
      >
        Next
      </button>
    </div>
  );
};

export default BookDetails;
