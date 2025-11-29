import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import CalendarPage from "./pages/CalendarPage";
import About from "./pages/About";
import Sidebar from "./components/Sidebar";
import ProfileSettings from "./pages/ProfileSettings";

import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

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
          <Route path="/" element={user ? <Navigate to="/user" /> : <Home />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/user" /> : <AuthPage />}
          />
          <Route
            path="/user"
            element={user ? <UserDashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/user/:id/notes"
            element={user ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/user/:id/settings"
            element={user ? <ProfileSettings /> : <Navigate to="/auth" />}
          />
          <Route
            path="/user/:id/calendar"
            element={user ? <CalendarPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/user/:id/about"
            element={user ? <About /> : <Navigate to="/auth" />}
          />
        </Routes>
        {!user && <Footer />}
      </div>
    </>
  );
};

export default App;
