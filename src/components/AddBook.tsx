import { BooksProvider } from "../context/context";
import BookList from "../pages/BookList";
import FormPage from "../pages/FormPage";

function AddBook() {
  return (
    <BooksProvider>
      <div>
        <FormPage />
        <BookList />
      </div>
    </BooksProvider>
  );
}

export default AddBook;
