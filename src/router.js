import Vue from "vue";
import Router from "vue-router";
import Chat from "@/views/Chat";
import Channel from "@/components/chat/Channel";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Chat",
      component: Chat,
      redirect: {
        path: "/channel/global"
      },
      children: [
        {
          path: "/channel/:uuid",
          name: "Channel",
          props: true,
          component: Channel
        }
      ]
    }
  ]
});
