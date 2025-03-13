import { useState } from 'react'
import './App.css'
import TodoList from './components/todo-list'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from './store/slices/todoSlice'

function App() {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector((store)=> store.todos.data)

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        status: false
      }
      dispatch(setData([...todos ,newTodo]))
      setTitle("")
      setDescription("")
      setIsOpenAdd(false)
    }
  }
  
  return (
    <>
      <div className='header'>
        <h1>Todo list with React Toolkit</h1>
        <button onClick={()=> setIsOpenAdd(true)}>Add +</button>
      </div>
        
      <TodoList />

      <Modal open={isOpenAdd} onCancel={() => setIsOpenAdd(false)} footer={null}>
        <div className='modal__tool'>
          <input type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="textarea" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={addTodo}>Save</button>
        </div>
      </Modal>
    </>
  )
}

export default App
