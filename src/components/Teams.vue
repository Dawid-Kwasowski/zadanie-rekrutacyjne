<template>
  <v-card
    class="mx-auto my-2 pa-2 d-flex flex-column align-items-center"
    style="height: 100%"
  >
    <v-list>
      <v-list-group v-for="(team, index) in teamsWithSubGroup" :key="team.id" no-action>
        <template #activator>
          <Dialog :editor="editorIsOpen">
            <template #dialog-activator>
              <v-list-item-avatar tile class="mr-2">
                <v-img :lazy-src="team.img" :src="team.img"> </v-img>
              </v-list-item-avatar>
            </template>
            <template #dialog-header>
              <h1 class="display-1">Zespół: {{ team.name }}</h1>
            </template>
            <template #dialog-control>
              <form>
                <v-text-field
                  label="Nazwa Grupy"
                  v-model="team.name"
                  required
                ></v-text-field>
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="rules"
                  show-size
                  v-model="team.img"
                  label="Zmień grupowy avatar"
                  prepend-icon="mdi-camera"
                ></v-file-input>
                <v-row>
                  <v-col cols="6">
                    <v-btn color="warning" block @click="closeEditor"
                      ><v-icon left>mdi-playlist-edit</v-icon>Zmień</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn class="red--text" text block @click="deleteTeam(index)"
                      ><v-icon left>mdi-trash-can-outline</v-icon>Usuń</v-btn
                    >
                  </v-col>
                </v-row>
              </form>
            </template>
          </Dialog>

          <v-list-item-title>{{ team.name }}</v-list-item-title>
        </template>

        <v-divider></v-divider>

        <v-list-item v-for="(subteam, index) in team.subteams" :key="subteam.id">
          <Dialog v-if="editorIsOpen">
            <template #dialog-activator>
              <v-list-item-avatar tile>
                <v-img :lazy-src="subteam.img" :src="subteam.img"> </v-img>
              </v-list-item-avatar>
            </template>
            <template #dialog-header>
              <h1 class="display-1">Zespół: {{ subteam.name }}</h1>
            </template>
            <template #dialog-control>
              <form>
                <v-text-field
                  label="Nazwa Grupy"
                  v-model="subteam.name"
                  required
                ></v-text-field>
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="rules"
                  show-size
                  v-model="subteam.img"
                  label="Zmień grupowy avatar"
                  prepend-icon="mdi-camera"
                ></v-file-input>
                <v-row>
                  <v-col cols="6">
                    <v-btn color="warning" block @click="closeEditor"
                      ><v-icon left>mdi-playlist-edit</v-icon>Zmień</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn class="red--text" text block @click="deleteSubteam(index)"
                      ><v-icon left>mdi-trash-can-outline</v-icon>Usuń</v-btn
                    >
                  </v-col>
                </v-row>
              </form>
            </template>
          </Dialog>

          <v-list-item-title>{{ subteam.name }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <!-- lista bez podgrup -->
      <v-list-item v-for="team in teamsWithoutSubGroup" :key="team.id">
        <Dialog>
          <template #dialog-activator>
            <v-list-item-avatar tile>
              <v-img :lazy-src="team.img" :src="team.img"> </v-img>
            </v-list-item-avatar>
          </template>
          <template #dialog-header>
            <h1 class="display-1">Zespół: {{ team.name }}</h1>
          </template>
          <template #dialog-control>
            <form>
              <v-text-field
                label="Nazwa Grupy"
                v-model="team.name"
                required
              ></v-text-field>
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                :rules="rules"
                show-size
                v-model="team.img"
                label="Zmień grupowy avatar"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-row>
                <v-col cols="6">
                  <v-btn color="warning" block @click="closeEditor"
                    ><v-icon left>mdi-playlist-edit</v-icon>Zmień</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn class="red--text" text block @click="deleteTeam(index)"
                    ><v-icon left>mdi-trash-can-outline</v-icon>Usuń</v-btn
                  >
                </v-col>
              </v-row>
            </form>
          </template>
        </Dialog>
        <v-list-item-title>{{ team.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- Dialog odpowiedzialny za dodanie zespołów -->
    <Dialog @addTeam="addTeam">
      <template #dialog-activator>
        <v-btn block color="primary"><v-icon>mdi-plus</v-icon> Dodaj zespół</v-btn>
      </template>
      <template #dialog-header>
        <h1 class="display-1">Dodaj zespół</h1>
      </template>
    </Dialog>
  </v-card>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
  data() {
    return {
      editorIsOpen: false,
      rules: [
        (value) => !value || value.size < 2000000 || "Avatar powien mieć poniżej 2MB",
      ],
      teams: [
        {
          id: 1,
          name: "Drużyna A",

          img: "https://picsum.photos/200?random=1",
          subteams: [
            {
              id: 1,

              name: "Front-End",
              img: "https://picsum.photos/200?random=3",
            },
            {
              id: 2,

              name: "Back-End",
              img: "https://picsum.photos/200?random=4",
            },
          ],
        },
        {
          id: 2,
          name: "Drużyna B",

          img: "https://picsum.photos/200?random=2",
          subteams: [
            {
              id: 1,

              name: "Odział Uderzeniowy",
              img: "https://picsum.photos/200?random=5",
            },
            {
              id: 2,

              name: "Zwiad",
              img: "https://picsum.photos/200?random=6",
            },
          ],
        },
        {
          id: 3,
          name: "Drużyna C",

          img: "https://picsum.photos/200?random=3",
        },
      ],
    };
  },
  computed: {
    teamsWithSubGroup() {
      return this.teams.filter((team) => {
        return team.subteams;
      });
    },
    teamsWithoutSubGroup() {
      return this.teams.filter((team) => {
        return !team.subteams;
      });
    },
  },
  methods: {
    addTeam(newTeam) {
      return this.teams.push(newTeam);
    },
    closeEditor() {
      return (this.editorIsOpen = !this.editorIsOpen);
    },
    deleteTeam(id) {
      return this.teams.splice(id, 1);
    },
    deleteSubteam(id) {
      return this.teams.subteams.splice(id, 1);
    },
  },
  components: {
    Dialog,
  },
};
</script>

<style></style>
