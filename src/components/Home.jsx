import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/") // Change this if your backend runs on a different port
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Backend say: {message}</p>
      <Link to="/log-in">Log In</Link>
    </div>
  );
}
