<template>
  <div class="container">
    <div class="container-item">
      <div class="title">
        {{detailInfo.title}}
      </div>
      <!--      <div class="hr"/>-->
      <hr class="hr1"/>

      <div class="wrap-div">
        <div class="detail">
          看点
        </div>
        <div v-html="detailInfo.feature"/>
      </div>

      <div class="hr"/>
      <!--      <hr class="hr"/>-->

      <div class="wrap-div">
        <div class="detail">
          概况
        </div>
        <div v-html="detailInfo.introduction"/>
      </div>
      <div class="hr"/>
      <!--      <hr class="hr"/>-->

      <div class="wrap-div1 ">
        <div class="detail-phone">
          <div class="detail">
            电话
          </div>
          <div style="margin-top: 10px">
            {{detailInfo.phone}}
          </div>
        </div>

        <div class="detail-open">
          <div class="detail">
            开放时间
          </div>
          <div style="margin-top: 10px">
            {{detailInfo.opentime}}
          </div>
        </div>

      </div>
      <div class="hr"/>
      <!--      <hr class="hr"/>-->

      <div class="wrap-div">
        <div class="detail">
          交通
        </div>
        <div>
          {{detailInfo.gopath}}
        </div>
      </div>
      <div class="hr"/>
      <!--      <hr class="hr"/>-->

      <div class="wrap-div">
        <div class="detail">
          门票
        </div>
        <div>
          {{detailInfo.pay}}
        </div>
      </div>

      <div class="time-info">
        *信息更新时间: {{' '+detailInfo.releasetime}}
      </div>

      <hr class="hr1" style="margin-top: 50px;margin-bottom: 0"/>
    </div>

    <!-- 评论 -->
    <div class="comment1">

      <div class="comment-title">
        <div style="font-size: 28px;color: #888a88">
          评论 <span style="font-size: 16px;color: #232323">{{'(' + countList + '条 )'}} </span>
        </div>
        <div>
          <el-button type="warning" @click="addComm">我要评论</el-button>
        </div>
      </div>


      <!--      <div class="comment-content" v-for="item in commentList" :for="item.id">-->

      <!--        <div class="comment-content-img">-->
      <!--          <div>-->
      <!--            <img class="login-img" :src="item.image"/>-->
      <!--            <span class="comment-content-img-span">{{item.uname}}</span>-->
      <!--          </div>-->

      <!--        </div>-->

      <!--      </div>-->

      <div class="comment">
        <!--        <div class="comment-number">-->
        <!--          <span style="font-size: 28px;margin-left: 8px;color: #36ff25">{{commentList.length}}</span>-->
        <!--          <span style="color: #657180;font-size: 20px;margin-left: 8px">条评论</span>-->
        <!--        </div>-->

        <div class="comment-content" v-for="item in commentList" :key="item.id">
					<span style="width: 7%;">
						<img :src="item.image"
                 width="28px" height="28px" style="border-radius:50%">
					</span>

          <span class="comment-content-name">
						<span style="font-size: 16px;color: #ff6817;">{{item.uname}}</span>
						<span style="margin-left: 15px;color: #657180;font-size: 16px;">{{item.creatime}}</span>
					</span>

          <span class="comment-content-span">
						{{item.commentary}}
					</span>

        </div>

      </div>
    </div>


    <div class="bottom">
    </div>


    <!--评论-->
    <el-dialog title="我要评论" :visible.sync="dilog" width="50%" @close="closeAddAdminForm()">
      <span>
        <!--表单-->
        <el-form ref="addAdminRef">
          <el-form-item>
          <el-input type="textarea"
                    maxlength="300" show-word-limit
                    :rows="4"
                    placeholder="请输入内容评论内容"
                    v-model="addComment"/>
          </el-form-item>
        </el-form>
      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="addCommentBtn">确 定</el-button>
          <el-button type="info" @click="dilog = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getSceneryInfo, addComment, getCommentList }
    from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'sceneryInfo',
    data() {
      return {
        dilog: false,
        user: {},
        detailId: 0,
        categoryid: 0,
        detailInfo: {
          title: '', // 标题
          introduction: '', // 正文
          gopath: '', // 路线
          feature: '', // 特色
          categoryname: '', // 分类
          cover: '',
          creator: '', // 创建者
          phone: '', // 联系方式
          pay: '', // 门票
          opentime: '', // 开放时间
          username: '',
          releasetime: ''
        },

        addComment: '',

        commentList: [],
        countList: 0

      }
    },
    created() {
      this.init()

    },
    methods: {
      // 初始化
      async init() {
        this.categoryid = this.$route.params.categoryid
        this.detailId = this.$route.params.id

        // 获取详情
        await getSceneryInfo(this.detailId).then(res => {
          if (res.success) {
            this.detailInfo = res.data.data
          } else {
            this.$message({
              message: '详情获取失败，请刷新再试！',
              type: 'error',
              duration: 2000
            })
          }

          console.log(this.detailInfo)

        })

        // 评论
        await getCommentList(1, 100, this.detailId).then(res => {
          if (res.success) {
            this.commentList = res.data.data
            this.countList = res.data.data.length
          }

        })

      },

      // 重置添加用户表单
      closeAddAdminForm() {
        this.$refs.addAdminRef.resetFields()
      },
      addComm() {
        // 是否登录
        let user = JSON.parse(window.localStorage.getItem('UserInfo'))
        if (user == undefined || user == null || user == '') {
          this.$message({ message: '请先登录', type: 'error', duration: 1700 })
          this.$router.push('/scenery/userLogin/1')
        } else {
          this.user = user
          this.dilog = true
        }
      },

      addCommentBtn() {
        if (this.addComment == '') {
          this.$message({ message: '请输入评论内容', type: 'error', duration: 1700 })
          return
        }

        let addCommentInfo = {
          commentary: this.addComment,
          userid: this.user.id,
          detailid: this.detailId,
          categoryid: this.categoryid
        }

        addComment(addCommentInfo).then(res => {
          if (res.success) {
            this.init()
            this.dilog = false
            this.addComment = ''
            this.$message({ message: '评论成功', type: 'success', duration: 1700 })
          } else {
            this.$message({ message: '评论失败', type: 'error', duration: 1700 })
          }
        })

      }

    }
  }
</script>

<style scoped>

  .container {
    margin: 0;
    padding: 0;
    /*box-shadow:inset 0px 2px 10px -15px #000;*/
    /*-webkit-box-shadow: #d4d2d2 0px 0px 10px;*/
    /*-moz-box-shadow: #d4d2d2 0px 0px 10px;*/
  }

  .container-item {
    margin: 0 14%;
    padding-bottom: 20px;
    padding-top: 16px;
  }

  .comment1 {
    margin: 0 14%;
    padding-bottom: 50px;
  }

  /*.comment-content-img {*/
  /*  display: flex;*/
  /*  width: 200px;*/
  /*  height: 40px;*/
  /*}*/

  /*.comment-content-img-span{*/
  /*line-height: 40px;*/
  /*  margin: auto;*/
  /*  !*margin-left: 4px;*!*/
  /*  font-size: 12px;*/
  /*}*/

  .comment-title {
    display: flex;
    justify-content: space-between;
  }

  /*.comment-content {*/
  /*  margin-top: 20px;*/
  /*  border-bottom: solid .1px #bd2c00;*/
  /*}*/


  .comment {
    /*margin-left: 5%;*/
    /*margin-right: 5%;*/
    /*!*border: 1px red solid;*!*/
    width: 100%;
    height: 100%;
    /*margin-bottom: 30px;*/
  }

  .comment-number {
    width: 20%;
    height: 50px;
    /*border: 1px red solid;*/
    font-size: 20px;
    color: #55a532;
  }

  .comment-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px #dbdbdb solid;
    margin-top: 35px;
    /*margin-bottom: 10px;*/
    padding-bottom: 10px;
  }

  .comment-content-name {
    /*width: 90%;*/
    margin-bottom: 10px;

  }

  .comment-content-span {
    width: 90%;
    margin-left: 7%;
    margin-bottom: 15px;
    font-size: 15px;
    color: #222;
  }

  .write-comment {
    width: 100%;
    display: flex;
    margin-top: 10px;
    border-bottom: 1px #dbdbdb solid;
  }

  .write-comment-content {
    width: 93%;
    height: 100px;
    /*border: 1px yellow solid;*/
    margin-bottom: 10px;
  }

  .login-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /*margin: auto;*/
  }

  .title {
    font-weight: normal;
    font-size: 30px;
    color: #333;
    /*padding-bottom: 10px;*/
    margin-top: 10px;

  }

  .hr1 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .hr {
    margin-top: 25px;
    margin-bottom: 50px;
  }

  .detail {
    font-size: 18px;
    font-weight: 500;
    color: #ff9d00;
    border-left: solid 2px #ff9d00;
    width: 100px;
    height: 26px;
    padding-left: 4px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  .wrap-div1 {
    display: flex;
  }


  .detail-phone {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-open {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .time-info {
    margin-top: 20px;
    font-size: 14px;
    color: #969896;
  }

  .look-div {
    /*margin-top: 20px;*/

  }

  .bottom {
    width: 100%;
    height: 80px;
    background-color: #131313;
    margin-top: 50px;
  }
</style>
