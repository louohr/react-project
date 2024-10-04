import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <section className="nav-links">
        <NavLink to="/">My Books</NavLink>
        <NavLink to="/booklist" className={(props) => (props.isActive ? "active-link" : "")}>
          Book list
        </NavLink>
      </section>
    </nav>
  );
}

export default Navbar;
