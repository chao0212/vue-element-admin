import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 生成角色可访问的路由
  generateRoutes({ commit }, roles) {
    console.log(roles)
    return new Promise(resolve => {
      let accessedRoutes
      // const arr = []
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []

        // for (const route of asyncRoutes){
        //   if(route.hasOwnProperty("meta")){
        //     if(route.meta.hasOwnProperty("roles")){
        //       if(route.meta.roles.includes("admin")){
        //           arr.push(route)
        //       }
        //     }else{//没有roles属性的route，角色
        //       arr.push(route)
        //     }
        //   }
        // }
        // accessedRoutes = arr
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
