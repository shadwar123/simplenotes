'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      
      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes);
      } else {
        setError(data.error || 'Failed to fetch notes');
      }
    } catch (error) {
      setError('An error occurred while fetching notes');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
  };

  const handleNoteSave = async (noteData: { title: string; content: string }) => {
    try {
      if (selectedNote) {
        // Update existing note
        const response = await fetch(`/api/notes/${selectedNote._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteData),
        });

        if (response.ok) {
          const updatedNote = await response.json();
          setNotes(notes.map(note => 
            note._id === selectedNote._id ? updatedNote.note : note
          ));
          setSelectedNote(updatedNote.note);
        }
      } else {
        // Create new note
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteData),
        });

        if (response.ok) {
          const newNote = await response.json();
          setNotes([newNote.note, ...notes]);
          setSelectedNote(newNote.note);
        }
      }
    } catch (error) {
      setError('Failed to save note');
    }
  };

  const handleNoteDelete = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
        if (selectedNote?._id === noteId) {
          setSelectedNote(null);
        }
      }
    } catch (error) {
      setError('Failed to delete note');
    }
  };

  const handleNewNote = () => {
    setSelectedNote(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 mx-4 mt-4 rounded-md">
          {error}
        </div>
      )}

      <div className="flex h-[calc(100vh-64px)]">
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleNewNote}
              className="w-full btn-primary"
            >
              New Note
            </button>
          </div>
          <NoteList
            notes={notes}
            selectedNote={selectedNote}
            onNoteSelect={handleNoteSelect}
            onNoteDelete={handleNoteDelete}
          />
        </div>
        
        <div className="flex-1">
          <NoteEditor
            note={selectedNote}
            onSave={handleNoteSave}
          />
        </div>
      </div>
    </div>
  );
}
