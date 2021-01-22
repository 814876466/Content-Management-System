import React, { Component } from 'react'
import Axois from 'axios'
import {Table, Button} from 'antd'
import {FormatPainterOutlined} from '@ant-design/icons'
import store from '../../redux/store'
export default class Roles extends Component {
    state = {
        dataList: []
    }
    columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName'
        },
        {
            title: '操作',
            key: 'action',
            render: (obj) => <Button onClick={()=>{this.handleDel(obj.id)}}><FormatPainterOutlined  twoToneColor="#eb2f96"/></Button>
        }
    ]

    handleDel = (id) => {
        //首先把state中的id删掉 再把json-server中的删掉
        let newList=this.state.dataList.filter(item=>item.id!==id)
        this.setState({
            dataList: newList
        })
        Axois.delete(`http://localhost:5000/roles/${id}`).then(res=>{
            alert(res.statusText)
        }).catch(err=>alert(err))
    }
    // actionPromise= () => {
    //     return Axois.get('http://localhost:5000/roles').then(res=>{
    //             if(res.status===200){
    //                 this.setState({
    //                     dataList: res.data
    //                 })
    //                 return {
    //                     type: "ksave_rolelist",
    //                     payload: res.data
    //                 }
    //             }else{
    //                 alert(res.statusText)
    //             }
    //         }).catch(err=>alert(err))
    // }
    actionAsyncPromise=async ()=>{
        let res = await Axois.get('http://localhost:5000/roles')  //同步写法，只有在得到结果时才会继续执行

        this.setState({
                        dataList: res.data
                    })
        return {
                    type: "ksave_rolelist",
                    payload: res.data
                }
    }

    componentDidMount(){
        let roleList =store.getState().roleList
        if (roleList.length===0){
            store.dispatch(this.actionAsyncPromise())
        }else{
            this.setState({
                dataList: roleList
            })
        }
    }
    render() {
        return (
            <Table columns={this.columns} dataSource={this.state.dataList}
                rowKey={item => item.id} pagination={{ pageSize: 4 }}
                expandable={{
                    expandedRowRender: record =>{
                   return  record.roleRight.map((item)=>
                        item.list.map(subItem=>(<Button type="primary" ghost key={subItem}>{subItem}</Button>)
                         ))},
                    }}
            />
        )
    }
}
