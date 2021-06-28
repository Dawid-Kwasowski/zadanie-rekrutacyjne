<template>
  <v-card>
    <v-toolbar flat rounded color="primary" dark dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        {{ tab }}
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-card-title>Kontakty</v-card-title>
      <v-tabs v-model="tab" vertical>
        <v-tab
          v-for="(contact, index) in contacts"
          :key="index"
          class="ma-5"
          :href="`#${contact.name}`"
        >
          <v-badge
            bordered
            bottom
            :color="contact.status"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-btn icon large>
              <v-avatar>
                <img :src="contact.profileImage" />
              </v-avatar>
            </v-btn>
          </v-badge>

          <v-list-item-title>
            {{ contact.name }}
          </v-list-item-title>
        </v-tab>
      </v-tabs>
    </v-navigation-drawer>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(channel, index) in currentChannel" :key="index" :value="tab">
        <v-card flat>
          <ChatBox :channels="channel" @newMessage="addMessage" :userId="userId" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import ChatBox from "./ChatBox";
export default {
  components: {
    ChatBox,
  },
  computed: {
    currentChannel() {
      return this.contacts.filter((contact) => {
        if (contact.name == this.tab) {
          return contact;
        }
      });
    },
  },
  methods: {
    addMessage(newMessage) {
      const [message, destinationUserId] = newMessage;
      this.contacts.forEach((channel) => {
        if (channel.userId === destinationUserId) {
          return channel.channels[0].messages.push(message);
        }
      });
    },
  },
  data() {
    return {
      tab: null,
      drawer: false,
      userId: "qwert",
      status: "success",

      contacts: [
        {
          name: "Bartek",
          profileImage: "https://randomuser.me/api/portraits/men/85.jpg",
          userId: "ssee2",
          status: "success",
          channels: [
            {
              color: "indigo",
              messages: [
                {
                  content: "Cześć co tam?",
                  userId: "ssee2",
                  date: "27.06.2021",
                  time: "21:04",
                },
                {
                  content: "A daj spokój",
                  userId: "qwert",
                  date: "27.06.2021",
                  time: "21:10",
                },
                {
                  content: "Aż tak źle ? :(",
                  userId: "ssee2",
                  date: "27.06.2021",
                  time: "21:12",
                },
              ],
            },
          ],
        },
        {
          name: "Angela",
          profileImage: "https://randomuser.me/api/portraits/women/85.jpg",
          userId: "qazxs",
          status: "red",
          channels: [
            {
              color: "primary",
              messages: [
                {
                  content: "Cześć masz może notatki z niemieckiego?",
                  userId: "qazxs",
                  date: "27.06.2021",
                  time: "21:04",
                },
                {
                  content: "Pewnie zaraz Ci podeśle :D",
                  userId: "qwert",
                  date: "27.06.2021",
                  time: "21:12",
                },
              ],
            },
          ],
        },
        {
          name: "Antonio",
          profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
          userId: "lkjhu",
          status: "red",
          channels: [
            {
              color: "pink",
              messages: [
                {
                  content: "Hej idziesz jutro z nami do tego nowego baru na Wrzeszczu?",
                  userId: "qwert",
                  date: "21.06.2021",
                  time: "21:38",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
