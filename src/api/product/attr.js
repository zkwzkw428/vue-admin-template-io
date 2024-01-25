// 获取商品属性接口
import request from '@/utils/request'
// 获取一级分类接口
export const reqCategory1List = () => request({url: '/admin/product/getCategory1', method: 'get'})
// 获取二级分类接口
export const reqCategory2List = (category1Id) => request({url: `/admin/product/getCategory2/${category1Id}`, method: 'get'})
// 获取三级分类接口
export const reqCategory3List = (category2Id) => request({url: `/admin/product/getCategory3/${category2Id}`, method: 'get'}) 
// 获取筛选属性接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get'})
// 添加商品属性
export const reqAddAttrInfo = (baseAttrInfo) => request({url:`/admin/product/saveAttrInfo`, method: 'post', data: baseAttrInfo})