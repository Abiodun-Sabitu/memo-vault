import { useState } from "react";
import { CustomCard } from "./CustomCard";
import ModalBox from "./Modal";

const AllNotes: React.FC<{
  notes: any[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedNote: any) => void; // Updated type for `onEdit`
  getNoteToEdit: (id: number) => void;
  onReorder: (reorderedNotes: any) => void;
}> = ({ notes, onDelete, onEdit, getNoteToEdit, onReorder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedNoteId, setDraggedNoteId] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  // Function to handle reordering logic
  const reorderNotes = (
    draggedNoteId: number,
    droppedOnId: number,
    notes: any[],
    onReorder: (reorderedNotes: any[]) => void
  ) => {
    const draggedNote = notes.find((note) => note.id === draggedNoteId);
    const remainingNotes = notes.filter((note) => note.id !== draggedNoteId);

    const dropIndex = remainingNotes.findIndex(
      (note) => note.id === droppedOnId
    );
    const reorderedNotes = [
      ...remainingNotes.slice(0, dropIndex),
      draggedNote!,
      ...remainingNotes.slice(dropIndex),
    ];

    onReorder(reorderedNotes); // Pass reordered notes to parent
  };

  // Handle the start of dragging
  const handleDragStart = (id: number) => {
    console.log("Drag started for note ID:", id);
    setDraggedNoteId(id); // Set the dragged note's ID
  };

  // Allow dropping by preventing default behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop (desktop)
  const handleDrop = (droppedOnId: number) => {
    if (draggedNoteId === null) return;

    reorderNotes(draggedNoteId, droppedOnId, notes, onReorder);

    setDraggedNoteId(null); // Reset dragged note
  };

  // Handle touch start (mobile)
  const handleTouchStart = (id: number, e: React.TouchEvent) => {
    setDraggedNoteId(id); // Set the dragged note's ID
    setTouchStartY(e.touches[0].clientY); // Record the initial touch position
  };

  // Handle touch move (mobile)
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.touches[0].clientY); // Track the touch movement
  };

  // Handle touch end (mobile)
  const handleTouchEnd = (droppedOnId: number) => {
    if (draggedNoteId === null || touchStartY === null || touchEndY === null) {
      return;
    }

    reorderNotes(draggedNoteId, droppedOnId, notes, onReorder);

    setDraggedNoteId(null); // Reset dragged note
    setTouchStartY(null); // Reset touch positions
    setTouchEndY(null);
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
            onDragOver={handleDragOver} // Allow dragging over
            onDrop={() => handleDrop(note.id)} // Handle dropping
            style={{
              opacity: draggedNoteId === note.id ? 0.5 : 1, // Visual feedback for dragging
              border: draggedNoteId === note.id ? "2px dashed #000" : "none",
            }}
            onTouchStart={(e) => handleTouchStart(note.id, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(note.id)}
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
