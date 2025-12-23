export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const STORAGE_KEY = 'tasks';

export function getTasks(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addTask(task: Task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function updateTask(updatedTask: Task) {
  const tasks = getTasks().map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(tasks);
}

export function deleteTask(id: number) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTaskById(id: number): Task | undefined {
  return getTasks().find((t) => t.id === id);
}
