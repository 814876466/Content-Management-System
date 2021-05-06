import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'
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
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    contentState=""
                    onContentStateChange={this.onContentStateChange}
                    onEditorStateChange={this.onEditorStateChange}
                    onBlur={()=>{

                      
                        this.props.onEvent(draftjsToHtml(this.state.contentState))
                    }} //html formation
                    />
        )
    }
    onContentStateChange = (contentState)=>{
        this.setState({
            contentState
        })
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })

    }
}


