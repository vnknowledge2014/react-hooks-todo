import React, { useState, useEffect, useContext } from "react";
import TodosContext from "../context";
import uuidv4 from "uuid/v4";
import Axios from "axios";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {  
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      if (!todo) {
        setError("Todo your enter not valid");
      } else {
        const response = await Axios.post(
          `https://hooks-api-mnikfepzx.now.sh/todos`,
          {
            id: uuidv4,
            text: todo,
            complete: false
          }
        );
        dispatch({ type: "ADD_TODO", payload: response.data });
      }
    }
    setTodo("");
  };

  return (
    <>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-black border-solid border-2"
          onChange={event => setTodo(event.target.value)}
          value={todo}
        />
      </form>
      {error && (
        <p className="text-red-light text-center">
          <strong>{error}</strong>
        </p>
      )}
    </>
  );
}
