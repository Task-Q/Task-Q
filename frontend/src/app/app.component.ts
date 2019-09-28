import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { TodoService } from './todo.service';
import { ITodo, ITask } from './models';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public taskIndex = 0;
	public tasks: ITask[] = [];

	constructor(private _service: TodoService) {
		this.refresh();
	}

	public get _currentTaskId() {
		return this.tasks[this.taskIndex].id;
	}

	public refresh() {
		this._service.getTasks().subscribe(tasks => this.tasks = tasks);
	}

	public toggle(todo: ITodo) {
		todo.done = !todo.done || undefined;
		this._service.editTodo(this._currentTaskId, todo.id, todo)
			.subscribe();
	}

	public addTodoChild(parent: ITodo) {
		const name = prompt('Sub todo name = ');
		if (name != null) {
			const newTodo = {
				name,
				parentId: parent.id,
				level: parent.level + 1
			};
			this._service.addTodo(this._currentTaskId, newTodo).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}

	public editTodo(todo: ITodo) {
		const name = prompt('Todo name = ');
		if (name != null) {
			todo.name = name;
			this._service.editTodo(this._currentTaskId, todo.id, todo)
				.subscribe();
		}
	}

	public deleteTodo(todo: ITodo) {
		if (confirm('sure?')) {
			this._service.deleteTodo(this._currentTaskId, todo.id).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}
	public moveTodo(todo: ITodo, direction: 'up' | 'down') {
		this._service.moveTodo(this._currentTaskId, todo, direction).pipe(
			tap(() => this.refresh())
		).subscribe();
	}
}
