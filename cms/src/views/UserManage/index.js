import React, { Component } from 'react'
import {Table, Button,Switch,Tooltip,Modal,Form,Input,Select,Space } from 'antd'
import Axois from 'axios'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { confirm } = Modal;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
export default class UserManage extends Component {
    state = {
        dataList: [],
        isCreated: false,
        isUpdated: false,
        curUpdateId: 0
    }

    componentDidMount() {
        Axois.get('http://localhost:5000/users').then(res=>{
            if(res.status===200){
                this.setState({
                    dataList: res.data
                })
                console.log(this.state.dataList)
            }else{
                alert(res.statusText)
            }
        }).catch(err=>alert(err))
    }


       onFinish = values => {
        console.log(values);
      };

      onGenderChange=val=>{
          console.log(val)
      }



    render() {
        return (
            <div>
                <Form {...layout} name="control-hooks" onFinish={this.onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={this.onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
    </Form>
            </div>
        )
    }




}
