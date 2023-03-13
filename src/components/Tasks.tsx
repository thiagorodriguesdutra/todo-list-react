import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg';

import { Task } from './Task';
import { TaskTypes } from '../App';

interface Props {
    tasks: TaskTypes[];
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete }: Props) {
    const tasksCreated = tasks.length;
    const tasksCompleted = tasks.filter((task) => task.hasCompleted).length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas criadas</p>
                    <span>{tasksCreated}</span>
                </div>

                <div>
                    <p>Tarefas concluídas</p>
                    <span>{`${tasksCompleted} de ${tasksCreated}`}</span>
                </div>
            </header>
            <div className={styles.taskList}>
                {tasks.map((task) => {
                    return <Task onComplete={onComplete} onDelete={onDelete} task={task} key={task.id} />
                })}

                {tasks.length <= 0 && (
                    <div className={styles.empty}>
                        <img src={clipboard} alt="Você ainda não criou nenhuma tarefa" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                )}
            </div>
        </section>
    )
};

