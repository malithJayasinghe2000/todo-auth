import React, { useState } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [sortOption, setSortOption] = useState('default') // default, date-asc, date-desc
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    startTime: '00:00',
    endTime: '23:59'
  })
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }
  
  // Clear filters
  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      startTime: '00:00',
      endTime: '23:59'
    })
  }
  
  if (tasks.length === 0) {
    return (
      <div className='bg-white/80 rounded-lg shadow p-6 text-center'>
        <p className='text-gray-600'>No tasks found. Create a new task to get started.</p>
      </div>
    )
  }
  
  // Apply date/time filtering
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate)
    let passesFilter = true
    
    // Filter by start date
    if (filters.startDate) {
      const startDateTime = new Date(`${filters.startDate}T00:00:00`)
      if (taskDate < startDateTime) {
        passesFilter = false
      }
    }
    
    // Filter by end date
    if (filters.endDate && passesFilter) {
      const endDateTime = new Date(`${filters.endDate}T23:59:59`)
      if (taskDate > endDateTime) {
        passesFilter = false
      }
    }
    
    // Filter by start time
    if (passesFilter && filters.startTime) {
      const [startHours, startMinutes] = filters.startTime.split(':').map(Number)
      const taskHours = taskDate.getHours()
      const taskMinutes = taskDate.getMinutes()
      
      // Convert to minutes for easier comparison
      const startTimeInMinutes = startHours * 60 + startMinutes
      const taskTimeInMinutes = taskHours * 60 + taskMinutes
      
      if (taskTimeInMinutes < startTimeInMinutes) {
        passesFilter = false
      }
    }
    
    // Filter by end time
    if (passesFilter && filters.endTime) {
      const [endHours, endMinutes] = filters.endTime.split(':').map(Number)
      const taskHours = taskDate.getHours()
      const taskMinutes = taskDate.getMinutes()
      
      // Convert to minutes for easier comparison
      const endTimeInMinutes = endHours * 60 + endMinutes
      const taskTimeInMinutes = taskHours * 60 + taskMinutes
      
      if (taskTimeInMinutes > endTimeInMinutes) {
        passesFilter = false
      }
    }
    
    return passesFilter
  })
  
  // Identify today's date (without time)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // Group tasks by day
  const todayTasks = []
  const upcomingTasks = []
  const overdueTasks = []
  
  filteredTasks.forEach(task => {
    const taskDate = new Date(task.dueDate)
    const taskDay = new Date(taskDate)
    taskDay.setHours(0, 0, 0, 0)
    
    const now = new Date()
    
    // Check if task is due today
    if (taskDay.getTime() === today.getTime()) {
      task.isToday = true
      todayTasks.push(task)
    } 
    // Check if task is overdue
    else if (taskDate < now && !task.completed) {
      task.isOverdue = true
      overdueTasks.push(task)
    } 
    // Otherwise it's an upcoming task
    else {
      task.isUpcoming = true
      upcomingTasks.push(task)
    }
  })
  
  // Sort tasks based on selected option
  const sortTasks = (tasksToSort) => {
    switch (sortOption) {
      case 'date-asc':
        return [...tasksToSort].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      case 'date-desc':
        return [...tasksToSort].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      case 'time-asc':
        return [...tasksToSort].sort((a, b) => {
          const timeA = new Date(a.dueDate).getHours() * 60 + new Date(a.dueDate).getMinutes()
          const timeB = new Date(b.dueDate).getHours() * 60 + new Date(b.dueDate).getMinutes()
          return timeA - timeB
        })
      case 'time-desc':
        return [...tasksToSort].sort((a, b) => {
          const timeA = new Date(a.dueDate).getHours() * 60 + new Date(a.dueDate).getMinutes()
          const timeB = new Date(b.dueDate).getHours() * 60 + new Date(b.dueDate).getMinutes()
          return timeB - timeA
        })
      default:
        // Default sorting: chronologically for each category
        return [...tasksToSort].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    }
  }
  
  const sortedToday = sortTasks(todayTasks)
  const sortedUpcoming = sortTasks(upcomingTasks)
  const sortedOverdue = sortTasks(overdueTasks)
  
  // Check if any filters are active
  const isFilterActive = filters.startDate || filters.endDate || 
                         filters.startTime !== '00:00' || filters.endTime !== '23:59'
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filter
          </button>
          
          {isFilterActive && (
            <button 
              onClick={clearFilters} 
              className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm transition"
            >
              Clear Filters
            </button>
          )}
          
          <div className="text-sm text-gray-600">
            {filteredTasks.length} task{filteredTasks.length !== 1 && 's'} 
            {isFilterActive ? ' match filters' : ''}
          </div>
        </div>
        
        <select 
          className="px-4 py-2 rounded-md bg-white/90 border border-gray-300 shadow-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="date-asc">Date (Earliest First)</option>
          <option value="date-desc">Date (Latest First)</option>
          <option value="time-asc">Time (Morning First)</option>
          <option value="time-desc">Time (Evening First)</option>
        </select>
      </div>
      
     
        <div className="bg-white/90 p-4 rounded-lg shadow mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Filter Tasks</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <div className="flex gap-2 items-center">
                <div>
                  <label className="block text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time Range</label>
              <div className="flex gap-2 items-center">
                <div>
                  <label className="block text-xs text-gray-500">From</label>
                  <input
                    type="time"
                    name="startTime"
                    value={filters.startTime}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">To</label>
                  <input
                    type="time"
                    name="endTime"
                    value={filters.endTime}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
      
      {filteredTasks.length === 0 ? (
        <div className="bg-white/80 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No tasks match the selected filters.</p>
        </div>
      ) : (
        <>
          {sortedToday.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-2 px-4 rounded-md inline-block">
                Today's Tasks ({sortedToday.length})
              </h3>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {sortedToday.map(task => (
                  <TaskItem 
                    key={task._id} 
                    task={task} 
                    onEdit={() => onEdit(task)} 
                    onDelete={() => onDelete(task._id)} 
                    isToday={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          {sortedUpcoming.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Upcoming Tasks ({sortedUpcoming.length})
              </h3>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {sortedUpcoming.map(task => (
                  <TaskItem 
                    key={task._id} 
                    task={task} 
                    onEdit={() => onEdit(task)} 
                    onDelete={() => onDelete(task._id)} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {sortedOverdue.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-red-600">
                Overdue Tasks ({sortedOverdue.length})
              </h3>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {sortedOverdue.map(task => (
                  <TaskItem 
                    key={task._id} 
                    task={task} 
                    onEdit={() => onEdit(task)} 
                    onDelete={() => onDelete(task._id)} 
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TaskList
