
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100">
      {/* Mobile-first header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500">
            Todo List
          </h1>
          <p className="text-sm text-gray-500 mt-1">Organize your day</p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 py-6 pb-20">
        {/* Add todo form - mobile optimized */}
        <div className="mb-6">
          <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 outline-none px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 text-gray-700 placeholder-gray-400 shadow-sm bg-white text-base"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 active:scale-95 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-200 text-base"
              disabled={loading || !newTodo.trim()}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </form>
        </div>
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {/* Todo list */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center text-gray-400 py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
              <p className="mt-2">Loading...</p>
            </div>
          )}
          {!loading && todos.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-lg font-medium">No tasks yet</p>
              <p className="text-sm">Add your first task above!</p>
            </div>
          )}
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={clsx(
                "bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 overflow-hidden",
                todo.completed && "opacity-70"
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo._id, todo.completed)}
                    className="accent-indigo-500 w-5 h-5 mt-1 cursor-pointer flex-shrink-0"
                    disabled={loading}
                  />
                  <div className="flex-1 min-w-0">
                    {editId === todo._id ? (
                      <input
                        className="w-full outline-none px-3 py-2 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 text-gray-700 bg-white text-base"
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
                      <p
                        className={clsx(
                          "text-gray-800 text-base leading-relaxed break-words cursor-pointer",
                          todo.completed && "line-through text-gray-500"
                        )}
                        onClick={() => handleEdit(todo._id, todo.text)}
                        title="Tap to edit"
                      >
                        {todo.text}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action buttons - mobile optimized */}
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                  {editId === todo._id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(todo._id)}
                        className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-200 text-sm"
                        disabled={loading || !editText.trim()}
                      >
                        ✓ Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="bg-gray-300 hover:bg-gray-400 active:scale-95 text-gray-700 px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-200 text-sm"
                        disabled={loading}
                      >
                        ✕ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(todo._id, todo.text)}
                        className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 active:scale-95 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium"
                        disabled={loading}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 active:scale-95 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium"
                        disabled={loading}
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;