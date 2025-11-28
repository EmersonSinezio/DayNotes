import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import ProfileSettings from "./pages/ProfileSettings";

const App = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <>
      {!user && <Header />}
      {user && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      <div
        className={
          user
            ? `${
                isSidebarOpen ? "md:ml-64" : "md:ml-20"
              } transition-all duration-300`
            : ""
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          {user && <Route path="/user" element={<Dashboard />} />}
          {user && <Route path="/user/:id/notes" element={<Dashboard />} />}
          {user && (
            <Route path="/user/:id/settings" element={<ProfileSettings />} />
          )}
        </Routes>
        {!user && <Footer />}
      </div>
    </>
  );
};

export default App;
