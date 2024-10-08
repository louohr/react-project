import { Link } from "react-router-dom";
import "../css/BookList.css";
import { useBooks } from "../context/context";

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

  if (books.length === 0) {
    return <div>No books available. Add some books!</div>;
  }

  return (
    <main className="main-booklist">
      <div className="content-container">
        <h1 className="header">My Book Collection</h1>
        <section className="book-grid">
          {books.map((book, index) => (
            <article className="book-card" key={index}>
              <Link to={`/bookinfo/${index}`}>
                <img className="bookcover" src={book.cover} alt={book.title} />
              </Link>
              <h3>{book.title}</h3>
              <button className="remove-btn" onClick={() => removeBook(index)}>
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
