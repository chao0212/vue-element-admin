<template>
  <div class="dashboard-container">
    <component :is="currentRole" />

    <!-- 根据角色判断按钮是否显示 -->
    <!-- Admin can see this -->
    <!-- <el-tag v-permission="['admin']">admin</el-tag> -->
    <!-- Editor can see this -->
    <!-- <el-tag v-permission="['editor']">editor</el-tag> -->
    <!-- Editor can see this -->
    <!-- <el-tag v-permission="['admin','editor']">Both admin or editor can see this</el-tag> -->

    <!-- <button @click = "handleHello">hello</button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

// import permission from '@/directive/permission/index.js' // 权限判断指令

export default {
  // methods:{
  //   // axios请求
  //   handleHello(){
  //     alert(1)
  //     const axios = require('axios');
  //     // const myAxios = axios.create({
  //     //   baseURL: 'https://some-domain.com/api/',
  //     //   timeout: 1000,
  //     //   headers: {'X-Custom-Header': 'foobar'}
  //     // })

  //     axios.get('http://localhost:9527/#/error/404')
  //       .then((value)=> {
  //         // 处理成功情况
  //         console.log(1)
  //         console.log(value);
  //       })
  //       .catch(function (error) {
  //         console.log(0)
  //         // 处理错误情况
  //         console.log(error);
  //       })
  //       .then(function () {
  //         // 总是会执行
  //         // console.log(2)
  //         console.log("It's always excuted!")
  //       });
  //   }
  // },
  // directives: { permission },
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
