<template>
  <v-app-bar color="primary" image="https://picsum.photos/1920/1080?random">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="props.clickNavMenu()" />
    </template>

    <v-app-bar-title>
      <NuxtLink :to="props.titleLink" class="title-link">
        {{ props.title }}
      </NuxtLink>
    </v-app-bar-title>

    <v-spacer />

    <slot />
  </v-app-bar>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  titleLink?: string
  clickNavMenu?: () => void
  clickSearch?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  titleLink: '#',
  clickNavMenu: () => {},
  clickSearch: () => {}
})
</script>

<style scoped>
.title-link {
  color: inherit;
  text-decoration: none;
}
</style>
