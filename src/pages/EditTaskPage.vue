<template>
  <q-page class="flex flex-center bg-grey-2">
    <TaskForm v-if="task" :title="task.title" is-edit @submit="handleSubmit" @cancel="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from 'src/stores/taskStore';
import TaskForm from 'src/components/TaskForm.vue';

const route = useRoute();
const router = useRouter();
const store = useTaskStore();

const taskId = route.params.id as string;

const task = computed(() => store.getTaskById(taskId));

if (!task.value) {
  void router.push('/');
}

const handleSubmit = (title: string) => {
  store.updateTask(taskId, title);
  void router.push('/');
};

const goBack = () => {
  void router.push('/');
};
</script>
