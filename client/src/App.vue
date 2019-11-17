<template>
  <v-app>
     <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item @click="changeRoute('Modules')">
          <v-list-item-action>
            <v-icon large>mdi-power-socket-eu</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">Модулі</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="changeRoute('Devices')">
          <v-list-item-action>
            <v-icon large>mdi-power-plug</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">Пристрої</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="changeRoute('Logs')">
          <v-list-item-action>
            <v-icon large>mdi-format-list-bulleted-square</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="subtitle-1">Логи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RFIDDER</v-toolbar-title>
      
    </v-app-bar>

    <v-content>
      <router-view></router-view> 
      
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    created () {
      console.log(this.$route)
      this.$vuetify.theme.dark = true
    },
    methods: {
      changeRoute(routeName) {
      
      return this.$router.push({ name: routeName });
    }}, 
    computed: {
    activeRoute () {
      switch (this.$route.name) {
        case 'Devices': return { color: 'success', icon: 'share' }
        case 'Modules': return { color: 'red', icon: 'edit' }
        default: return {}
      }
    }
    }
    
    }
</script>
