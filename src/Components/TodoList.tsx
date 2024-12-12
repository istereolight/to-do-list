import { ChangeEvent, useState } from "react"
import { v1 } from "uuid";


type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type FilterValuesType = 'all' | 'completed' | 'active';

export const TodoList = () => {

  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  let [filter, setFilter] = useState<FilterValuesType>('all');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const toggleTaskStatus = (id: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks])
  }

  const filterTasks = () => {
    let filteredTasks = tasks.filter (t => t.isDone === false);
    setTasks(filteredTasks);
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }

  const itemsLeft = () => {
    let tasksLeft = tasks.filter(t => t.isDone === false)
    return tasksLeft.length;
  }


  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  } 

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let newTask = {id: v1(), title: newTaskTitle, isDone: false}
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    setNewTaskTitle('');
  }

  return (
    <div className='container'>
      <div className="card">
        <h3>todos</h3>
        <div className="sub-container">
          <div className="taskCard">
            <form onSubmit={(e)=> handleSubmit(e)}>
              <div>
                <input 
                  className="taskInput" 
                  type="text"
                  name="task"
                  placeholder="What needs to be done?" 
                  required 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <button type="submit" >Добавить</button>
            </form>
            <div className="taskList">
              <ul className="toDos">
                {tasksForTodoList.map( t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    toggleTaskStatus(t.id, e.target.checked);
                  }
                  return <li key={t.id}>
                  <input
                    className="checkbox"
                    type="checkbox" 
                    checked={t.isDone} 
                    onChange={(e) => {onChangeHandler(e)}}
                  />
                  <span className={t.isDone ? 'title-checked' : ''}>{t.title}</span>
                </li>
                })}
              </ul>
            </div>
          </div>
          <div className="buttons">
            <div className="items-left">{`${itemsLeft()} items left`}</div>
            <div className="mainButtons">
              <button
                className={filter === 'all' ? 'active-filter' : ''} 
                onClick={() => changeFilter('all')}
              >
                All
              </button>
              <button
                className={filter === 'active' ? 'active-filter' : ''}  
                onClick={() => changeFilter('active')}
              >
                Active
              </button>
              <button
                className={filter === 'completed' ? 'active-filter' : ''}  
                onClick={() => changeFilter('completed')}
              >
                Completed
              </button>
            </div>
            <div className="buttonClear">
              <button onClick={() => filterTasks()}>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
