<template>
  <div class="home-container">

    <!-- 导航 -->
    <div class="home-head">
      <div class="home-div">

        <div class="home-icon">
          <svg class="icon iconfont" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban_fengjing"/>
          </svg>
        </div>

        <div class="home-content">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#3d3b4f"
            text-color="#fff"
            active-text-color="#ef7a82">
            <el-menu-item index="0">首页</el-menu-item>
            <el-menu-item index="1">热门景区</el-menu-item>
            <el-menu-item index="2">特色美食</el-menu-item>
            <el-menu-item index="5">购物中心</el-menu-item>
            <el-menu-item index="3">人文历史</el-menu-item>
            <el-submenu index="1000">
              <template slot="title" class="more">更多</template>
              <el-menu-item v-for="item in cateList" :index="item.categoryid">
                {{item.categoryname}}
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </div>

        <div class="home-search" v-on:keyup.enter="searchGo">
          <el-input class="home-search-input"
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="search"
                    size="small" v-on:keyup.enter="searchGo">
          </el-input>
        </div>

        <div class="home-user">

          <div v-if="!showLogin" class="login-text">
            <span class="login" @click="goLogin(1)">登录</span>
            |
            <span class="register" @click="goLogin(2)">注册</span>
          </div>

          <div v-else-if="showLogin" style="display: flex">
            <el-dropdown style="display: flex" @command="handleCommand">
              <img class="login-img" :src="UserInfo.image">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" command="1">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" command="2">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>

        </div>

      </div>
    </div>

    <!-- 轮播图 -->
    <div class="rotation" v-show="showIndex == 1">
      <el-carousel trigger="click" height="400px" :interval="3000">
        <el-carousel-item v-for="(item,index) in imageList" :key="index">
          <img style="cursor: pointer" @click="goDetailInfo(item.categoryid, item.id)"  :src="item.cover" width="100%" height="100%" class="image-item">
        </el-carousel-item>
      </el-carousel>

    </div>


    <div class="backgroud-color" v-show="showIndex == 1">
      <!-- 分类 -->
      <div class="cate-div">

        <div style="width: 100%;height:30px;background-color: #F0F0F0"></div>
        <div class="scenery">
          <div class="cate-text">热门风景</div>

          <div class="cate-content">

            <div class="cate-content-item" v-for="item in sceneryList">
              <div class="cate-content-item-image">
                <!--图片区域-->
                <img class="image-detail"
                     :src="item.cover"
                     @click="goDetailInfo(item.categoryid, item.id)"/>
              </div>

              <div class="cate-content-item-text" @click="goDetailInfo(item.categoryid, item.id)">
                <span class="cate-content-item-sapn">
                 <span style="font-size: 20px;color:#ef7a82; "> {{item.title }} &nbsp;&nbsp;&nbsp;</span>
                  {{' ' + item.feature}}
                </span>
              </div>

            </div>

          </div>
        </div>

        <div style="width: 100%;height:30px;background-color: #F0F0F0"></div>
        <div class="scenery">
          <div class="cate-text">特色美食</div>

          <div class="cate-content">

            <div class="cate-content-item" v-for="item in foodList">
              <div class="cate-content-item-image">
                <!--图片区域-->
                <img class="image-detail"
                     :src="item.cover"
                     @click="goDetailInfo(item.categoryid, item.id)"/>
              </div>

              <div class="cate-content-item-text" @click="goDetailInfo(item.categoryid, item.id)">
                <span class="cate-content-item-sapn">
                 <span style="font-size: 20px;color:#ef7a82; "> {{item.title }} &nbsp;&nbsp;&nbsp;</span>
                  {{' ' + item.feature}}
                </span>
              </div>

            </div>

          </div>
        </div>

        <div style="width: 100%;height:30px;background-color: #F0F0F0"></div>
        <div class="scenery">
          <div class="cate-text">购物天堂</div>

          <div class="cate-content">

            <div class="cate-content-item" v-for="item in shoppingList">
              <div class="cate-content-item-image">
                <!--图片区域-->
                <img class="image-detail"
                     :src="item.cover"
                     @click="goDetailInfo(item.categoryid, item.id)"/>
              </div>

              <div class="cate-content-item-text" @click="goDetailInfo(item.categoryid, item.id)">
                <span class="cate-content-item-sapn">
                 <span style="font-size: 20px;color:#ef7a82; "> {{item.title }} &nbsp;&nbsp;&nbsp;</span>
                  {{' ' + item.feature}}
                </span>
              </div>

            </div>

          </div>
        </div>

        <div style="width: 100%;height:30px;background-color: #F0F0F0"></div>
        <div class="scenery">
          <div class="cate-text">人文历史</div>

          <div class="cate-content">

            <div class="cate-content-item" v-for="item in personList">
              <div class="cate-content-item-image">
                <!--图片区域-->
                <img class="image-detail"
                     :src="item.cover"
                     @click="goDetailInfo(item.categoryid, item.id)"/>
              </div>

              <div class="cate-content-item-text" @click="goDetailInfo(item.categoryid, item.id)">
                <span class="cate-content-item-sapn">
                 <span style="font-size: 20px;color:#ef7a82; "> {{item.title }} &nbsp;&nbsp;&nbsp;</span>
                  {{' ' + item.feature}}
                </span>
              </div>

            </div>

          </div>
        </div>

        <div style="width: 100%;height:50px;background-color: #F0F0F0"></div>

      </div>
    </div>


    <div class="backgroud-color2 otherList" v-show="showIndex == 2">
      <div class="cate-div">
        <div class="cate-content2">

          <div class="cate-content-item" v-for="item in otherList">
            <div class="cate-content-item-image">
              <!--图片区域-->
              <img class="image-detail"
                   :src="item.cover"
                   @click="goDetailInfo(item.categoryid, item.id)"/>
            </div>

            <div class="cate-content-item-text" @click="goDetailInfo(item.categoryid, item.id)">
                <span class="cate-content-item-sapn">
                 <span style="font-size: 20px;color:#ef7a82; "> {{item.title }} &nbsp;&nbsp;&nbsp;</span>
                  {{' ' + item.feature}}
                </span>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div class="backgroud-color2 otherList" v-show="showIndex == 3">
      <div class="cate-div2">
        <el-form ref="form" :model="UserInfo" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="UserInfo.uname" disabled/>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="UserInfo.phone"/>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="UserInfo.email"/>
          </el-form-item>

          <el-form-item label="注册时间">
            <el-input v-model="UserInfo.creatime" disabled/>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload class="avatar-uploader"
                       action="http://127.0.0.1:9000/upload/updataFile"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess">
              <img :src="UserInfo.image" class="avatar">
            </el-upload>
            <span style="padding-top: -30px;color: black"><span style="color:red">*</span>点击更换头像</span>

          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="updUser">确 定</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>


    <div class="bottom" v-show="showIndex == 1">
    </div>

  </div>
</template>

<script>
  import {
    getCategoryList, getUserList, getSceneryIndex,
    getSceneryList, getrotationList, updUserInfo, getSearchContent
  } from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'index',
    data() {
      return {
        activeIndex: '0',
        search: '',
        showLogin: false,

        UserInfo: {
          uname: '',
          image: '',
          phone: '',
          creatime: '',
          email: '',
          id: 0,
          loginway: 0,
          sex: '1'
        },

        // 轮播
        imageList: [],

        // 分类
        cateList: [],

        // 四大分类
        sceneryList: [],
        foodList: [],
        shoppingList: [],
        personList: [],

        // 切换页面数据
        otherList: [],
        showIndex: 1

      }
    },
    created() {
      this.init()

    },
    methods: {
      // 初始化
      async init() {

        // 导航
        // let activeIndex = window.localStorage.getItem('activeIndex')
        // if (activeIndex == undefined ||
        //   activeIndex == null ||
        //   activeIndex == '') {
        //   this.activeIndex = '0'
        // } else {
        //   this.activeIndex = activeIndex
        // }

        // 获取轮播图
        await getrotationList().then(res => {
          if (res.success) {
            this.imageList = res.data.data
          } else {
            this.$message({
              message: '数据获取失败，请刷新重试',
              type: 'error', duration: 2000
            })
          }
        })

        // 是否登录
        let user = JSON.parse(window.localStorage.getItem('UserInfo'))
        if (user == undefined || user == null || user == '') {
          this.showLogin = false
        } else {
          console.log(user)
          this.UserInfo = user
          this.showLogin = true

        }

        // 获取导航菜单  放入更多里面
        let params = {
          pagenum: 1,
          pagesize: 100
        }
        await getCategoryList(params).then(res => {
          if (res.success) {
            this.cateList = res.data.data.filter(cate =>
              cate.categoryid != 1 &&
              cate.categoryid != 2 &&
              cate.categoryid != 3 &&
              cate.categoryid != 4 &&
              cate.categoryid != 5 &&
              cate.categoryid != 10
            )

            console.log(this.cateList)
          }
        })

        // 获取首页四大分类
        await getSceneryIndex().then(res => {
          if (res.success) {
            this.sceneryList = res.data.data.scenery
            this.foodList = res.data.data.food
            this.shoppingList = res.data.data.shopping
            this.personList = res.data.data.person

          } else {
            this.$message({
              message: '数据获取失败，请刷新重试',
              type: 'error', duration: 2000
            })
          }
        })

      },

      async handleSelect(key, keyPath) {
        console.log(key)
        this.otherList = []
        let params = {
          pagenum: 1,
          pagesize: 100
        }
        await getSceneryList(params, key, 1, 0).then(res => {
          if (res.success) {
            this.otherList = res.data.data
          } else {
            this.$message({
              message: '数据获取失败,请刷新!',
              type: 'error', duration: 2000
            })
          }
        })

        if (key != 0) {
          window.localStorage.setItem('activeIndex', key)
          this.showIndex = 2
        } else {
          this.showIndex = 1
        }

      },

      // 搜索
      async searchGo() {
        await getSearchContent(this.search.trim()).then(res => {
          if (res.success) {

            this.otherList = []
            this.activeIndex = '-10'
            this.showIndex = 2
            this.otherList = res.data.data

          } else {
            this.$message({
              message: '没有您想获取的内容，换点别的试试',
              type: 'error', duration: 2300
            })
          }
        })

      },

      // 登录
      goLogin(id) {
        this.$router.push('/scenery/userLogin/' + id)
      },

      // 注册
      goRegister() {
        this.$router.push('/scenery/register')
      },

      // 去详情页
      goDetailInfo(categoryid, id) {
        const { href } = this.$router.resolve({ path: `/scenery/sceneryInfo/${categoryid}/${id}` })
        window.open(href, '_blank')

      },

      handleCommand(command) {
        if (command == 1) {
          // 个人中心
          this.showIndex = 3
          this.activeIndex = '-1'

        } else {
          // 退出
          window.localStorage.removeItem('UserInfo')
          this.UserInfo = {
            uname: '',
            image: '',
            phone: '',
            creatime: '',
            email: '',
            id: 0,
            loginway: 0,
            sex: '1'
          }
          this.activeIndex = '0'
          this.showIndex = 1
          this.init()
        }

      },
      layoutLogin() {

      },

      updUser() {
        if (this.UserInfo.id == 0) {
          this.$message({ message: '修改失败', type: 'error', duration: 1700 })
          return
        }

        updUserInfo(this.UserInfo).then(res => {
          if (res.success) {
            window.localStorage.removeItem('UserInfo')
            window.localStorage.setItem('UserInfo', JSON.stringify(res.data.data))
            this.UserInfo = res.data.data
            this.$message({ message: '修改成功', type: 'success', duration: 1700 })

          }
        })

      },

      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.UserInfo.image = res.data.location
          window.localStorage.removeItem('UserInfo')
          window.localStorage.setItem('UserInfo', JSON.stringify(this.UserInfo))
          this.UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
        } else {
          this.$message({ message: '头像上传失败，请重新上传', type: 'error', duration: 1700 })
        }

      }

    }
  }
</script>

<style scoped>
  .home-container {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: white;
  }

  .home-head {
    background-color: #3d3b4f;
    display: flex;
    height: 44px;
  }

  .home-div {
    margin: 0 12%;
    display: flex;
    height: 44px;
    width: 76%;
  }

  .el-menu-item {
    height: 44px;
    line-height: 44px;
    /*margin-left: 2px;*/
  }

  .el-submenu {
    height: 44px;
    line-height: 44px;
  }

  /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 44px;
    line-height: 44px;
  }

  .home-icon {
    /*margin: auto;*/
    width: 8%;
  }

  .home-content {
    /*margin-left: 40px;*/
    width: 56%;
    margin: auto;
  }

  .home-search {
    width: 24%;
    margin: auto;

  }

  .home-search-input {
    width: 90%;
  }

  .home-user {
    width: 10%;
    display: flex;
    justify-content: flex-end;
  }

  .login-text {
    margin: auto;
    color: #ef7a82;
    cursor: pointer;
  }

  .login-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: auto;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 42px;
  }


  /* 轮播图 */
  .rotation {
    margin: 6px 12% 20px;
    display: flex;
    width: 76%;
  }

  .el-carousel {
    width: 100%;
    text-align: center;
    margin: auto;

  }

  .image-item {
    border-radius: 5px;
  }

  /* 推荐 */
  .push-city {
    margin: 0 12% 20px;
    width: 76%;
    display: flex;
    justify-content: space-around;
  }

  .home-item {
    width: 240px;
    height: 100px;
    background-color: #dcece5;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 4px;

  }

  /* 分类 */
  .backgroud-color {
    background-color: #F0F0F0;
    height: 100%;
    width: 100%;
  }

  .backgroud-color2 {
    /*background-color: #F0F0F0;*/
    height: 100%;
    width: 100%;
  }

  .cate-div {
    margin: 0 12% 20px;
    /*display: flex;*/
    width: 76%;
    background-color: white;
  }

  .cate-div2 {
    margin: 0 20% 20px;
    /*display: flex;*/
    width: 60%;
    background-color: white;
  }

  /*.scenery{*/
  /*  margin: 20px 0;*/
  /*}*/

  .cate-text {
    font-size: 20px;
    height: 44px;
    line-height: 44px;
    font-weight: normal;
    position: relative;
    padding-left: 14px;
    color: #333;
  }

  .cate-text:after {
    content: "";
    width: 4px;
    height: 35px;
    background-color: #ef7a82;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
  }

  .cate-content {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .cate-content2 {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .cate-content-item-image {
    width: 314px;
    height: 170px;
    margin-top: 10px;
    margin-left: 4px;
    margin-right: 4px;
    line-height: 170px;
    cursor: pointer;
  }

  .cate-content-item-text {
    width: 314px;
    height: 50px;
    margin-top: 4px;
    margin-left: 4px;
    color: #6e6e6e;
  }

  .cate-content-item-sapn {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; /*要显示的行数*/
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .image-detail {
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }


  /* 底部 */
  .bottom {
    width: 100%;
    height: 80px;
    background-color: #131313;
  }

  .otherList {
    margin-top: 20px;
    margin-bottom: 100px;
  }

  /*/deep/ .el-dropdown-menu {*/
  /*  background-color: #3d3b4f;*/
  /*}*/

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
  }

</style>
