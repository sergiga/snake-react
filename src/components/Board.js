import React, { Component } from 'react'

import Square from './Square'

export default class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      squares: Array(props.width * props.height).fill(0),
      snake: Array(1).fill(0),
      score: 0,
    }
  }

  render () {
    const style = { width: (this.props.width * 20 + this.props.width) + 'px' }
    const squares = this.state.squares.map((square, position) => {
      return (
        <Square 
          key = { position }
          state = { square }
        />
      )
    })
    return (
      <div>
        <div>Playing on { this.props.difficulty } mode.</div>
        <div className = 'board' style = { style }>
            { squares }
        </div>
      </div>
    )
  }
}