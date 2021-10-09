import React from 'react'
import { IconButton } from '@chakra-ui/button'
import { FaTrash } from 'react-icons/fa'

function HabitCard({ habit, onDelete = () => {}, ...props }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20x 30px' }}>
      <div style={{ padding: '10px'}}>
        { habit.name }
      </div>
      <button onClick={() => onDelete(habit.id)} style={{ padding: '10px'}}>
        <IconButton aria-label="Add new habit" icon={<FaTrash/>} {...props} />
      </button> 
    </div>
  )
}

export default HabitCard
