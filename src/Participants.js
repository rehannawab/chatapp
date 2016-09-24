import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';

const style = {
    width: 250
}

/**
 * Component which will display all Participants of the chat
 * 
 * @class Participants
 * @extends {Component}
 */
class Participants extends Component {
    /**
     * 
     * 
     * @returns
     * 
     * @memberOf Participants
     */
    render() {
        return (
                <Drawer
                    open={true}
                    openSecondary={true}
                    docked={true}
                    containerStyle = {style}
                >
                    User 1
                    User 2
                </Drawer>
        );
    }
}

export default Participants;
