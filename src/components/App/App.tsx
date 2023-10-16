import { Route, Routes } from "react-router-dom";
import Inbox from "../Inbox/Inbox";
import Files from "../Files/Files";
import Navbar from "../Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<p>page not exist</p>} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </>
  );
}

export default App;
