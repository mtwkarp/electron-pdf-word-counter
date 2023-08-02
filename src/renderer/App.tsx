import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Button } from "@mui/material";
import PdfUploader from "./components/PdfUploader";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PdfUploader />} />
      </Routes>
    </Router>
  );
}
