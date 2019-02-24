import React, { useContext, useReducer, useState, useEffect } from "react";
import TodosContext from "./context";
import TodosReducer from "./reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Axios from "axios";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await Axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api-mnikfepzx.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

export default App;
