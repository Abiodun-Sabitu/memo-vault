import { useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
    setNotes(storedNotes);
  }, []);

  const addNote = (note: any) => {
    if (!notes) {
      return;
    }
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes); // Update state
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Update localStorage
  };

  // Delete a note by ID
  const deleteNote = (id: number) => {
    // console.log("Before delete:", notes);
    const updatedNotes = notes.filter((note) => note.id !== id);
    // console.log("After delete:", updatedNotes);
    setNotes(updatedNotes); // Update state
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Sync with localStorage
  };

  // Get note to edit by ID
  const getNoteToEdit = (id: number) => {
    const selectedNote = notes.find((note) => note.id === id);
    setNoteToEdit(selectedNote || null);
    localStorage.setItem("noteToEdit", JSON.stringify(selectedNote));

    // console.log("getNoteToEdit func", noteToEdit); //
  };

  const updateEditedNote = (id: number, editedNote: any) => {
    const selectedNote = notes.map((note) =>
      note.id === id ? { ...note, ...editedNote } : note
    );
    setNotes(selectedNote);
    localStorage.setItem("allNotes", JSON.stringify(selectedNote)); // Update localStorage
  };

  const onReorder = (reorderedNotes: any[]) => {
    // Handle reordering logic
    setNotes(reorderedNotes); // Update state with reordered notes
    localStorage.setItem("allNotes", JSON.stringify(reorderedNotes)); // Sync reordered notes to localStorage
  };

  return {
    notes,
    addNote,
    deleteNote,
    getNoteToEdit,
    noteToEdit,
    setNoteToEdit,
    updateEditedNote,
    onReorder,
  };
};

export default useNotes;
