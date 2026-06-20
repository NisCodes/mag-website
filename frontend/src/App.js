import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HeadComponent from "./components/HeadComponent.jsx";
import Navbar from "./components/Navbar.jsx";
import Section from "./components/Section.jsx";
import Events from "./components/Events.jsx";
import Magazine from "./components/Magazine.jsx";
import BlogSection from "./components/Blogs_VNIT.jsx";
import BlogPage from "./components/BlogPage.jsx";
import EyesOnly from "./components/Eyes_Only.jsx";
import AddYourContent from "./components/Add_Your_Content.jsx";
import Gallery from "./components/Gallary.jsx";
import Team from "./components/Team.jsx";
import Prose from "./components/Prose.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function MainLayout() {
  const location = useLocation();
  const showNavbar = location.pathname === "/";

  return (
    <>
      <HeadComponent />
      {showNavbar && <Navbar />}
      <div className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Section />
                <Events />
                <Magazine />
                <BlogSection />
                <EyesOnly />
                <AddYourContent />
                <Gallery />
                <Team />
                <Contact />
              </>
            }
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/prose/english" element={<Prose category="English" />} />
          <Route path="/prose/hindi" element={<Prose category="Hindi" />} />
          <Route path="/prose/marathi" element={<Prose category="Marathi" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <MainLayout />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;