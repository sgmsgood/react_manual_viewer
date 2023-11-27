import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { pdfjs } from 'react-pdf';
import {toast} from "react-toastify";
import { Document, Page } from 'react-pdf';
import pdfFile from "./m.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const { height, width } = useWindowDimensions();

  return (
    <div>
      <Document file={'https://firebasestorage.googleapis.com/v0/b/flutter3test-478a4.appspot.com/o/m.pdf?alt=media&token=519c9147-4bdb-4428-8490-0e16df8c87cd'} 
        onLoadSuccess={({numPages}) => setNumPages(numPages)} 
        onSourceError={(error) => toast.error('Error while retrieving document source! ' + error.message)}>
          {
            width > 1024 ? <div> <Page className="react-pdf__Page__canvas" pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}/><Page className="react-pdf__Page__canvas"pageNumber={pageNumber + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}/>
            </div> 
            : Array.apply(null, Array(numPages)).map((x, i)=>i+1)
            .map(page => 
              <div>
                <Page className='react-pdf__Page__canvas' pageNumber={page}
                renderAnnotationLayer={false}
                renderTextLayer={false}/>
              </div>
            )
          }
      </Document>
    </div>
  );
}

export default App;