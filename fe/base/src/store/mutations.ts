import { StateProps } from './state'
import { superTypes } from './mutation-types'

export default {
  [superTypes.INCREMENT_COUNT] (state: StateProps, count: number) {
    state.count = state.count + count
  }
}