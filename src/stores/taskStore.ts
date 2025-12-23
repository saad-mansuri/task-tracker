import { defineStore } from 'pinia';
import { LocalStorage, uid } from 'quasar';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function loadFromStorage(): Task[] {
  const stored = LocalStorage.getItem<Task[]>('tasks');
  return Array.isArray(stored) ? stored : [];
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: loadFromStorage(),
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter((t) => t.completed),
    pendingTasks: (state) => state.tasks.filter((t) => !t.completed),
    remainingCount: (state) => state.tasks.filter((t) => !t.completed).length,
    getTaskById: (state) => (id: string) => state.tasks.find((t) => t.id === id),
  },

  actions: {
    persist() {
      LocalStorage.set('tasks', this.tasks);
    },

    addTask(title: string) {
      if (!title.trim()) return;

      this.tasks.push({
        id: uid(),
        title: title.trim(),
        completed: false,
      });

      this.persist();
    },

    updateTask(id: string, title: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title.trim();
        this.persist();
      }
    },

    toggleTask(id: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.completed = !task.completed;
        this.persist();
      }
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.persist();
    },

    clearAll() {
      this.tasks = [];
      this.persist();
    },
  },
});
