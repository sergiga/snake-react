import React from 'react'

export default function Greetings(props) {
  return (
    <form onSubmit={ props.handleSubmit }>
      <label>
        <h1>Welcome to the Snake!</h1>
        <span>Please, select a difficulty</span><br />
        <select value={ props.value } onChange={ props.handleChange }>
          <option value = "easy">Easy</option>
          <option value = "normal">Normal</option>
          <option value = "hard">Hard</option>
        </select>
      </label>
      <input type="submit" value="Select" />
    </form>
  )
}