import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const BookDetails = ({ book }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div>
      <Document file={book} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
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
