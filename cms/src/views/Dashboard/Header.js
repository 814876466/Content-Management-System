import React, { Component } from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import { Layout, Menu, Dropdown,Avatar,Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined

} from '@ant-design/icons';

const { Header } = Layout;


class IndexHeader extends Component {
    state = {
        collapsed: false,
      }
    token = JSON.parse(localStorage.getItem('token'))
     onClick = ({ key }) => {
        if (key==='exit'){
            this.exit()
        }
      };

     menu = (
        <Menu onClick={this.onClick}>
          <Menu.Item key="1">{this.token.roleName}</Menu.Item>
          <Menu.Item key="2"> Setting</Menu.Item>
          <Menu.Item key="exit">Exit</Menu.Item>
        </Menu>
      );

    exit = ()=>{

        localStorage.removeItem("token")
        this.props.history.push('/login')
    }
    toggle = () => {

        this.props.change({
          type:"change_collapse",
        payload:!this.state.collapsed
        })
        this.setState({
        collapsed: !this.state.collapsed,
        })
    }
    render() {
        return (
                <Header className="site-layout-background" style={{ padding: 0 }}>
                {
                this.state.collapsed?
                <MenuUnfoldOutlined onClick={this.toggle}/>
                :
                <MenuFoldOutlined  onClick={this.toggle}/>
                }
                <Button type="primary" onClick={()=>{this.goback()}} style={{marginLeft:"10px"}}>Back</Button>
                <div style={{float:'right', paddingRight: '10px'}}>
                    <span>Welcome,{this.token.username}</span>
                
                    <Dropdown overlay={this.menu}>
                        <Avatar icon={<UserOutlined />} size="large"/>
                    </Dropdown>

                </div>
                </Header>
            )
    }
    goback = () => {
      this.props.history.goBack()
    }
}
const mapStateToProps = ()=>{
  return {
    test:'0'
  }
}
const mapDispatchToProps ={
  change(obj){
    return obj
}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(IndexHeader))

