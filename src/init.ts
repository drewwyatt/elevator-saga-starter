import type { Elevator, Floor } from 'lib'

declare const elevators: Elevator[]
declare const floors: Floor[]

const elevator = elevators[0]

elevator.on('idle', () => {
  elevator.goToFloor(0)
  elevator.goToFloor(1)
  elevator.goToFloor(2)
})
