import { StateProps } from './state'

export interface GetterProps {
  [propName: string]: any
}

const getter: GetterProps = {
  isLogin: (state: StateProps): boolean => state.loginStatus
}

export default getter