//store管理 全屏看图表
import {observable} from 'mobx'

const isShowObserver = observable.box(true)

export {
    isShowObserver
}