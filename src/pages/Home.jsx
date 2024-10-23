import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill ,BsFillCheckCircleFill} from 'react-icons/bs'; // Import icons

const Home = () => {
  const [todo, setTodo] = useState([]);

  // Fetch todos when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/get')  // Adjust this according to your backend port
      .then((result) => setTodo(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle editing (e.g., marking as done)
  const handleEdit = (id) => {
    
    axios
      .put(`http://localhost:3001/update/${id}`)  // Correct URL construction
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    
    axios
      .delete(`http://localhost:3001/delete/${id}`)  // Correct URL construction
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='home'>
      <div className="home-info">
        <h2>Todo List</h2>
        <Create />
        {todo.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          todo.map((todoItem, index) => (
            <div className='task' key={index}>
              <div className="checkbox" onClick={() => handleEdit(todoItem._id)}>

                {todoItem.done ? <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>:<BsCircleFill className="icon" />} 
                 {/* Display circle icon */}
                <p className={todoItem.done? "line_through": ''}>{todoItem.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todoItem._id)} /></span> {/* Display trash icon */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
