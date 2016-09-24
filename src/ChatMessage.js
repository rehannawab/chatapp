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

/**
 * Chat Message displayed inside Chat Window
 */
class ChatMessage extends Component {
    render() {
        return (
                <Card style={styles.card}>
                    <CardHeader
                        title={this.props.message.username}
                        style={styles.cardHeader}
                    />
                    <CardText style={styles.cardText}>
                        {this.props.message.message}
                    </CardText>
                </Card>
        );
    }
}

export default ChatMessage;