<template>
  <q-card class="task-card q-pa-md">
    <div class="text-h6 q-mb-md">
      {{ isEdit ? 'Edit Task' : 'Add New Task' }}
    </div>

    <q-input
      v-model="localTitle"
      ref="titleRef"
      :rules="[requiredRule]"
      label="Task name"
      outlined
      autofocus
      @keyup.enter="submit"
    />

    <div class="row q-mt-md justify-end q-gutter-sm">
      <q-btn flat label="Cancel" @click="emitCancel" />
      <q-btn color="primary" :label="isEdit ? 'Update' : 'Save'" @click="submit" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { QInput } from 'quasar';
import { ref, watch } from 'vue';

interface Props {
  title?: string;
  isEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  isEdit: false,
});

const emit = defineEmits<{
  (e: 'submit', value: string): void;
  (e: 'cancel'): void;
}>();

const localTitle = ref(props.title);
const titleRef = ref<QInput | null>(null);

watch(
  () => props.title,
  (value) => (localTitle.value = value),
);

const requiredRule = (val: string) => !!val?.trim() || 'Task name is required';

const submit = () => {
  if (!titleRef.value?.validate()) return;
  if (!localTitle.value.trim()) return;
  emit('submit', localTitle.value.trim());
};

const emitCancel = () => emit('cancel');
</script>

<style scoped lang="scss">
.task-card {
  width: 420px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
