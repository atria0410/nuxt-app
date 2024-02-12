<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-sheet class="sheet">
        <v-text-field
          v-bind="props"
          v-model="dateFormatted"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          :hide-details="hideDetails"
          readonly
        />
      </v-sheet>
    </template>
    <v-date-picker v-model="date" color="primary" :title="label" :header="header" :elevation="24" />
  </v-menu>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  label?: string
  header?: string
  dateFormat: string
  hideDetails?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  header: '選択してください',
  dateFormat: 'YYYY/MM/DD',
  hideDetails: false
})

const date = defineModel<Date>()
const dateFormatted = computed(() => (date.value ? dayjs(date.value).format(props.dateFormat) : ''))

const isMenuOpen = ref(false)

const handleChangeDate = () => {
  console.log('変わった')
}
</script>

<style>
.sheet {
  width: 10em;
}
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
</style>
