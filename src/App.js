import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [newinputTodo, updateNewinputTodo] = useState("");
  const [todoList, updateTodo] = useState([
    { id: 1, task: 'css' },
    { id: 2, task: 'html' }
  ]);
// *******************************************
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
// **********************************************
  const maxId = Math.max(...todoList.map(todo => todo.id));
  const nextId = maxId + 1;

  const TodoUpdater = () => {
    if (newinputTodo === "") {
      alert('Enter any task');
    } else {
      const nextTodo = [...todoList, { id: nextId, task: newinputTodo }];
      updateTodo(nextTodo);
      updateNewinputTodo("");
    }
  };

  const removeTodo = (id) => {
    const updatedAfterRemoving = todoList.filter(obj => obj.id !== id);
    updateTodo(updatedAfterRemoving);
  };
// ************************************************
  const editTodo = (id, task) => {
    setEditingId(id);
    setEditedTask(task);
  };

  const saveEditedTodo = (id) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id)
      {
        return { ...todo, task: editedTask };
      }
      return todo;
    });
    updateTodo(updatedTodoList);
    setEditingId(null);
  };
  // *************************************************88888

  return (
    <div className='container mt-5 w-60 border border-secondary border-3'>

      <h3 className='text-center text-primary mt-2'>TODO</h3>
      {/* first division start */}
      <div className='input-group mt-5'>
        <input value={newinputTodo} onChange={(e) => updateNewinputTodo(e.target.value)} className='form-control ' type='text'/>

        <button onClick={TodoUpdater} className='btn btn-outline-warning btn-lg'>Add</button>
      </div>

    {/* first division end */}

      <ol className="list-group list-group-numbered mt-3">

        {
        todoList.map(todo => (
          <li key={todo.id} className="list-group-item" style={{display:'flex',justifyContent:'space-between'}}>

            {
            editingId === todo.id ?
             (
              <>
              {/* ********************* */}
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                <button className='btn btn-outline-success btn-lg mx-2'onClick={() => saveEditedTodo(todo.id)}>
                  Save
                </button>
                {/* ********************* */}
              </>
            ) : (
              <>


                <p>{todo.task}</p>
                <button className='btn btn-outline-warning btn-lg mx-2' onClick={() => editTodo(todo.id, todo.task)}>
                  Edit
                </button>
                <button className='btn btn-outline-danger btn-lg' onClick={() => removeTodo(todo.id)}>
                  🗑️
                </button>
              </>
            )}
          </li>
        ))}
      </ol>



    </div>
  );
}

export default App;
