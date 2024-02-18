<template>
  <Gantt2 v-model="tasks" @dblclickBar="dblclickBar" />
  <!-- {{ tasks }} -->
</template>

<script setup lang="ts">
const tasks = ref<Task[]>([
  {
    task: 'task1',
    bars: [
      {
        id: '1',
        title: 'test1',
        startTime: '01:00',
        endTime: '03:00'
      },
      {
        id: '2',
        title: 'test2',
        startTime: '03:00',
        endTime: '05:30'
      }
    ]
  },
  {
    task: 'task2',
    bars: []
  },
  {
    task: 'task3',
    bars: [
      {
        id: '3',
        title: 'test',
        startTime: '01:00',
        endTime: '03:00'
      }
    ]
  },
  {
    task: 'task4',
    bars: []
  }
])

const dblclickBar = (bar: Bar) => {
  console.log(bar)
}
</script>
