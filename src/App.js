import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/" element={<Upload/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
