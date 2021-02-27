<template>
  <div class="app-container">

    <el-form :model="addDetail" :rules="rules" ref="ruleForm" label-width="100px" class="detail-form">
      <el-form-item label="景区标题" prop="title">
        <el-input v-model="addDetail.title" type="textarea"
                  maxlength="50" show-word-limit class="textarea"/>
      </el-form-item>

      <!--      <el-form-item label="正文介绍" prop="introduction">-->
      <!--        <el-input v-model="addDetail.introduction" type="textarea"-->
      <!--                  maxlength="3000" show-word-limit/>-->
      <!--      </el-form-item>-->

      <el-form-item label="特色介紹" prop="feature">
        <el-input v-model="addDetail.feature" type="textarea"
                  maxlength="200" show-word-limit/>
      </el-form-item>

      <el-form-item label="路线地点" prop="gopath">
        <el-input v-model="addDetail.gopath" type="textarea"
                  maxlength="200" show-word-limit/>
      </el-form-item>

      <el-form-item label="门票">
        <el-input v-model="addDetail.pay" type="textarea"
                  maxlength="300" show-word-limit/>
      </el-form-item>

      <el-form-item label="开放时间">
        <el-input v-model="addDetail.opentime" type="textarea"
                  maxlength="300" show-word-limit/>
      </el-form-item>

      <el-form-item label="正文介绍" prop="introduction">
        <editor api-key="u6hiizd3o4r3p4mhnvag8b7fc9hhs8yivqdddzqbd60tyoh5" :init="tinymceConfig"
                v-model="addDetail.introduction" style="z-index: 0"/>
      </el-form-item>

      <el-form-item label="景区分类">
        <el-select v-model="addDetail.categoryid" placeholder="请选择景区分类" style="width: 50%" clearable>
          <el-option v-for="item in cateList" :label="item.categoryname" :value="item.categoryid"
                     :key="item.categoryid"/>
        </el-select>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="addDetail.phone" style="width: 50%"/>
      </el-form-item>

      <el-form-item v-show="!addDetail.indextop" label="热门">
        <el-switch v-model="addDetail.top"/>
      </el-form-item>

      <el-form-item v-show="!addDetail.top" label="首页轮播" >
        <el-switch v-model="addDetail.indextop"/>
      </el-form-item>


      <el-form-item label="轮播图片" v-show="addDetail.indextop">
        <el-upload class="avatar-uploader"
                   action="http://127.0.0.1:9000/upload/updataFile"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img :src="addDetail.cover" class="avatar">
        </el-upload>
        <span style="padding-top: -30px"><span style="color:red">*</span>点击更换轮播图片</span>

      </el-form-item>

      <el-form-item label="封面图片" v-show="!addDetail.indextop">
        <el-upload class="avatar-uploader"
                   action="http://127.0.0.1:9000/upload/updataFile"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img :src="addDetail.cover" class="avatar">
        </el-upload>
        <span style="padding-top: -30px"><span style="color:red">*</span>点击更换封面图片</span>

      </el-form-item>


      <el-form-item style="text-align: right">
        <el-button type="success" @click="draftForm">保存草稿</el-button>
        <el-button type="primary" @click="submitForm">立即发布</el-button>
        <el-button type="warning" @click="resetForm">重置表单</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { getCategoryList, uploadFile, addScenery } from '../../api/common'
  import '../../assets/iconfont/iconfont'
  import Editor from '@tinymce/tinymce-vue'

  let addDetailInfo = {
    title: '', // 标题
    introduction: '', // 正文
    gopath: '', // 路线
    feature: '', // 特色
    categoryid: '', // 分类
    draft: 0, // 发布、草稿
    cover: 'https://n1-q.mafengwo.net/s8/M00/93/86/wKgBpVYoiOiABLExAAJI8ZtJQtI51.jpeg?imageMogr2%2Fthumbnail%2F%21220x167r%2Fgravity%2FCenter%2Fcrop%2F%21220x167%2Fquality%2F90', // 封面图片
    top: false, // 图片
    creator: 0, // 创建者
    phone: '', // 联系方式
    pay: '', // 门票
    opentime: '', // 开放时间
    indextop: false
  }

  export default {
    name: 'detail',
    data() {
      return {
        addDetail: addDetailInfo,
        cateList: [],    // 分类列表

        adminInfo:{

        },

        // 表单验证
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入正文', trigger: 'blur' },
            { min: 1, max: 3000, message: '长度在 1 到 3000 个字符', trigger: 'blur' }
          ],
          feature: [
            { required: true, message: '请输入特色', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          gopath: [
            { required: true, message: '请输入路线地点', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ]
        },

        // tinymce初始化配置
        tinymceConfig: {
          height: 700,
          width: 800,
          menubar: true,
          branding: false,
          language: 'zh_CN',
          language_url: '/tinymce/langs/zh_CN.js',
          images_upload_handler: function(blobInfo, success, failure) {
            let formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            uploadFile(formData).then(res => {
              if (res.success) {
                success(res.data.location)
              } else {
                failure('图片编辑失败')
              }
            }).catch(res => {
              this.$message({ message: '图片编辑失败', type: 'error', duration: 1700 })
            })

          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic forecolor backcolor image  | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'

        }
      }
    },
    components: {
      Editor
    },
    created() {
      this.init()

    },
    methods: {
      async init() {
        // 获取创建者
        let admin = JSON.parse(window.localStorage.getItem('AdminInfo'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$message({ message: '请先登录再操作', type: 'error', duration: 1700 })
          return
        }else{
          this.adminInfo = admin
          addDetailInfo.creator = admin.id
        }

        // 获取分类
        let params = {
          pagenum: 1,
          pagesize: 100
        }
        getCategoryList(params).then(res => {
          if (res.success) {
            this.cateList = res.data.data.filter(cate =>
              cate.categoryid != 10
            )

          }
        })

      },

      // 校验
      checkForm() {
        if (this.addDetail.introduction == '') {
          this.$message({ message: '正文介绍不能为空', type: 'error', duration: 1700 })
          return false
        }

        if (this.addDetail.title == '') {
          this.$message({ message: '标题不能为空', type: 'error', duration: 1700 })
          return false
        }

        if (this.addDetail.gopath == '') {
          this.$message({ message: '路线地点不能为空', type: 'error', duration: 1700 })
          return false
        }

        if (this.addDetail.feature == '') {
          this.$message({ message: '特色介绍不能为空', type: 'error', duration: 1700 })
          return false
        }

        if (this.addDetail.categoryid == '') {
          this.addDetail.categoryid = 1
        }
        return true
      },

      // 草稿
      draftForm() {
        if (!this.checkForm()) {
          return
        }
        this.addDetail.draft = 0
        this.addDetail.top = this.addDetail.top ? '1' : '0'
        this.addDetail.indextop = this.addDetail.indextop ? '1' : '0'

        addScenery(this.addDetail).then(res => {
          if (res.success) {
            this.$message({ message: '保存为草稿成功', type: 'success', duration: 1700 })
            this.resetForm()
          } else {
            this.$message({ message: '保存为草稿失败', type: 'error', duration: 1700 })
          }
        })
      },

      // 添加
      submitForm() {
        if (!this.checkForm()) {
          return
        }
        this.addDetail.draft = 1
        this.addDetail.top = this.addDetail.top ? '1' : '0'
        this.addDetail.indextop = this.addDetail.indextop ? '1' : '0'

        addScenery(this.addDetail).then(res => {
          if (res.success) {
            this.$message({ message: '添加成功', type: 'success', duration: 1700 })
            this.resetForm()
          } else {
            this.$message({ message: '添加失败', type: 'error', duration: 1700 })
          }
        })
      },

      // 重置表单
      resetForm() {
        this.$refs.ruleForm.resetFields()
        this.addDetail.introduction = ''
        this.addDetail.cover = 'https://n1-q.mafengwo.net/s8/M00/93/86/wKgBpVYoiOiABLExAAJI8ZtJQtI51.jpeg?imageMogr2%2Fthumbnail%2F%21220x167r%2Fgravity%2FCenter%2Fcrop%2F%21220x167%2Fquality%2F90'
        this.addDetail.categoryid = ''
        this.addDetail.phone = ''
        this.addDetail.pay = ''
        this.addDetail.opentime = ''
        this.addDetail.top = false
        this.addDetail.indextop = false
      },

      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.addDetail.cover = res.data.location
        } else {
          this.$message({ message: '封面上传失败，请重新上传', type: 'error', duration: 1700 })
        }

      },

      // // 封面上传成功
      // handleAvatarSuccess2(res, file) {
      //   if (res.success) {
      //     console.log(res.data.location)
      //     this.addDetail.image.push(res.data.location)
      //   } else {
      //     this.$message({ message: '封面上传失败，请重新上传', type: 'error', duration: 1700 })
      //   }
      //   console.log(this.addDetail.image)
      // },

      handlePreview() {

      },
      handleRemove() {

      }

    }
  }
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .detail-form {
    margin: 10px 10%;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 273px;
    height: 153px;
    line-height: 153px;
    text-align: center;
    border: 1.4px #d9d9d9 dashed;
  }

  .avatar {
    width: 240px;
    height: 153px;
    display: block;
    border-radius: 2.5%;
  }


</style>
