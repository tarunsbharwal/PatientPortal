const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');


const uploadDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'Please upload a file' });
    }
    try {
        const newDoc = new Document({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
        const savedDoc = await newDoc.save();
        res.status(201).json(savedDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getDocuments = async (req, res) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 });
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const downloadDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ msg: 'Document not found' });

        const absolutePath = path.resolve(doc.path);
        res.download(absolutePath, doc.originalName);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ msg:'Document not found'});

        if (fs.existsSync(doc.path)) {
            fs.unlinkSync(doc.path);
        }
        await Document.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    uploadDocument,
    getDocuments,
    downloadDocument,
    deleteDocument
};