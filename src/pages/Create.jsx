import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');  // Initialize task as an empty string

  const handleAdd = () => {

    if (task.trim()) {
      axios
        .post('http://localhost:3001/add', { task: task })
        .then((result) => {
          location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Task is empty!");
    }
  };

  return (
    <div className='create-form'>
      <input
        type='text'
        placeholder='Enter task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
};

export default Create;
