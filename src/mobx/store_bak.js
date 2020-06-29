import {observable,autorun} from 'mobx'

//1.利用observable定义可观察对象 (简单数据类型,string ,number,bool..)

let numberObserver = observable.box(0)

let stringObserver = observable.box("kerwin")
// 2.订阅回调函数， 第一次以及后来每次更新时会执行
autorun(()=>{
    console.log("只有number改变，才会执行",numberObserver.get())
})//细粒度

autorun(()=>{
    console.log("只有string改变，才会执行",stringObserver.get())
})//细粒度




setTimeout(()=>{
    //set修改可观测对象

    numberObserver.set(100) //

    // stringObserver.set("xiaoming")
},5000)


setTimeout(()=>{
    //set修改可观测对象

    // numberObserver.set(100) //

    stringObserver.set("xiaoming")
},10000)

