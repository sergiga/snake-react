import React, { Component } from 'react'

import Square from './Square'

function nextPosition(position, width, height) {
  return (position + 1) % width
}

export default class Board extends Component {
  constructor(props) {
    super(props)

    let squares = Array(props.width * props.height).fill(0)
    squares[0] = 1

    this.state = {
      squares: squares,
      snake: Array(1).fill(0),
      score: 0,
    }
  }

  componentDidMount() {
    this.frameID = setInterval(
      () => this.nextFrame(),
      120
    );
  }

  componentWillUnmount() {
    clearInterval(this.frameID);
  }

  nextFrame() {
    const snake = this.state.snake.slice()
    let squares = this.state.squares.slice()

    snake.push(nextPosition(
      snake[snake.length - 1],
      this.props.width,
      this.props.height
    ))
    snake.shift()

    squares = squares.map((square, position) => {
      if(snake.some(s => s === position)) {
        return 1
      }
      else {
        return 0
      }
    })

    this.setState({
      squares: squares,
      snake: snake
    })
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