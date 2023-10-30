import { Route, Routes } from "react-router-dom";
import Inbox from "../Inbox/Inbox";
import Files from "../Files/Files";
import Navbar from "../Navbar/Navbar";
import React from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<p>page not exist</p>} />
        <Route path="/" element={<Inbox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </>
  );
}

export default App;
