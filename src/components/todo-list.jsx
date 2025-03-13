import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, editTodo, toggleTodo } from '../store/slices/todoSlice'
import { Modal, Button } from 'antd'

const TodoList = () => {
  const todos = useSelector(state => state.todos.data)
  const dispatch = useDispatch()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editingId, setEditingId] = useState(null)

  const openEditModal = (todo) => {
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditingId(todo.id)
    setIsEditOpen(true)
  }

  const saveEdit = () => {
    if (editTitle.trim() && editDescription.trim()) {
      dispatch(editTodo({ id: editingId, title: editTitle, description: editDescription }))
      setIsEditOpen(false)
    }
  }

  return (
    <div className='todo__container'>
      {
        todos.map((todo) => (
          <div className='todo__box' key={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <div>
              <div className='todo__tool'>
                <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
                <button onClick={() => openEditModal(todo)}>Edit</button>
              </div>
              <div className='todo__tool'>
                <input type="checkbox" checked={todo.status} onChange={() => dispatch(toggleTodo(todo.id))} />
                <p>{todo.status ? 'Done' : 'Not Done'}</p>
              </div>
            </div>
          </div>
        ))
      }

      <Modal
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditOpen(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={saveEdit}>Save</Button>
        ]}
      >
			<div className='modal__tool'>
				<input placeholder="Title..." value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
				<input type='textarea' placeholder="Description..." value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
			</div>
      </Modal>
    </div>
  )
}

export default TodoList
