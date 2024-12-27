import { CustomCard } from "./CustomCard";

const AllNotes = () => {
  const allNotes: Array<any> = JSON.parse(
    localStorage.getItem("allNotes") || "[]"
  );

  return (
    <>
      {allNotes?.map((note) => (
        <>
          {/* <div key={note.id}>{note.title}</div> */}
          <CustomCard
            key={note.id}
            title={note.title}
            content={note.content}
            labelColor={note.color}
            tag={note.category}
          />
        </>
      ))}
    </>
  );
};

export default AllNotes;
