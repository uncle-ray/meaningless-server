import { superTypes } from './mutation-types'

export default {
  incrementCount(context: any, count: number) {
    context.commit(superTypes.INCREMENT_COUNT, count)
  }
}