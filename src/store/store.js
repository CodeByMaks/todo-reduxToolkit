import { configureStore } from '@reduxjs/toolkit' 
import todoReduser from './slices/todoSlice'

export const store = configureStore({
	reducer: {
		todos: todoReduser 
	}
})