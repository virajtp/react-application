import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import { addTask } from '../../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    title: '',
    description: '',
    dueDate: '',
    status: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddTask = () => {
    // const [task, setTask] = useState(initialValue);
    // const { title, description, dueDate, status } = task;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");

    let navigate = useNavigate();

    // const onValueChange = (e) => {
    //     setTask({ ...task, [e.target.title]: "e.target.value" })

    // }

    const createTask = async () => {
        const task = {
            title: title,
            description : description,
            dueDate : dueDate,
            status : status
        }
        await addTask(task);
        navigate('/allTasks');
    }

    return (
        <Container>
            <Typography variant="h4">Create Task</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input  onChange={(e) => setTitle(e.target.value)} name='title' id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => setDescription(e.target.value)} name='description'  id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Due Date</InputLabel>
                <Input onChange={(e) => setDueDate(e.target.value)} name='dueDate' id="my-input" />
            </FormControl>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Completion Status</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(e) => setStatus(e.target.value)}

                >
                    <FormControlLabel value="true" control={<Radio />} label="Completed" />
                    <FormControlLabel value="false" control={<Radio />} label="Not Completed" />
                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => createTask()}>Create Task</Button>
            </FormControl>
        </Container>
    )
}

export default AddTask;