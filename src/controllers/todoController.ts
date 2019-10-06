import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller';
import todoModel from '../models/todoModel';

class TodoController implements Controller {
    public router: Router = Router();
    private path: string = '/todos';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get(`${this.path}/`, this.getTodos)
            .get(`${this.path}/:id`, this.getTodo)
            .delete(`${this.path}/:id`, this.deleteTodo);
    }

    private async getTodos(req: Request, res: Response) {
        const todos = await todoModel.find();
        res.json(todos);
    }

    private async getTodo(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const todo = await todoModel.findById(id);
            res.json(todo);
        }
        catch (e) {
            res.status(400).json({
                msg: `Could not find a todo with id ${id}`
            });
        }
    }

    private async deleteTodo(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await todoModel.findByIdAndDelete(id);
            res.status(200).end();
        }
        catch (e) {
            res.status(400).json({
                msg: `Could not find a todo with id ${id}`
            });
        }
    }
}

export default TodoController;