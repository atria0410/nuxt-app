<template>
  <v-row>
    <v-col>
      <DatePicker v-model="date" label="日付" hide-details />
    </v-col>
    <v-col>
      <v-btn @click="addReserve"> 予約を追加 </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <ClientOnly>
        <g-gantt-chart
          :chart-start="chartStart"
          :chart-end="chartEnd"
          precision="hour"
          bar-start="myBeginDate"
          bar-end="myEndDate"
          no-overlap
          grid
          row-height="50"
        >
          <g-gantt-row
            v-for="gantt in ganttRows"
            :label="gantt.label"
            :bars="gantt.bars"
            highlight-on-hover
          />
        </g-gantt-chart>
      </ClientOnly>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-form>
        <v-card-text>
          <v-autocomplete label="部屋" :items="rooms" variant="outlined" density="compact" />
          <DatePicker label="日付" />
          <v-text-field label="開始時間" type="time" variant="outlined" density="compact" />
          <v-text-field label="終了時間" type="time" variant="outlined" density="compact" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn type="submit" color="primary" variant="flat" @click="cancelReserve">登録</v-btn>
          <v-btn color="primary" variant="outlined" @click="cancelReserve">キャンセル</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const date = ref<Date>(dayjs().startOf('day').toDate())
const chartStart = computed(() => dayjs(date.value).startOf('day').toDate())
const chartEnd = computed(() => dayjs(date.value).endOf('day').toDate())

const dialog = ref<boolean>(false)

const rooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4']

const addReserve = () => {
  dialog.value = true
}

const cancelReserve = () => {
  dialog.value = false
}

const ganttRows = ref([
  {
    label: 'Room 1',
    bars: [
      {
        myBeginDate: '2024-02-10 13:00',
        myEndDate: '2024-02-10 14:00',
        ganttBarConfig: {
          id: 'unique-id-1-1',
          label: 'Lorem ipsum dolor',
          hasHandles: true
        }
      },
      {
        myBeginDate: '2024-02-10 16:00',
        myEndDate: '2024-02-10 16:30',
        ganttBarConfig: {
          id: 'unique-id-1-2',
          label: 'Lorem ipsum dolor',
          hasHandles: true
        }
      }
    ]
  },
  {
    label: 'Room 2',
    bars: [
      {
        myBeginDate: '2024-02-10 08:00',
        myEndDate: '2024-02-10 15:00',
        ganttBarConfig: {
          id: 'unique-id-2-1',
          label: 'Lorem ipsum dolor',
          hasHandles: true
        }
      }
    ]
  }
])
</script>
