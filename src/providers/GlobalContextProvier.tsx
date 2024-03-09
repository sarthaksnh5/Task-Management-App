import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "~/context/GlobalProvider";
import { api } from "~/utils/api";

interface Props {
  children: React.ReactNode;
}

function GlobalContextProvier({ children }: Props) {
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);

  const router = useRouter();

  if (status === "unauthenticated") {
    toast.error("Please Login first");
    router.push("/api/auth/signin");
  }

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const utils = api.useUtils();

  var taskRTPC = api.task.listByUserId.useQuery(
    session?.user?.id === undefined ? "" : session?.user?.id,
    { enabled: true },
  );

  var addTaskRTPC = api.task.addTask.useMutation({
    onSettled() {
      utils.task.listByUserId.invalidate();
    },
  });
  var updateTaskRTPC = api.task.updateTask.useMutation({
    onSettled() {
      utils.task.listByUserId.invalidate();
    },
  });
  var deleteTaskRTPC = api.task.deleteTask.useMutation({
    onSettled() {
      utils.task.listByUserId.invalidate();
    },
  });

  const addTask = async (task: any) => {
    try {
      await addTaskRTPC.mutateAsync(task);
      toast.success("Task Added");
      hideModal();
    } catch (e) {
      console.log(e);
      toast.success("Error Adding task");
    }
  };

  const updateTask = async (task: any) => {
    try {
      await updateTaskRTPC.mutateAsync(task);
      toast.success("Task Updated");
      hideModal();
    } catch (e) {
      console.log(e);
      toast.success("Error Updating task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskRTPC.mutateAsync(id);
      toast.success("Task Deketed");
      hideModal();
    } catch (e) {
      console.log(e);
      toast.success("Error Deleting task");
    }
  };

  var usersRTPC = api.user.getUsers.useQuery();

  var incompleteTasks = taskRTPC.data
    ? taskRTPC.data.filter((item) => item.isCompleted === false)
    : [];
  var completedTasks = taskRTPC.data
    ? taskRTPC.data.filter((item) => item.isCompleted === true)
    : [];
  var importantTasks = taskRTPC.data
    ? taskRTPC.data.filter((item) => item.isImportant === true)
    : [];

  var currentUserInfoRTPC = api.user.getCurrentInfo.useQuery();
  var updateCurrentUserInfoRTPC = api.user.updateUserInfo.useMutation({
    onSettled() {
      utils.user.getCurrentInfo.invalidate();
    },
  });

  const updateUser = async (user: any) => {
    try {
      await updateCurrentUserInfoRTPC.mutateAsync(user);
      toast.success("User Updated");
    } catch (e) {
      toast.error("Unable to update user");
      console.log(e);
    }
  };

  return (
    <>
      {status === "unauthenticated" ? (
        "You are not authenticated"
      ) : status === "loading" ? (
        <div className="flex h-full w-full items-center justify-center ">
          <div className="loader"></div>
        </div>
      ) : (
        <GlobalContext.Provider
          value={{
            modal,
            showModal,
            hideModal,
            tasks: taskRTPC.data ? taskRTPC.data : [],
            isLoading: taskRTPC.data ? false : true,
            addTask,
            usersList: usersRTPC.data || [],
            deleteTask,
            updateTask,
            importantTasks,
            completedTasks,
            incompleteTasks,
            currentUserInfoRTPC: currentUserInfoRTPC.data
              ? currentUserInfoRTPC.data
              : { email: "", name: "" },
            updateUser,
          }}
        >
          <Toaster />
          {children}
        </GlobalContext.Provider>
      )}
    </>
  );
}

export default GlobalContextProvier;
