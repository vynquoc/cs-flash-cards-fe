import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddCardPage from "./pages/AddCard";
import AllCardsPage from "./pages/AllCards";
import TodayCardsPage from "./pages/TodayCards";
import EditCardPage from "./pages/EditCard";
import RandomCardPage from "./pages/RandomCard";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#164863",
        },
      }}
    >
      <React.Fragment>
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
    </ConfigProvider>
  );
}

export default App;
