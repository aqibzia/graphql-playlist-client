import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

export const AddBook = () => {
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });
  const onchange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  const onSubmit = e => {
    e.preventDefault();
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <form id="add-book" onSubmit={onSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" onChange={onchange} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" onChange={onchange} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={onchange}>
          <option>Select author</option>
          {data.authors.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button>
        <span>+</span>
      </button>
    </form>
  );
};
