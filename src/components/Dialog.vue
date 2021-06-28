<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" rounded v-on="on">
        <slot name="dialog-activator"> </slot>
      </div>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>
        <slot name="dialog-header"></slot>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <slot name="dialog-control">
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Nazwa Grupy"
                    :rules="nameOfGroupRules"
                    v-model="teamName"
                    required
                  ></v-text-field>
                  <v-file-input
                    show-size
                    v-model="teamImg"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Dodaj grupowy avatar"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                  <v-switch v-model="isSwitched">
                    <template #label> Dodać podgrupy? </template>
                  </v-switch>

                  <template v-if="isSwitched">
                    <v-text-field label="Nazwa podgrupy" required v-model="subteamName">
                    </v-text-field>
                    <v-file-input
                      show-size
                      v-model="subteamImg"
                      accept="image/png, image/jpeg, image/bmp"
                      label="Dodaj grupowy avatar"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                    <v-btn class="ma-3" @click="addSubteam">Dodaj podgrupę</v-btn>
                  </template>

                  <v-divider></v-divider>
                  <v-btn class="ma-3" color="success" @click="addTeam">
                    Stwórz Grupę
                  </v-btn>
                </v-form>
              </slot>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["editor"],
  data() {
    return {
      dialog: this.editor,
      isSwitched: false,
      teamName: "",
      teamImg: "",

      // subteams
      subteamName: "",
      subteamImg: "",
      subteams: [],

      // validation
      nameOfGroupRules: [(v) => v.length > 0 || "Nazwa grupy wymagana!"],
    };
  },
  methods: {
    addSubteam() {
      this.subteams.push({
        id: Math.floor(Math.random()) * 1000,
        name: this.subteamName ? this.subteamName : `Podgrupa bez nazwy`,
        isEditable: false,
        img: this.subteamImg.name
          ? this.subteamImg
          : `https://picsum.photos/200?random=${Math.floor(Math.random()) * 100}`,
      });
      this.subteamImg = "";
      this.subteamName = "";
    },
    addTeam() {
      if (this.$refs.form.validate()) {
        this.dialog = !this.dialog;
        this.$emit("addTeam", {
          id: Math.floor(Math.random()) * 1000,
          name: this.teamName,
          img: this.teamImg.name
            ? this.teamImg.name
            : `https://picsum.photos/200?random=${Math.floor(Math.random()) * 100}`,
          subteams: this.isSwitched ? this.subteams : null,
        });
        this.teamName = "";
        this.teamImg = "";
      }
    },
  },
};
</script>
