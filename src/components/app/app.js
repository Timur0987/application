import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [
                {label: 'Going to learn React fuck', important: false, like: false, id:1},
                {label: 'That is so good', important: false, like: false, id:2},
                {label: 'I need a break...', important: false, like: false, id:3},
            ],
            term:'',
            filter:'all'
        };
        this.DeleteItem = this.DeleteItem.bind(this)
        this.AddItem = this.AddItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
        
        this.maxId = 4
    } 
    DeleteItem(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)

            const before = data.slice(0, index)
            const after = data.slice(index + 1)
            const  newArr = [...before, ...after]
            console.log(`Удаленна запись с id: ${id}`)
            return{
                data: newArr
                
            }
        })
    }
    AddItem(body){
        const newItem ={
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data,newItem]
            return{
                data:newArr
            }
        })
    }

    searchPost(items,term){

        if(term.length === 0){
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onToggleImportant(id){
       this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]

            const newItem = {...old,important: !old.important}

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return{
                data:newArr
            }
        })
    }
    onToggleLike(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)

            const old = data[index]

            const newItem = {...old,like: !old.like}

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return{
                data:newArr
            }
        })
    }
    filterPost(items,filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }else{
            return items
        }

    }

    onUpdateSearch(term){
        this.setState({term})
    }
    onFilterSelect(filter){
        this.setState({filter})
    }
    render(){
        const {data, term, filter} = this.state

            const liked = this.state.data.filter(item => item.important).length
            const allPosts = this.state.data.length

        const visiblePost = this.filterPost(this.searchPost(data,term),filter)
        return (
            <div className="app">
                 <AppHeader
                 liked={liked} 
                 allPosts={allPosts}/>
                 <div className="search-panel d-flex">
                     <SearchPanel
                     onUpdateSearch={this.onUpdateSearch}/>
                     <PostStatusFilter
                     filter={filter}
                     onFilterSelect={this.onFilterSelect}/>
                 </div>
                 <PostList 
                 posts={visiblePost}
                 onDelete={this.DeleteItem}
                 onToggleImportant={this.onToggleImportant}
                 onToggleLike={this.onToggleLike}/>
                 <PostAddForm
                 onAdd={this.AddItem}/>
            </div>
         )
    }
}

export default App;
///52:53w