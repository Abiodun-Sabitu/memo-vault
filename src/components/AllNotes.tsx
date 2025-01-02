import { useState } from "react";
import { CustomCard } from "./CustomCard";
import ModalBox from "./Modal";

// export default AllNotes;
const AllNotes: React.FC<{
  notes: any[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedNote: any) => void; // Updated type for `onEdit`
  getNoteToEdit: (id: number) => void;
  onReorder: (reorderedNotes: any) => void;
}> = ({ notes, onDelete, onEdit, getNoteToEdit, onReorder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedNoteId, setDraggedNoteId] = useState<number | null>(null);

  // Handle the start of dragging
  const handleDragStart = (id: number) => {
    console.log("Drag started for note ID:", id);
    setDraggedNoteId(id); // Set the dragged note's ID
  };

  // Allow dropping by preventing default behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle dropping and rearranging notes
  const handleDrop = (droppedOnId: number) => {
    if (draggedNoteId === null) return;

    const draggedNote = notes.find((note) => note.id === draggedNoteId); // Find the dragged note
    const remainingNotes = notes.filter((note) => note.id !== draggedNoteId); // Remove dragged note from the list

    const dropIndex = remainingNotes.findIndex(
      (note) => note.id === droppedOnId
    ); // Find the drop position
    const reorderedNotes = [
      ...remainingNotes.slice(0, dropIndex),
      draggedNote!,
      ...remainingNotes.slice(dropIndex),
    ];

    console.log("Reordered notes:", reorderedNotes);
    setDraggedNoteId(null); // Reset the dragged note
    onReorder(reorderedNotes);
  };

  return (
    <div>
      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onEdit={onEdit}
      />
      <div className="wrapper">
        {notes.map((note) => (
          <div
            key={note.id}
            draggable // Make the div draggable
            onDragOver={handleDragOver} // Allow dragging over
            onDrop={() => handleDrop(note.id)} // Handle dropping
            style={{
              cursor: "grab",
              opacity: draggedNoteId === note.id ? 0.5 : 1, // Visual feedback for dragging
              border: draggedNoteId === note.id ? "2px dashed #000" : "none",
            }}
          >
            <CustomCard
              id={note.id}
              title={note.title}
              content={note.content}
              labelColor={note.color}
              tag={note.category}
              onDelete={() => onDelete(note.id)}
              getNoteToEdit={getNoteToEdit}
              setIsModalOpen={setIsModalOpen}
              onDragStart={() => handleDragStart(note.id)} // Start dragging
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotes;
