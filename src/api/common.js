import request from '@/utils/request'

const baseURL = 'http://127.0.0.1:9000'

/**
 * admin
 */
export function getAdminList(params) {
  return request({
    url: baseURL + `/admin/getAdminList`,
    method: 'get',
    params
  })
}

export function addAdmin(id, params) {
  return request({
    url: baseURL + `/admin/addAdmin/${id}`,
    method: 'post',
    data: params
  })
}

export function delAdmin(id) {
  return request({
    url: baseURL + `/admin/delAdmin/${id}`,
    method: 'get'
  })
}

/**
 * user
 */
export function getUserList(params) {
  return request({
    url: baseURL + `/user/getUserList`,
    method: 'get',
    params
  })
}

export function disableUserById(userId) {
  return request({
    url: baseURL + `/user/disableUserById/${userId}`,
    method: 'get'
  })
}

export function ableUserById(userId) {
  return request({
    url: baseURL + `/user/ableUserById/${userId}`,
    method: 'get'
  })
}

export function updUserInfo(params) {
  return request({
    url: baseURL + `/user/updUserInfo`,
    method: 'post',
    data: params
  })
}

/**
 * category
 */
export function getCategoryList(params) {
  return request({
    url: baseURL + `/category/getCategoryList`,
    method: 'get',
    params
  })
}

export function delCategory(id) {
  return request({
    url: baseURL + `/category/delCategory/${id}`,
    method: 'get'
  })
}

export function addCategory(params) {
  return request({
    url: baseURL + `/category/addCategory`,
    method: 'post',
    data: params
  })
}

export function getCategoryById(id) {
  return request({
    url: baseURL + `/category/getCategoryById/${id}`,
    method: 'get'
  })
}

export function updCategory(params) {
  return request({
    url: baseURL + `/category/updCategory`,
    method: 'post',
    data: params
  })
}

/**
 * comment
 */
export function getCommentList(pagenum = 1, pagesize = 10, detailId = 0) {
  return request({
    url: baseURL + `/comment/getCommentList/${pagenum}/${pagesize}/${detailId}`,
    method: 'get'
  })
}

export function disableComment(id, state) {
  return request({
    url: baseURL + `/comment/disableComment/${id}/${state}`,
    method: 'get'
  })
}

export function addComment(params) {
  return request({
    url: baseURL + `/comment/addComment`,
    method: 'post',
    data: params
  })
}

/**
 * log
 */
export function getLogList(params) {
  return request({
    url: baseURL + `/log/getLogList`,
    method: 'get',
    params
  })
}

export function getUserLogList(params) {
  return request({
    url: baseURL + `/log/getUserLogList`,
    method: 'get',
    params
  })
}

/**
 * detail
 */
export function addScenery(params) {
  return request({
    url: baseURL + `/detail/addScenery`,
    method: 'post',
    data: params
  })
}

export function getSceneryList(params, categoryId, draft, creator) {
  return request({
    url: baseURL + `/detail/getSceneryList/${categoryId}/${draft}/${creator}`,
    method: 'get',
    params
  })

}

export function getSceneryIndex() {
  return request({
    url: baseURL + `/detail/getSceneryIndex`,
    method: 'get'
  })
}

export function getSceneryInfo(id) {
  return request({
    url: baseURL + `/detail/getSceneryInfo/${id}`,
    method: 'get'
  })
}

export function pullScenery(id) {
  return request({
    url: baseURL + `/detail/pullScenery/${id}`,
    method: 'get'
  })
}

export function delScenery(id) {
  return request({
    url: baseURL + `/detail/delScenery/${id}`,
    method: 'get'
  })
}

export function getrotationList(id) {
  return request({
    url: baseURL + `/detail/getrotationList`,
    method: 'get'
  })
}

export function getSearchContent(content=" ") {
  return request({
    url: baseURL + `/detail/getSearchContent/${content}`,
    method: 'get'
  })
}

/**
 * login
 */

export function adminLogin(params) {
  return request({
    url: baseURL + `/admin/adminLogin`,
    method: 'post',
    data: params
  })
}

export function updPasswordById(id, params) {
  return request({
    url: baseURL + `/admin/updPasswordById/${id}`,
    method: 'post',
    data: params
  })
}

/**
 * uploadFile
 */
export function uploadFile() {
  return request({
    url: baseURL + `/upload/updataFile`,
    method: 'post',
    data: params
  })
}

export function getHomeCount() {
  return request({
    url: baseURL + `/admin/getHomeCount`,
    method: 'get'
  })
}

/**
 * 网站首页
 */

export function getCategoryListHome() {
  return request({
    url: baseURL + `/category/getCategoryList`,
    method: 'get'
  })
}

export function userLogin(params) {
  return request({
    url: baseURL + `/user/userLogin`,
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: baseURL + `/user/addUser`,
    method: 'post',
    data: params
  })
}


/**
 * 统计
 */

export function getEchartsCategory() {
  return request({
    url: baseURL + `/detail/getEchartsCategory`,
    method: 'get'
  })
}

export function getEchartsUser() {
  return request({
    url: baseURL + `/detail/getEchartsUser`,
    method: 'get'
  })
}
