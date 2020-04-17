import React, { Component } from 'react'
import { Route, Link,Redirect, BrowserRouter as Router } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { Form,Input } from 'reactstrap';
import axios from 'axios';


const navItemSearch ={
    width:'200px'
  }


export default class SearchBar extends Component {
    constructor(props){
        super(props);
            this.state={
                search:''
            }
        }

    onSubmit(event){
        event.preventDefault();
        axios.get(`http://localhost:3000/videos/result/search:${this.state.search}`)
        .then(result =>{
          console.log(result.data)
        }).catch(err =>{
           console.log('Lognot')
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                <Input style={navItemSearch} id="search" onChange={this.onChange} type="text" name="search" placeholder="Search..."></Input>
                </Form>
            </div>
        )
    }
}
