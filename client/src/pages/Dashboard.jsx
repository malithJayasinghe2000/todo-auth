import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const Dashboard = () => {
    axios.defaults.withCredentials = true
    const { backendUrl, isLoggedin, getUserData, userData, setUserData, setIsLoggedin } = useContext(AppContext)
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTask, setSelectedTask] = useState(null)
    const [showTaskForm, setShowTaskForm] = useState(false)

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/login')
        } else {
            fetchTasks()
        }
    }, [isLoggedin, navigate])

    const fetchTasks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/api/task/get`)
            if (data.success) {
                setTasks(data.tasks)
            } else {
                toast.error(data.message || 'Failed to fetch tasks')
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (taskData) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/task/create`, taskData)
            if (data.success) {
                toast.success(data.message)
                fetchTasks()
                setShowTaskForm(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUpdateTask = async (taskData) => {
        console.log('taskData', taskData)
        console.log('selectedTask', selectedTask._id)
        try {
            const { data } = await axios.put(`${backendUrl}/api/task/update`, {
                ...taskData,
                taskId: selectedTask._id
            })
            if (data.success) {
                toast.success(data.message)
                fetchTasks()
                setSelectedTask(null)
                setShowTaskForm(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const { data } = await axios.delete(`${backendUrl}/api/task/delete`, {
                    data: { taskId }
                })
                if (data.success) {
                    toast.success(data.message)
                    fetchTasks()
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const openEditForm = (task) => {
        setSelectedTask(task)
        setShowTaskForm(true)
    }

    return (
        <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 to-pink-500 '>
            <nav className='w-full bg-slate-900/90 text-white p-4 shadow-lg fixed top-0 z-10 '>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Task Dashboard</h1>
                    <div className='flex items-center gap-4'>
                        <span className='hidden md:block'>Welcome, {userData?.name || 'User'}!</span>
                        <button
                            onClick={() => navigate('/change-password')}
                            className='py-1 px-3 text-sm border border-white rounded-lg text-white'
                        >
                            Change Password
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    const { data } = await axios.post(backendUrl + '/api/auth/logout')
                                    if (data.success) {
                                        setIsLoggedin(false)
                                        setUserData(false)
                                        navigate('/')
                                    }
                                } catch (error) {
                                    toast.error(error.message)
                                }
                            }}
                            className='py-1 px-3 mr-1 text-sm bg-red-600 rounded hover:bg-red-700'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            {/* <Navbar /> */}

            <div className='container mx-auto p-4 flex-grow top-24 mt-20'>
                <div className='flex flex-col md:flex-row md:justify-between items-center mb-6'>
                    <h2 className='text-xl font-bold mb-4 md:mb-0'>Your Tasks</h2>
                    <button
                        onClick={() => { setSelectedTask(null); setShowTaskForm(true) }}
                        className='bg-gradient-to-r from-blue-800 to-indigo-900 font-semibold text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition'
                        
                    >
                        Create New Task
                    </button>
                </div>

                {showTaskForm && (
                    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-10'>
                        <div className='bg-white rounded-lg p-6 w-full max-w-md'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-bold'>{selectedTask ? 'Edit Task' : 'Create New Task'}</h2>
                                <button onClick={() => { setShowTaskForm(false); setSelectedTask(null) }} className='text-gray-500'>
                                    &times;
                                </button>
                            </div>
                            <TaskForm
                                onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                                initialData={selectedTask}
                            />
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className='flex justify-center my-10'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600'></div>
                    </div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onEdit={openEditForm}
                        onDelete={handleDeleteTask}
                    />
                )}
            </div>
        </div>
    )
}

export default Dashboard
