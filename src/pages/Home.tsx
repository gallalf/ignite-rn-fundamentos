import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TaskEdit } from '../components/TaskItem';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    if(tasks.find(task => task.title === newTaskTitle)){
      return (
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
          [           
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )    
      );  
    }
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(task => task.id === id);
    if(taskToUpdate){
      taskToUpdate.done = !taskToUpdate.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [           
        { text: "Não", onPress: () => console.log("Não Pressed") },
        { text: "Sim", onPress: () => setTasks(tasks.filter(item => item.id !== id))}
      ]
    )        
  }

  function handleEditTask(editTask: TaskEdit) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(task => task.id === editTask.taskId);
    if(taskToUpdate){
      taskToUpdate.title = editTask.taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})