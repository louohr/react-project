import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/BookInfo.css";
import { useBooks } from "../context/BooksContext";

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
  const { id } = useParams<{ id: string }>(); // Hämta ISBN från URL
  const [bookInfo, setBookInfo] = useState<Book | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { books, updateBook } = useBooks();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableBookInfo, setEditableBookInfo] = useState<Book | null>(null);

  const fetchBookInfo = async () => {
    if (!id) {
      setError("Book ISBN is invalid");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const book = books.find((b) => b.isbn === Number(id)); // Hitta bok efter ISBN
      if (!book) {
        setError("Book not found");
      } else {
        setBookInfo(book);
        setEditableBookInfo(book);
      }
    } catch (error) {
      setError("Error loading book information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookInfo();
  }, [id]);

  // Hantera formulär input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableBookInfo) {
      setEditableBookInfo({
        ...editableBookInfo,
        [name]: name === "pages" || name === "isbn" ? parseInt(value) : value,
      });
    }
  };

  // Hantera sparade ändringar
  const handleSave = () => {
    if (editableBookInfo) {
      updateBook(editableBookInfo);
      setBookInfo(editableBookInfo);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookInfo) {
    return <div>Book not found</div>;
  }

  // UI
  return (
    <>
      <section className="bookinfo">
        <h1>{isEditing ? "Edit book information" : "Book information"}</h1>
        {isEditing ? (
          <>
            <label className="form-text">
              Cover URL:
              <input
                type="text"
                name="cover"
                value={editableBookInfo?.cover || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-text">
              Title:
              <input
                type="text"
                name="title"
                value={editableBookInfo?.title || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-text">
              Author:
              <input
                type="text"
                name="author"
                value={editableBookInfo?.author || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-text">
              Pages:
              <input
                type="number"
                name="pages"
                value={editableBookInfo?.pages || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-text">
              ISBN:
              <input
                type="number"
                name="isbn"
                value={editableBookInfo?.isbn || ""}
                onChange={handleInputChange}
              />
            </label>
            <label className="form-text">
              Genre:
              <input
                type="text"
                name="genre"
                value={editableBookInfo?.genre || ""}
                onChange={handleInputChange}
              />
            </label>
            <button className="btn save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="btn cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <img className="bookinfo-image" src={bookInfo.cover} alt={bookInfo.title} />
            <ul>
              <li>Title: {bookInfo.title}</li>
              <li>Author: {bookInfo.author}</li>
              <li>Pages: {bookInfo.pages}</li>
              <li>ISBN: {bookInfo.isbn}</li>
              <li>Genre: {bookInfo.genre}</li>
            </ul>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default BookInfo;
