import React, { Component } from 'react'
import echarts from 'echarts'
import _ from 'lodash'
import Axios from 'axios'
import { Button } from 'antd';
import { PoweroffOutlined  } from '@ant-design/icons';
import {isFullScreen} from '../../mobx/store'
import {autorun} from 'mobx'


export default class Home extends Component {
    group={}
    arr=[]
    componentDidMount(){
        Axios.get('http://localhost:5000/articles').then(res=>{
            this.group=_.groupBy(res.data,'category')
            for ( var item in Object.keys(this.group)){
               var obj={value: Object.values(this.group).map(item=>item.length)[item], name: Object.keys(this.group)[item]}
                this.arr.push(obj)
            }
            this.createEchart()

        }).catch(err=>alert(err))

        // setTimeout(()=>{
        //     this.createEchart()
        // },0)

        window.onresize=()=>{
            this.myChart.resize()//这是echart的方法，不要和原生js混淆
        }

        this.unscribe=autorun(()=>{
            console.log(isFullScreen.get())
            setTimeout(()=>{
                this.myChart && this.myChart.resize();
            },0)
        })

    }
    componentWillUnmount(){
        this.unscribe()
    }
    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <Button
                type="primary"
                icon={<PoweroffOutlined  />}
                size={'large'}
                onClick={() =>{
                    let isFull = isFullScreen.get()
                    isFullScreen.set(!isFull)
                }
                }
                >
                    全屏
                    </Button>
                <div ref="echartsDiv" style={{height:'100%',width:'100%'}}>
                            Home

                        {/*这是首页内容，一个饼图，每位作者各发表了几篇文章  */}
                </div>
            </div>

        )
    }
    createEchart = ()=>{
        this.myChart = echarts.init(this.refs.echartsDiv);

        // specify chart configuration item and data
        // use configuration item and data specified to show chart
        let option = {  backgroundColor: '#2c343c',
        title: {
            text: '统级文章类型',
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
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data:this.arr.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 0, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(255, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]};  //主要看option的配置
        this.myChart.setOption(option);
    }
}
