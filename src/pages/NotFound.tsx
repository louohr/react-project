import "../css/NotFound.css";

export function NotFound() {
  return (
    <main className="error-main">
      <p className="code-404">Error - 404</p>
      <p className="error-msg">This page does not exist!</p>
      <p>Go read a book instead</p>
    </main>
  );
}
