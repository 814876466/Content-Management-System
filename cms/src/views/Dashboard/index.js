import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from '../Home/index'
import UserManage from '../UserManage/index'
import RightManage from '../RightManage'
 import TopHeader from './Header'
 import SideMenu from './SideMenu'
import List from '../ArticleManage/list'
import Preview from '../ArticleManage/previewHooks'
import Create from '../ArticleManage/create'
import updateArticles from '../ArticleManage/updateArticles'
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.css' //全局影响
//antd
import { Layout } from 'antd'
import {autorun} from 'mobx'
import {isFullScreen} from '../../mobx/store'


const { Content } = Layout;



export default class Dashboard extends Component {
    state={
        isShow:true,
        collapsed: false
    }
    componentDidMount () {
        axios.get("/ajax/mostExpected",
        {
            params: {
                ci:10,
                limit:10,
                offset:0,
                token:'',
                optimus_uuid:'43388C403C4911EABDC9998C784A573A4F64A16AA5A34184BADE807E506D749E',
                optimus_risk_level:71,
                optimus_code:10
            }
        }

        ).then(res=>{
        })

        this.unscribe=autorun(()=>{
            this.setState({
                isShow:isFullScreen.get()
            })
        })
    }

    componentWillUnmount(){
        this.unscribe()//解绑监听事件
    }

    render() {
        let {roleType} = JSON.parse(localStorage.getItem('token'))
        return (
                <Layout>
                    {
                        this.state.isShow&&<SideMenu></SideMenu>
                    }


                    <Layout className="site-layout">
                    {
                        this.state.isShow&& <TopHeader></TopHeader>
                    }

                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: "auto",
                        }}
                    >


                           <Switch>
                                {/* 用户权限-用户列表 */}
                                {roleType===3 ?
                                <Route path="/user-manage/users" component= {UserManage}/>

                                : null}
                                 {roleType===3 ?
                               <Route path="/right-manage" component={RightManage}/>

                                : null}


                                {/* 文章管理- 文章列表 文章分类 */}
                                {
                                  roleType>=2 ?
                                  <Route path='/article-manage/preview/:id' component={Preview}></Route>
                                    :null
                                }
                                <Route path='/home' component={Home}></Route>
                                <Route path='/article-manage/list' component={List}></Route>
                                <Route path='/article-manage/create' component={Create}></Route>
                                <Route path='/article-manage/update/:id' component={updateArticles}></Route>

                                <Redirect from ="/" to="/home" exact/>

                            </Switch>
                    </Content>
                    </Layout>
                </Layout>

        )
    }
}
