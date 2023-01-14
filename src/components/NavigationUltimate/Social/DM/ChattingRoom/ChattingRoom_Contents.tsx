import React, { useState, useEffect } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from 'src/api/chat';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const Wrapper = styled.div`
  height: 460px;
  width: 370px;
`;

export default function ChatBubbles(props) {
  // 기존 메세지 리스트 -> 삭제 예정
  const [messageList, setMessageList] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
  ]);

  // 채팅 시작 시 저장되어 있던 채팅 리스트 보여줌
  socket.on('start_chat', (data) => {
    console.log(data);
    setMessageList((messageList) => [...messageList, ...data]);
  });

  // 실시간 메세지 받으면 채팅 리스트에 추가
  socket.on('chatting', (data) => {
    console.log(data);
    data.id = 1;
    setMessageList((messageList) => [...messageList, data]);
  });

  // 내가 쓴 메세지 채팅 리스트에 추가
  useEffect(() => {
    console.log('props.newMessage', props.newMessage);
    setMessageList((messageList) => [...messageList, props.newMessage]);
  }, [props.newMessage]);

  // 내가 쓴 메세지 서버에 전송
  socket.emit('chatting', props.newMessage);

  return (
    <>
      <Wrapper>
        <ChatFeed
          maxHeight={460}
          messages={messageList} // Array: list of message objects
          // isTyping={false} // Boolean: is the recipient typing
          // hasInputField={false} // Boolean: use our input, or use your own
          // showSenderName={'who'} // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 20,
            },
            chatbubble: {
              borderRadius: 25,
              padding: 15,
              maxWidth: 200,
              width: 'fit-content',
              marginTop: 1,
              marginRight: 'auto',
              marginBottom: 1,
              marginLeft: 'auto',
              wordBreak: 'break-all',
            },
            userBubble: {},
          }}
        />
      </Wrapper>
    </>
  );
}
