import React from 'react'
import Title from './Title'
import { ChatList } from 'react-chat-elements'
import { Box, Button, TextField } from '@material-ui/core'
import {WEBSOCKET_URL} from './config'
import {useState,useEffect, useRef} from 'react'
import { animateScroll } from "react-scroll";

import 'react-chat-elements/dist/main.css';

const Messages = ({ component: Component, ...rest }) => {
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");
    const [isPaused, setPause] = useState(false);
    const [isActive, setActive] = useState(false);

    const ws = useRef(null);
    const chatContainerRef = useRef()

    useEffect(() => {
        ws.current = new WebSocket(WEBSOCKET_URL);
        ws.current.onopen = () => {console.log("ws opened"); setActive(true)}
        ws.current.onclose = () => { console.log("ws closed"); setActive(false)}

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            setMessages(prevState => [...prevState , message])
        };
    }, [isPaused]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "chat_container", smooth: false
        });
    }

    const sendMessage = () => {
        ws.current.send(JSON.stringify({"token": sessionStorage.getItem("token"), message: newMessage}))
        setNewMessage("")
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') sendMessage()
    }

    return (
        <>
        <Title>Messages</Title>
        <Box textAlign="left" position="relative"style={{overflow: "hidden"}}>
            <Box id="chat_container" style={{overflow: 'scroll', overflowX: 'hidden'}} height="370px" maxHeight="370px" >
                <ChatList
                    className='chat-list'
                    dataSource={messages} />
            </Box>
                <Box height="70px"></Box>
            <Box position='absolute' style={{bottom: 0, left: 0, right: 0}}>
                <Box display="flex" alignItems="center" bgcolor="white">
                    <TextField
                        id="filled-textarea"
                        label="Say something"
                        rows={2}
                        fullWidth={true}
                        onChange={(e) => { setNewMessage(e.target.value); }}
                        onKeyDown={handleKeyDown}
                        value={newMessage}
                        disabled={!isActive}
                        multiline />
                    <Box>
                        <Button size="small" color="primary" variant="contained" onClick={sendMessage}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default Messages