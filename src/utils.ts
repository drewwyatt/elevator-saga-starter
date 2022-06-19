import { Direction, Elevator } from 'lib'

export const getRemainingFloors = (elevator: Elevator, direction: Direction) => {
  const currentFloor = elevator.currentFloor()
  const predicate: (floor: number) => boolean =
    direction === Direction.down ? f => f < currentFloor : f => f > currentFloor
  return elevator.getPressedFloors().filter(predicate)
}

const setIndicatorForDirection = (elevator: Elevator, direction: Direction) =>
  direction === Direction.up
    ? elevator.goingUpIndicator(true)
    : elevator.goingDownIndicator(true)

const sortFloorsForDirection = (floors: number[], direction: Direction) => {
  const clone = [...floors]
  direction === Direction.down ? clone.sort().reverse() : clone.sort()

  return clone
}

const _handleFloorPressForDirection = (elevator: Elevator, direction: Direction) => {
  if (direction === Direction.stopped) return false

  const remainingFloors = getRemainingFloors(elevator, direction)
  if (remainingFloors.length) {
    elevator.stop()
    setIndicatorForDirection(elevator, direction)

    const floors = sortFloorsForDirection(remainingFloors, direction)
    for (let floor of floors) {
      elevator.goToFloor(floor)
    }

    return true
  }

  return false
}

const flipDirection = (direction: Direction) =>
  direction === Direction.up ? Direction.down : Direction.up

export const handleFloorPressForDirection = (
  elevator: Elevator,
  direction: Direction,
) => {
  if (direction === Direction.stopped) {
    throw new Error('Cannot handle floor press when stopped')
  }

  if (!_handleFloorPressForDirection(elevator, direction)) {
    _handleFloorPressForDirection(elevator, flipDirection(direction))
  }
}

const splitFloors = (elevator: Elevator) => {
  const floors = elevator.getPressedFloors()
  const currentFloor = elevator.currentFloor()
  const floorsAbove = floors.filter(f => f > currentFloor)
  const floorsBelow = floors.filter(f => f < currentFloor)

  return { floorsAbove, floorsBelow }
}

export const toNextDirection = (elevator: Elevator) => {
  const { floorsAbove, floorsBelow } = splitFloors(elevator)
  if (floorsAbove.length === 0 && floorsBelow.length === 0) return Direction.stopped
  return floorsAbove.length > floorsBelow.length ? Direction.up : Direction.down
}
