<template>
  <div class="container">
    <div id="main" style="width: 1000px;height: 500px;">

    </div>
  </div>
</template>

<script>
  import * as echart from 'echarts'
  import { getEchartsUser } from '../../api/common'

  export default {
    name: 'chart',
    data() {
      return {
        opinionData:  []
      }
    },
    mounted() {
      this.initEcharts()
    },

    methods: {
      async initEcharts() {
        await getEchartsUser().then(res => {
          if (res.success) {
            console.log(res.data.data)
            this.opinionData = []
            this.opinionData = res.data.data
          }
        })

        let myChart = echart.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '用户增长图'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月',
              '8月', '9月','10月', '11月', '12月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.opinionData,
            type: 'line'
          }]
        })

      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
  }

  #main {
    margin: 20px auto;
  }
</style>
