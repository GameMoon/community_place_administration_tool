import React from 'react'
import Title from './Title'
import { ChatList } from 'react-chat-elements'
import { Box } from '@material-ui/core'
import { Input } from 'react-chat-elements'
import Button from '@material-ui/core/Button';

import 'react-chat-elements/dist/main.css';

const Messages = ({ component: Component, ...rest }) => {

    return (
        <>
        <Title>Messages</Title>
        <Box textAlign="left" position="relative">
            <Box style={{overflow: 'scroll'}} maxHeight="440px">
            <ChatList
                className='chat-list'
                dataSource={[
                    {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    },
                    {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    }, {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    }, {
                        title: 'Facebook',
                        subtitle: 'What are you doing?',
                        date: new Date(),
                        unread: 0,
                    }
            ]} />
            </Box>
            <Box position='absolute' style={{bottom: 0, left: 0, right: 0}}>
                <Input
                    placeholder="Type here..."
                    multiline={true}
                    rightButtons={
                        <Button size="small" color="primary" variant="contained" >
                            Send
                        </Button>
                    } />
            </Box>
        </Box>
        </>
    )
}

export default Messages