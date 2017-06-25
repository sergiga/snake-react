import React, { Component } from 'react'

import Greetings from './Greetings'

export default class Game extends Component {
  constructor() {
    super()

    this.state = {
      snake: [{ x: 0, y: 0 }],
      score: 0,
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
        <div>Playing</div>
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