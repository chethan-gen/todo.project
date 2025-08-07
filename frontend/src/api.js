import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

export const fetchTodos = () => API.get("/");
export const addTodo = (todo) => API.post("/", todo);
export const updateTodo = (id, updates) => API.patch(`/${id}`, updates);
export const deleteTodo = (id) => API.delete(`/${id}`);
