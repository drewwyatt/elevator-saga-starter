import { Direction, Elevator, Floor } from 'lib'

export function assertNotStopped(
  direction: Direction,
): asserts direction is Direction.down | Direction.up {
  if (direction === Direction.stopped) {
    throw new Error('stopped direction not allowed in this context')
  }
}

// const getElevatorForDirectionOrQueue = ()
