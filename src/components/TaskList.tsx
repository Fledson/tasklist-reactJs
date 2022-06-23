import { useState } from 'react'
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const newTask: Task = {
    id: Math.random(),
    title: newTaskTitle,
    isComplete: false,
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle){
      return
    }
    setTasks(oldTasks => [...oldTasks, newTask])
    setNewTaskTitle('')
   
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    /**
     * 1ªforma
     * // pegando a lista de tarefas
     * const newtaskList = [...tasks]
     * // buscando o index do id passado
     * const taskIndex = newtaskList.findIndex(task => task.id == id)
     * // verificando se ele já está concluido, se não tiver ele conclui se tiver ele desfaz o processo
     * newtaskList[taskIndex].isComplete ? newtaskList[taskIndex].isComplete = false : newtaskList[taskIndex].isComplete = true
     */

    // 2ª forma => mapeando toda lista de tafefa e verificando se a tarefa tem o mesmo id que foi passado
    // se tiver ela executa uma função
    // se não ela retorna a tarefa da mesma forma
    const newtaskList = tasks.map(task => task.id === id ? {
      // pegar a tarefa
      ...task, 
      // sobrescrever uma função
      isComplete: !task.isComplete
    } : task)

    setTasks(newtaskList)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    /**
     * // 1ª forma 
     * // pegar index
     * const taskIndex = tasks.findIndex(task => task.id == id)
     * // copiar lista de tarefas
     * const newTaskList = [...tasks]
     * // apagar da lista de tarefas
     * newTaskList.splice(taskIndex, 1)
     */

    // 2ª forma
    // filtrando todas as tarefas diferentes do id passado
    const newTaskList = tasks.filter(task => task.id !== id)
    
    setTasks(newTaskList)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}