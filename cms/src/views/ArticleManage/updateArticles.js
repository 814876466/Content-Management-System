import React, { Component } from 'react'
import { Steps, Button, message,Form, Input, Cascader } from 'antd';
import Axios from 'axios'
import DraftEditor from './draftEditor'




const { Step } = Steps;


export default class updateArticles extends Component {
    state={
        current: 0,
        categoryList:[],
        details:{},
        content: '',
        firstNumber:1



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

        let id =this.props.match.params.id

        Axios.get(`http://localhost:5000/articles/${id}`).then(
            res=>{
                if(res.status===200){
                    let {title, category, content}=res.data
                    this.setState({
                       details:{
                        title,category
                       },
                       content,
                       firstNumber:2
                    })
                    this.refs.firstForm.setFieldsValue(this.state.details)
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
                  
                {this.steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
                </Steps>
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
                            placeholder="Please select"
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
                    }}  InputContent={this.state.content} key={this.state.firstNumber} />
                </div>
                <div style={{display:this.state.current===2?"block":"none"}}>
                </div>

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
            this.refs.firstForm.validateFields() 
            .then(
                value=>{
                this.setState({
                    current:this.state.current+1,
                    details: value
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
       let author= JSON.parse(localStorage.getItem('token')).username
      let {title,category} =this.state.details
       let id=this.props.match.params.id
       Axios.put(`http://localhost:5000/articles/${id}`,{
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
