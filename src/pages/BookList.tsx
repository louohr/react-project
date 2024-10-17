import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/BookList.css";
import { useBooks } from "../context/BooksContext";

// Book interface
export interface IBook {
  title: string;
  author: string;
  pages: number;
  isbn: number;
  genre: string;
  cover: string;
}

function BookList() {
  const { books, removeBook } = useBooks();
  const [sortOrder, setSortOrder] = useState<string>("");

  // Sortering funktion
  const sortBooks = (books: IBook[]) => {
    switch (sortOrder) {
      case "alphabetical":
        return books.sort((a, b) => a.title.localeCompare(b.title, "sv"));
      case "pages-ascending":
        return books.sort((a, b) => a.pages - b.pages);
      default:
        return books; // Returnera osorterat om inget är valt
    }
  };

  // Hantera sorterings val från drop down
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  if (books.length === 0) {
    return (
      <div>
        <div className="nobooks-msg">No books in the collection. Add some books!</div>
        <Link to="/form">
          <button className="addbook-btn">Add book</button>
        </Link>
      </div>
    );
  }

  return (
    <main className="main-booklist">
      <div className="content-container">
        <h1 className="header">My Book Collection</h1>

        {/* Container for dropdown controls */}
        <div className="controls-container">
          <div className="sort-controls">
            <label htmlFor="sort-order" className="sort-label">
              Sorting:
            </label>
            <select
              id="sort-order"
              className="sort-dropdown"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="">Select order</option>
              <option value="alphabetical">Alphabetical (A-Ö)</option>
              <option value="pages-ascending">Number of Pages (Lowest to Highest)</option>
            </select>
          </div>
          <Link to="/form">
            <button className="addbook-button">Add book</button>
          </Link>
        </div>

        <section className="book-grid">
          {sortBooks([...books]).map((book) => (
            <article className="book-card" key={book.isbn}>
              <Link to={`/bookinfo/${book.isbn}`}>
                <img className="bookcover" src={book.cover} alt={book.title} />
              </Link>
              <h3>{book.title}</h3>
              <button
                className="remove-btn"
                onClick={() => removeBook(books.findIndex((b) => b.isbn === book.isbn))}
              >
                Remove
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default BookList;
