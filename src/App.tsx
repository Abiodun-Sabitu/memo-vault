import "./App.css";
import AllNotes from "./components/AllNotes";
import { PlaceHolder } from "./components/PlaceHolder";
import { Outlet } from "react-router-dom";
import useNotes from "./hooks/useNotes";

function App() {
  const { notes, deleteNote } = useNotes();
  return (
    <>
      {notes.length ? (
        <AllNotes notes={notes} onDelete={deleteNote} />
      ) : (
        <PlaceHolder />
      )}

      <Outlet />
    </>
  );
}

export default App;
