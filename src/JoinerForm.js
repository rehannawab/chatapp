import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {browserHistory} from 'react-router';

var rp = require('request-promise');

var $ = require('jquery');

var config = require('./config');

class JoinerForm extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            create: false,
        }
        this.getRoom = this.getRoom.bind(this);
        this.onCreateCheck = this.onCreateCheck.bind(this);
        this.validSubmit = this.validSubmit.bind(this);
    }

    onCreateCheck(e, create) {
        this.setState({
            create: create
        });
        if(!create)
        {
            this.getRoom();
        }
        else
        {
            this.refs.form.updateInputsWithError({
                room: ""
            })
        }
    }

    validSubmit(model, resetForm, invalidateForm){
        if(!this.state.create){
            this.getRoom(model.room)
                .then(function(data){
                    socket.emit("connectToRoom", model.room, model.password, model.username, function(result){
                        if(!result.authenticated){
                            invalidateForm({
                                password: "Invalid Password"
                            })
                        }
                        else
                        {
                            localStorage.setItem('room', model.room);
                            browserHistory.push('/');
                        }
                    })
                })
                .catch(function(err){
                    invalidateForm({
                        room: "Room does not exist"
                    });
                });
        }
        else{
            socket.emit("createRoom", model.room, model.password, function(err){
                if(!err)
                {
                    socket.emit("connectToRoom", model.room, model.password, model.username, function(result){
                        if(!result.authenticated){
                            invalidateForm({
                                password: "Invalid Password"
                            })
                        }
                        else
                        {
                            localStorage.setItem('room', model.room);
                            browserHistory.push('/');
                        }
                    });
                }
            })
        }
    }

    getRoom(value){
        var options = {
            uri: config.baseUrl + 'rooms/' + value,
            json: true
        }

        return rp.get(options);
    }

    render() {
        return (
            <Formsy.Form
                ref="form"
                onValidSubmit={this.validSubmit}
            >
                <FormsyText
                    name="username"
                    hintText="Your Name"
                    required
                    validations="isWords"
                    validationError="Words"
                /><br />
                <FormsyText
                    name="room"
                    ref="room"
                    hintText="Room"
                    required
                /><br />
                <FormsyText 
                    name="password"
                    hintText="Password"
                    type="password"
                    required
                /><br />
                <Checkbox 
                    name="createCheck"
                    label="Create room if it doesn't exist"
                    onCheck={this.onCreateCheck}
                    checked={this.state.create}
                /><br />
                <RaisedButton
                    type="submit"
                    label={this.state.create ? "Create" : "Join"}
                    primary={true}
                />
            </Formsy.Form>
        );
    }
}

export default JoinerForm;
