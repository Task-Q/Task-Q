import {
	Component,
	ChangeDetectionStrategy
} from '@angular/core';
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

	public refresh() {
		this._service.getTasks().subscribe(tasks => this.tasks = tasks);
	}

	public toggle(todo: ITodo) {
		todo.done = !todo.done || undefined;
		this._service.editTodo(todo.id, todo)
			.subscribe();
	}

	public addTodo(parentId?: number) {
		const name = prompt('name = ');
		if (name != null) {
			this._service.addTodo(this.tasks[this.taskIndex].id, name, parentId).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}

	public editTodo(todo: ITodo) {
		const name = prompt('Todo name = ');
		if (name != null) {
			todo.name = name;
			this._service.editTodo(todo.id, todo)
				.subscribe();
		}
	}

	public deleteTodo(id: number) {
		if (confirm('sure?')) {
			this._service.deleteTodo(id).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}
	public moveTodo(id: number, direction: 'up' | 'down') {
		this._service.moveTodo(id, direction).pipe(
			tap(() => this.refresh())
		).subscribe();
	}

	public addTask() {
		const name = prompt('name = ');
		if (name != null) {
			this._service.addTask({ name, todos: [] }).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}

	public deleteTask(id: number) {
		if (confirm('sure?')) {
			this._service.deleteTask(id).pipe(
				tap(() => this.refresh())
			).subscribe();
		}
	}

	public editTask(task: ITask) {
		const name = prompt('Task name = ');
		if (name != null) {
			task.name = name;
			this._service.editTask(task.id, task)
				.subscribe();
		}
	}
}
