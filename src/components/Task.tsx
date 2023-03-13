import styles from "./Task.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

import { TaskTypes } from '../App';

interface Props {
    task: TaskTypes;
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}


export function Task({ task , onDelete, onComplete }: Props) {

  function handleDeleteTask() {
    onDelete(task.id);
  };

  function handleTaskCompleted() {
    onComplete(task.id);
  }

  return (
    <div className={styles.task}>
      <button onClick={handleTaskCompleted} className={styles.checkbox} title="Marcar ou desmarcar tarefa">
        {task.hasCompleted ? <BsCheckCircleFill /> : <div />}
      </button>
      <p>{task.title}</p>
      <button className={styles.btnDelete} onClick={handleDeleteTask} title="Deletar tarefa">
        <TbTrash size={20} />
      </button>
    </div>
  );
}


