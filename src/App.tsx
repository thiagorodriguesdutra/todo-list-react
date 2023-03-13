import styles from './App.module.css';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "app:savedTasks";

export interface TaskTypes {
  id: string;
  title: string;
  hasCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function setTasksAndSave(newTasks: TaskTypes[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  function createNewTask(taskTitle: string) {
    setTasksAndSave([...tasks, {id: uuidv4(), title: taskTitle, hasCompleted: false}]);
  };

  function deleteTaskById(taskId: string) {
    const tasksWithoutTaskOne = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(tasksWithoutTaskOne);
  };

  function checkboxTask(taskId: string) {
    const newTasks = tasks.map((task) => {
      if(task.id === taskId) {
        return {
          ...task,
          hasCompleted: !task.hasCompleted
        }
      }

      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onCreateNewTask={createNewTask} />
      <Tasks onComplete={checkboxTask} onDelete={deleteTaskById} tasks={tasks} />
    </>
  )
};


