<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @categoryHandler="categoryHandler" :show="isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!category3Id"
        @click="addAttr"
        v-show="isShowTable"
        >添加属性</el-button
      >
      <!-- 表格属性展示区 -->
      <el-table
        border
        style="width: 100%"
        :data="attrList"
        v-show="isShowTable"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          textAlign="center"
        >
        </el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="150"
        ></el-table-column>
        <el-table-column label="属性值列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag
              type="success"
              v-for="(attrValue, index) in row.attrValueList"
              :key="attrValue.id"
              style="margin: 0px 20px"
              >{{ attrValue.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row, $index }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="edit"
              icon="el-icon-edit"
              size="mini"
              @click="updateAttr(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加属性区 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            prop="prop"
            label="序号"
            type="index"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-show="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="row.flag = false"
                :ref="$index"
              ></el-input>
              <span
                v-show="!row.flag"
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="isSave">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 商品属性数据
      attrList: [],
      // 控制表格是否显示
      isShowTable: true,
      // 收集新增属性
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
        id: 0,
      },
    };
  },
  computed: {
    isSave() {
      return this.attrInfo.attrValueList.length < 1
    }
  },
  methods: {
    // 自定义事件获取属性id
    async categoryHandler(categoryObj) {
      const { categoryId, level } = categoryObj;
      if (level == "level") {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == "level2") {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        // 发请求
        const { category1Id, category2Id, category3Id } = this;
        let result = await this.$API.attr.reqAttrInfoList(
          category1Id,
          category2Id,
          category3Id
        );
        console.log(result);
        if (result.code === 200) {
          this.attrList = result.data;
        }
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        // 控制span和el-input的显示隐藏
        flag: true,
      });
      // 让最后一项自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false;
      // 将属性值列表重置
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 编辑属性
    updateAttr(row) {
      (this.isShowTable = false),
        // 深拷贝row,否则编辑之后不保存也会影响原数据
        // 由于深拷贝是将对象当中的所有层次结构进行复制，而不涉及复制引用地址的操作，所以不管怎么改都不会影响原数据。
        (this.attrInfo = cloneDeep(row));
      this.attrInfo.attrValueList.forEach((item) => {
        // 添加响应式属性flag
        this.$set(item, "flag", false);
      });
    },
    // 失焦回调，切换到显示模式
    toLook(row) {
      // 判断是否输入为空
      if (!row.valueName.trim() == "") {
        row.flag = false;
      } else {
        this.$message("输出内容不能为空");
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (item !== row) {
          // 其他项
          return item.valueName === row.valueName;
        }
      });
      if (isRepeat) {
        this.$message("已经存在相同的属性值");
        row.flag = true;
      }
    },
    // 切换到编辑模式
    toEdit(row, index) {
      row.flag = true;
      // 注意由于数据更新会触发视图的更新，而视图的渲染需要时间，如果立即获取dom则无法获取，显示undefined
      // nextTick可以在节点更新之后，再调用，此时就能获取到dom元素
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮，进行添加属性或者修改属性的回调
    async addOrUpdateAttr() {
      const {category1Id, category2Id, category3Id} = this;
      // 过滤掉属性值为空的数据
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
         if(item.valueName !== '') {
          delete item.flag
          return true
         }
        }
      );
      // 过滤完之后需要发请求获取最新的属性列表进行展示
      // 由于axios当中的拦截器有失败的处理，捕获到异常就意味着响应失败
      try {
        // 修改或者添加属性
        await this.$API.attr.reqAddAttrInfo(this.attrInfo)
        this.$message({
          type: 'success',
          message: '请求成功!'
        })
        // 显示属性详情页
        this.isShowTable = true
        // 重新获取属性列表
        let result = await this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id)
        if(result.code === 200) {
          this.attrList = result.data
        }
      } catch (error) {
        this.$message("操作失败!")
      }
    },
  },
};
</script>

<style></style>
