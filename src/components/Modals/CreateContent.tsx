"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { useGlobalContext } from "~/context/GlobalProvider";
import themes from "~/context/themes";
import { plus } from "~/utils/Icons";
import { api } from "~/utils/api";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      case "assignedTo":
        setAssignedTo(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      isCompleted: completed,
      isImportant: important,
      assignedTo,
    };

    addTask(task);
  };

  const { hideModal, addTask, usersList, } = useGlobalContext();
  const theme = themes[0];

  return (
    <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      {usersList.length > 0 ? (
        <>
          <div className="input-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange("title")}
              placeholder="e.g, Watch a video form fireship"
            />
          </div>
          <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleChange("description")}
              placeholder="e.g, Watch a video form fireship"
            />
          </div>
          <div className="input-control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={handleChange("date")}
            />
          </div>
          <div className="input-control">
            <label htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              name="completed"
              id="completed"
              value={completed.toString()}
              onChange={handleChange("completed")}
            />
          </div>
          <div className="input-control">
            <label htmlFor="important">Important</label>
            <input
              type="checkbox"
              name="important"
              id="important"
              value={important.toString()}
              onChange={handleChange("important")}
            />
          </div>
          <div className="input-control">
            <label htmlFor="assignedTo">Assigned To</label>
            <select
              onChange={handleChange("assignedTo")}
              name="assigned"
              id=""
              value={assignedTo}
            >
              <option value="" selected>
                Select User
              </option>
              {usersList.map((item: any) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="submit-btn flex justify-end">
            <Button
              type="submit"
              name="Create Task"
              icon={plus}
              padding="0.8rem 1.6rem"
              borderRad="0.8rem"
              fw="500"
              fs="1.2rem"
              background={theme?.colorGreenDark}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center ">
          <div className="loader"></div>
        </div>
      )}
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
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

export default CreateContent;
