<template>
  <div class="reservation-chart">
    <!-- 要件等 -->
    <table class="room-container">
      <tr v-for="room in rooms" class="room">
        <td class="room-name">
          {{ room.name }}
        </td>
        <td class="room-tables">
          <table>
            <tr v-for="table in room.table">
              <td class="room-table">{{ table }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="reservation-container" id="reservation-container">
      <draggable-resizable-vue
        v-for="bar in bars"
        v-model:x="bar.x"
        v-model:y="bar.y"
        v-model:h="bar.h"
        v-model:w="bar.w"
        v-model:active="bar.active"
        :parent="bar.parent"
        :handles="bar.handles"
        :grid="[10, 60]"
        class="bar"
        @dragging="onDragging"
      >
        {{ bar.title }}
        {{ bar.room }}
        {{ bar.table }}
      </draggable-resizable-vue>
      <template v-for="room in rooms">
        <div v-for="table in room.table" class="time-line"></div>
      </template>
    </div>
  </div>
  {{ bars }}
</template>

<script setup lang="ts">
import type { Room, Reservation, Bar } from '@/types/gantt'

interface Props {
  rooms: Room[]
}

const props = withDefaults(defineProps<Props>(), {})

const reservations = defineModel<Reservation[]>()

// 部屋名とテーブル名のオブジェクト配列
const RoomTableList = computed(() => {
  const RoomTableList = []
  for (let i = 0; i < props.rooms.length; i++) {
    for (let j = 0; j < props.rooms[i].table.length; j++) {
      RoomTableList.push({ room: props.rooms[i].name, table: props.rooms[i].table[j] })
    }
  }
  return RoomTableList
})

// 部屋名とテーブル名からY座標を取得
const getYFromRoomAndTable = (room: string, table: string[]): { y: number; h: number } => {
  const index = RoomTableList.value.findIndex(
    (item) => item.room === room && item.table === table[0]
  )
  const y = index * 60 + 5
  const h = 50 + (table.length - 1) * 60
  return { y, h }
}

// Y座標からを部屋名とテーブル名取得
const getRoomAndTableFromY = (y: number): { room: string; table: string } => {
  const i = Math.trunc((y - 5) / 60)
  return RoomTableList.value[i]
}

// アクティブなバーを取得
const getActiveBar = (): Bar | undefined => {
  return bars.value?.find((bar) => bar.active)
}

// バードラッグ時
const onDragging = (left: number, top: number) => {
  const { room, table } = getRoomAndTableFromY(top)
  const targetBar = bars.value?.find((bar) => bar.active)
  const targetRoom = props.rooms.find((item) => item.name === room)?.table.length
  if (!targetBar) return

  targetBar.room = room
  targetBar.handles = ['tm', 'bm', 'ml', 'mr']
}

// テーブルグループ領域内かどうか
const isInTableGroupArea = () => {}

const bars = ref<Bar[] | undefined>(
  reservations.value?.map((reservation) => {
    const { y, h } = getYFromRoomAndTable(reservation.room, reservation.table)
    return {
      id: reservation.id,
      title: reservation.title,
      room: reservation.room,
      table: reservation.table,
      x: 0,
      y: y,
      w: 100,
      h: h,
      active: false,
      parent: '#reservation-container',
      handles: ['ml', 'mr']
    }
  })
)
</script>

<style lang="scss" scoped>
.reservation-chart {
  display: flex;
  user-select: none;
  .room-container {
    border-spacing: 0;
    background-color: #66a5ad;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    border: solid #000000;
    border-width: 1px 1px 0 1px;
    .room {
      .room-name {
        padding: 0 5px;
        border: solid #000000;
        border-width: 0 1px 1px 0;
      }
      .room-tables {
        table {
          border-spacing: 0;
          box-sizing: border-box;
          width: 100%;
          tr {
            .room-table {
              border-bottom: 1px solid #000000;
              height: 60px;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
  .reservation-container {
    width: 100%;
    border: solid #000000;
    border-width: 1px 1px 0 0;
    .time-line {
      height: 60px;
      background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: calc(100% / 24);
      border-bottom: 1px solid #000000;
    }
  }
}

.bar {
  background-color: #aae7af;
  text-align: center;
}
</style>
