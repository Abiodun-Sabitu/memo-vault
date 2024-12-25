import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNotes from "./components/NewNotes";
import AllNotes from "./components/AllNotes";
import AppLayout from "./components/AppLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="all-notes" element={<AllNotes />}></Route>
          <Route path="create-note" element={<NewNotes />}></Route>
        </Routes>
      </BrowserRouter>
    </AppLayout>
  </StrictMode>
);
