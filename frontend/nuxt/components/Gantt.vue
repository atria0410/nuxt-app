<template>
  <div class="chart">
    <!-- タスク -->
    <div class="task-container">
      <div class="task-header"></div>
      <div class="task-area">
        <div v-for="task in tasks" class="task">{{ task }}</div>
      </div>
    </div>
    <!-- タイムライン -->
    <div class="line-container">
      <div class="line-header">
        <div v-for="h in 24" class="hour">
          {{ h - 1 }}
        </div>
      </div>
      <div class="axis"></div>
      <div id="line-area">
        <draggable-resizable-vue
          v-for="bar in barList"
          v-model:x="bar.x"
          v-model:y="bar.y"
          v-model:h="bar.h"
          v-model:w="bar.w"
          v-model:active="bar.isActive"
          :min-width="bar.minWidth"
          :grid="bar.grid"
          :handles="bar.handles"
          :parent="bar.parent"
          class="bar"
          :onDrag="onDragCallback"
          @dragstop="onDragstop"
          @dblclick="dblclickBar(bar)"
        >
          {{ convertYtoTask(bar.y) }}<br />
          {{ convertXToTime(bar.x) }} ~
          {{ convertXToTime(bar.x + bar.w) }}
        </draggable-resizable-vue>
        <div v-for="task in tasks" class="line" :id="`line-${task}`"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Bar = {
  id: string
  name: string
  task: string
  startTime: string
  endTime: string
}

type BarReal = {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
  isActive: boolean
  minWidth: number
  grid: number[]
  handles: string[]
  parent: string
}

interface Props {
  tasks: string[]
  barHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  barHeight: 50
})

const xGridStep = 60
const yGridStep = props.barHeight + 10

const bars = defineModel<Bar[]>()

const emit = defineEmits(['dblclickBar'])

// 時間（hh:mm）からピクセル数（x）に変換
const convertTimeToX = (time: string) => {
  const hour = Number(time.slice(0, 2))
  const minute = Number(time.slice(3, 5))
  return hour * xGridStep + xGridStep * (minute / 60)
}

// ピクセル数（x）から時間（hh:mm）に変換
const convertXToTime = (x: number) => {
  const hour = Math.floor(x / xGridStep)
  const minute = Math.floor(60 * ((x - hour * xGridStep) / xGridStep))
  const hourStr = String(hour).padStart(2, '0')
  const minuteStr = String(minute).padStart(2, '0')
  return `${hourStr}:${minuteStr}`
}

// ピクセル数（y）からタスク名に変換
const convertYtoTask = (y: number) => {
  const index = (y - 5) / yGridStep
  return props.tasks[index]
}

const barList = ref<BarReal[] | undefined>(
  bars.value?.map((bar) => {
    return {
      id: bar.id,
      name: bar.name,
      x: convertTimeToX(bar.startTime),
      y: props.tasks.indexOf(bar.task) * yGridStep + 5,
      w: convertTimeToX(bar.endTime) - convertTimeToX(bar.startTime),
      h: props.barHeight,
      isActive: false,
      minWidth: xGridStep / 2,
      grid: [xGridStep / 2, yGridStep],
      handles: ['ml', 'mr'],
      parent: '#line-area'
    }
  })
)

// 要件等（アンチパターンな気がする...）
watch(
  barList,
  (value) => {
    bars.value = value?.map((bar) => {
      return {
        id: bar.id,
        name: bar.name,
        task: convertYtoTask(bar.y),
        startTime: convertXToTime(bar.x),
        endTime: convertXToTime(bar.x + bar.w)
      }
    })
  },
  { deep: true }
)

const onDragCallback = () => {}

const onDragstop = () => {}

// バー ダブルクリック時イベント
const dblclickBar = (bar: BarReal) => {
  emit('dblclickBar', {
    id: bar.id,
    name: bar.name,
    task: convertYtoTask(bar.y),
    startTime: convertXToTime(bar.x),
    endTime: convertXToTime(bar.x + bar.w)
  })
}
</script>

<style lang="scss" scoped>
$barHeight: 50px;
$xGridStep: 60px;
$yGridStep: $barHeight + 10px;

.chart {
  display: flex;
  user-select: none;

  .task-container {
    .task-header {
      margin-top: 30px;
    }

    .task {
      height: $yGridStep;
      line-height: $yGridStep;
      padding: 0 10px;
      color: #fff;
      font-weight: bold;
      background-color: cadetblue;
      border-top: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
    }

    .task:last-child {
      border-bottom: 1px solid black;
    }
  }

  .line-container {
    .line-header {
      display: flex;

      .hour {
        width: $xGridStep;
        height: 20px;
      }
    }

    .axis {
      height: 10px;
      background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0px 0px / #{$xGridStep}
        #{$xGridStep};
    }

    #line-area {
      width: $xGridStep * 24;

      .line {
        height: $yGridStep;
        background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0px 0px / #{$xGridStep}
          #{$xGridStep};
        border-top: 1px solid black;
        border-right: 1px solid black;
      }

      .line:last-child {
        border-bottom: 1px solid black;
      }

      .bar {
        background-color: aquamarine;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
