import React from 'react'

const TaskItem = ({ task, onEdit, onDelete, isToday }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    
    // Format the date part
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dateFormatted = date.toLocaleDateString(undefined, options);
    
    // Format the time part
    const timeFormatted = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    return { dateFormatted, timeFormatted };
  }
  
  // Check if task is overdue
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < now && !task.completed;
  
  // Get relative time
  const getTimeRemaining = () => {
    if (isOverdue) {
      const diffMs = now - dueDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} overdue`;
      }
      
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} overdue`;
      }
      
      return 'Overdue';
    } else {
      const diffMs = dueDate - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
      }
      
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
      }
      
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `in ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };
  
  const { dateFormatted, timeFormatted } = formatDateTime(task.dueDate);
  const timeRemaining = getTimeRemaining();
  
  // Determine card styling based on task status
  let cardStyle = 'bg-white/90';
  let borderStyle = '';
  let highlightStyle = '';
  
  if (isToday) {
    cardStyle = 'bg-gradient-to-br from-blue-50 to-blue-100 shadow-md';
    borderStyle = 'border-l-4 border-blue-500';
    highlightStyle = 'ring-2 ring-blue-300 ring-opacity-50';
  } else if (isOverdue) {
    borderStyle = 'border-l-4 border-red-500';
    cardStyle = 'bg-red-50/90';
  }
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${cardStyle} ${highlightStyle}`}>
      <div className={`p-4 ${borderStyle}`}>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-semibold text-lg text-gray-800 break-words'>{task.title}</h3>
          <div className='flex gap-2'>
            <button 
              onClick={onEdit}
              className='text-blue-600 hover:text-blue-800'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              onClick={onDelete}
              className='text-red-600 hover:text-red-800'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <p className='text-gray-600 mb-4 break-words'>{task.description}</p>
        
        <div className='flex flex-col gap-1 text-sm'>
          <div className={`${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
            Due: {dateFormatted} at {timeFormatted}
            {isToday && !isOverdue && <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full'>Today</span>}
          </div>
          <div className={`${isOverdue ? 'text-red-600' : 'text-blue-600'} font-medium`}>
            {timeRemaining}
            {isOverdue && <span className='ml-2 text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded'>Overdue</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
