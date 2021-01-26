import { StateProps } from '../state'
import { GetterProps } from '../getters'
import { roleTypes } from '../mutation-types'

interface Role {
  roleId: number | string
  roleName: string
}

export default {
  namespace: true,
  state: () => ({
    role: {
      roleId: '000000',
      roleName: '超级管理员'
    } as Role
  }),
  getters: {
    isAdmin: (state: StateProps): boolean => (state.role as Role).roleId === '000000',
    adminLogin (state: StateProps, getters: GetterProps, rootState: StateProps, rootGetters: GetterProps) {
      return rootGetters.isLogin && getters.isAdmin
    }
  },
  mutations: {
    [roleTypes.CHNAGE_ROLE](state: StateProps, role: Role) {
      (state.role as Role).roleId = role.roleId
    }
  },
  actions: {
    changeCurrentRole(context: any, role: Role) {
      context.commit(roleTypes.CHNAGE_ROLE, role)
    }
  }
}