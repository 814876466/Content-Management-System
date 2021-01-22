import React, { Component } from 'react'
import Particles from 'react-particles-js';
import { Form, Input, Button, Checkbox,message } from 'antd';
import Style from  './index.module.css'
import Axios from 'axios'
export default class Login extends Component {

    render () {
        return (
            <div>
                  <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 60
                        },
                        "size": {
                            "value": 3
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
              style={{
                background: 'darkblue',
                width: '100%',
                height: '100%'
              }}
                  />
                  <div className={Style.container}>
                      <Form
                        {...this.layout}
                        name="basic"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                      >
                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...this.tailLayout}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                  </div>

            </div>
        )
    }

    layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    }
    tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    }
    onFinish = values => {

      //真实接口写post 但是restfull api不能模拟出来
      Axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=${true}`)
      .then(res=>{
        console.log(res)

        if(res.data.length>0){
           localStorage.setItem('token',JSON.stringify(res.data[0]))
           this.props.history.push('/dashboard')
        }else{
          message.error("用户名密码不匹配")
        }
      }).catch(err=>alert(err))


    }
    onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }
}

