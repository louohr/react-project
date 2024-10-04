import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import { NotFound } from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import BookInfo from "./pages/BookInfo";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      // bok lista
      {
        path: "/booklist",
        element: <BookList />,
      },
      // information om specifik bok
      {
        path: "/bookinfo",
        element: <BookInfo />,
      },
      // informatiom om specifik bok
      {
        path: "/bookinfo/:id",
        element: <BookInfo />,
      },
      // lägga till bok formulär
      {
        path: "/form",
        element: <FormPage />,
      },
      // fel hantering sida
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
