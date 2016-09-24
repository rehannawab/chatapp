import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {browserHistory} from 'react-router';

var rp = require('request-promise');

var $ = require('jquery');

var config = require('./config');

/**
 * Form for joining a chat Room
 * 
 * @class JoinerForm
 * @extends {Component}
 */
class JoinerForm extends Component {

    /**
     * Creates an instance of JoinerForm.
     * 
     * @param {any} props
     * 
     * @memberOf JoinerForm
     */
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

    /**
     * When create checkbox is checked
     * TODO: Remove server call. All validations will be performed on submit
     * @param {any} e
     * @param {any} create
     * 
     * @memberOf JoinerForm
     */
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

    /**
     * When form submit is valid (without validation errors)
     * 
     * TODO: Refactor this crappy function
     * @param {any} model from the Form
     * @param {any} resetForm reset the form
     * @param {any} invalidateForm function to invalidate the form
     * 
     * @memberOf JoinerForm
     */
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

    /**
     * Get the room 
     * 
     * @param {any} value name of the room
     * @returns promise
     * 
     * @memberOf JoinerForm
     */
    getRoom(value){
        var options = {
            uri: config.baseUrl + 'rooms/' + value,
            json: true
        }

        return rp.get(options);
    }

    /**
     * 
     * 
     * @returns JSX
     * 
     * @memberOf JoinerForm
     */
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
                    value="rehan"
                /><br />
                <FormsyText
                    name="room"
                    ref="room"
                    hintText="Room"
                    required
                    value="rehan"
                /><br />
                <FormsyText 
                    name="password"
                    hintText="Password"
                    type="password"
                    required
                    value="rehan"
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
