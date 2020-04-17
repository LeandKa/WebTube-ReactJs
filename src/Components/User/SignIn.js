import React, { Component } from 'react'
import {Grid, Typography,Paper} from '@material-ui/core';
import {Form,FormGroup, Label,Input,Button} from 'reactstrap';
import axios from 'axios';


const styles ={
    h1:{
     textAlign:'center'
    },
    form:{
        width:'450px',
        textAlign:'center'
    }
}


export default class SignIn extends Component {


    constructor(props){
        super(props);
            this.state={
               file:'',
               name:'',
               password:'',
               username:''
            }
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onformChange = this.onformChange.bind(this);
            this.onChangeImage = this.onChangeImage.bind(this);
    }


    onChange (event) {
      this.setState({[event.target.name]:event.target.value});
    }
    
    onformChange(){
     const formData = new FormData();
     formData.append('name',this.state.name);
     formData.append('username',this.state.username);
     formData.append('password',this.state.password);
     formData.append('img',this.state.file);
     return formData
    }
    onChangeImage(event){
      this.setState({file:event.target.files[0]})
    }

    onSubmit (event){
     event.preventDefault();

     const data = this.onformChange()

     axios.post('http://localhost:3000/create-user',data)
     .then(result =>{
      alert('Usuario criado com sucesso');
      this.props.history.push('/')
     })
     .catch(err =>{
       console.log('Nao criado')
     })
    }



    render() {
        return (
            <div>
                <React.Fragment>
                    <Grid container direction="column" alignItems="center" justify="center" spacing={3}>
                        <Grid item xs={12}>
                          <Typography style={styles.h1} variant='h3'>Novo Usuario</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper style={styles.form}>
                              <Form onSubmit={this.onSubmit}>
                               <FormGroup>
                                   <Label>Nome:</Label>
                                   <Input type="text" name="name" id="name" onChange={this.onChange}></Input>
                               </FormGroup>
                               <FormGroup>
                                  <Label>Username:</Label>
                                  <Input type="text" name="username" id="username" onChange={this.onChange}></Input>
                               </FormGroup>
                               <FormGroup>
                                  <Label>Password:</Label>
                                  <Input type="password" name="password" id="password" onChange={this.onChange}></Input>
                               </FormGroup>
                               <FormGroup>
                                  <Label>AvatarImg:</Label>
                                  <Input type="file" name="file" id="file" onChange={this.onChangeImage}></Input>
                               </FormGroup>

                               <Button type="submit">Cadastrar</Button>
                              </Form>
                          </Paper>
                        </Grid>
                        
                    </Grid>
                </React.Fragment>
            </div>
        )
    }
}
