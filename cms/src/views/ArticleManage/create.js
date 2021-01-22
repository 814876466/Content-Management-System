import React, { Component } from 'react'
import { Steps, Button, message,Form, Input, Cascader } from 'antd';
import Axios from 'axios'
import DraftEditor from './draftEditor'

const { Step } = Steps;


export default class Create extends Component {
    state={
        current: 0,
        categoryList:[],
        content:'',
        basicInfo:{}


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
                <Steps current={this.state.current}>
                    {/*进度条名字  */}
                {this.steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
                </Steps>

                {/* 进度条内容 */}
                <div style={{display:this.state.current===0?"block":"none"}}>

                <Form {...this.layout}
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
                        />
                    </Form.Item>
                </Form>
                </div>

                <div style={{height:"500px",display:this.state.current===1?"block":"none"}}>
                   <DraftEditor onEvent={(content)=>{
                        this.setState({
                            content
                        })
                    }} />
                </div>
                <div style={{display:this.state.current===2?"block":"none"}}>
                </div>

                {/* 进度条按钮 */}
                <div className="steps-action">
                {this.state.current < this.steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                    Next
                    </Button>
                )}
                {this.state.current === this.steps.length - 1 && (
                    <Button type="primary" onClick={() => {this.onSubmit()}}>
                    Done
                    </Button>
                )}
                {this.state.current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                    Previous
                    </Button>
                )}
                </div>
            </div>
        )
    }

    next= () => {
        if (this.state.current===0) {
            console.log(this.refs.firstForm)
            this.refs.firstForm.validateFields() //验证表单
            .then(
                value=>{console.log(value)
                this.setState({
                    current:this.state.current+1,
                    basicInfo: value
                })
            }).catch(err=>{})
        }else{
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

      onSubmit = () =>{
        // "title": "1111111",
        // "content": "1-conent",
        // "author": "admin",
        // "category": [
        //   "娱乐",
        //   "星座"
       let author= JSON.parse(localStorage.getItem('token')).username
      let {title,category} =this.state.basicInfo
       Axios.post('http://localhost:5000/articles',{
        author,
        content:this.state.content,
        title,
        category
       }).then(res=>{
        message.success('Processing complete!')
        this.props.history.push('/article-manage/list')
       }).catch(err=>message.error(err))
      }
}
