import { create } from "zustand";
import { Todo } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearAllTodos: () => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (title: string) =>
    set((state) => ({
      todos: [
        {
          id: Date.now().toString(),
          title: title.trim(),
          completed: false,
          createdAt: new Date(),
        },
        ...state.todos,
      ],
    })),

  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  clearAllTodos: () => set({ todos: [] }),
}));

