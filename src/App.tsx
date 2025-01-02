import "./App.css";
import AllNotes from "./components/AllNotes";
import { PlaceHolder } from "./components/PlaceHolder";
import { Outlet } from "react-router-dom";
import useNotes from "./hooks/useNotes";

function App() {
  const { notes, deleteNote, updateEditedNote, getNoteToEdit, onReorder } =
    useNotes();
  // console.log("Rendering notes from App:", notes);

  return (
    <>
      {notes?.length ? (
        <AllNotes
          notes={notes}
          onDelete={deleteNote}
          onEdit={updateEditedNote}
          getNoteToEdit={getNoteToEdit}
          onReorder={onReorder}
        />
      ) : (
        <PlaceHolder />
      )}

      <Outlet />
    </>
  );
}

export default App;
