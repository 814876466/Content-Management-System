import React, { Component } from 'react'
import { message} from 'antd';
import Axios from 'axios'
export default class preview extends Component {
    state = {
        content:''
    }
    componentDidMount () {
        let id =this.props.match.params.id

        Axios.get(`http://localhost:5000/articles/${id}`).then(
            res=>{
                if(res.status===200){
                    this.setState({
                        content:res.data.content
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
                Preview

                <div dangerouslySetInnerHTML={{__html:this.state.content}} ></div>
            
            </div>
        )
    }
}
