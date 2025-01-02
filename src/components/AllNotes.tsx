import { useState } from "react";
import { CustomCard } from "./CustomCard";
import ModalBox from "./Modal";

const AllNotes: React.FC<{
  notes: any[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedNote: any) => void;
  getNoteToEdit: (id: number) => void;
}> = ({ notes, onDelete, onEdit, getNoteToEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("Rendering AllNotes with notes:", notes);
  return (
    <div>
      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onEdit={onEdit}
      />
      <div className="wrapper">
        {notes.map((note) => (
          <CustomCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            labelColor={note.color}
            tag={note.category}
            onDelete={() => onDelete(note.id)}
            getNoteToEdit={getNoteToEdit}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default AllNotes;
