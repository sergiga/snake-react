import React, { Component } from 'react'

import Square from './Square'

const directions = {
  key38: 'up',
  key39: 'right',
  key40: 'down',
  key37: 'left'
}

function updateSquares(squares, snake, apple) {
  return squares.map((square, position) => {
    if(snake.some(s => s === position)) {
      return 1
    }
    else if(apple === position) {
      return 2
    }
    else {
      return 0
    }
  })
}

function nextPosition(position, direction, width, height) {
  const x = position % width
  const y = Math.floor(position / width)
  let nextX
  let nextY

  switch (direction) {
    case 'up':
      nextX = x
      nextY = (y - 1) < 0 ? height - 1 : y - 1
      break
    case 'right':
      nextX = (x + 1) % width
      nextY = y
      break
    case 'down':
      nextX = x
      nextY = (y + 1) % height
      break
    default:
      nextX = (x - 1) < 0 ? width - 1 : x - 1
      nextY = y
      break 
  }

  return nextY * height + nextX
}

export default class Board extends Component {
  constructor(props) {
    super(props)

    const totalSize = props.width * props.height
    let squares = Array(totalSize).fill(0)
    squares[0] = 1

    this.state = {
      squares: squares,
      snake: Array(1).fill(0),
      apple: Math.floor((Math.random() * (totalSize - 1)) + 1),
      direction: directions.key39,
      score: 0,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(event) {
    this.setState({
      direction: directions['key' + event.keyCode]
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)

    this.frameID = setInterval(
      () => this.nextFrame(),
      this.props.difficulty
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)

    clearInterval(this.frameID);
  }

  nextFrame() {
    const apple = this.state.apple
    const snake = this.state.snake.slice()
    let squares = this.state.squares.slice()

    snake.push(nextPosition(
      snake[snake.length - 1],
      this.state.direction,
      this.props.width,
      this.props.height
    ))
    snake.shift()

    squares = updateSquares(squares, snake, apple)

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