import mongoose, { Schema, Document } from 'mongoose';
import Todo from '../interfaces/todo'

const todoSchema: Schema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    done: Boolean
});

const todoModel = mongoose.model<Todo & Document>('Todo', todoSchema);

export default todoModel;