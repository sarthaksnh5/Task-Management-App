"use client";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import Modal from "../Modals/Modal";
import { useGlobalContext } from "~/context/GlobalProvider";
import themes from "~/context/themes";
import { plus } from "~/utils/Icons";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const theme = themes[0];
  const { modal, isLoading, showModal, hideModal } = useGlobalContext();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      {isLoading ? (
        <div className="task-loader flex h-full w-full items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="tasks grid">
          {tasks !== undefined &&
            tasks.map((task: any) => (
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
                assignedTo={task.assignedTo}
              />
            ))}
          <button className="create-task" onClick={showModal}>
            {plus}
            Add New Task
          </button>
        </div>
      )}
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
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

  .create-task {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
