<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的列表" name="first">
          <!--表格-->
          <el-table :data="myDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">
            <el-table-column label="#" type="index" align="center"/>
            <el-table-column label="标题" prop="title" align="center"/>
            <el-table-column label="分类" prop="categoryname" align="center"/>
            <el-table-column label="是否发布" align="center" width="120px">
              <template scope="scope">
                <el-tag type="danger" v-if="scope.row.draft == 0">未发布</el-tag>
                <el-tag v-else>已发布</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="170px">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span style="margin-left: 10px">{{ scope.row.creatime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" align="center" width="170px">
              <template slot-scope="scope">
                <i class="el-icon-time" v-show="scope.row.releasetime != ''"/>
                <span style="margin-left: 10px">
                    {{ scope.row.releasetime== '' ? '------' : scope.row.releasetime }}
                  </span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!--修改-->
                <el-button v-if="scope.row.draft == 0" type="primary" size="mini"
                           @click="pullDetail(scope.row.id)">
                  发布
                </el-button>
<!--                <el-button v-else-if="scope.row.draft == 1" type="success" size="mini"-->
<!--                           @click="updDetail(scope.row.id)">-->
<!--                  修改-->
<!--                </el-button>-->
                <!-- 删除 -->
                <el-button type="danger" size="mini" @click="delDetailBtn(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <page-bar :pageTotal="pageMyTotal" :pageNum="pagenumMy" :pageSize="pagesizeMy"
                    @handleSizeChange="handleSizeChangeMy" @handleCurrentChange="handleCurrentChangeMy"/>

        </el-tab-pane>

        <el-tab-pane label="全部列表" name="second">
          <!--表格-->
          <el-table :data="allDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">
            <el-table-column label="#" type="index" align="center"/>
            <el-table-column label="标题" prop="title" align="center"/>
            <el-table-column label="分类" prop="categoryname" align="center"/>
            <el-table-column label="是否发布" align="center" width="120px">
              <template scope="scope">
                <el-tag type="danger" v-if="scope.row.draft == 0">未发布</el-tag>
                <el-tag v-else>已发布</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="170px">
              <template slot-scope="scope">
                <i class="el-icon-time"/>
                <span style="margin-left: 10px">{{ scope.row.creatime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" align="center" width="170px">
              <template slot-scope="scope">
                <i class="el-icon-time" v-show="scope.row.releasetime != ''"/>
                <span style="margin-left: 10px">
                    {{ scope.row.releasetime== '' ? '------' : scope.row.releasetime }}
                  </span>
              </template>
            </el-table-column>

<!--            <el-table-column label="操作" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                &lt;!&ndash;修改&ndash;&gt;-->
<!--                <el-button v-if="scope.row.draft == 0" type="primary" size="mini"-->
<!--                           @click="pullDetail(scope.row.id)">-->
<!--                  发布-->
<!--                </el-button>-->
<!--                &lt;!&ndash;                <el-button v-else-if="scope.row.draft == 1" type="success" size="mini"&ndash;&gt;-->
<!--                &lt;!&ndash;                           @click="updDetail(scope.row.id)">&ndash;&gt;-->
<!--                &lt;!&ndash;                  修改&ndash;&gt;-->
<!--                &lt;!&ndash;                </el-button>&ndash;&gt;-->
<!--                &lt;!&ndash; 删除 &ndash;&gt;-->
<!--                <el-button type="danger" size="mini" @click="delDetailBtn(scope.row.id)">-->
<!--                  删除-->
<!--                </el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>

          <!--分页-->
          <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
        </el-tab-pane>
      </el-tabs>


    </el-card>

  </div>
</template>

<script>
  import PageBar from '@/components/PageBar'
  import { getSceneryList, pullScenery, delScenery, disableComment } from '../../api/common'

  export default {

    data() {
      return {
        activeName: 'first',
        adminInfo: {},

        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        // 我的列表分页
        pagenumMy: 1,
        pagesizeMy: 8,
        pageMyTotal: 0,

        myDetailList: [],
        allDetailList: []

      }
    },
    components: {
      PageBar

    },
    created() {
      this.getInit()

    },
    methods: {
      // 初始化
      async getInit() {
        let admin = JSON.parse(window.localStorage.getItem('AdminInfo'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$message({ message: '请先登录再操作', type: 'error', duration: 1700 })
          return
        } else {
          this.adminInfo = admin
        }

        const adminId = this.adminInfo.id
        let params = {
          pagenum: this.pagenumMy,
          pagesize: this.pagesizeMy
        }
        await getSceneryList(params, 0, 2, adminId).then(res => {
          // this.allDetailList = []
          this.myDetailList= []
          if (res.success && res.data.data.length != 0) {
            // this.pageTotal = res.data.total
            // this.allDetailList = res.data.data
            this.pageMyTotal = res.data.total
            this.myDetailList = res.data.data

          } else {
            this.$message({
              message: '获取列表失败，请刷新再试!',
              type: 'error', duration: 1700
            })
          }
        })

        // 全部列表
        let paramsAll = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        await getSceneryList(paramsAll, 0, 2, 0).then(res => {
          this.allDetailList = []
          if (res.success && res.data.data.length != 0) {
            this.pageTotal = res.data.total
            this.allDetailList = res.data.data

          } else {
            this.$message({
              message: '获取列表失败，请刷新再试!',
              type: 'error', duration: 1700
            })
          }
        })

      },

      // 分页
      handleSizeChangeMy(pagesize) {
        this.pagesizeMy = pagesize
        this.getInit()
      },
      handleCurrentChangeMy(pagenum) {
        this.pagenumMy = pagenum
        this.getInit()
      },

      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getInit()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getInit()
      },

      pullDetail(id) {

        this.$confirm('是否确定发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pullScenery(id).then(res => {
            if (res.success) {
              this.$message({ message: '发布成功', type: 'success', duration: 1700 })
              this.getInit()
            } else {
              this.$message({ message: '发布失败', type: 'error', duration: 1700 })
            }
          })
        })

      },

      updDetail(id) {
      },

      delDetailBtn(id) {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pullScenery(id).then(res => {
            if (res.success) {
              this.$message({ message: '删除成功', type: 'success', duration: 1700 })
              this.getInit()
            } else {
              this.$message({ message: '删除失败', type: 'error', duration: 1700 })

            }
          })
        })

      },

      handleClick(tab, event) {
      }

    }
  }
</script>

<style scoped>


</style>
