import React, { Component } from 'react';

import './search-panel.css'

class SearchPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
        this.onApdateSearch = this.onApdateSearch.bind(this)
    }
    onApdateSearch(e){
        const term = e.target.value
        this.setState({term})
        this.props.onUpdateSearch(term)
    }
   render(){
    return (
       <input
       className='form-control search-input'
       type='text'
       placeholder='посик по записям'
       onChange={this.onApdateSearch}/>
    )
   }
}

export default SearchPanel;