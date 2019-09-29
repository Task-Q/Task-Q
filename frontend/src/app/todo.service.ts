import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
	ITask,
	ITodoUpdate,
	ITodo,
	INewTask,
	ITaskUpdate
} from './models';

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	private get _tasks() {
		return localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks')) || [
			{
				id: 1,
				name: 'some task name',
				todos: [{
					id: 1,
					name: 'go to gym',
					parentId: null,
					level: 0,
				}, {
					id: 2,
					name: 'don\'t die',
					parentId: 1,
					level: 1,
				}, {
					id: 3,
					name: 'eat pizza',
					parentId: null,
					level: 0,
				}]
			},
			{
				name: 'some other much longer task name that should cause ellipsis',
				id: 2,
				todos: [],
			}
		];
	}

	private set _tasks(tasks: ITask[]) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	public getTasks() {
		return of(this._tasks);
	}

	public editTodo(id: number, changes: ITodoUpdate) {
		const tasks = this._tasks;
		this._taskByTodo(tasks, id).todos.forEach(todo => {
			if (todo.id === id) {
				Object.assign(todo, changes);
				return;
			}
		});

		this._tasks = tasks;
		return of(true);
	}

	public addTodo(taskId: number, name: string, parentId?: number) {
		const newTodo: ITodo = { name, id: nextId(), parentId, level: -1 };
		const tasks = this._tasks;
		const task = tasks.find(t => t.id === taskId);

		if (parentId == null) {
			task.todos.push(newTodo);
			newTodo.level = 0;
		} else {
			const parentIndex = task.todos.findIndex(t => t.id === parentId);
			newTodo.level = task.todos[parentIndex].level + 1;
			task.todos.splice(parentIndex + 1, 0, newTodo);
		}

		this._tasks = tasks;
		return of(true);
	}

	public deleteTodo(todoId: number) {
		// also delete children...
		const tasks = this._tasks;
		const task = this._taskByTodo(tasks, todoId);
		task.todos = task.todos.filter(todo => todo.id !== todoId);
		this._tasks = tasks;
		return of(true);
	}

	public addTask(task: INewTask) {
		const tasks = this._tasks;
		tasks.push({
			...task,
			id: nextId(),
		});
		this._tasks = tasks;
		return of(true);
	}

	public editTask(taskId: number, changes: ITaskUpdate) {
		const tasks = this._tasks;
		const task = tasks.find(t => t.id === taskId);
		Object.assign(task, changes);
		this._tasks = tasks;
		return of(true);
	}

	public deleteTask(taskId: number) {
		this._tasks = this._tasks.filter(t => t.id !== taskId);
		return of(true);
	}

	public moveTodo(todoId: number, direction: 'up' | 'down') {
		// just change order index
		return of(true);
	}

	private _taskByTodo(tasks: ITask[], todoId: number) {
		return tasks.find(t => t.todos.find(tod => tod.id === todoId));
	}
}

function nextId() {
	return Math.floor(Math.random() * 100000000);
}
