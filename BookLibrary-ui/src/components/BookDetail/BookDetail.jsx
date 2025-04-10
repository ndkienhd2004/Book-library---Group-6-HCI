import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ReadingMenu from "../ReadingMenu/ReadingMenu";
import { pdfjs } from "react-pdf";

// Use official CDN with matching version
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookDetails = ({
  book,
  setExplainText,
  setSummaryText,
  pageNumber,
  setPageNumber,
  setLoading,
  darkMode,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [menu, setMenu] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Validate and ensure pageNumber is always between 1 and numPages
  const validatedPageNumber = Math.max(1, Math.min(pageNumber, numPages || 1));

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (!numPages) return;
    setNumPages(numPages);
    setIsLoading(false);

    // Reset to first page if current page is invalid
    if (pageNumber < 1 || pageNumber > numPages) {
      setPageNumber(1);
    }
  };

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const documentContainer = document.getElementById("pdf-container");
      if (!documentContainer) return;

      const docRect = documentContainer.getBoundingClientRect();
      const scrollX = documentContainer.scrollLeft;
      const scrollY = documentContainer.scrollTop;

      const menuWidth = 136;
      const menuHeight = 104;
      const margin = 16;

      let posX = rect.left - docRect.left + scrollX;
      let posY = rect.top - docRect.top + scrollY;

      const maxX = docRect.width - menuWidth - margin;
      const maxY = docRect.height - menuHeight - margin;
      const midX = docRect.width / 2;
      const midY = docRect.height / 2;

      if (posX < midX) {
        posX = Math.min(posX + rect.width + margin, maxX);
      } else {
        posX = Math.max(posX - menuWidth - margin, margin);
      }

      if (posY < midY) {
        posY = Math.min(posY + rect.height + margin, maxY);
      } else {
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

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  };

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
          minHeight: "500px",
          filter: darkMode
            ? "invert(0.9) hue-rotate(180deg) brightness(0.9)"
            : "none",
          //backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        }}
      >
        {book && (
          <Document
            file={book}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => setIsLoading(false)}
            loading={<div>Loading PDF...</div>}
          >
            {!isLoading && (
              <Page
                pageNumber={validatedPageNumber}
                loading={<div>Loading page...</div>}
                height={window.innerHeight - 300}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            )}
          </Document>
        )}

        {menu && (
          <ReadingMenu
            x={menu.x}
            y={menu.y}
            selectedText={selectedText}
            setExplainText={setExplainText}
            setSummaryText={setSummaryText}
            setLoading={setLoading}
            onClose={() => setMenu(null)}
          />
        )}
      </div>
      <p style={{ color: darkMode ? "#fff" : "#000" }}>
        Page {validatedPageNumber} of {numPages || "Loading..."}
      </p>
      <button
        onClick={handlePreviousPage}
        disabled={validatedPageNumber <= 1}
        style={{
          marginRight: "10px",
        }}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={validatedPageNumber >= (numPages || 1)}
      >
        Next
      </button>
    </div>
  );
};

export default BookDetails;
