const AllNotes = () => {
  const allNotes: Array<any> = JSON.parse(
    localStorage.getItem("allNotes") || "[]"
  );

  return (
    <>
      {allNotes?.map(
        (note) => (
          console.log("test", note), (<div key={note.id}>{note.title}</div>)
        )
      )}
    </>
  );
};

export default AllNotes;
