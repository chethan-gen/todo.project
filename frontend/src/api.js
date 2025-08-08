import axios from "axios";

// Use relative URL in production, localhost in development
const baseURL = import.meta.env.PROD
  ? "/api/todos"
  : "http://localhost:5000/api/todos";

const API = axios.create({
  baseURL: baseURL,
});

export const fetchTodos = () => API.get("/");
export const addTodo = (todo) => API.post("/", todo);
export const updateTodo = (id, updates) => API.patch(`/${id}`, updates);
export const deleteTodo = (id) => API.delete(`/${id}`);
