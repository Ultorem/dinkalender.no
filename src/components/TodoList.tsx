import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trash2, Plus } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos(prev => [{
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: Date.now()
    }, ...prev]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <CheckSquare className="w-5 h-5" />
        Gjøremål
      </h3>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Legg til ny oppgave..."
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        />
        <button
          type="submit"
          className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`
              flex items-center gap-2 p-2 rounded
              ${todo.completed ? 'bg-gray-100 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-700'}
              group
            `}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400"
            >
              {todo.completed ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </button>
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;