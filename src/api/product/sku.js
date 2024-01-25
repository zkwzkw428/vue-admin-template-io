import request from '@/utils/request'
// 获取图片数据
export const reqSpuImageList = (spuId) => request({url: `/admin/product/spuImageList/${spuId}`, method: 'get'})
// 获取销售属性
export const reqSpuSaleAttrList = (spuId) => request({url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get'})
// 获取平台属性
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get'})
// 添加sku
export const reqAddSku = (skuInfo) => request({url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo})
// 获取sku列表数据的接口
export const reqSkuList = (spuId) => request({url: `/admin/product/findBySpuId/${spuId}`, method: 'get'})
// 