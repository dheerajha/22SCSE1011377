import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState(10);
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError("");

    try {
      const res = await fetch("http://localhost:8000/shorturls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortcode, validity }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(`http://localhost:8000/shorturls/${shortcode}`);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div className="container">
      <h1 className="title"> URL Shortener</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=" Enter Long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder=" Custom Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Validity in minutes"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          min={1}
        />
        <button type="submit"> Generate Short URL</button>
      </form>

      {shortUrl && (
        <p className="result">
          Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
        </p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
