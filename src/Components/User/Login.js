import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const container = {
    marginTop:'30px'
}

const buttons = {
    marginTop:'30px',
    color:'black'
}

const erro = {
    color:'red'
}

export default class Login extends Component {

    constructor(props){
        super(props);
            this.state={
                username:'',
                password:'',
                isError:false
            }
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }


     onChange (event) {
        this.setState({[event.target.name]:event.target.value});
      }
      
    onSubmit(event){
        event.preventDefault();
        const user = {
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:3000/login',user)
        .then(result =>{
            localStorage.setItem('token',result.data.token)
            localStorage.setItem('id',result.data.userId);
            this.props.history.push('/')
            
        })
        .catch(err =>{
           this.setState({isError:true});
           console.log('estou aqui')
        })
      }


    render() {
        return (
            <div>
                <React.Fragment >
                   <Grid container style={container} direction="column" justify="center" alignItems="center" spacing={2}>
                       {
                          this.state.isError && <h5 className={erro}>Username ou Password com problema</h5>    
                       }
                   <form onSubmit={this.onSubmit}>
                       <Grid item xs={12}>
                        <TextField 
                        label="Username" id="username" onChange={this.onChange} name="username"></TextField>
                       </Grid>
                       <Grid item xs={12}> 
                       <TextField
                       label="Password"
                       type="password" id="password" name="password" onChange={this.onChange}></TextField>
                       </Grid>
                       <Grid item xs={12}>
                        <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit" style={buttons}>Submit</Button>
                       </Grid>
                       </form>
                    </Grid>                  
                </React.Fragment>
            </div>
        )
    }
}
