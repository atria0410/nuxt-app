<template>
  <v-navigation-drawer v-model:rail="rail" :expand-on-hover="expandOnHover" permanent>
    <v-list>
      <v-list-item
        :prepend-avatar="props.userIcon"
        :title="props.userName"
        :subtitle="props.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="menu in props.menuList"
        :prepend-icon="menu.icon"
        :title="menu.title"
        :value="menu.value"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
type Menu = {
  title: string
  icon: string
  value: string
}

interface Props {
  userIcon?: string
  userName?: string
  email?: string
  menuList: Menu[]
}

const props = withDefaults(defineProps<Props>(), {
  userIcon: '',
  userName: '',
  email: ''
})

const drawer = defineModel<boolean>({ default: true })

const rail = ref<boolean>(!drawer.value)
const expandOnHover = ref<boolean>(!drawer.value)

watch(drawer, () => {
  rail.value = !drawer.value
  expandOnHover.value = !drawer.value
})
</script>
