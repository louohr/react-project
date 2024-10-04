import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/BookInfo.css";

// Book interface to represent the data structure
interface Book {
  title: string;
  cover: string;
  author: string;
  pages: number;
  isbn: number;
  genre: string;
}

const BookInfo = () => {
  const { id } = useParams<{ id: string }>(); // hämta bok id från url
  const [bookInfo, setBookInfo] = useState<Book | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookInfo = async () => {
    if (!id) {
      setError("Book ID is invalid");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://majazocom.github.io/Data/books.json");
      const data: Book[] = await response.json();

      const book = data[parseInt(id)]; // Parse id to an integer
      if (!book) {
        setError("Book not found");
      } else {
        setBookInfo(book); // Set the book in the state if it exists
      }
    } catch (error) {
      setError("Error loading API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookInfo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookInfo) {
    return <div>Book not found</div>;
  }

  // renderar UI med parametrarna
  return (
    <>
      <section className="bookinfo">
        <h1>Book Information</h1>
        <img className="bookinfo-image" src={bookInfo.cover} alt={bookInfo.title} />
        <ul>
          <li>Title: {bookInfo.title}</li>
          <li>Author: {bookInfo.author}</li>
          <li>Pages: {bookInfo.pages}</li>
          <li>ISBN: {bookInfo.isbn}</li>
          <li>Genre: {bookInfo.genre}</li>
        </ul>
      </section>
    </>
  );
};

export default BookInfo;
