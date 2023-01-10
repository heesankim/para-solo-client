import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../../assets/directmessage/DM.svg';
import channelTalkPNG from '../../../assets/directmessage/channeltalk.png';
import {InsideChattingRoom} from '../ChattingRoom/ChattingRoom';
import { DMSlice, SetTruelistORroom, SetFalselistORroom,Setkey} from '../../../stores/DMbox';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import {ConversationList} from './DirectMessageBox_ConversationList';
import {DMboxHeader} from './DirectMessageBox_Header';
import {DMSearchConversation} from './DirectMessageBox_SearchConversation';

const Wrapper = styled.div`
    position: fixed;
    top: 90%;
    left: 95%;
    transform: translate(-50%, -50%);
`
const DMwrapper = styled.div`
    position: absolute;
    top: -200%;
    left: -100%;
    transform: translate(-50%, -50%);
    background : none;
    gap: 10px;
    bottom: 60px;
    height: 680px;
    width: 370px;
    border-radius: 25px;
    box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`
const DM = styled.div`
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    font-weight: bold;
    `

const DMmessage = styled.div`
    background : #FFFFFF;
    height: 100px;
    font-size: 28px;
`



/* DMbox */
function DMbox(props) {
    //대화목록 여기서 받아서 conversations에 집어넣어야 함
    //서버 열리면 <<여기>>에 작성 예정

    const conversations = [
      {
        id: "1",
        name: "yeosu_swagger",
        picture: "https://user-images.githubusercontent.com/63194662/211139459-96aa37f8-fcd9-4126-9a6b-52296fc3236c.png",
        lastMessage: "오늘밤 뭐해?",
      },
      {
        id: "2",
        name: "kwkim_colyseusPerfume",
        picture: "https://user-images.githubusercontent.com/63194662/211139465-f601878d-4bdb-4607-b0e8-87c1e06d9be5.png",
        lastMessage: "(광고) 당신의 향기, 오늘 저와 함께 찾아보아요",
      },
      {
        id: "3",
        name: "song_song",
        picture: "https://user-images.githubusercontent.com/63194662/211139470-15f07dd8-11e7-4d78-9eff-2cf57fe04233.png",
        lastMessage: "오늘 물 좋은데?",
      },
      {
        id: "4",
        name: "busan_swagger",
        picture: "https://user-images.githubusercontent.com/63194662/211139476-cfb481af-b486-4854-ab9b-86e759a4b151.png",
        lastMessage: "왐마... 서면으로 와라 빨리",
      },
      {
        id: "5",
        name: "fox_sean",
        picture: "https://user-images.githubusercontent.com/63194662/211139480-0f155385-40a9-4fba-ae7b-679769d02318.png",
        lastMessage: "합석 고?ㅎㅎ",
      },
      {
        id: "6",
        name: "정주원 코치님",
        picture: "https://user-images.githubusercontent.com/63194662/211139490-e3606d1d-3f68-4041-8b99-1a09d2a1b61c.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "7",
        name: "류석영 교수님",
        picture: "https://user-images.githubusercontent.com/63194662/211139494-a3f9345d-e84a-41ab-9f50-0a1a9f71acfe.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "8",
        name: "장병규 의장님",
        picture: "https://user-images.githubusercontent.com/63194662/211139498-7f49d48c-a4f5-4f05-8e33-146cab59f239.png",
        lastMessage: "I'm good, how about you?",
      },
      {
        id: "9",
        name: "이범규 대표님",
        picture: "https://user-images.githubusercontent.com/63194662/211139505-282c312a-2d1c-4186-a22b-4fdb7c375803.png",
        lastMessage: "I'm good, how about you?",
      },
    ];

    return (
        <DMwrapper>
          <DMboxHeader setShowMessage={props.setShowMessage}/>
          <DMSearchConversation/>
          <ConversationList conversations= {conversations}/>
        </DMwrapper>
    );
  }



/* DMboxButton, something pop-up when clicks it */
export default function DMboxButton() {
  const [showMessage, setShowMessage] = useState(false);
  const listORroom = useAppSelector((state) => state.dm.listORroom);

  function handleClick() {
    setShowMessage(true);
  }

  return (
    <Wrapper>
      <img src={DMboxSVG} onClick={handleClick} width="100" />
      {showMessage && (
        <div className="'DMpopup">
          <DMbox setShowMessage={setShowMessage} />
          {!listORroom ? <InsideChattingRoom /> : null}
        </div>
      )}
    </Wrapper>
  );
}