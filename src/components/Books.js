import React from "react";
import axios from "axios";
import apiClient from "../services/api";

const Books = (props) => {
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    apiClient
      .get("/book/")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const bookList = books.map((book) => (
    <div key={book.id} className="list-group-item">
      <h5>{book.title}</h5>
      <small>{book.author}</small>
    </div>
  ));
  if (props.loggedIn) {
    return <div>{bookList}</div>;
  }
  return <div>You are not logged in.</div>;
};

export default Books;
