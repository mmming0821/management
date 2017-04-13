<template>
  <div class="table">
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item><i class="el-icon-date"></i> 表格</el-breadcrumb-item>
      <el-breadcrumb-item>table</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 工具条 -->
    <el-row>
      <el-form :inline="true" v-model="getFilters" class="toolbar">
        <el-form-item>
          <el-input v-model="getFilters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserListPage">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--列表-->
    <el-table :data="getUsersList" highlight-current-row v-loading="getListLoading" @selection-change="selsChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" v-model="ShowEditForm" size="small">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" @change="setEditBirth" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
      <span slot="footer">
        <el-button @click="ShowEditForm = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 底部工具条 -->
    <el-row type="flex" class="toolbar-page" justify="space-between">
      <el-col :span="6">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      </el-col>
      <el-col :span="6">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="getTotal"></el-pagination>
      </el-col>
    </el-row>

    <!--新增弹窗-->
		<el-dialog title="新增" v-model="showAddForm">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="addForm.sex">
						<el-radio label="1">男</el-radio>
						<el-radio label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" @change="setAddBirth" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="showAddForm = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="getListLoading">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { markdownEditor } from 'vue-simplemde'
  export default {
    data () {
      return {
        // 编辑弹窗显示
        ShowEditForm: false,
        // 编辑弹窗数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        // 新增弹窗显示
        showAddForm: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请输入性别', trigger: 'blur' }
          ]
        },
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        // 列表选中对象
        sels: []
      }
    },
    methods: {
      ...mapActions([
        'getUserListPage',
        'removeUsers',
        'setPage',
        'editUser',
        'removeUser',
        'addUser'
      ]),
      // 日期选择控件返回值
      setEditBirth (val) {
        this.editForm.birth = val
      },
      setAddBirth (val) {
        this.addForm.birth = val
      },
      // 显示新增界面
      handleAdd () {
        this.showAddForm = true
      },
      // 当选择项发生变化时会触发该事件
      selsChange (sels) {
        this.sels = sels
      },
      // 判断性别
      formatSex (row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
      },
      // 显示编辑页面
      handleEdit (index, row) {
        this.ShowEditForm = true
        this.editForm = Object.assign({}, row)
      },
      // 批量删除
      batchRemove () {
        let ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.removeUsers({
            context: this,
            ids
          })
        })
      },
      // 分页器点击
      handleCurrentChange (val) {
        this.setPage(val)
        this.getUserListPage()
      },
      // 编辑
      editSubmit () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editUser({
                context: this,
                params: this.editForm
              })
            }).catch(() => {})
          }
        })
      },
      // 删除
      handleDel (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.removeUser({
            context: this,
            id: row.id
          })
        }).catch(() => {})
      },
      // 新增
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认新增吗？', '提示', {}).then(() => {
              this.addUser({
                context: this,
                params: this.addForm
              })
            }).catch(() => {})
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'getListLoading',
        'getUsersList',
        'getFilters',
        'getTotal'
      ])
    },
    mounted () {
      this.getUserListPage()
    },
    components: {
      markdownEditor
    }
  }
</script>

<style lang="scss" scoped>
  .crumbs {
    margin-bottom: 20px;
  }
  .toolbar {
    margin-bottom: 15px;
    border-radius: 4px;
    padding-top: 15px;
    padding-left: 20px;
    height: 50px;
    background-color: #EFF2F7;
  }
  .toolbar-page {
    margin: 15px 0;
    padding: 15px 20px;
    background-color: #EFF2F7;
  }
</style>
