import React, { Component } from 'react'
import axios from 'axios'
import { Table, Tag } from 'antd';
import store from '../../redux/store'
export default class Rights extends Component {
    state = {
        dataList: []
    }
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => <b>{id}</b> //定制每个td 的样式
        },
        {
            title: '权限名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '权限等级',
            dataIndex: 'grade',
            key: 'grade',
            render: grade => {
                /*
                    let obj = {
                        a:"green",
                        b:"orange",
                        c:"red"
                    }
                */
               console.log(grade)
                let arr = ["green", "orange", "red"]
                return <Tag color={arr[grade - 1]}>{grade}</Tag>
            }
        }
    ]
    actionThunk = () =>{

        return (dispatch)=>{
            axios.get('http://localhost:5000/rights').then(res=>{
                dispatch({
                    type:'hui-rightList',
                    payload:res.data
                })
                this.setState({
                    dataList: res.data
                })
                console.log(this.state.dataList)
            })
        }
    }
    componentDidMount() {
        let rightList =store.getState().rightList
        if (rightList.length===0){
            store.dispatch(this.actionThunk())
        }else{
            this.setState({
                dataList: rightList
            })
        }
    }
    render() {
        return (

            <Table columns={this.columns} dataSource={this.state.dataList}
                rowKey={item => item.id} pagination={{ pageSize: 4 }}
            />
        )
    }
}
