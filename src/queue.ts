import { Direction, Floor } from 'lib'
import { assertNotStopped } from 'utils'

type Entry = { direction: Direction; floor: number }

export class Queue {
  private value: Entry[] = []

  private _floors: Floor[] | undefined
  private get floors(): Floor[] {
    this.assertInitialized()
    return this._floors!
  }

  public initialize(floors: Floor[]) {
    this._floors = floors
  }

  public push = (direction: Direction, floor: Floor) => {
    assertNotStopped(direction)
    this.value.push({ direction, floor: floor.floorNum() })
  }

  public pop = (currentFloor: number): [floors: number[], direction: Direction] => {
    const { above, below } = this.splitAt(currentFloor)
    if (above.length > below.length) {
      // going up
      this.remove(above)
      const floorNumbers = above.map(f => f.floor)
      floorNumbers.sort()
      return [floorNumbers, Direction.up]
    } else {
      // going down
      this.remove(below)
      const floorNumbers = below.map(f => f.floor)
      floorNumbers.sort().reverse()
      return [floorNumbers, Direction.down]
    }
  }

  private splitAt = (floorNumber: number) => {
    const above = this.value.filter(e => e.floor > floorNumber)
    const below = this.value.filter(e => e.floor < floorNumber)
    return { above, below } as const
  }

  private assertInitialized = () => {
    if (!Array.isArray(this.floors)) {
      throw new Error('queue accessed before initialization')
    }
  }

  private remove = (entries: Entry[]) => {
    this.value = this.value.filter(val => !entries.includes(val))
  }
}

export default new Queue()
