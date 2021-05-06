import React, { Component } from 'react'
import Axois from 'axios'
import {connect} from 'react-redux'
import {Table, Button} from 'antd'
import {FormatPainterOutlined} from '@ant-design/icons'
//import store from '../../redux/store'
 class Roles extends Component {
    state = {
        dataList: []
    }
    columns = [
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            key: 'roleName'
        },
        {
            title: 'Action',
            key: 'action',
            render: (obj) => <Button onClick={()=>{this.handleDel(obj.id)}}><FormatPainterOutlined  twoToneColor="#eb2f96"/></Button>
        }
    ]

    handleDel = (id) => {
        let newList=this.state.dataList.filter(item=>item.id!==id)
        this.setState({
            dataList: newList
        })
        Axois.delete(`http://localhost:5000/roles/${id}`).then(res=>{
            alert(res.statusText)
        }).catch(err=>alert(err))
    }


    componentDidMount(){

        if (this.props.myRoleList.length===0){
            this.props.actionAsyncPromise()
        }
    }
    render() {
        return (
            <Table columns={this.columns} dataSource={this.props.myRoleList}
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

const mapStateToProps= (state)=>{
    return {
        myRoleList:state.roleList
    }
}
const mapDispatchToProps={
   async actionAsyncPromise(){
        let res = await Axois.get('http://localhost:5000/roles')  

        return {
                    type: "ksave_rolelist",
                    payload: res.data
                }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Roles)
