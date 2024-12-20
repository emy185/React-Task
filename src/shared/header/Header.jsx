import React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/HomePage";
import AboutUs from "../../pages/about/AboutUs";
import ContactUs from "../../pages/contact/ContactUs";
import PostDetails from "../../features/posts/postDetails";
import NavBar from "./NavBar";

function Header() {
  return (
    <Router>
      <NavBar />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Header;
