import { CustomCard } from "./CustomCard";

const AllNotes: React.FC<{ notes: any[]; onDelete: (id: number) => void }> = ({
  notes,
  onDelete,
}) => {
  return (
    <div>
      {notes.map((note) => (
        <CustomCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          labelColor={note.color}
          tag={note.category}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
};

export default AllNotes;
