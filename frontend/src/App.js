import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await axios.post('/api/notes', { content: newNote });
      setNotes([response.data, ...notes]);
      setNewNote('');
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="container">
      <header><h1>📝 Simple Note Taker</h1></header>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <p>{note.content}</p>
            <span>{new Date(note.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;