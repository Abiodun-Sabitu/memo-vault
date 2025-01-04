import { useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState<any[]>([]); // Current filtered notes
  const [copiedNotes, setCopiedNotes] = useState<any[]>([]); // Backup of original notes
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteCategories, setNoteCategories] = useState<string[]>([]);

  // Initial load of notes and categories
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
    setNotes(storedNotes);
    setCopiedNotes(storedNotes); // Set the initial backup

    const categoryList = JSON.parse(
      localStorage.getItem("dropdownItems") || "[]"
    );
    setNoteCategories(categoryList);
  }, []);

  // Add a new note
  const addNote = (note: any) => {
    const updatedNotes = [note, ...copiedNotes];
    setNotes(updatedNotes); // Update current notes
    setCopiedNotes(updatedNotes); // Update backup
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Sync with localStorage
  };

  // Delete a note by ID
  const deleteNote = (id: number) => {
    const updatedNotes = copiedNotes.filter((note) => note.id !== id);
    setNotes(updatedNotes); // Update current notes
    setCopiedNotes(updatedNotes); // Update backup
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Sync with localStorage
  };

  // Get a note to edit by ID
  const getNoteToEdit = (id: number) => {
    const selectedNote = copiedNotes.find((note) => note.id === id);
    setNoteToEdit(selectedNote || null);
    localStorage.setItem("noteToEdit", JSON.stringify(selectedNote));
  };

  // Update an edited note
  const updateEditedNote = (id: number, editedNote: any) => {
    const updatedNotes = copiedNotes.map((note) =>
      note.id === id ? { ...note, ...editedNote } : note
    );
    setNotes(updatedNotes); // Update current notes
    setCopiedNotes(updatedNotes); // Update backup
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Sync with localStorage
  };

  // Reorder notes
  const onReorder = (reorderedNotes: any[]) => {
    setNotes(reorderedNotes); // Update current notes
    setCopiedNotes(reorderedNotes); // Update backup
    localStorage.setItem("allNotes", JSON.stringify(reorderedNotes)); // Sync with localStorage
  };

  // Refresh categories
  const onFilter = () => {
    const categoryList = JSON.parse(
      localStorage.getItem("dropdownItems") || "[]"
    );
    setNoteCategories(categoryList);
  };

  return {
    notes,
    copiedNotes, // Expose the backup notes
    addNote,
    deleteNote,
    getNoteToEdit,
    noteToEdit,
    setNoteToEdit,
    updateEditedNote,
    onReorder,
    noteCategories,
    setNotes,
    onFilter,
  };
};

export default useNotes;
