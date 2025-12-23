<template>
  <q-page class="flex flex-center bg-grey-2 task-tracker" :key="$route.fullPath">
    <q-card class="task-tracker__card">
      <!-- Header -->
      <div class="task-tracker__header bg-primary">
        <div class="text-h5 text-white text-bold">Task Master</div>
        <div class="text-subtitle2 text-white">Keep track of your daily tasks with ease</div>
      </div>

      <!-- Filters + Add -->
      <q-card-section class="row justify-between items-center">
        <div class="q-gutter-sm">
          <q-btn to="/" flat label="All" :class="{ 'active-filter': isAll }" />

          <q-btn
            to="/completed"
            flat
            :label="`Completed (${isCompletedCount})`"
            :class="{ 'active-filter': isCompleted }"
            :disable="isCompletedCount === 0"
          />

          <q-btn
            to="/pending"
            flat
            :label="`Pending (${isPendingCount})`"
            :class="{ 'active-filter': isPending }"
            :disable="isPendingCount === 0"
          />
        </div>

        <q-btn to="/add" color="primary" unelevated label="Add Task" />
      </q-card-section>

      <!-- Task List -->
      <q-card-section v-if="filteredTasks.length" class="task-tracker__list">
        <q-list bordered separator>
          <q-item v-for="task in filteredTasks" :key="task.id" class="items-center">
            <q-item-section avatar>
              <q-checkbox
                size="sm"
                :model-value="task.completed"
                @update:model-value="store.toggleTask(task.id)"
              />
            </q-item-section>

            <q-item-section>
              <div :class="{ 'text-grey text-strike': task.completed }">
                {{ task.title }}
              </div>
            </q-item-section>

            <q-item-section
              side
              class="row no-wrap items-center q-gutter-xs"
              style="display: flex; flex-direction: row"
            >
              <q-btn
                icon="edit"
                flat
                round
                dense
                size="sm"
                color="primary"
                :to="`/edit/${task.id}`"
              />

              <q-btn
                icon="close"
                flat
                round
                dense
                size="sm"
                color="red"
                @click="store.deleteTask(task.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Footer -->
      <q-separator />

      <q-card-section class="text-center">
        <div class="text-caption q-mb-sm">You have {{ store.remainingCount }} tasks remaining</div>
        <q-btn
          v-if="store.tasks.length"
          label="Clear All Tasks"
          color="red"
          outline
          size="sm"
          @click="store.clearAll"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from 'src/stores/taskStore';

const store = useTaskStore();
const route = useRoute();

/* Active route helpers */
const isAll = computed(() => route.path === '/');
const isCompleted = computed(() => route.path === '/completed');
const isPending = computed(() => route.path === '/pending');

/* Counters */
const isCompletedCount = computed(() => store.completedTasks.length);
const isPendingCount = computed(() => store.pendingTasks.length);

/* Filter logic */
const filteredTasks = computed(() => {
  if (isCompleted.value) return store.completedTasks;
  if (isPending.value) return store.pendingTasks;
  return store.tasks;
});
</script>

<style scoped lang="scss">
.task-tracker {
  &__card {
    width: 50%;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  &__header {
    padding: 20px;
    text-align: center;
  }
  &__list {
    max-height: 400px;
    height: 100%;
    overflow-y: auto;
  }

  .active-filter {
    font-weight: 600;
    color: #4f6fa6;
    border-bottom: 2px solid #4f6fa6;
    border-radius: 0;
  }
}
</style>
