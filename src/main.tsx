import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewNotes from "./components/NewNotes";
import AppLayout from "./components/AppLayout.tsx";

const Main = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="all-notes" element={<App />}></Route>
          <Route path="create-note" element={<NewNotes />}></Route>
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* Catch-all route */}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
createRoot(document.getElementById("root")!).render(<Main />);
