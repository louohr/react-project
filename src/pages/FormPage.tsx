import { useState } from "react";
import { useBooks } from "../context/context";
import "../css/FormPage.css";

// Book interface
export interface IBook {
  title: string;
  author: string;
  pages: number;
  isbn: number;
  cover: string;
  genre: string;
}

function FormPage() {
  const { addBook } = useBooks(); // hämta addBook function från context

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState<number | "">("");
  const [isbn, setIsbn] = useState<number | "">("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBook: IBook = {
      title,
      author,
      pages: Number(pages),
      isbn: Number(isbn),
      cover,
      genre,
    };

    addBook(newBook);

    // återställ fälten
    setTitle("");
    setAuthor("");
    setPages("");
    setIsbn("");
    setCover("");
    setGenre("");
  };

  return (
    <main>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <section className="form-group">
            <h1>Add a book</h1>
            <h2>Fill out this form to add a book to the collection</h2>

            <label>Title</label>
            <input
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          <section className="form-group">
            <label>Author</label>
            <input
              required
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </section>

          <section className="form-group">
            <label>Pages</label>
            <input
              required
              type="number"
              placeholder="0000"
              value={pages}
              onChange={(e) => setPages(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </section>

          <section className="form-group">
            <label>ISBN</label>
            <input
              required
              type="number"
              placeholder="0000"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </section>

          <section className="form-group">
            <label>Image URL</label>
            <input
              required
              placeholder="Cover URL"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </section>

          <section className="form-group">
            <label>Genre</label>
            <select required value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select a genre</option>
              <option value="fantasy">Fantasy</option>
              <option value="adventure">Adventure</option>
              <option value="philosophical fiction">Philosophical fiction</option>
              <option value="historical fiction">Historical fiction</option>
              <option value="tragedy">Tragedy</option>
              <option value="crime">Crime</option>
            </select>
          </section>

          <section className="submit-section">
            <button type="submit">Add book</button>
          </section>
        </form>
      </section>
    </main>
  );
}

export default FormPage;
