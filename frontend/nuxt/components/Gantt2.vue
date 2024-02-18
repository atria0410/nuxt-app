<template>
  <div class="gantt-chart">
    <div class="task-area">
      <div class="task-wrapper">
        <div class="task">タスク1</div>
        <div class="task">タスク2</div>
      </div>
    </div>
    <div class="time-line-area">
      <div class="time-line-header">
        <div v-for="h in 24" class="hour">
          {{ h - 1 }}
        </div>
      </div>
      <div class="time-line-wrapper">
        <div class="time-line"></div>
        <div class="time-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const barHeight = 50 // バー高さ
const barMargin = 5 // バーマージン
const xGridStep = 60 // バーの移動間隔（X軸）
const yGridStep = barHeight + barMargin * 2 // バーの移動間隔（Y軸）

const tasks = defineModel<Task[]>()

const barList = ref(tasks.value?.map((task) => task.bars))

console.log(barList.value)

const emit = defineEmits(['dblclickBar'])
</script>

<style lang="scss" scoped>
$header-height: 25px;
$bar-height: 50px;
$line-height: $bar-height + 5px * 2;

.gantt-chart {
  display: flex;
  user-select: none;
  .task-wrapper {
    width: 150px;
    margin-top: $header-height;
    background-color: #66a5ad;
    .task {
      height: $line-height;
      line-height: $line-height;
      text-align: center;
      font-weight: bold;
      color: #ffffff;
      border: solid #000000;
      border-width: 1px 1px 0 1px;
      &:last-child {
        border-bottom-width: 1px;
      }
    }
  }
  .time-line-area {
    width: 100%;
    .time-line-header {
      display: flex;
      height: $header-height;
      .hour {
        position: relative;
        width: calc(100% / 24);
        left: -5px;
      }
    }
    .time-line-wrapper {
      background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: calc(100% / 24);
      .time-line {
        height: $line-height;
        border: solid #000000;
        border-width: 1px 1px 0 0;
        &:last-child {
          border-bottom-width: 1px;
        }
      }
    }
  }
}
</style>
