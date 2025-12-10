const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET all announcements (sorted by newest first)
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new announcement
router.post('/create', async (req, res) => {
    const { title, message, authorName, authorRole } = req.body;

    const newAnnouncement = new Announcement({
        title,
        message,
        authorName,
        authorRole
    });

    try {
        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update an announcement
router.put('/:id', async (req, res) => {
    try {
        const { title, message } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            { title, message },
            { new: true }
        );
        if (!updatedAnnouncement) return res.status(404).json({ message: 'Announcement not found' });
        res.json(updatedAnnouncement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an announcement
router.delete('/:id', async (req, res) => {
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        if (!deletedAnnouncement) return res.status(404).json({ message: 'Announcement not found' });
        res.json({ message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
