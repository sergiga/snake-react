import React, { Component } from 'react'

import Greetings from './Greetings'
import Board from './Board'

const difficulties = {
  easy: 160,
  normal: 120,
  hard: 80
}

export default class Game extends Component {
  constructor() {
    super()

    this.state = {
      width: 10,
      height: 10,
      difficulty: "easy",
      activeGame: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ difficulty: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({ activeGame: true })
  }

  render () {
    const isGameActive = this.state.activeGame

    if(isGameActive) {
      return (
        <Board 
          width = { this.state.width }
          height = { this.state.height }
          difficulty = { difficulties[this.state.difficulty] }
        />
      )
    }
    else {
      return (
        <Greetings
          handleChange = { this.handleChange }
          handleSubmit = { this.handleSubmit }
        />
      )
    }
  }
}