import type { Elevator, Floor } from 'lib'
import { registerButtonPresses, registerIdleBehavior } from 'callbacks'
import queue from 'queue'

declare const elevators: Elevator[]
declare const floors: Floor[]
queue.initialize(floors)

registerButtonPresses(queue, floors)
registerIdleBehavior(queue, elevators)
