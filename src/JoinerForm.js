import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {browserHistory} from 'react-router';

import Socket from './socket/Socket';

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
        this.connectToRoom = this.connectToRoom.bind(this)
    }

    /**
     * When create checkbox is checked
     * @param {any} e
     * @param {any} create
     * 
     * @memberOf JoinerForm
     */
    onCreateCheck(e, create) {
        this.setState({
            create: create
        });
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

        //First, try and get the room
        this.getRoom(model.room)
            
            //if room exists
            .then(data => {
                //connect to the room
                this.connectToRoom(model.room, model.password, model.username);
            })

            //if room doesn't exist

            .catch(err => {
                //check 404 code
                if(err.statusCode === 404)
                {
                    //OK, room does not exist

                    //sould we create the room?
                    if(this.state.create)
                    {
                        //yes, create the room
                        Socket.createRoom(model.room, model.password)
                            .subscribe(function(){
                                //and then connect to it
                                this.connectToRoom(model.room, model.password, model.username);
                            }.bind(this));
                    }
                    else
                    {
                        //Nah, don't create the room
                        invalidateForm({
                            room: "Room does not exist"
                        });
                    }
                }
                //some other error
                else
                {
                    alert("Oops, something went wrong!");
                }
            })
    }

    /**
     * Connect to Room
     * 
     * @param {any} room
     * @param {any} password
     * @param {any} username
     * @param {any} invalidateForm
     * 
     * @memberOf JoinerForm
     */
    connectToRoom(room, password, username, invalidateForm){
        Socket.connectToRoom(room, password, username)
            .subscribe((result) => {
                if(!result.authenticated){
                    invalidateForm({
                        password: "Invalid Password"
                    })
                }
                else
                {
                    localStorage.setItem('room', room);
                    browserHistory.push('/');
                }
            })
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
            uri: config.baseUrl +'rooms/' + value,
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
