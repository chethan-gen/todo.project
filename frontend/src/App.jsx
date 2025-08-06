import { useState } from "react";

function App(){
  const[newTodo,setNewTodo] = useState();
 return(

  <div className="min-h-screen bg-gradient-to-br from gray-50 to-gray-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-x1 w-full max-w-1g p-8">
      <div>
        <h1 className="text-4x1 front-bold text-gray-800 mb-8">Task Manager</h1>
      </div>
      <form>
        <input className="outline-none px-3 py-2 text-gray-700 placeholder-gray-400" type="text" value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What needs to be done?" />
      </form>
    </div>
  </div>

 )
}

export default App;