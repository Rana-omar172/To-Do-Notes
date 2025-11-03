import React, { useState } from "react";


const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim())
      return alert("Please fill in both fields.");

    if (editIndex !== null) {
      // 🔹 Update existing note
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { title, details };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // 🔹 Add new note
      const newTask = { title, details };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
    }

    setTitle("");
    setDetails("");
  };

  const DeleteHandler = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const EditHandler = (index) => {
    // Fill inputs with note data for editing
    setTitle(tasks[index].title);
    setDetails(tasks[index].details);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white p-6">
      {/* Left: Add / Update Note Form */}
      <div className="flex flex-col w-full lg:w-1/2 max-w-lg p-8 bg-gray-800 rounded-2xl shadow-lg m-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editIndex !== null ? "Update Note" : "Add a New Note"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="h-12 px-4 rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Write your details here..."
          className="mt-4 h-40 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-none"
        ></textarea>

        <button
          onClick={SubmitHandler}
          className={`mt-6 py-3 rounded-lg ${
            editIndex !== null ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          } active:scale-95 transition-all duration-200 font-medium`}
        >
          {editIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Right: Notes Display */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Recent Notes</h1>

        {tasks.length === 0 ? (
          <p className="text-gray-400 italic">No notes yet. Add one above!</p>
        ) : (
          <div className="flex flex-wrap gap-5 mt-6 h-[90%] overflow-auto">
            {tasks.map((e, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between items-start h-52 w-44 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]"
              >
                <div>
                  <h3 className="text-lg font-bold leading-tight">{e.title}</h3>
                  <p className="mt-2 text-xs font-semibold text-gray-700 leading-tight">
                    {e.details}
                  </p>
                </div>

                <div className="w-full flex gap-2 mt-3">
                  <button
                    onClick={() => EditHandler(idx)}
                    className="flex-1 cursor-pointer active:scale-95 bg-yellow-500 py-1 text-xs rounded font-bold text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => DeleteHandler(idx)}
                    className="flex-1 cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default App

