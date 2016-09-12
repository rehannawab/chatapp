import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';

const style = {
    width: 250
}

class Participants extends Component {
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
