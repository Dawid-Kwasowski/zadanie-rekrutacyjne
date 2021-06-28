<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <h1 class="display-1 pa-4 dark">Zespoły</h1>

        <v-divider></v-divider>
        <Teams />
      </v-col>

      <v-divider vertical></v-divider>

      <v-col>
        <v-tabs v-model="tabs" fixed-tabs icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tasks">
            Zadania
            <v-icon>fas fa-tasks</v-icon>
          </v-tab>

          <v-tab href="#conversations">
            Konwersacje
            <v-icon>fas fa-comments</v-icon>
          </v-tab>

          <v-tab href="#files">
            Pliki
            <v-icon>fas fa-folder-open</v-icon>
          </v-tab>
        </v-tabs>

        <div style="height: 30px"></div>

        <v-tabs-items v-model="tabs">
          <v-tab-item value="tasks">
            <TaskMenager />
          </v-tab-item>

          <v-tab-item value="conversations">
            <Chat />
          </v-tab-item>

          <v-tab-item value="files">
            <FileMenager />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Teams from "@/components/Teams";
import TaskMenager from "@/components/TaskMenager";
import Chat from "@/components/Chat/Chat";
import FileMenager from "@/components/FileMenager";
export default {
  data: () => ({
    tabs: null,
  }),

  computed: {
    title: function () {
      let title = "";

      switch (this.tabs) {
        case "tasks":
          title = "Zadania";

          break;

        case "conversations":
          title = "Rozmowy";

          break;

        case "files":
          title = "Pliki";

          break;

        default:
          title = "";

          break;
      }

      return title;
    },
  },
  components: {
    Teams,
    TaskMenager,
    Chat,
    FileMenager,
  },
};
</script>
