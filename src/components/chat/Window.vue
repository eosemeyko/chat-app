
<template>
  <v-card class="chat-room">
    <v-toolbar card dense flat class="white chat-room--toolbar" light>
      <template v-if="chat.users">
        <v-avatar size="32" class="avatar-stack" v-for="(user_id,index) in chat.users" :key="index">
          <img :src="getAvatar(user_id)" alt="">
        </v-avatar>
      </template>
      <v-spacer></v-spacer>
      <v-toolbar-title><h4>{{chat.title}}</h4></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <vue-perfect-scrollbar class="chat-room--scrollbar grey lighten-5" v-bind:style="computeHeight">
      <v-card-text class="chat-room--list pa-3">
        <template v-for="(item, index) in chat.messages">
          <div v-bind:class="[ index % 2 == 0 ? 'reverse' : '']" class="messaging-item layout row my-4" :key="index">
            <v-avatar class="indigo mx-1" size="40">
              <img v-bind:src="item.user.avatar" alt="">
            </v-avatar>
            <div class="messaging--body layout column mx-2">
              <p :value="true" v-bind:class="[ index % 2 == 0 ? 'primary white--text' : 'white']" class="pa-2">
                {{item.text}}
              </p>
              <div class="caption px-2 text--secondary">{{new Date(item.created_at).toLocaleString()}}</div>
            </div>
            <v-spacer></v-spacer>
          </div>
        </template>
      </v-card-text>
    </vue-perfect-scrollbar>
    <v-card-actions>
      <v-text-field
        full-width
        flat
        clearable
        label="Текст сообщения">
      </v-text-field>
      <v-btn icon slot="Отправить">
        <v-icon color="text--secondary">send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getChatById } from "@/../demo/api/chat";
import { getUserById } from "@/../demo/api/user";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    uuid: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: null
    }
  },
  computed: {
    chat() {
      let chatOrigin = {
        title: "Основной канал",
        users: [],
        messages: []
      };
      let chat = getChatById(this.$route.params.uuid);
      return Object.assign(chatOrigin, chat);
    },
    computeHeight() {
      return {
        height: this.height || ""
      };
    }
  },

  methods: {
    getAvatar(uid) {
      return getUserById(uid).avatar;
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-card__actions
  padding: 0;
</style>
