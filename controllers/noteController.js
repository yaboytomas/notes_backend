const Notes = require('../models/Notes');

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user ID is stored in req.user

    try {
        const newNote = new Notes({
            title,
            content,
            user: userId
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await Notes.find({ user: userId });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
        const note = await Notes.findOneAndUpdate(
            { _id: id, user: userId },
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Notes.findOneAndDelete({ _id: id, user: userId });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.patchNote = async (req, res) => {   
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
        const note = await Notes.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: { title, content } },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error('Error patching note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};