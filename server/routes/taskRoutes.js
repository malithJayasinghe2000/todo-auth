import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { createTask, deleteTask, getTasks } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/create', userAuth, createTask);
taskRouter.get('/get', userAuth, getTasks);
taskRouter.delete('/delete',userAuth, deleteTask);

export default taskRouter;
