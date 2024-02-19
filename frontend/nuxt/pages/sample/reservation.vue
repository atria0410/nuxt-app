<template>
  <ReservationChart v-model="reservations" :rooms="rooms" />
  <!-- {{ tasks }} -->
</template>

<script setup lang="ts">
import type { Room, Reservation } from '@/types/gantt'

const rooms: Room[] = [
  { name: '宴会場', table: ['宴会場'], displayName: false },
  { name: '薔薇の間', table: ['薔薇の間'], displayName: false },
  { name: '大広間', table: ['円卓1', '円卓2', '円卓3'], displayName: true },
  { name: '中央ホール', table: ['中央ホール'], displayName: false }
]

const reservations = ref<Reservation[]>([
  {
    id: '1',
    title: '〇〇様',
    room: '宴会場',
    table: ['宴会場'],
    startTime: '00:00',
    endTime: '02:00'
  },
  {
    id: '2',
    title: '××様',
    room: '大広間',
    table: ['円卓1', '円卓2'],
    startTime: '00:00',
    endTime: '02:00'
  }
])
</script>
