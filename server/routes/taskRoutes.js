import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { createTask, deleteTask, getTasks, taskDone, updateTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/create', userAuth, createTask);
taskRouter.get('/get', userAuth, getTasks);
taskRouter.delete('/delete',userAuth, deleteTask);
taskRouter.put('/update',userAuth, updateTask);
taskRouter.put('/done',userAuth, taskDone); // Assuming you want to use the same updateTask function for marking as done

export default taskRouter;
