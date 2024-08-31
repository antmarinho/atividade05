import { useState } from "react"
import styled from "styled-components"
import { toastError, toastSuccess } from "../utils/toast"
import { FaCheckCircle, FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa"


const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: 40px; 
  background: #fff; 
  border-radius: 15px; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
  max-width: 500px; 
  margin: 50px auto; 
`

const Title = styled.h2`
  color: #333; 
  margin-bottom: 20px; 
  font-size: 24px; 
  text-align: center; 
`


const Input = styled.input`
  margin-bottom: 20px; 
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: 100%; 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); 
  font-size: 16px; 
  transition: border-color 0.3s; 

  &:focus {
    border-color: #007bff; 
    outline: none; 
  }
`

const Button = styled.button`
  padding: 12px 20px; 
  background-color: #007bff; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
  transition: background-color 0.3s; 
  margin-bottom: 20px; 

  &:hover {
    background-color: #0056b3; 
  }
`


const TaskList = styled.ul`
  list-style-type: none; 
  padding: 0; 
  width: 100%; 
  overflow-y: auto;
  max-height: 50vh;
`

const TaskItem = styled.li`
  background: #f9f9f9;
  border-radius: 5px; 
  padding: 10px;
  margin-bottom: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  font-size: 16px; 
  transition: background-color 0.3s; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  &:hover {
    background-color: #f1f1f1; 
  }

  button {
    margin-left: 10px; 
    background: transparent;
    border: none;
    color: red; 
    cursor: pointer; 
    font-size: 16px; 

    &:hover {
      color: darkred; 
    }
  }
`

const EditInput = styled.input`
  margin-left: 10px; 
  padding: 6px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: 60%; 
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); 
  font-size: 14px; 
  transition: border-color 0.3s; 

  &:focus {
    border-color: #007bff; 
    outline: none; 
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const TaskButton = styled.button`
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #007bff;
  cursor: pointer;
`

const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TodoApp = () => {
  const [task, setTask] = useState("") 
  const [tasks, setTasks] = useState(() => {
    return getTasks()
  }) 
  const [editingTaskId, setEditingTaskId] = useState(null) 
  const [editingTaskText, setEditingTaskText] = useState("") 

  function getTasks() {
    try {
      const storagedTasks = JSON.parse(localStorage.getItem("tasks"))
      console.log(storagedTasks)
      if (Array.isArray(storagedTasks)) {
        return storagedTasks
      } else {
        localStorage.setItem("tasks", "[]")
        return []
      }
    } catch (error) {
      localStorage.setItem("tasks", "[]")
      return []
    }
  }

  const editTask = (id, text) => {
    setEditingTaskId(id) 
    setEditingTaskText(text) 
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    console.log(tasks)
    if (task === "") return
    try {
      if (tasks.length === 0) {
        setTasks((tasks) => [{ id: 1, text: task }, ...tasks])
        localStorage.setItem(
          "tasks",
          JSON.stringify([{ id: 1, text: task }, ...tasks])
        )
      } else {
        const first = tasks[0]
        setTasks((tasks) => [{ id: first?.id + 1, text: task }, ...tasks])
        localStorage.setItem(
          "tasks",
          JSON.stringify([{ id: first?.id + 1, text: task }, ...tasks])
        )
      }
      setTask("")
      console.log("task", tasks)
      toastSuccess({ text: `Tarefa adicionada com sucesso!` })
    } catch (error) {
      console.log(error)
      toastError({ text: `Ocorreu um erro ao tentar adicionar a tarefa.` })
    }
  }

  const handleDeleteTask = (id) => {
    try {
      const filteredTasks = tasks.filter((task) => task.id !== id)
      localStorage.setItem("tasks", JSON.stringify(filteredTasks))
      setTasks(filteredTasks)
      toastSuccess({ text: `Tarefa deletada com sucesso!` })
    } catch (error) {
      console.log(error)
      toastError({ text: `Ocorreu um erro ao tentar deletar a tarefa.` })
    }
  }

  const handleSaveTask = (id) => {
    try {
      const newTasks = tasks?.map((taskMap) => {
        if (id !== taskMap.id) return taskMap
        return { ...taskMap, text: editingTaskText }
      })
      localStorage.setItem("tasks", JSON.stringify(newTasks))
      setTasks(newTasks)
      toastSuccess({ text: `Tarefa salva com sucesso!` })
    } catch (error) {
      console.log(error)
      toastError({ text: `Ocorreu um erro ao tentar salvar a tarefa.` })
    } finally {
      setEditingTaskId(null)
      setEditingTaskText("")
    }
  }

  const handleCancelEdit = () => {
    setEditingTaskId(null)
    setEditingTaskText("")
  }

  return (
    <Container>
      <Title>Todo App</Title>
      <Form onSubmit={handleAddTask}>
        <Input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task"/>
        <Button>Add Task</Button>
      </Form>
      <TaskList>
        {tasks?.map((task) => (
          <TaskItem key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <EditInput type="text" value={editingTaskText} onChange={(e) => setEditingTaskText(e.target.value)}/>
                <TaskButton type="button" title="Salvar" onClick={() => handleSaveTask(task.id)}>
                  <FaCheckCircle />
                </TaskButton>
                <TaskButton type="button" title="Cancelar" onClick={handleCancelEdit}>
                  <FaTimesCircle />
                </TaskButton>
              </>
            ) : (
              <>
                {task.text}
                <DivButtons>
                  <TaskButton type="button" title="Editar" onClick={() => editTask(task.id, task.text)}>
                    <FaEdit />
                  </TaskButton>
                  <TaskButton type="button" title="Deletar" onClick={() => handleDeleteTask(task.id)}>
                    <FaTrash />
                  </TaskButton>
                </DivButtons>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  )
}

export default TodoApp
