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
          title: 'Basic Information'
        },
        {
          title: 'Article Content',
        },
        {
          title: 'Submit',
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
                            placeholder="Please select"
                            fieldNames={{ label: 'title' }}
                        />
                </Form.Item>


                </Form>


                <Button type="primary" onClick={() => this.next()}>
                            Next
                </Button>

                   

            </div>
        )
    }

    next= () => {
        if (this.state.current===0) {
            this.refs.firstForm.validateFields() 
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
