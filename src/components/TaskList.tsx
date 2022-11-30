import { ITask } from "../interfaces/ITask";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import Rating from "@mui/material/Rating";

import { motion } from "framer-motion";

interface Props {
  taskList: ITask[];
  handleDelete(
    id: number,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void;
  handleEdit(task: ITask): void;
}

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -100 }}
            className="max-w-sm  md:max-w-md md:px-4 m-auto flex my-4 sm:my-6 justify-between items-end"
            key={task.id}
          >
            <div>
              <h3 className="mb-2 truncate whitespace-normal max-w-xs sm:mb-4 text-xl text-gray-700 font-semibold  border-b-2">
                {task.title}
              </h3>
              <span>Dificuldade: </span>
              <Rating
                className="translate-y-1"
                name="read-only"
                value={Number(task.difficulty)! / 2}
                readOnly
                precision={0.5}
              />
            </div>
            <div>
              <TrashIcon
                onClick={(e) => handleDelete(task.id, e)}
                className="transition-all hover:p-[7px] w-10 p-2 hover:text-red-500 active:text-red-600  text-red-600 cursor-pointer"
              />
              <PencilIcon
                onClick={() => handleEdit(task)}
                className="transition w-10 hover:p-[7px] p-2 hover:text-yellow-400 active:text-yellow-500 text-yellow-500 cursor-pointer"
              />
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div animate={{ y: 0 }} initial={{ y: -20 }}>
          <p className="text-center m-auto max-w-[26rem] pb-1  border-b-2">
            Não há tarefas cadastradas.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default TaskList;
