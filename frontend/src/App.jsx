
import { useState, useEffect } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api";
import clsx from "clsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchTodos();
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos");
    }
    setLoading(false);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await addTodo({ text: newTodo });
      setTodos([res.data, ...todos]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
    setLoading(false);
  };

  const handleToggle = async (id, completed) => {
    setLoading(true);
    setError("");
    try {
      const res = await updateTodo(id, { completed: !completed });
      setTodos(todos.map((todo) =>
        todo._id === id ? res.data : todo
      ));
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    }
    setLoading(false);
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await updateTodo(id, { text: editText });
      setTodos(todos.map((todo) =>
        todo._id === id ? res.data : todo
      ));
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    }
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl p-10 border border-gray-100">
        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 mb-2 drop-shadow-lg">Todo List</h1>
          <p className="text-lg text-gray-500 text-center">Organize your day with style</p>
        </div>
        <form onSubmit={handleAddTodo} className="flex gap-3 mb-8">
          <input
            className="flex-1 outline-none px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 text-gray-700 placeholder-gray-400 shadow-md bg-white/70"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-7 py-3 rounded-xl font-bold shadow-lg transition-all duration-200"
            disabled={loading || !newTodo.trim()}
          >
            Add
          </button>
        </form>
        {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
        <div className="space-y-4 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
          {loading && <div className="text-center text-gray-400">Loading...</div>}
          {!loading && todos.length === 0 && (
            <div className="text-center text-gray-400">No tasks yet. Add one!</div>
          )}
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={clsx(
                "flex items-center justify-between bg-white/90 rounded-2xl px-5 py-4 shadow-md border border-gray-100 group transition-all duration-200",
                todo.completed && "opacity-60 line-through"
              )}
            >
              <div className="flex items-center gap-4 w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo._id, todo.completed)}
                  className="accent-indigo-500 w-6 h-6 cursor-pointer"
                  disabled={loading}
                />
                {editId === todo._id ? (
                  <input
                    className="flex-1 outline-none px-3 py-2 rounded-lg border border-indigo-200 focus:border-indigo-400 text-gray-700 bg-white/80 shadow-sm"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditSave(todo._id);
                      if (e.key === 'Escape') handleEditCancel();
                    }}
                    autoFocus
                    disabled={loading}
                  />
                ) : (
                  <span className="flex-1 text-xl text-gray-800 select-text cursor-pointer" onDoubleClick={() => handleEdit(todo._id, todo.text)} title="Double click to edit">
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center ml-2">
                {editId === todo._id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(todo._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition"
                      disabled={loading || !editText.trim()}
                      title="Save"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg font-semibold shadow transition"
                      disabled={loading}
                      title="Cancel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(todo._id, todo.text)}
                      className="text-indigo-500 hover:text-indigo-700 px-2 py-1 rounded transition"
                      disabled={loading}
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L7.5 20.213l-4 1 1-4 12.362-12.726z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition"
                      disabled={loading}
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;