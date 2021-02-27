<template>
  <div class="container">
    <div id="main" style="width:800px;height: 540px;">

    </div>
  </div>
</template>

<script>
  import * as echart from 'echarts'
  import {getEchartsCategory} from '../../api/common'

  export default {
    name: 'chart',
    data() {
      return {
        charts: '',
        opinion: ['男', '女'],
        opinionData: [


        ]
      }
    },
    mounted() {
      this.initEcharts()
    },

    methods: {
      async initEcharts() {
       await getEchartsCategory().then(res => {
          if (res.success) {
            this.opinionData = []
            this.opinionData = res.data.data
          }
        })

        let myChart = echart.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#2c343c',

          title: {
            text: '主要分类景点数目',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            min: 0,
            max: 30,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '分类占比',
              type: 'pie',
              radius: '60 %',
              center: ['50%', '50%'],
              data: this.opinionData.sort(function(a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#fb0848',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function(idx) {
                return Math.random() * 200
              }
            }
          ]
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
