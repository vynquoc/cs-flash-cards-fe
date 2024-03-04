import * as React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import AddCardPage from "./pages/AddCard";
import AllCardsPage from "./pages/AllCards";
import TodayCardsPage from "./pages/TodayCards";
import EditCardPage from "./pages/EditCard";
import RandomCardPage from "./pages/RandomCard";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<TodayCardsPage />} />
        <Route path="/today" element={<TodayCardsPage />} />
        <Route path="/all" element={<AllCardsPage />} />
        <Route path="/random" element={<RandomCardPage />} />
        <Route path="/add" element={<AddCardPage />} />
        <Route path="/edit/:id" element={<EditCardPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
