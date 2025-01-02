import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNotes from "./components/NewNotes";
import AppLayout from "./components/AppLayout.tsx";
import useNotes from "./hooks/useNotes.tsx";

const Main = () => {
  const { notes } = useNotes();
  return (
    <BrowserRouter>
      <AppLayout notes={notes}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="all-notes" element={<App />}></Route>
          <Route path="create-note" element={<NewNotes />}></Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
createRoot(document.getElementById("root")!).render(<Main />);
