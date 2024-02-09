<template>
  <div>
    <v-app>
      <!-- ヘッダー -->
      <Header
        title="Nuxt App"
        title-link="/"
        :clickNavMenu="clickNavMenu"
        :clickSearch="clickSearch"
      >
        <!-- 検索バー -->
        <v-text-field
          density="compact"
          variant="solo"
          label="検索"
          append-inner-icon="mdi-magnify"
          single-line
          rounded
          hide-details
        />
        <!-- メニュー -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="menu in otherMenuList"
              :prepend-icon="menu.icon"
              :title="menu.title"
              :value="menu.value"
            />
          </v-list>
        </v-menu>
      </Header>

      <!-- サイドメニュー -->
      <SideMenu
        v-model="drawer"
        userIcon="https://randomuser.me/api/portraits/women/85.jpg"
        userName="Sandra Adams"
        email="sandra_a88@gmailcom"
        :menuList="navMenuList"
      />

      <!-- メインコンテンツ -->
      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
const drawer = ref(false)

const navMenuList = [
  { icon: 'mdi-folder', title: 'My Files', value: 'myfiles' },
  { icon: 'mdi-account-multiple', title: 'Shared with me', value: 'shared' },
  { icon: 'mdi-star', title: 'Starred', value: 'starred' }
]

const otherMenuList = [
  { icon: 'mdi-cog', title: '設定', value: 'config' },
  { icon: 'mdi-logout', title: 'ログアウト', value: 'logout' }
]

/**
 * ナビゲーションメニューボタン クリックイベント
 */
const clickNavMenu = () => {
  drawer.value = !drawer.value
}

/**
 * 検索ボタン クリックイベント
 */
const clickSearch = () => {}
</script>
