import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'


const PdfUploader = () => {
  const fileInputRef = useRef(null);
  const [wordsData, setFoundedWordsResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
console.log('subscription')
  window.electron.ipcRenderer.on('read-pdf', (arg) => {
    // @ts-ignore
    setFoundedWordsResult(arg)
    setLoading(false)
  });
  const handleFileChange = (event: any) => {
    setFoundedWordsResult([])

    const files: File[] =Array.from(event.target.files);
    const pdfFiles: {path: string, name: string}[] = []

    files.forEach((file) => {
      if (file.type === 'application/pdf') {
        pdfFiles.push({path: file.path, name: file.name})
      } else {
        console.log('Please choose a valid PDF file.');
      }
    })
    setLoading(true)
    window.electron.ipcRenderer.sendMessage('read-pdf', pdfFiles);
  };

  const showResults = (data: {result: string, fileName: string}) => {

  }

  const handleButtonClick = () => {
    // @ts-ignore
    fileInputRef.current.click();
  };

  return (
    <div>
    {isLoading ? <CircularProgress/> : (<div>
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
        <Paper style={{maxHeight: 400, overflow: 'auto'}}>

          <List sx={{ width: '100%', maxWidth: 360 }}>
            {
              wordsData.map(({fileName, result}, index) => {
                return (
                  <ListItem alignItems="flex-start" key = {index}>
                    <ListItemText
                      primary={fileName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {result}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>)
              })}
          </List>
        </Paper>
      </div>)
    }
    </div>
  );
};

export default PdfUploader;
