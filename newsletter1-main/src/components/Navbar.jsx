import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        MAG.com
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Newsletters</li>
        <li>Gallery</li>
        <li>Contact</li>
      </ul>

      <button className="nav-btn">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;