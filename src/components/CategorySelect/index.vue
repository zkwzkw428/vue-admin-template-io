<template>
  <div>
    <!-- 三级联动 -->
    <!-- inline代表行内表单 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="!show">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1, index) in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="!show">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2, index) in list2" :key="c2.id"></el-option> 
        </el-select>
      </el-form-item>   
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="!show">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3, index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
        // 一级分类数据
        list1: [],
        // 二级分类数据
        list2: [],
        // 三级分类数据:
        list3: [],
        // 收集表单数据
        cForm: {
            category1Id: '',
            category2Id: '',
            category3Id: '',
        }
    }
  },
  props: ['show'],
  mounted() {
    // 获取一级分类数据
    this.getCategoryList1()
  },
  methods: {
    async getCategoryList1() {
        let result = await this.$API.attr.reqCategory1List()
        if(result.code === 200) {
            this.list1 = result.data
        }
    },
    async handler1() {
    // 当一级菜单发生改变的时候触发
    let result = await this.$API.attr.reqCategory2List(this.cForm.category1Id)
    if(result.code === 200) {
        this.list2 = []
        this.list3 = []
        this.cForm.category2Id = ''
        this.cForm.category3Id = ''
        this.list2 = result.data
        this.$emit('categoryHandler', {categoryId: this.cForm.category1Id, level: 'level'})
    }
  },
  async handler2 () {
    // 当二级菜单发生改变时触发
    let result = await this.$API.attr.reqCategory3List(this.cForm.category2Id)
    if(result.code === 200) {
        this.list3 = [] 
        this.cForm.category3Id = ''
        this.list3 = result.data
        this.$emit('categoryHandler', {categoryId: this.cForm.category2Id, level: 'level2'})
    }
  },
  async handler3() {
    // 当三级菜单发生改变时触发
    this.$emit('categoryHandler', {categoryId: this.cForm.category3Id, level: 'level3'})
  }
  },
};
</script>

<style></style>
