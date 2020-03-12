import React, {useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import {BookDetails} from "./BookDetails";

export const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);
  const getId = (id) => {
      setSelected(id);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map(({ id, name }) => (
          <li key={id} onClick={() => getId(id)}>{name}</li>
        ))}
      </ul>
      <BookDetails bookId={selected}/>
    </div>
  );
};
