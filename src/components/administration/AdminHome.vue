<template>
  <v-layout row>
    <v-flex xs12 sm3>
      <v-navigation-drawer permanent>
        <v-toolbar flat>
          <v-list>
            <v-list-tile-title class="title">
              {{ $t('admin.home') }}
            </v-list-tile-title>
          </v-list>
        </v-toolbar>
        <v-divider/>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>
    <v-flex xs12 sm9 style="margin-left: 15px;">
      <router-view/>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "admin-home",
    data(){
      return {
        items: [
          {title: this.$t('admin.users'), icon: 'face', to: '/admin/users'},
          {title: this.$t('admin.products'), icon: 'shopping_basket', to: '/admin/products'},
          {title: this.$t('admin.chart_orders'), icon: 'bar_chart', to: '/admin/chart_orders'},
        ]
      }
    }
  }
</script>
