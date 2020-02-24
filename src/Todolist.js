import React, { Component } from 'react';
import 'antd/dist/antd.css'
import store from './store'
import {getTodolist,changeInputAction,addItemAction,deleteItemAction,getListAction} from './store/actionCreators'
import TodoListUI from './TodoListUI'
import axios from 'axios'

//箭头函数写法 
function changeInputValue(e) {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
}

class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        // this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickButton = this.clickButton.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        // 订阅store
        store.subscribe(this.storeChange) 
    }
    render() { 
        return ( 
            <TodoListUI
                inputValue={this.state.inputValue}
                changeInputValue = {(e)=>{changeInputValue(e)}}
                clickButton = {this.clickButton}
                list={this.state.list}
                deleteItem={this.deleteItem}
            />
        );
    }
    componentDidMount(){
        // axios.get('https://www.esay-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
        //     const data = res.data
        //     const action = getListAction(data)
        //     store.dispatch(action)
        // })
        // 中间件写法
        const action = getTodolist()
        store.dispatch(action)

    }
    storeChange(){
        this.setState(store.getState())
    }
    clickButton(){
        const action = addItemAction()
        store.dispatch(action)
    }
    deleteItem(index){
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
}

export default Todolist;