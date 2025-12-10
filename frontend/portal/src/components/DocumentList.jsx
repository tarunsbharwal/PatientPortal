/* eslint-disable */
import axios from 'axios';

const DocumentList = ({ documents, onDelete }) => {
    
    const handleDownload = async (id, filename) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/documents/${id}`,{
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Download failed.');
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this document?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/documents/${id}`);
            onDelete(id);
        } catch (err) {
            alert('Delete failed.');
        }
    };

    return (
        <div>
            <h3>Stored Documents</h3>
            <div className="table-container">
                {documents.length === 0 ? (
                    <p className="empty-state">No documents found. Upload one above!</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Size</th>
                                <th>Uploaded Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc._id}>
                                    <td>{doc.originalName}</td>
                                    <td>{(doc.size / 1024).toFixed(1)} KB</td>
                                    <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className="btn-download"
                                            onClick={() => handleDownload(doc._id, doc.originalName)}
                                        >
                                            Download
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(doc._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DocumentList;