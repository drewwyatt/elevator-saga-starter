import type { Elevator, Floor } from 'lib'
import { onIdle } from 'callbacks'

declare const elevators: Elevator[]
declare const floors: Floor[]

for (let elevator of elevators) {
  elevator.on('idle', () => onIdle(elevator, floors))
}
