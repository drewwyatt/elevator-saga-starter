import type { Elevator, Floor } from 'lib'

export const onIdle = (elevator: Elevator, floors: Floor[]) => {
  for (let floor of floors) {
    elevator.goToFloor(floor.floorNum())
  }
}
