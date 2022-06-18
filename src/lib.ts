export enum Direction {
  up = 'up',
  down = 'down',
  stopped = 'stopped',
}

export type Elevator = {
  /**
   * Queue the elevator to go to specified floor number. If you specify true as second argument, the elevator will go to that floor directly, and then go to any other queued floors.
   */
  goToFloor(floorNumber: number): void

  /**
   * Clear the destination queue and stop the elevator if it is moving. Note that you normally don't need to stop elevators - it is intended for advanced solutions with in-transit rescheduling logic. Also, note that the elevator will probably not stop at a floor, so passengers will not get out.
   */
  stop(): void

  /**
   * Gets the floor number that the elevator currently is on.
   */
  currentFloor(): number

  /**
   * Gets or sets the going up indicator, which will affect passenger behaviour when stopping at floors.
   */
  goingUpIndicator(): boolean
  goingUpIndicator(value: boolean): void

  /**
   * Gets or sets the going down indicator, which will affect passenger behaviour when stopping at floors.
   */
  goingDownIndicator(): boolean
  goingDownIndicator(value: boolean): void

  /**
   * Gets the maximum number of passengers that can occupy the elevator at the same time.
   */
  maxPassengerCount(): number
  maxPassengerCount(value: number): void

  /**
   * Gets the load factor of the elevator. 0 means empty, 1 means full. Varies with passenger weights, which vary - not an exact measure.
   */
  loadFactor(): number

  /**
   * Gets the direction the elevator is currently going to move toward. Can be "up", "down" or "stopped".
   */
  destinationDirection(): Direction

  /**
   * The current destination queue, meaning the floor numbers the elevator is scheduled to go to. Can be modified and emptied if desired. Note that you need to call checkDestinationQueue() for the change to take effect immediately.
   */
  destinationQueue: number[]

  /**
   * Checks the destination queue for any new destinations to go to. Note that you only need to call this if you modify the destination queue explicitly.
   */
  checkDestinationQueue(): void

  /**
   * Gets the currently pressed floor numbers as an array.
   */
  getPressedFloors(): number[]

  /**
   * Triggered when the elevator has completed all its tasks and is not doing anything.
   */
  on(event: 'idle', callback: () => void): void

  /**
   * Triggered when a passenger has pressed a button inside the elevator.
   */
  on(event: 'floor_button_pressed', callback: (floorNumber: number) => void): void

  /**
   * Triggered slightly before the elevator will pass a floor. A good time to decide whether to stop at that floor. Note that this event is not triggered for the destination floor. Direction is either "up" or "down".
   */
  on(
    event: 'passing_floor',
    callback: (floorNumber: number, direction: Direction) => void,
  ): void

  /**
   * Triggered when the elevator has arrived at a floor.
   */
  on(event: 'stopped_at_floor', callback: () => void): void
}

export type Floor = {
  /**
   * Gets the floor number of the floor object.
   */
  floorNum(): number

  /**
   * Triggered when someone has pressed the up button at a floor. Note that passengers will press the button again if they fail to enter an elevator.
   */
  on(event: 'up_button_pressed', callback: () => void): void

  /**
   * Triggered when someone has pressed the down button at a floor. Note that passengers will press the button again if they fail to enter an elevator.
   */
  on(event: 'down_button_pressed', callback: () => void): void
}
