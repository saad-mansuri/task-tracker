<template>
  <q-page class="flex flex-center bg-grey-2">
    <TaskForm @submit="handleSubmit" @cancel="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTaskStore } from 'src/stores/taskStore';
import TaskForm from 'src/components/TaskForm.vue';

const router = useRouter();
const store = useTaskStore();

const handleSubmit = (title: string) => {
  store.addTask(title);
  void router.push('/');
};

const goBack = () => {
  void router.push('/');
};
</script>
