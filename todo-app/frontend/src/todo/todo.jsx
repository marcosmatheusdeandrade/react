import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = {description: '', list: []}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
    
        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => 
                this.setState({
                ...this.state, 
                description:'',
                list: resp.data
            }))
    }
    
    handleSearch() {
        this.refresh(this.state.description);
    }

    handleClear() {
        this.refresh();
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value});
    }
    
    handleMarkAsDone(todo) {
        console.log('fim?'+todo)
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
        .then(resp => {
            console.log('fim?'+resp)
            this.refresh()
        })
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
        .then(resp => this.refresh())
    }

    handleAdd() {
        const {description} = this.state;
        axios.post(URL, {description})
            .then(resp => this.refresh());
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh())
    }

    render() {
        const {
            state,
            handleAdd,
            handleSearch,
            handleChange,
            handleClear,
            handleRemove, 
            handleMarkAsDone, 
            handleMarkAsPending} = this;

        const {description, list} = state;

        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'>
                </PageHeader>    
                <TodoForm description={description} 
                    handleAdd={handleAdd} 
                    handleChange={handleChange}
                    handleClear={handleClear}
                    handleSearch={handleSearch} />
                <TodoList 
                    handleRemove={handleRemove}
                    handleMarkAsDone={handleMarkAsDone}
                    handleMarkAsPending={handleMarkAsPending}
                    list={list} />
            </div>
        )
    }
} 