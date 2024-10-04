import { Link } from "react-router-dom";
import "../css/Home.css";
import { useEffect, useState } from "react";

interface Quote {
  content: string;
  author: string;
}

const Home = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hämta citat och välj ut random
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://louohr.github.io/my_apis/data/quotes.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // array av citat
      const quotes: Quote[] = data.quotes;

      // random citat
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      setQuote(randomQuote);
    } catch (error) {
      console.error("Error fetching API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call the fetchQuote function when the component mounts (on page load)
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <section className="home-section">
        {loading ? (
          <h1 className="brown-container">Loading...</h1>
        ) : (
          <div className="brown-container">
            <h1>{`"${quote?.content}"`}</h1>
            <h2 className="quote-author">- {quote?.author}</h2>
          </div>
        )}
      </section>
      <Link to="/form">
        <button className="addbook-btn">Add book</button>
      </Link>
    </>
  );
};

export default Home;
