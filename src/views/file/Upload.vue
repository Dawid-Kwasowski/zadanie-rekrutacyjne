<template>
  <vue-dropzone
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
      <h3 class="text-h3 font-weight-light">Przeciągnij i upuść, aby dodać pliki!</h3>

      <h5 class="text-h5 font-weight-thin">...lub kliknij i dodaj z komputera</h5>
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

import authHeader from "../../helpers/authHeader";

import authorizationException from "../../helpers/authorizationException";

//import * as tus from "tus-js-client";

//import { v4 as uuidv4 } from 'uuid';

export default {
  name: "upload",

  components: {
    vueDropzone: vue2Dropzone,
  },

  props: {
    currentDir: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    dropzoneOptions: {
      url: "/api/file_objects",
      thumbnailWidth: 150,
      addRemoveLinks: true,
      dictRemoveFile: "Usuń",
      dictCancelUpload: "Przerwij",
      dictCancelUploadConfirmation: "Czy na pewno chcesz przerwać wgrywanie tego pliku?",
      headers: authHeader(),
      maxFilesize: 1000000,
    },
  }),

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

    onResumableUpload(file) {
      this.$emit("add-resumable-upload", file);

      return;

      /*console.log(file);

                let filename = file.name;
                filename = filename.split('.');

                const upload = new tus.Upload(file, {

                    endpoint: '/tus/',

                    retryDelays: [0, 3000, 5000, 10000, 20000],

                    metadata: {

                        filename: `${uuidv4()}.${filename[filename.length - 1]}`,
                        filetype: file.type

                    },

                    chunkSize: 10000000,

                    headers: authHeader(),

                    onProgress: function(bytesUploaded, bytesTotal) {
                        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                        console.log(bytesUploaded, bytesTotal, percentage + "%")
                    },

                    onSuccess: function() {
                        console.log("Download %s from %s", upload.file.name, upload.url)
                    } 

                });

                upload.start();*/
    },
  },
};
</script>
