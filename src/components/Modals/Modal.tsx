"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "~/context/GlobalProvider";
import themes from "~/context/themes";

interface Props {
  content: React.ReactNode;
}

function Modal({ content }: Props) {
  const { hideModal } = useGlobalContext();
  const theme = themes[0]

  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={hideModal}></div>
      <div className="modal-content">
        {content}
      </div>
    </ModalStyled>
  );
}

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.45);
    filter: blur(4px);
  }

  .modal-content{
    padding: 2rem;
    position: relative;
    max-width: 630px;

    z-index: 100;
    width: 100%;
    
    box-shadow: 0 0 1rem rgba(0,0,0,0.3);
    border-radius: ${props => props.theme.borderRadiusMd2};
    background-color: ${props => props.theme.colorBg2};
  }
`;

export default Modal;
