import React, { useRef } from 'react';
import { Button } from "@mui/material";

const PdfUploader = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const files: File[] =Array.from(event.target.files);
    const pdfFiles: any[] = []

    files.forEach((file) => {
      if (file.type === 'application/pdf') {
        pdfFiles.push(file)
      } else {
        console.log('Please choose a valid PDF file.');
      }
    })

    console.log(pdfFiles)
  };

  const handleButtonClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        Choose PDF
      </Button>
    </div>
  );
};

export default PdfUploader;
