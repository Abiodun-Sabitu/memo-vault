import { useState } from "react";
import { CustomCard } from "./CustomCard";
import ModalBox from "./Modal";

const AllNotes: React.FC<{
  notes: any[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedNote: any) => void;
}> = ({ notes, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Rendering AllNotes with notes:", notes);
  return (
    <div>
      <ModalBox
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onEdit={onEdit}
      />
      <div
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   flexWrap: "wrap",
        //   flexBasis: 1,
        //   // justifyContent: "space-between",
        //   justifyItems: "center",
        //   padding: 40,
        //   gap: 30,
        // }}
        className="wrapper"
      >
        {notes.map((note) => (
          <CustomCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            labelColor={note.color}
            tag={note.category}
            onDelete={() => onDelete(note.id)}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default AllNotes;
