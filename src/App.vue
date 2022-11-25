<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>
    <div class="loading" v-if="loading">Loading tasks...</div>
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do.</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favTasksCount }} favs left to do.</p>
      <div v-for="task in favTasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

  </main>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  import { useTaskStore } from "./stores/TaskStore";
  import TaskDetails from "./components/TaskDetails.vue";
  import TaskForm from "./components/TaskForm.vue";

  const taskStore = useTaskStore();
  const { tasks, loading, favTasks, favTasksCount, totalCount, getTasks } = storeToRefs(taskStore);
  const filter = ref('all');

  onMounted(() => {
    taskStore.getTasks();
  });
</script>
