const express = require('express');
const router = express.Router();
const { knex } = require('../db');

router.get('/', async (req, res) => {
    try {
        const notes = await knex('notes').select('*').orderBy('createdAt', 'desc');
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content cannot be empty" });
        }
        const [newNoteId] = await knex('notes').insert({ content: content });
        const newNote = await knex('notes').where({ id: newNoteId }).first();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;