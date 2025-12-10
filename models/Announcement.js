const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorRole: {
        type: String,
        enum: ['teacher', 'admin'],
        default: 'teacher'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
