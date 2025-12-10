/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from './components/Uploadform.jsx';
import DocumentList from './components/DocumentList.jsx';
import './index.css'; 

function App() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/documents');
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching docs:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Patient Portal</h1>
        <p>Secure Document Management System</p>
      </div>

      <UploadForm onUploadSuccess={fetchDocuments} />
      
      <DocumentList 
        documents={documents} 
        onDelete={(id) => setDocuments(docs => docs.filter(d => d._id !== id))} 
      />
    </div>
  );
}

export default App;