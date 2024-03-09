"use client";

import { createContext, useContext } from "react";
import { any } from "zod";

interface GlobalContextProps {
  modal: boolean;
  showModal: () => void;
  hideModal: () => void;
  tasks?: any;
  isLoading: boolean;
  addTask: (task: any) => void;
  usersList: any;
  deleteTask: (id: number) => void;
  updateTask: (task: any) => void;
  completedTasks?: any;
  incompleteTasks?: any;
  importantTasks?: any;
  currentUserInfoRTPC: any;
  updateUser: (user: any) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  modal: false,
  showModal: () => {},
  hideModal: () => {},
  addTask: (task: any) => {},
  tasks: [],
  isLoading: true,
  usersList: [],
  deleteTask: (id: number) => {},
  updateTask: (task: any) => {},
  completedTasks: [],
  importantTasks: [],
  incompleteTasks: [],
  currentUserInfoRTPC: {},
  updateUser: (user: any) => {}
});

export const useGlobalContext = () => useContext(GlobalContext);
