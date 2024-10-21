import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IBook } from "../pages/BookList";

// Define the shape of the context
interface BooksContextType {
  books: IBook[];
  addBook: (book: IBook) => void; // lägga till bok
  removeBook: (index: number) => void; // ta bort bok
  updateBook: (updatedBook: IBook) => void; // uppdatera bok
  loading: boolean;
  error: string | null;
}

// skapar context
export const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Provider component
export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<IBook[]>([]); // listan med böcker
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // hämtar från api
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://majazocom.github.io/Data/books.json");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // lägger till bok
  const addBook = (book: IBook) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  // ta bort bok
  const removeBook = (index: number) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  // uppdatera bok
  const updateBook = (updatedBook: IBook) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => (book.isbn === updatedBook.isbn ? updatedBook : book));
    });
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook, updateBook, loading, error }}>
      {children}
    </BooksContext.Provider>
  );
};

// use the context
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
