import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SqlData from "./components/SqlData";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending

  const handleSortAscending = () => {
    setSortOrder("asc");
  };

  const handleSortDescending = () => {
    setSortOrder("desc");
  };
  const handleSearch = (search) => {
    setSearchTerm(search);
  };
  return (
    <div>
      <React.Fragment>
        <Router>
          <ToastContainer />
          <Navbar
            onSearch={handleSearch}
            handleSortAscending={handleSortAscending}
            handleSortDescending={handleSortDescending}
          />
          <Routes>
            <Route
              path="/"
              element={
                <SqlData searchTerm={searchTerm} sortOrder={sortOrder} />
              }
            />
            <Route path="/add_contact" element={<Register />} />
            <Route path="/update/:id" element={<Register />} />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
};

export default App;
