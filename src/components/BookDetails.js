import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

export const BookDetails = props => {
  const { data } = useQuery(getBookQuery, {
    variables: { id: props.bookId }
  });
  let displayBookDetails;
  if (data) {
    if (data.book != null) {
      const { book } = data;
      displayBookDetails = (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      displayBookDetails = <div>No book selected...</div>;
    }
  }
  return <div id="book-details">{displayBookDetails}</div>;
};
