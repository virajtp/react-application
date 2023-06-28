import { useMutation } from '@apollo/client'
import React, { useState }  from 'react'
import { DELETE_TASK, UPDATE_TASk } from '../lib/api';
import { Link } from 'react-router-dom';
import {AssignmentInd, Delete, Description, Update} from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Stack, Button, Modal, Box, FormControl, OutlinedInput, InputLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    minWidth: '800px',
    height: '300px',
    padding: '30px',
    bgcolor: '#292f38',
    boxShadow: 24,
  };

const Task = ({ task, getTask }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [replacementTask, setReplacementTask] = useState({});

    const handleOnChange = (event)=> {
        setReplacementTask({ ...replacementTask, [event.target.name]: event.target.value});
    }

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [
            { query: getTask },
        ]
    })
    const [updateTask] = useMutation(UPDATE_TASk, {
        refetchQueries: [
            { query: getTask },
        ]
    });

    const handleDelete = ()=> {
        deleteTask({ variables: { id: task.id }});
    }
    const handleUpdate = () => {
        updateTask({ variables: { id: task.id, ...replacementTask }})
    }


  return (
    <li className='list-item'>
        <List sx={{ width: '100%'}} component="nav" aria-labelledby="nested-list-subheader"
        >
            <Typography sx={{color: '#ccc'}} variant="h5" gutterBottom>
                {task.title}
            </Typography>
        <ListItemButton>
            <ListItemIcon>
             <Description sx={{ color: '#ccc'}} />
            </ListItemIcon>
            <ListItemText primary={task.description} />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentInd sx={{ color: '#ccc'}} />
            </ListItemIcon>
            <ListItemText primary={task.assignedTo} />
        </ListItemButton>
        </List>
        <Stack direction="row" spacing={1}>
            <Button className='btn-delete task-btn'>
                <Delete
                sx={{bgcolor: '#292f38', color: '#ccc'}}
                onClick={handleDelete}
                />
            </Button>
            <Button className='btn-delete task-btn'>
                <Update
                sx={{bgcolor: '#292f38', color: '#ccc'}}
                onClick={handleOpen}
                />
            </Button>
        </Stack>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box
        sx={style}>
        <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel sx={{color: '#cccc'}}>Title</InputLabel>
            <OutlinedInput
                onChange={handleOnChange}
                name='title'
                label="Title"
                sx={{color: '#cccc'}}
            />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel sx={{color: '#cccc'}}>Description</InputLabel>
            <OutlinedInput
                onChange={handleOnChange}
                name='description'
                label="Description"
                sx={{color: '#cccc'}}
            />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel sx={{color: '#cccc'}}>Assigned To</InputLabel>
            <OutlinedInput
                onChange={handleOnChange}
                name='assignedTo'
                label="Assigned To"
                sx={{color: '#cccc'}}
            />
        </FormControl>
        <Link to='/'>
            <Button onClick={handleUpdate} type='submit' sx={{ my: 1, py: 2 }} fullWidth variant="contained">Update</Button>
        </Link>
        </Box>
      </Modal>
    </li>
  )
}

export default Task