<template>
  <v-card class="fileMenager">
    <v-container>
      <v-row>
        <v-col>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle>Dysk</v-card-subtitle>

          <v-btn color="success">
            <v-icon left> mdi-folder-plus </v-icon>
            Dodaj folder
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <vue2Dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          use-custom-slot
          v-on:vdropzone-success="onUploaded"
          v-on:vdropzone-sending="sending"
          v-on:vdropzone-error="onError"
          v-on:vdropzone-file-added="onFileAdded"
        >
          <div class="dropzone-custom-content">
            <h3 class="text-h3 font-weight-light">
              Przeciągnij i upuść, aby dodać pliki!
            </h3>

            <h5 class="text-h5 font-weight-thin">...lub kliknij i dodaj z komputera</h5>
          </div>
        </vue2Dropzone>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import authHeader from "@/helpers/authHeader";

import authorizationException from "@/helpers/authorizationException";
export default {
  name: "upload",
  data() {
    return {
      title: "Mój Dysk",
      dropzoneOptions: {
        url: "/api/file_objects",
        thumbnailWidth: 150,
        addRemoveLinks: true,
        dictRemoveFile: "Usuń",
        dictCancelUpload: "Przerwij",
        dictCancelUploadConfirmation:
          "Czy na pewno chcesz przerwać wgrywanie tego pliku?",
        headers: authHeader(),
        maxFilesize: 1000000,
      },
    };
  },
  methods: {
    onUploaded(file, response) {
      console.log(response);

      this.$refs.myVueDropzone.removeFile(file);

      this.$emit("uploaded", response);
    },

    onError(file, message) {
      message.status = message.code;

      authorizationException(message);
    },

    sending(file, xhr, formData) {
      formData.append("owner", this.$store.state.user["@id"]);

      if (this.currentDir) {
        formData.append("folder", this.currentDir["@id"]);
      }
    },

    onFileAdded(file) {
      console.log(file);

      const size = file.size;

      if (size > 100 * 1000 * 1000) {
        this.$refs.myVueDropzone.removeFile(file);

        this.onResumableUpload(file);
      }
    },
  },
  components: {
    vue2Dropzone,
  },
};
</script>
