import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ITask, ITodoUpdate, INewTodo, ITodo } from './models';

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

	public editTodo(taskId: number, id: number, changes: ITodoUpdate) {
		const tasks = this._tasks;
		this._findTask(tasks, taskId).todos.forEach(todo => {
			if (todo.id === id) {
				Object.assign(todo, changes);
			}
		});

		this._tasks = tasks;
		return of(true);
	}

	public addTodo(taskId: number, todo: INewTodo) {
		const newTodo = { ...todo, id: nextId() };
		const tasks = this._tasks;
		const task = this._findTask(tasks, taskId);

		if (todo.parentId == null) {
			task.todos.push(newTodo);
		} else {
			const parentIndex = task.todos.findIndex(t => t.id === todo.parentId);
			task.todos.splice(parentIndex + 1, 0, newTodo);
		}

		this._tasks = tasks;
		return of(true);
	}

	public deleteTodo(taskId: number, todoId: number) {
		const tasks = this._tasks;
		const task = this._findTask(tasks, taskId);
		task.todos = task.todos.filter(todo => todo.id !== todoId);
		this._tasks = tasks;
		return of(true);
	}

	public moveTodo(taskId: number, todo: ITodo, direction: 'up' | 'down') {
		// iei todoul toti copiii si ii muti cu totul mai sus peste toti copiii aluia de mai sus si peste el sau inversin jos
		return of(true);
	}

	private _findTask(tasks: ITask[], id: number) {
		return tasks.find(t => t.id === id);
	}
}

function nextId() {
	return Math.floor(Math.random() * 100000000);
}
