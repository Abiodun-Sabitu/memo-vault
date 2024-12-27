import { useEffect, useState } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
    setNotes(storedNotes);
  }, []);

  const addNote = (note: any) => {
    if (!notes) {
      return;
    }
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes); // Update state
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Update localStorage
  };

  // Delete a note by ID
  const deleteNote = (id: number) => {
    console.log("Before delete:", notes);
    const updatedNotes = notes.filter((note) => note.id !== id);
    console.log("After delete:", updatedNotes);
    setNotes(updatedNotes); // Update state
    localStorage.setItem("allNotes", JSON.stringify(updatedNotes)); // Sync with localStorage
  };

  return { notes, addNote, deleteNote };
};

export default useNotes;
