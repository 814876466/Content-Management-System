import React, { Component } from 'react'
import { Form,Button, Input, Cascader,message } from 'antd';
import Axios from 'axios'
export default class Create extends Component {
    state={
        current: 0,
        categoryList:[],
        content:''

    }
    steps = [
        {
          title: '基本信息'
        },
        {
          title: '文章内容',
        },
        {
          title: '提交文章',
        },
      ];
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };

      componentDidMount(){
        Axios.get('http://localhost:5000/categories').then(
            res=>{
                if(res.status===200){
                    this.setState({
                        categoryList:res.data
                    })
                }else{
                    message.error(res.statusText)
                }
            }
        ).catch(err=>message.error(err))
     }

    render() {


        return (
            <div>
                 {/* <Form
                 style={{marginTop:"10px"}}
                  ref="firstForm"
                  name="control-ref"
                  onFinish={this.onFinish}>

                    <Form.Item
                    label="title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="category" name="category" rules={[{ required: true }]}>
                        <Cascader
                            options={this.state.categoryList}
                            // onChange={onChange}
                            placeholder="Please select"
                            // showSearch={{ filter }}
                            //后端数据中没有label。我们可以自定义
                            fieldNames={{ label: 'title' }}
                        />,
                    </Form.Item>
                </Form> */}

                <Form
                    style={{marginTop:"10px"}}
                    ref="firstForm"
                    name="control-ref"
                    onFinish={this.onFinish}
                >
                <Form.Item
                     label="title"
                     name="title"
                     rules={[{ required: true, message: 'Please enter a title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="category" name="category" rules={[{ required: true }]}
                >
                    <Cascader
                            options={this.state.categoryList}
                            // onChange={onChange}
                            placeholder="Please select"
                            // showSearch={{ filter }}
                            //后端数据中没有label。我们可以自定义
                            fieldNames={{ label: 'title' }}
                        />
                </Form.Item>


                </Form>


                <Button type="primary" onClick={() => this.next()}>
                            Next
                </Button>

                     {/* 进度条按钮 */}
                     {/* <div className="steps-action">
                        {this.state.current < this.steps.length - 1 && (

                        )}
                        {this.state.current === this.steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                            </Button>
                        )}
                        {this.state.current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                        )}
                        </div> */}

            </div>
        )
    }

    next= () => {
        if (this.state.current===0) {
            this.refs.firstForm.validateFields() //验证表单
            .then(value=>{console.log(value)}).catch(errorInfo => {

              });
        this.setState({
            current:this.state.current+1
        })
      }
    }

      prev = () => {
        this.setState({
            current:this.state.current-1
        })
      }

      onFinish = (value) =>{
        console.log(value)

      }
}
