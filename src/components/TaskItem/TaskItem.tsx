"use client";

import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "~/context/GlobalProvider";
import themes from "~/context/themes";
import { edit, trash } from "~/utils/Icons";
import { api } from "~/utils/api";
import formatDate from "~/utils/formatDate";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
  assignedTo: string;
}

function TaskItem({
  title,
  description,
  date,
  isCompleted,
  assignedTo,
  id,
}: Props) {
  const { showModal, updateTask, deleteTask } = useGlobalContext();
  const theme = themes[0];

  var user = api.user.getUserById.useQuery(assignedTo);

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <p className="assignedTo">
        {user.data ? `Assigned to ${user.data?.name}` : "Loading..."}
      </p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            onClick={() => {
              updateTask({ id, isCompleted: !isCompleted });
            }}
            className="completed"
          >
            Completed
          </button>
        ) : (
          <button
            onClick={() => {
              updateTask({ id, isCompleted: !isCompleted });
            }}
            className="incomplete"
          >
            Incomplete
          </button>
        )}
        <button className="edit" onClick={showModal}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(parseInt(id));
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
  }

  .edit {
    margin-left: auto;
  }

  .completed,
  .incomplete {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.colorDanger};
    border-radius: 30px;
  }

  .completed {
    background-color: ${(props) => props.theme.colorGreenDark};
  }
`;

export default TaskItem;
