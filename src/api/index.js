// 将product相关的接口函数，统一进行暴露
import * as attr from './product/attr'
import * as trademark from './product/trademark'
import * as spu from './product/spu'
import * as sku  from './product/sku'
import * as skuManage from './product/skuManage'
export default {
    trademark,
    attr,
    spu,
    sku,
    skuManage,
}

