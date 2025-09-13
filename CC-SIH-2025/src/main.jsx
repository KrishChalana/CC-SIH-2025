import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import { ReactLenis, useLenis } from 'lenis/react'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
 
 <>
  <ReactLenis root />
 <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>

   </>
);



