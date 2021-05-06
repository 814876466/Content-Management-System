import React, { Component } from 'react'
import {Table, Button,Switch,Tooltip,Modal,Form,Input,Select,Space } from 'antd'
import Axois from 'axios'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { confirm } = Modal;
export default class UserManage extends Component {
    state = {
        dataList: [],
        isCreated: false,
        isUpdated: false,
        curUpdateId: 0
    }
    columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName'
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            key: 'roleState',
            render: (roleState,item)=><Switch
                                        defaultChecked={roleState}
                                        disabled={item.default}
                                        onClick={()=>{
                                            this.handleState(item)
                                        }}
                                        />
        },
        {
            title: '操作',
            key: 'action',
            render: (obj)=> <Tooltip title="search">
                             <Space>
                             <Button
                                 disabled={obj.default}
                                 type="default"
                                 shape="circle"
                                 size="small"
                                 icon={<EditOutlined  /> }
                                 onClick={ ()=>{
                                    this.handleUpdate(obj)
                                 }}
                                 />
                                 <Button
                                 disabled={obj.default}
                                 type="default"
                                 shape="circle"
                                 size="small"
                                 icon={<DeleteOutlined />}
                                 style={{marginLeft:'5px'}}
                                 onClick={()=>{
                                    this.showConfirm(obj.id)
                                 }}
                                  />
                             </Space>

                            </Tooltip>
        }

    ]
    componentDidMount() {
        Axois.get('http://localhost:5000/users').then(res=>{
            if(res.status===200){
                this.setState({
                    dataList: res.data
                })
            }else{
                alert(res.statusText)
            }
        }).catch(err=>alert(err))
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={ ()=>{this.handleCreate()}}>Add User</Button>
                <Table columns={this.columns} dataSource={this.state.dataList}
                rowKey={item => item.id} pagination={{ pageSize: 4 }}
                 />

                 {/*弹出对话框  */}
                 <Modal
                    visible={this.state.isCreated}
                    title="Add a new user"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={()=>{
                        this.setState({
                            isCreated: false
                        })
                    }}
                    onOk={() => {
                      this.handelSubmit()
                    }}
                    >
                         <Form
                            ref="form"
                            layout="vertical"
                            name="form_in_modal"
                            initialValues={{ modifier: 'public' }}
                        >
                            <Form.Item
                            name="username"
                            label="username"
                            rules={[{ required: true, message: 'Please input the username' }]}
                            >
                            <Input />
                            </Form.Item>
                            <Form.Item
                            name="password"
                            label="password"
                            rules={[{ required: true, message: 'Please input the password' }]}
                            >
                            <Input />
                            </Form.Item>
                            <Form.Item
                            name="roleType"
                            label="roleType"
                            rules={[{ required: true, message: 'Please select the role' }]}
                            >
                                  <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select a Role"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                    <Option value={3}>超级管理员</Option>
                                    <Option value={2}>管理员</Option>
                                    <Option value={1}>小编</Option>
                                </Select>
                            </Form.Item>

                        </Form>
                    </Modal>

                {/* 点击更新后弹出的对话框 */}
                <Modal
                    visible={this.state.isUpdated}
                    title="Update Information"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={()=>{
                        this.setState({
                            isUpdated: false
                        })
                    }}
                    onOk={() => {
                      this.handleUpdateSuccess()
                    }}
                    >
                         <Form
                            ref="Updateform"
                            layout="vertical"
                            name="form_in_modal"
                            initialValues={{ modifier: 'public' }}
                        >
                            <Form.Item
                            name="username"
                            label="username"
                            rules={[{ required: true, message: 'Please input the username' }]}
                            >
                            <Input />
                            </Form.Item>
                            <Form.Item
                            name="password"
                            label="password"
                            rules={[{ required: true, message: 'Please input the password' }]}
                            >
                            <Input />
                            </Form.Item>
                            <Form.Item
                            name="roleType"
                            label="roleType"
                            rules={[{ required: true, message: 'Please select the role' }]}
                            >
                                  <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select a Role"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                    <Option value={3}>超级管理员</Option>
                                    <Option value={2}>管理员</Option>
                                    <Option value={1}>小编</Option>
                                </Select>
                            </Form.Item>

                        </Form>
                    </Modal>
            </div>
        )
    }

    handleCreate = ()=>{
            this.setState({
                isCreated:true
            })
    }
    handelSubmit = () =>{
        //1.清空表单数据
        this.refs.form
        .validateFields() //表单的数据清空
        .then(values => {
            this.refs.form.resetFields();
            //2.弹出框消失
            this.setState({
                isCreated: false
            })
            //3. axios post发送
            let { password,roleType,username}=values //es6语法解构赋值
            let roleList=['小编','管理员','超级管理员']
            Axois.post('http://localhost:5000/users',{
                username,
                password,
                "roleName": roleList[roleType-1],
                "roleState": false,
                "default": false, //是否禁用
                roleType
            }).then(
                res=>{
                    if(res.status===201){
                        //4. table更新
                        this.setState({
                            dataList: [...this.state.dataList,res.data]
                        })
                    }else{
                        alert(res.statusText)
                    }
                }
            ).catch(err=>alert(err))

        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
    }
    showConfirm = (id)=>{
        let that =this
        confirm({
            title: 'Do you Want to delete this user?',
            icon: <ExclamationCircleOutlined />,
            content: '你确定吗，不能再改了哦',
            onOk() {
              that.handleDelete(id)
            },
            onCancel() {
              console.log('Cancel');
            },
          })
    }
    handleDelete = (id) =>{
        Axois.delete(`http://localhost:5000/users/${id}`).then(
            res=>{
                if(res.status===200){
                    //4. table更新
                    //通过filter过滤掉删除的id
                    let newList = this.state.dataList.filter(item=>item.id!==id)
                    this.setState({
                        dataList: newList
                    })
                }else{
                    alert(res.statusText)
                }
            }
        ).catch(err=>alert(err))
    }
    handleUpdate = (obj)=>{
        setTimeout(()=>{
            this.setState({
                isUpdated:true,
                curUpdateId:obj.id

            })
            //表格里面要添加基本信息
            let {username,password,roleType}=obj
           this.refs.Updateform.setFieldsValue({
            username,password,roleType
           }) //给表单元素提前预设信息
        },0)//同步
    }
    handleUpdateSuccess = ()=>{
       //1.清空表单数据
       this.refs.Updateform
       .validateFields() //表单的数据清空
       .then(values => {
           this.refs.Updateform.resetFields();
           //2.弹出框消失
           this.setState({
            isUpdated: false
           })
           //3. axios post发送
           let id = this.state.curUpdateId
           let { password,roleType,username}=values //es6语法解构赋值
           let roleList=['小编','管理员','超级管理员']
           Axois.put(`http://localhost:5000/users/${id}`,{
               username,
               password,
               "roleName": roleList[roleType-1],
               "roleState": false,
               "default": false, //是否禁用
               roleType
           }).then(
               res=>{
                   if(res.status===200){
                       //4. table更新
                       let newList =this.state.dataList.map(item=>{
                           if(item.id===id){
                               return res.data
                           }else{
                               return item
                           }
                       })
                       this.setState({
                           dataList:newList,
                           isUpdated: false
                       })
                   }else{
                       alert(res.statusText)
                   }
               }
           ).catch(err=>alert(err))

       })
       .catch(info => {
         console.log('Validate Failed:', info);
       });
    }
    handleState = (item) =>{
        console.log(item)
        // !item.roleState
        this.state.dataList.forEach(SubItem=>{
            if(SubItem.id===item.id){
                SubItem.roleState=!SubItem.roleState

                Axois.put(`http://localhost:5000/users/${SubItem.id}`,{
                    ...SubItem
                }).then(
                    res=>{
                        if(res.status===200){
                            console.log("update-ok")
                        }else{
                            alert(res.statusText)
                        }
                    }
                ).catch(err=>alert(err))
            }

        })

    }

}
