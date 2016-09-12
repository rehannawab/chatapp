import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const styles={
    cardHeader: {
        paddingBottom: 0
    },
    card: {
        "margin-top": 2
    },
    cardText: {
        paddingTop : 0
    }
}

var name="Rehan"
class ChatWindow extends Component {
    render() {
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        title="Rehan"
                        style={styles.cardHeader}
                    />
                    <CardText style={styles.cardText}>
                        Hello world
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                        title="Rehan"
                        style={styles.cardHeader}
                    />
                    <CardText style={styles.cardText}>
                        Hello world
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default ChatWindow;
