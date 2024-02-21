<template>
  <div class="container">
    <DragResize v-model="box" :min-width="50" :min-height="50" />
  </div>
</template>

<script setup lang="ts">
const box = ref({
  x: 200,
  y: 200,
  w: 100,
  h: 100
})
</script>

<style>
.container {
  width: 1000px;
  height: 700px;
  border: 1px solid #000000;
}
</style>
