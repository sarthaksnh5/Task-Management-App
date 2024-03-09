"use client";

import React from "react";
import styled from "styled-components";
import themes from "~/context/themes";

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
    borderRad?: string;
}

function Button({
    icon,
    name,
    background,
    padding,
    fw,
    fs,
    click,
    type,
    border,
    borderRad,
}: Props) {
    const theme = themes[0];
    return (
        <ButtonStyled
            theme={theme}
            onClick={click}
            style={{
                background: background,
                padding: padding || "0.5rem 1rem",
                border: border || "none",
                fontWeight: fw || "600",
                fontSize: fs,
                borderRadius: borderRad || "5",
            }}
        >
            {icon && icon} {name}{" "}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;

  transition: all 0.5s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.5rem;
  }

  &:hover{
    color: ${props => props.theme.colorGrey0};
    i{
        color: ${props => props.theme.colorGrey0};
    }
  }
`;

export default Button;
