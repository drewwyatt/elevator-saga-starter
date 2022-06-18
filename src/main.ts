import { Game } from 'lib'

export const game: Game = {
  init: elevators => {
    const elevator = elevators[0]

    elevator.on('idle', () => {
      elevator.goToFloor(0)
      elevator.goToFloor(1)
      elevator.goToFloor(2)
    })
  },
  update: () => {},
}
