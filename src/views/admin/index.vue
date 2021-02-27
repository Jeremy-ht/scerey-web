<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">
      <!--新增按钮-->
      <el-button class="admin-add-btn" type="primary" size="small" @click="addAdminBtn">新增员工</el-button>


      <!--表格-->
      <el-table height="375" :data="adminList" stripe style="width: 100%; margin-top: 10px" border size="small">
        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="用户名" prop="username" align="center" width="80px"/>
        <el-table-column label="姓名" prop="name" align="center"/>
        <el-table-column label="联系方式" prop="phone" align="center" width="130px"/>
        <el-table-column label="性别" prop="sex" align="center" width="80px">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
            <span v-else>女</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" prop="email" align="center" width="180px"/>
        <el-table-column label="创建者" prop="creatorName" align="center"/>
        <el-table-column label="创建时间" align="center" width="170px">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.creatime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120px" align="center">
          <template slot-scope="scope">
            <!--删除-->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserBtn(scope.row.id)"/>
          </template>
        </el-table-column>

      </el-table>


      <!--分页-->
      <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>

    </el-card>


    <!--添加用户的对话框-->
    <el-dialog title="新增员工" :visible.sync="addDialogVisible" width="50%" @close="closeAddAdminForm()">
      <span>
        <!--表单-->
        <el-form :inline="true" :model="addAdminInfo" :rules="addUserRules" ref="addAdminRef" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addAdminInfo.username"/>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input v-model="addAdminInfo.name"/>
          </el-form-item>

          <el-form-item label="手机" prop="phone">
            <el-input v-model="addAdminInfo.phone"/>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addAdminInfo.email"/>
          </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="addAdminInfo.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
      </el-form-item>

        </el-form>
      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAdmin">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import { getAdminList, addAdmin, delAdmin } from '../../api/common'
  import PageBar from '@/components/PageBar'

  export default {
    name:'index',
    data() {

      // 验证手机号的规则
      let checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }

      // 验证邮箱的规则
      let checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      }

      return {
        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        // 添加用户对话框
        addDialogVisible: false,
        adminList: [],

        addAdminInfo: {
          username: '',
          name: '',
          sex: '',
          email: '',
          phone: '',
          icon: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },

        // 添加用户表单验证
        addUserRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ],
          email: [
            { required: false, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      PageBar

    },
    created() {
      this.getAdminList()

    },
    methods: {
      // 初始化
      getAdminList() {
        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        getAdminList(params).then(res => {
          if (res.success) {
            this.pageTotal = res.data.total
            this.adminList = res.data.data

          }else {
            this.$message({ message: '获取员工列表失败', type: 'error', duration: 1700 })
          }

        })

      },

      // 分页
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getAdminList()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getAdminList()
      },

      // 添加
      addAdminBtn() {
        this.addDialogVisible = true

      },
      addAdmin() {
        let admin = this.addAdminInfo
        addAdmin('1', admin).then(res => {
          if (res.success) {
            this.addDialogVisible = false
            this.getAdminList()
            this.$message({ message: '新增员工成功', type: 'success', duration: 1700 })
          } else {
            this.$message({ message: '新增员工失败', type: 'error', duration: 1700 })
          }

        })

      },

      // 删除
      delUserBtn(id) {
        console.log(id)
        this.$confirm('是否确定删除该员工?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delAdmin(id).then(res => {
            if (res.success) {
              this.getAdminList()
              this.$message({ message: '删除员工成功', type: 'success', duration: 1700 })
            } else {
              this.$message({ message: '删除员工失败', type: 'error', duration: 1700 })
            }
          })
        })

      },

      // 重置添加用户表单
      closeAddAdminForm() {
        this.$refs.addAdminRef.resetFields()
      },


    }
  }
</script>
<style>
  .admin-add-btn {
    margin-bottom: 10px;
    float: right;
  }
</style>
