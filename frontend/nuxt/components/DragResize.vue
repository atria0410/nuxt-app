<template>
  <div
    ref="boxRef"
    class="box"
    :style="`transform: translate(${box.x}px, ${box.y}px); width: ${box.w}px; height: ${box.h}px;`"
  >
    <div class="dot handle-tm" :draggable="true" @drag="resizeTop"></div>
    <div class="dot handle-rm" :draggable="true" @drag="resizeRight"></div>
    <div class="dot handle-bm" :draggable="true" @drag="resizeBottom"></div>
    <div class="dot handle-lm" :draggable="true" @drag="resizeLeft"></div>
    {{ box.x }} {{ box.y }} {{ box.w }} {{ box.h }}
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core'

type Box = {
  x: number
  y: number
  w: number
  h: number
}

interface Props {
  minWidth?: number
  minHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: 0,
  minHeight: 0
})

const box = defineModel<Box>({ required: true })

const boxRef = ref()

const mouse = useMouse({ touch: false })

// これをしないとドラッグ解除時にoffsetXやevent.offsetYが負の値にジャンプする
// https://stackoverflow.com/questions/12128216/html5-drag-release-offsetx-offsety-jump
onMounted(() => {
  document.addEventListener('dragover', (event: MouseEvent) => {
    event.preventDefault()
  })
  document.addEventListener('drop', (event: MouseEvent) => {
    event.preventDefault()
  })
})

const resizeRight = (event: MouseEvent) => {
  box.value.w += event.offsetX
}

const resizeLeft = (event: MouseEvent) => {
  box.value.x += event.offsetX
  box.value.w -= event.offsetX
}

const resizeTop = (event: MouseEvent) => {
  box.value.y += event.offsetY
  box.value.h -= event.offsetY
}

const resizeBottom = (event: MouseEvent) => {
  box.value.h += event.offsetY
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed gray;
  background-color: aquamarine;
  user-select: none;
  cursor: pointer;

  .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid #bbb;
  }
  .handle-tm {
    top: -10px;
    left: calc(50% - 5px);
  }
  .handle-rm {
    right: -10px;
    top: calc(50% - 5px);
  }
  .handle-bm {
    bottom: -10px;
    left: calc(50% - 5px);
  }
  .handle-lm {
    left: -10px;
    top: calc(50% - 5px);
  }
}
</style>
