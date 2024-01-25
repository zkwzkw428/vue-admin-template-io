// spu数据接口
import request from '@/utils/request'
// 获取spu列表接口函数
export const reqSpuList = (page, limit, category3Id) => request({url:`/admin/product/${page}/${limit}`, method: 'get', params: {category3Id}})
// 获取SPU信息
export const reqSpu = (spuId) => request({url: `/admin/product/getSpuById/${spuId}`, method: 'get'})
// 获取品牌信息
export const reqTradeMarkList = () => request({url: '/admin/product/baseTrademark/getTrademarkList', method: 'get'})
// 获取SPU图标接口
export const reqSpuImageList = (spuId) => request({url: `/admin/product/spuImageList/${spuId}`, method: 'get'})
// 获取平台全部销售属性(最多3个)
export const reqBaseSaleAttrList = () => request({url: '/admin/product/baseSaleAttrList', method: 'get'})
// 修改spu或者添加spu
export const reqAddorUpdateSpu = (spuInfo) => {
    // 携带参数id
    if(spuInfo.id) {
        return request({url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo})
    }else {
    // 携带的参数没有id
        return request({url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo})
    }
}
// 删除spu的接口
export const reqDeleteSpu = (spuId) => request({url: `/admin/product/deleteSpu/${spuId}`, method: 'delete'})