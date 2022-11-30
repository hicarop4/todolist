import { useRef } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
//interface
import { ITask } from "../interfaces/ITask";

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number | ""): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number | "">("");

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const taskStorage = localStorage.getItem("TASK_LIST");
    if (!taskStorage || !setTaskList) {
      return;
    }
    setTaskList(JSON.parse(taskStorage));
  }, []);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "") {
      return;
    }
    if (!difficulty) {
      setDifficulty(0);
    }
    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
      toast.success("Tarefa atualizada.");
    } else {
      // gerando id aleatorio
      const randomId = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id: randomId, title, difficulty };
      setTaskList!([...taskList, newTask]);
      setTitle("");
      setDifficulty("");
      localStorage.setItem("TASK_LIST", JSON.stringify(taskList));
      toast.success("Tarefa criada.");
    }

    titleRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value) || "");
    }
  };
  return (
    <form
      onSubmit={addTaskHandler}
      className="m-auto gap-4 p-4 max-w-md flex content-center items-center flex-col"
    >
      <TextField
        inputRef={titleRef}
        name="title"
        onChange={handleChange}
        spellCheck={false}
        className="w-full"
        id="outlined-basic"
        label="Título"
        variant="outlined"
        value={title}
        required
      />
      <TextField
        type="number"
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        name="difficulty"
        onChange={handleChange}
        spellCheck={false}
        className="w-full"
        id="outlined-basic"
        label="Dificuldade (0-10)"
        variant="outlined"
        value={difficulty}
      />
      <Button
        type="submit"
        className="text-gray-100  text-lg normal-case py-2 w-full"
        variant="contained"
      >
        <Toaster
          toastOptions={{
            // Define default options
            className: "",
            duration: 3000,
            style: {
              background: "rgb(243 244 246)",
              letterSpacing: "normal",
            },
          }}
          position="top-right"
          reverseOrder={false}
        />
        {btnText}
      </Button>
    </form>
  );
};

export default TaskForm;
