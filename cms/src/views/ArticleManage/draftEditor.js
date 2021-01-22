import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'// draft对象==》html 方便存储数据库
import { EditorState,ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

import './index.css'
export default class draftEditor extends Component {

    state = {
        editorState:"",
        contentState:""
    }
    componentDidMount () {
        if(!this.props.InputContent){
            return null
        }
        //这步是因为为了防止数据还没拿到所以inputcontent是undefined,后面就无法进行，们会报错

        const html = this.props.InputContent;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState
          })
        }
    }

    render() {

        return (
            <Editor
                    editorState={this.state.editorState} //不写的话写字板不显示内容
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    contentState="" //里面是填写的内容
                    onContentStateChange={this.onContentStateChange}//改变state的内容
                    onEditorStateChange={this.onEditorStateChange}
                    onBlur={()=>{
                         console.log("失去焦点",draftjsToHtml(this.state.contentState))

                        //子=>父
                        this.props.onEvent(draftjsToHtml(this.state.contentState))
                    }} //进行html格式化
                    />
        )
    }
    onContentStateChange = (contentState)=>{
        // console.log(draftjsToHtml(contentState))
        // contentState ==> html 格式代码 ===> 存到数据库中
        this.setState({
            contentState
        })
        console.log(this.state.contentState)
    }

    onEditorStateChange = (editorState)=>{
        // console.log(editorState)
        this.setState({
            editorState
        })

    }
}


