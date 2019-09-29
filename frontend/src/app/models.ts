export interface ITodo {
	id: number;
	name: string;
	parentId?: number;
	level: number;
	done?: true;
}

export type INewTodo = Omit<ITodo, 'id'>;
export type ITodoUpdate = Partial<INewTodo>;

export interface ITask {
	id: number;
	name: string;
	todos: ITodo[];
}

export type INewTask = Omit<ITask, 'id'>;
export type ITaskUpdate = Partial<INewTask>;
