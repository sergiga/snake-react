import React from 'react'

const styles = [
  { backgroundColor: '#FFFFFF' },
  { backgroundColor: '#00E676' },
  { backgroundColor: '#FF5252' }
]

export default function Square(props) {
  return (
    <div 
      className = 'board-square' 
      style = { styles[props.state] } 
    />
  )
}