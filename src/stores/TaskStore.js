import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const  useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);
  const loading = ref(false);

  const favTasks = computed(() => {
    return tasks.value.filter(task => task.isFav)
  })
  const favTasksCount = computed(() => {
    return tasks.value.reduce((prev, current) => {
      return current.isFav ? prev + 1 : prev;
    }, 0)
  })
  const totalCount = computed((state) => {
    return tasks.value.length;
  })
  const getTasks = async () => {
    loading.value = true;
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    tasks.value = data;
    loading.value = false;
    setTimeout(() => {}, 500)
  }
  const addTask = async (task) => {
    tasks.value.push(task);

    const res = await fetch('http://localhost:3000/tasks', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    if (res.error) {
      console.log(res.error)
    }
  }
  const deleteTask = async (id) => {
    tasks.value = tasks.value.filter(task => {
      return task.id !== id;
    })

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    });

    if (res.error) {
      console.log(res.error)
    }
  }
  const toggleFav = async (id) => {
    const task = tasks.value.find(task => task.id === id);
    task.isFav = !task.isFav;

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isFav: task.isFav
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    if (res.error) {
      console.log(res.error)
    }
  }

  return {
    tasks,
    loading,
    favTasks,
    favTasksCount,
    totalCount,
    getTasks,
    addTask,
    deleteTask,
    toggleFav
  }
});
