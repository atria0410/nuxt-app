<template>
  <Gantt v-model="barList" :tasks="roomList" @dblclickBar="dblclickBar" />

  {{ barList }}
</template>

<script setup lang="ts">
type Bar = {
  id: string
  name: string
  task: string
  startTime: string
  endTime: string
}

const roomList = ['Room1', 'Room2', 'Room3', 'Room4']
const barList = ref([
  {
    id: '1',
    name: 'test',
    task: 'Room1',
    startTime: '01:00',
    endTime: '03:00'
  },
  {
    id: '2',
    name: 'test',
    task: 'Room3',
    startTime: '03:00',
    endTime: '05:30'
  }
])

const dblclickBar = (bar: Bar) => {
  console.log(bar)
}
</script>
