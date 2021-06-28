<template>
  <v-card style="height: 100%">
    <v-row>
      <v-col cols="12" md="6" class="pa-5">
        <v-subheader>UŻYTKOWNICY</v-subheader>
        <v-list>
          <!-- Lista z użytkownikami -->
          <v-list-item-group v-model="selectedItemId">
            <v-list-item v-for="user in users" :key="user.id">
              <v-list-item-icon>
                <v-icon> mdi-account </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ user.name }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" class="pa-5">
        <v-subheader>ZADANIA</v-subheader>
        <v-list>
          <v-list-item
            class="pa-3"
            v-for="(task, index) in users[selectedItemId].tasks"
            :key="task.id"
          >
            <v-list-item-action>
              <v-checkbox v-model="task.isComplete"></v-checkbox>
            </v-list-item-action>
            <v-list-item-title>
              <template v-if="task.isEditable">
                <v-text-field
                  v-model="task.name"
                  label="Zmień treść zadania"
                ></v-text-field>
              </template>
              <span v-else>{{ task.name }} </span>

              <v-icon right color="error" @click.self="removeTask(index, selectedItemId)">
                mdi-trash-can-outline
              </v-icon>
              <v-icon
                right
                color="warning"
                @click.self="task.isEditable = !task.isEditable"
              >
                mdi-pencil-outline
              </v-icon>
              <v-list-item-subtitle>
                Zadanie Wygasa: {{ task.expires }}
              </v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-card-text class="text-center">
          <Dialog>
            <template #dialog-activator>
              <v-btn fab class="ma-5" color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <template #dialog-header>
              <h1 class="display-1">Dodaj Zadanie</h1>
            </template>
            <template #dialog-control>
              <v-text-field label="Zadanie" required v-model="taskName"></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Data zakończenia zadania"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
              <v-btn
                color="success"
                @click="
                  addTask(
                    {
                      id: Math.floor(Math.random()) * 100 + 30,
                      name: taskName,
                      expires: date,
                      isComplete: false,
                      isEditable: false,
                    },
                    selectedItemId
                  )
                "
              >
                Dodaj zadanie</v-btn
              >
            </template>
          </Dialog>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Dialog from "@/components/Dialog";
export default {
  methods: {
    openMenu() {
      return alert("sdasd");
    },
    addTask(task, selectedItemId) {
      return this.users[selectedItemId].tasks.push(task);
    },
    removeTask(index, selectedItemId) {
      return this.users[selectedItemId].tasks.splice(index, 1);
    },
  },
  data() {
    return {
      taskName: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      selectedItemId: 0,
      users: [
        {
          id: 1,
          name: "Anna",
          tasks: [
            {
              id: 1,
              name: "Skończyć To-do list",
              expires: "23.07.21",
              isComplete: false,
              isEditable: false,
            },
            {
              id: 2,
              name: "Naprawić Walidacje formularza",
              expires: "30.06.21",
              isComplete: true,
              isEditable: false,
            },
            {
              id: 3,
              name: "Poprawić literówki w formularzu",
              expires: "30.06.21",
              isComplete: true,
              isEditable: false,
            },
          ],
        },
        {
          id: 2,
          name: "Dawid",
          tasks: [
            {
              id: 7,
              name: "Zadanie 1",
              expires: "23.07.21",
              isComplete: true,
              isEditable: false,
            },
            {
              id: 8,
              name: "Zadanie 2",
              expires: "30.06.21",
              isComplete: false,
              isEditable: false,
            },
            {
              id: 9,
              name: "Zadanie 3",
              expires: "30.06.21",
              isComplete: false,
              isEditable: false,
            },
          ],
        },
        {
          id: 3,
          name: "Angelika",
          tasks: [
            {
              id: 10,
              name: "Zadanie 1",
              expires: "23.07.21",
              isComplete: false,
              isEditable: false,
            },
            {
              id: 11,
              name: "Zadanie 2",
              expires: "30.06.21",
              isComplete: true,
              isEditable: false,
            },
            {
              id: 12,
              name: "Zadanie 3",
              expires: "30.06.21",
              isComplete: true,
              isEditable: false,
            },
          ],
        },
      ],
    };
  },

  components: {
    Dialog,
  },
};
</script>
