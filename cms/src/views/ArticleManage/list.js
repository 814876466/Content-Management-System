import React, { Component } from 'react'
import {Table,message, Tooltip, Button} from 'antd'
import Axios from 'axios'
import { DeleteOutlined,EditOutlined,PlaySquareOutlined} from '@ant-design/icons';

export default class list extends Component {
    state= {
        articleList:[],
    }
    columns =[
        {
            title: 'Article Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category)=>category.join('/')
          },
          {
            title: 'Action',
            key: 'action',
            render: (obj)=> <Tooltip>
                                <Button
                                    disabled={obj.default}
                                    type="danger"
                                    shape="circle"
                                    size="small"
                                    icon={<PlaySquareOutlined />   }
                                    onClick={ ()=>{
                                    this.handlePreview(obj.id)
                                    }}
                                    />
                                <Button
                                    disabled={obj.default}
                                    type="default"
                                    shape="circle"
                                    size="small"
                                    icon={<EditOutlined  /> }
                                    onClick={ ()=>{
                                    this.handleUpdate(obj.id)
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
                                    this.handleDelete(obj.id)
                                    }}
                                    />
                            </Tooltip>

          }

    ]
    componentDidMount () {
        Axios.get('http://localhost:5000/articles')
        .then(res=>{
            if(res.status===200){
                this.setState({
                    articleList:res.data
                })
            }else{
                message.warning(res.statusText)
            }
        }

        ).catch(err=>{message.error(err)})

    }
    render() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={()=>this.props.history.push('/article-manage/create')}
                >ADD ARTICLES</Button>
                <Table dataSource={this.state.articleList}
                   columns={this.columns}
                   rowKey={item => item.id}/>

            </div>

        )
    }
    handleDelete = (id) =>{
        Axios.delete(`http://localhost:5000/articles/${id}`).then(res=>{
            if(res.status===200){
                message.success(res.statusText)
                this.setState({
                    articleList:this.state.articleList.filter(item=>item.id!==id)
                })

            }else{message.error(res.statusText)}
        })
        .catch(err=>message.error(err))
    }

    handleUpdate = (id) => {
        this.props.history.push(`/article-manage/update/${id}`)
    }

    handlePreview = (id) =>{
        this.props.history.push(`/article-manage/preview/${id}`)
    }

}
