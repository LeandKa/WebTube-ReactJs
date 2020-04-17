import React, { Component } from 'react';
import {Grid, TextareaAutosize} from '@material-ui/core';
import {InputGroup, Button, Form, FormGroup} from 'reactstrap';


const classes = {
    width: '300px',
    height: '150px',
    resize: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'gray',
    marginBottom:'20px'
}



export default class CommentNew extends Component {

    componentDidMount(){
        console.log(this.props.comment);
    }


    render() {
        return (
            <div>
                <React.Fragment>
                    <Grid container direction="Row" justify="center" alignItems="stretch" spacing={4}>
                        <Grid item xs={12}>
                            <Form onSubmit={this.props.onSubmit}>
                                <FormGroup>
                                <InputGroup>
                                 <TextareaAutosize style={classes} onChange={this.props.onChange} name="text" value={this.props.comment.text} placeholder="Put your comment here" rowsMin={6}></TextareaAutosize>
                                </InputGroup>
                                </FormGroup>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </div>
        )
    }
}
