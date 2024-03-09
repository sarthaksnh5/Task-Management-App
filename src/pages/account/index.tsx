import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "~/components/Button/Button";
import { useGlobalContext } from "~/context/GlobalProvider";
import themes from "~/context/themes";

function index() {
  const { currentUserInfoRTPC, updateUser } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleChange = (key: string) => (e: any) => {
    switch (key) {
      case "email":
        setEmail(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!currentUserInfoRTPC?.id || !email || !name)
      return toast.error("Please fill all fields.");

    updateUser({
      email,
      name,
    });
  };

  useEffect(() => {
    setEmail(currentUserInfoRTPC.email);
    setName(currentUserInfoRTPC.name);
    return () => {};
  }, [currentUserInfoRTPC]);

  const theme = themes[0];
  return (
    <AccountStyled theme={theme}>
      <h1>Account Info</h1>
      <FormStyled theme={theme} onSubmit={handleSubmit}>
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange("email")}
            placeholder="jsmith@gmail.com"
          />
        </div>
        <div className="input-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange("name")}
            placeholder="Sarthak Lamba"
          />
        </div>
        <div className="submit-btn flex justify-end">
          <Button
            type="submit"
            name="Submit"
            padding="0.8rem 1.6rem"
            borderRad="0.8rem"
            fw="500"
            fs="1.2rem"
            background={theme?.colorGreenDark}
          />
        </div>
      </FormStyled>
    </AccountStyled>
  );
}

const AccountStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }
`;

const FormStyled = styled.form`
  > h1 {
    font-size: clamp(1.5rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.5rem 0;
    font-weight: 500;

    label {
      margin-bottom: 1rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea,
    select {
      width: 100%;
      border: none;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
    }
  }
`;

export default index;
