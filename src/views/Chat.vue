<template>
  <v-app id="chat" class="chat">
    <v-content class="chat-main" style="padding: 0;">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Chat"
};
</script>
