<template>
  <div>
    <v-container class="chatbox">
      <div v-for="(message, index) in channels.channels[0].messages" :key="index">
        <template v-if="userId">
          <v-row>
            <v-col offset="6" cols="6">
              <v-card
                v-if="message.userId === userId"
                class="pa-2"
                :color="channels.channels[0].color"
              >
                <v-card-text class="white--text">
                  {{ message.content }}
                  <div class="mt-2">{{ message.time }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template else>
          <v-row>
            <v-col cols="6">
              <v-card v-if="message.userId !== userId" class="pa-2">
                <v-card-text>
                  {{ message.content }}
                  <div class="mt-2">{{ message.time }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </div>
    </v-container>
    <v-text-field
      :color="channels.channels[0].color"
      v-model="message"
      append-outer-icon="mdi-send"
      append-icon="mdi-upload"
      label="Wpisz wiadomość"
      filled
      rounded
      class="px-6"
      type="text"
      @click:append-outer="sendMessage"
      @click:append="uploadIMG"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  props: ["channels", "userId"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    clearMessage() {
      return (this.message = "");
    },
    sendMessage() {
      this.$emit("newMessage", [
        { content: this.message, userId: this.userId },
        this.destinationUserId,
      ]);
      this.clearMessage();
    },
    uploadIMG() {
      return alert("Obrazek Wysłany");
    },
  },
  computed: {
    destinationUserId() {
      return this.channels.userId;
    },
  },
};
</script>
<style>
.chatbox {
  overflow-y: scroll;
  height: 400px;
}
</style>
