/* eslint-disable */
import { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return setMsg('Please select a PDF file first.');
        if (file.type !== 'application/pdf') return setMsg('Only PDF files are allowed.');

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setMsg('');
        
        try {
            await axios.post('http://localhost:5000/api/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMsg('Success! File uploaded.');
            setFile(null);
            document.getElementById('fileInput').value = null;
            onUploadSuccess(); 
        } catch (err) {
            setMsg('Upload failed. Is backend running?');
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="upload-card">
            <h3>Upload New Record</h3>
            <div className="input-group">
                <input 
                    id="fileInput"
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-upload"
                >
                    {uploading ? 'Uploading...' : 'Upload PDF'}
                </button>
            </div>
            {msg && <p className={msg.includes('Success') ? "success-msg" : "error-msg"}>{msg}</p>}
        </div>
    );
};

export default UploadForm;