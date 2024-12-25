import "./App.css";
import AllNotes from "./components/AllNotes";
import { PlaceHolder } from "./components/PlaceHolder";
import { Outlet } from "react-router-dom";

function App() {
  const hasNotes = localStorage.getItem("allNotes");
  return (
    <>
      {hasNotes ? <AllNotes /> : <PlaceHolder />}
      <Outlet />
    </>
  );
}

export default App;
