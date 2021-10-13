import React from 'react'
import { IconButton } from '@chakra-ui/button'
import { FaTrash, FaCheckCircle } from 'react-icons/fa'

function HabitCard({ habit, onDelete = () => {}, onComplete = () => {}, ...props }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20x 30px' }}>
      <div style={{ padding: '10px'}}>
        { habit.name }
      </div>
      <div>
      </div>
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div onClick={() => onComplete(habit.id)} style={{ marginRight: '5px'}}>
          <IconButton aria-label="Add new habit" icon={<FaCheckCircle />} {...props} />
        </div>
        <div onClick={() => onDelete(habit.id)}>
          <IconButton aria-label="Add new habit" icon={<FaTrash/>} {...props} />
        </div>
      </div> 
    </div>
  )
}

export default HabitCard
