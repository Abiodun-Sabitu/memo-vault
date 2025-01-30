import "./App.css";
import AllNotes from "./components/AllNotes";
import { PlaceHolder } from "./components/PlaceHolder";
import { Outlet } from "react-router-dom";
import useNotes from "./hooks/useNotes";
import { useSingleTab, SingleTabModal } from "single-tab";

function App() {
  const {
    notes,
    deleteNote,
    updateEditedNote,
    getNoteToEdit,
    onReorder,
    onFilter,
    setNotes,
    noteCategories,
    copiedNotes,
  } = useNotes();
  // console.log("Rendering notes from App:", notes);
  const { isDuplicate, showWarning, message } = useSingleTab("my-app");
  return (
    <>
      {isDuplicate && (
        <SingleTabModal isOpen={showWarning} content={<p>{message}</p>} />
      )}
      {notes?.length ? (
        <AllNotes
          notes={notes}
          onDelete={deleteNote}
          onEdit={updateEditedNote}
          getNoteToEdit={getNoteToEdit}
          onReorder={onReorder}
          onFilter={onFilter}
          setNotes={setNotes}
          noteCategories={noteCategories}
          copiedNotes={copiedNotes}
        />
      ) : (
        <PlaceHolder />
      )}

      <Outlet />
    </>
  );
}

export default App;
