import axios from 'axios';

const tasksUrl = 'http://localhost:3002/tasks';


export const getTasks = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${tasksUrl}/${id}`);
    } catch (error) {
        console.log('Error while calling getTasks api ', error);
    }
}

export const addTask = async (user) => {
    return await axios.post(`${tasksUrl}`, user);
}

export const deleteTask = async (id) => {
    return await axios.delete(`${tasksUrl}/${id}`);
}

export const editTask = async (id, user) => {
    return await axios.put(`${tasksUrl}/${id}`, user)
}