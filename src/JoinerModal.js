import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import JoinerForm from './JoinerForm';

class JoinerModal extends Component {

    render() {
        return (
            <div>
                Hello
                <Dialog
                    title="Join a room"
                    open={true}
                >
                    <JoinerForm
                    />
                </Dialog>
            </div>
        );
    }
}

export default JoinerModal;
