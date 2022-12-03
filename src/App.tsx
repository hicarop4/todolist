import { useEffect, useState } from "react";
import "./App.css";

//components
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { ThemeProvider, createTheme } from "@mui/material";

//interfaces
import { ITask } from "./interfaces/ITask";
import Modal from "./components/Modal";

//material ui theme
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(30,58,138)",
    },
  },
});

function App() {
  // get taskList for localStorage or empty array []
  const taskListStorage =
    JSON.parse(localStorage.getItem("TASK_LIST") || "") || [];

  const [taskList, setTaskList] = useState<ITask[]>(taskListStorage);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  useEffect(() => {
    localStorage.setItem("TASK_LIST", JSON.stringify(taskList));
  }, [taskList]);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    localStorage.setItem("TASK_LIST", JSON.stringify(taskList));
  };

  const toggleModal = (display: boolean) => {
    const modal = document.querySelector("#modal");

    if (display) {
      modal!.classList.remove("hidden");
    } else {
      modal!.classList.add("hidden");
    }
  };

  const editTask = (task: ITask) => {
    toggleModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);
    toggleModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-screen">
        <Modal
          children={
            <TaskForm
              task={taskToUpdate}
              btnText="Editar tarefa"
              taskList={taskList}
              handleUpdate={updateTask}
            />
          }
        />
        <Header />
        <div className="pb-5" id="content">
          <h1 className="text-center select-text m-auto bg-blue-900 bg-clip-text text-transparent text-2xl font-bold mt-4">
            O que você vai fazer?
          </h1>
          <TaskForm
            btnText="Criar tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
          />

          <TaskList
            handleEdit={editTask}
            handleDelete={deleteTask}
            taskList={taskList}
          />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
