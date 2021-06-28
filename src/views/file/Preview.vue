<template>
    
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="800"
        :overlay-opacity="0.95"
        v-on:click:outside="onClose"
    >

        <div class="text-center" v-if="type === 'pdf' && loading">

            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>

        </div>

        <div v-if="type === 'pdf'">
            
            <pdf
                :src="pdfSrc"
                v-for="page in pdfPagesCount"
                :key="page"
                :page="page"
                :style="page !== pdfPagesCount ? 'margin-bottom: 15px;' : ''"
            ></pdf>

        </div>

        <vue-plyr
            v-else-if="type === 'player'"
            ref="myVuePlyr"
        >
            
            <video
                controls
                playsinline
                :data-poster="file.previewImage.url"
            >
                    
                <source
                    :src="file.url"
                    :type="file.mimeType"
                />

            </video>

        </vue-plyr>

        <v-img v-else-if="type === 'image'" :src="file.url"></v-img>

    </v-dialog>

</template>

<script>

    import pdf from 'vue-pdf';
    
    export default {

        name: 'preview',

        components: {

            pdf

        },

        props: {

            file: {

                type: Object,
                required: true

            }

        },

        data: () => ({

            dialog: null,

            pdfPagesCount: 1,

            pdfSrc: null,

            loading: false

        }),

        computed: {

            type: function() {

                const mimeType = this.file.mimeType;

                const pdfFormats = [
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'text/plain',
                    'application/rtf',
                    'application/vnd.oasis.opendocument.text',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.oasis.opendocument.spreadsheet',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'application/vnd.oasis.opendocument.presentation',
                    'application/pdf'
                ];

                let type = '';

                if(pdfFormats.includes(mimeType)) {

                    type = 'pdf';

                }else if(mimeType.split('/')[0] === 'video' || mimeType.split('/')[0] === 'audio'){

                    type = 'player';

                }else if(mimeType.split('/')[0] === 'image') {

                    type = 'image';

                }

                return type;

            }

        },

        methods: {

            open() {

                this.dialog = true;

                if(this.type === 'pdf'){

                    this.loading = true;

                    const loadingTask = pdf.createLoadingTask(this.file.url);

                    this.pdfSrc = loadingTask;

                    this.pdfSrc.promise.then((pdf) => {

                        this.pdfPagesCount = pdf.numPages;

                        this.loading = false;

                    });

                }

            },

            onClose() {

                if(this.$refs.myVuePlyr) {

                    this.$refs.myVuePlyr.player.pause();

                }

            }

        }

    }

</script>