import { Outlet } from "react-router-dom";
import "./css/App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddBook from "./components/AddBook";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <AddBook />
    </>
  );
}

export default App;
