import { Direction, Elevator, Floor } from 'lib'
import { handleFloorPressForDirection, toNextDirection } from 'utils'

declare const elevators: Elevator[]
declare const floors: Floor[]

const elevator = elevators[0]

elevator.on('floor_button_pressed', floorNumber => {
  switch (elevator.destinationDirection()) {
    case Direction.up:
      handleFloorPressForDirection(elevator, Direction.up)
      break
    case Direction.down:
      handleFloorPressForDirection(elevator, Direction.down)
      break
    case Direction.stopped: {
      elevator.goToFloor(floorNumber)
    }
  }
})

elevator.on('idle', () => {
  const direction = toNextDirection(elevator)
  if (direction === Direction.stopped) return

  handleFloorPressForDirection(elevator, direction)
})
