import React, {useState,useEffect} from 'react'
import { message} from 'antd';
import Axios from 'axios'

export default function PreviewHooks(props) {
    const [state, setstate] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    let id =props.match.params.id
    useEffect(() => {
            Axios.get(`http://localhost:5000/articles/${id}`).then(
            res=>{
                if(res.status===200){
                    let {content,title,category} =res.data
                    setstate(content)
                    setTitle(title)
                    setSubtitle(category.join('/'))

                }else{
                    message.error(res.statusText)
                }
            }
        ).catch(err=>message.error(err))
        }, [id])






    return (
        <div>
                Preview Your Article
                <p>{title}--{subtitle}</p>
                <div dangerouslySetInnerHTML={{__html:state}} ></div>
            
            </div>
    )
}
