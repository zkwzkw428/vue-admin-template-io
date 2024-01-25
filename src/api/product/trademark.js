// 获取品牌相关的数据接口
import request from '@/utils/request.js'
// 获取品牌列表接口
export const reqTradeMarkList = (page,limit) => request({url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get'})/*  */
// 添加品牌接口(不需要携带id)
export const reqAddTradeMark = (trademark) => request({url: `/admin/product/baseTrademark/save`, method: 'post', data: trademark})
// 更新品牌接口(需要携带id)
export const reqUpdateTradeMark = (trademark) => request({url: `/admin/product/baseTrademark/update`, method: 'put', data: trademark})
// 删除品牌接口
export const reqDeleteTradeMark = (id) => request({url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'})