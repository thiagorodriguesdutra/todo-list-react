import styles from './Header.module.css';
import logotipo from '../assets/logo.svg';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { FormEvent, useState, ChangeEvent } from 'react';

interface Props {
    onCreateNewTask: (taskTitle: string) => void;
}

export function Header({ onCreateNewTask }: Props) {
    const [title, setTitle] = useState("");

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        onCreateNewTask(title);
        setTitle("");
    };

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    };

    const taskEmpty = title.length <= 0 ? true : false;

    return (
        <header className={styles.header}>
            <img src={logotipo} alt="Logotipo da aplicação" />

            <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
                <input onChange={onChangeTitle} value={title} name='task' placeholder='Adicione uma nova tarefa...' />
                <button title='Criar nova tarefa' disabled={taskEmpty} >Criar
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </header>
    )
};