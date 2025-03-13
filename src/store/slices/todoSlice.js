import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
	name: 'todos',
		initialState: {
			data: [
				{
					id: 1,
					title: 'Hometask',
					description: 'Stay strong',
					status: false
				},
				{
					id: 2,
					title: 'Hometask 2',
					description: 'Stay strong. You can do it',
					status: true
				},	
				{
					id: 3,
					title: 'Hometask 3',
					description: 'Stay strong. You can do it',
					status: false
				},	
				{
					id: 4,
					title: 'Hometask 4',
					description: 'Stay strong. You can do it',
					status: true
				}	
			]
		},
		reducers: {
			removeTodo: (state, action) => {
				state.data = state.data.filter(todo => todo.id !== action.payload)
			 },
			setData: (state, action) => {
				state.data = action.payload
			},
			addTodo: (state, action) => {
				state.data.push(action.payload) 
			},
			editTodo: (state, action) => {
				const { id, title, description } = action.payload
				const todo = state.data.find(todo => todo.id === id)
				if (todo) {
				  todo.title = title
				  todo.description = description
				}
			 },
			 toggleTodo: (state, action) => {
				const todo = state.data.find(todo => todo.id === action.payload)
				if (todo) {
				  todo.status = !todo.status
				}
			 }
		}
})

export const {removeTodo, setData, addTodo, editTodo, toggleTodo} = todoSlice.actions

export default todoSlice.reducer