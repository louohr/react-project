import { Link } from "react-router-dom";
import "../css/BookList.css";
import { useEffect, useState } from "react";

// Book interface
interface IBook {
  title: string;
  author: string;
  pages: number;
  isbn: number;
  genre: string;
  cover: string;
}

function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // hämtar böcker från api
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://majazocom.github.io/Data/books.json");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data); // Set the book list
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show an error state if fetching failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Rendera bok listan
  return (
    <>
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
                <button className="remove-btn">Remove</button>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default BookList;
