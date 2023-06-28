import { useState, useEffect } from 'react';

import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled, TableSortLabel } from '@mui/material'

import { getTasks, deleteTask } from '../../Service/api';
import { Link, useNavigate } from 'react-router-dom';



const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


const AllTasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteTaskData = async (id) => {
        await deleteTask(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getTasks();
        setTasks(response.data);
    }
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');



    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => () => {
        handleSort(property);
    };

    return (
        <div>
            <div className='add_btn'>
                <Button onClick={() => navigate("/add")} color="primary">
                    Add Task
                </Button></div>
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Title </TableCell>
                        <TableCell>Discription</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Completion Status</TableCell>
                        <TableCell></TableCell>

                    </THead>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>{task.status == "true" ? "Completed" : "Not Completed"} </TableCell>

                            <TableCell>
                                <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${task.id}`}>Edit</Button>
                                <Button color="secondary" variant="contained" onClick={() => deleteTaskData(task.id)}>Delete</Button>
                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>
        </div>
    )
}

export default AllTasks;