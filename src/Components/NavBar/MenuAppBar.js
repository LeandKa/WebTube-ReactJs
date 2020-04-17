import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,Form
} from 'reactstrap';

const navItemSearch ={
  width:'200px'
}

export default class MenuAppBar extends Component {
  
  constructor(props){
    super(props);
        this.state={

        }
        this.logout = this.logout.bind(this);
}

  logout (){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  render(){
    if(this.props.isLogging === false){
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">WebTube</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/Login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/SignIn">SignIn</NavLink>
                </NavItem>
              </Nav>
              <div>
                <Form onSubmit={this.props.onSubmit}>
                <Input style={navItemSearch} id="search" onChange={this.props.onChange} type="text" name="search" placeholder="Search..."></Input>
                </Form>
            </div>
            </Collapse>
          </Navbar>
        </div>
      );
    }else{
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">WebTube</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Upload">Upload</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/My-Profile">MyProfile</NavLink>
                </NavItem>
              </Nav>
              <div>
                <Form onSubmit={this.props.onSubmit}>
                <Input style={navItemSearch} id="search" onChange={this.props.onChange} type="text" name="search" placeholder="Search..."></Input>
                </Form>
            </div>
            </Collapse>
          </Navbar>
        </div>
      );
    }
    }
  }
