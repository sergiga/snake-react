import React, { Component } from 'react'

import Square from './Square'

const directions = {
  key38: 'up',
  key39: 'right',
  key40: 'down',
  key37: 'left'
}

function calculateNextPosition(position, direction, width, height) {
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

function updateSnake(snake, apple, nextPosition) {
  snake.push(nextPosition)
  
  if(nextPosition !== apple) { snake.shift() }
}

function updateApple(apple, snake, squares) {
  const snakeHead = snake[snake.length - 1]

  if(apple === snakeHead) { 
    const emptySquares = squares
      .map((square, position) => {
        return { value: square, position: position }
      })
      .filter(s => s.value === 0)
    const applePosition = Math.floor(
      Math.random() * (emptySquares.length - 1)
    )
    apple = emptySquares[applePosition].position
  }
  return apple
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
    const nextDirection = directions['key' + event.keyCode]
    const snakeHead = this.state.snake[this.state.snake.length - 1]
    const snakeSecondBlock = this.state.snake[this.state.snake.length - 2]
    const nextPosition = calculateNextPosition(
      snakeHead,
      nextDirection,
      this.props.width,
      this.props.height
    )

    if(nextPosition !== snakeSecondBlock) {
      this.setState({
        direction: nextDirection
      })
    }
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
    const snake = this.state.snake.slice()
    const nextPosition = calculateNextPosition(
      snake[snake.length - 1],
      this.state.direction,
      this.props.width,
      this.props.height
    )
    let squares = this.state.squares.slice()
    let apple = this.state.apple

    updateSnake(
      snake, 
      apple, 
      nextPosition
    )
    apple = updateApple(
      apple, 
      snake,
      squares
    )
    squares = updateSquares(squares, snake, apple)
    
    this.setState({
      squares: squares,
      snake: snake,
      apple: apple
    })
  }

  render () {
    const style = { width: (this.props.width * 20) + 'px' }
    const squares = this.state.squares.map((square, position) => {
      return (
        <Square 
          key = { position }
          state = { square }
        />
      )
    })
    return (
      <div className = 'board' style = { style }>
        { squares }
      </div>
    )
  }
}