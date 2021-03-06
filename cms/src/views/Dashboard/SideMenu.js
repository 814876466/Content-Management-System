import React, { Component } from 'react'
import MenuArr from '../../router/menu' //引入menu数据
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router';
//import store from '../../redux/store'
import {connect} from 'react-redux'
const { SubMenu } = Menu;
const { Sider } = Layout;
// const {roleType} = JSON.parse(localStorage.getItem('token'))

class SideMenu extends Component {


  SelectMenu = (val) => {
    const {roleType} = JSON.parse(localStorage.getItem('token'))
    return val.map(item => {
      if (item.children) {
        if (roleType>=item.permission){
          return (
            <SubMenu
              key={item.path}
              title={
                <span>
                  <item.icon />
                  <span>{item.title}</span>
                </span>
              }
            >
              {
                item.children.map(subItem => {
                  if(roleType>=subItem.permission){
                    return (
                      <Menu.Item key={subItem.path}>{subItem.title}</Menu.Item>
                    )
                  }else{
                    return null
                  }
                })
              }
            </SubMenu>
          )
        }else{
          return null
        }
      } else {
        return (
          <Menu.Item key={item.path} icon={<item.icon />}>
            {item.title}
          </Menu.Item>
        )
      }
    })
  }

  handleChangePage= (obj)=>{
    this.props.history.push(obj.key)
  }
  render() {
    let selectedKey= this.props.location.pathname
    return (
      <Sider trigger={null} collapsible collapsed={this.props.isCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          onClick={this.handleChangePage}
          >
          {this.SelectMenu(MenuArr)}
        </Menu>
      </Sider>
    )
  }
}

//React-redux
const mapStateToProps = state => {
  return {
      isCollapsed:state.isCollapsed
  } 
}

export default connect(mapStateToProps)(withRouter(SideMenu))
