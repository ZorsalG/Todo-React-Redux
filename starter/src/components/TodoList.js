import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	// DISPLAY THE TODO LIST | USESELECTOR HOOK
	// THIS GO TO THE STORE, PICK ALL THE TODOS FROM STATE, AND ASSIGN THIS TO THE TODOS VARIABLE (FROM TODOSLICE)
	const todos = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
