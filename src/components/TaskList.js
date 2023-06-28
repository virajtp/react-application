import { useQuery } from '@apollo/client';
import React from 'react'
import { ALL_TASK } from '../lib/api';
import Task from './Task';
import { Typography } from '@mui/material';



const TaskList = () => {
  const { loading, error, data } = useQuery(ALL_TASK)


  if (loading) return <p>Getting tasks...</p>;
  if (error) return <p>An error occurred</p>;


  return (
    <div>
        <Typography sx={{color: '#ccc'}} variant="p" gutterBottom>
            Total Tasks: {data.tasks.length}
        </Typography>
        {data.tasks.length ?
            (
                <ul className='list'>
                    {data.tasks.map((task) => (
                        <Task task={task} key={task.id} getTask={ALL_TASK} />
                    ))}
                </ul>
            )
            :
            (
                <div className='no-tasks'>No Tasks</div>
            )
        }
    </div>
  )
}

export default TaskList;