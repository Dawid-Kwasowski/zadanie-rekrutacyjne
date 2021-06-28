<template>
    
    <v-container fluid> 

        <v-overlay :value="!loaded">
                
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        
        </v-overlay>
        
        <h1 class="display-1 pa-4 dark" v-if="!loading">
            {{ null === currentDir ? 'Mój dysk' : currentDir.name }}
        </h1>

        <v-breadcrumbs :items="items"></v-breadcrumbs>

        <v-divider></v-divider>

        <v-row
            class="mt-3"
            v-if="!loading"
        >

            <v-col cols="12">

                <create-folder
                    v-on:created="onCreated"
                    :parent-dir="currentDir"
                ></create-folder>

            </v-col>

            <v-col cols="12">

                <upload-file
                    v-on:uploaded="onUploaded"
                    v-on:add-resumable-upload="onAddResumableUpload"
                    :currentDir="currentDir"
                ></upload-file>

            </v-col>

        </v-row>

        <resumable-uploads
            ref="resumableUploads"
        ></resumable-uploads>

        <folders
            ref="folders"
            v-if="!loading"
            :parent-dir="currentDir"
            v-on:loaded="foldersLoaded = true"
        ></folders>

        <files
            ref="files"
            v-if="!loading"
            :current-dir="currentDir"
            v-on:loaded="filesLoaded = true"
        ></files>

    </v-container>

</template>

<script>

    import CreateFolder from '../folder/New';

    import UploadFile from '../file/Upload';

    import Folders from '../folder/List';

    import Files from '../file/List';

    //import axios from 'axios';

    //import authHeader from '../../helpers/authHeader';

    import ResumableUploads from '../file/ResumableUploads';

    import FoldersClient from '../../clients/FoldersClient';
    
    export default {

        components: {

            CreateFolder,

            UploadFile,

            Folders,

            Files,

            ResumableUploads

        },

        data: () => ({

            currentDir: null,

            filesLoaded: false,

            foldersLoaded: false,

            loading: true

        }),

        computed: {

            loaded: function() {

                return true === this.filesLoaded && true === this.foldersLoaded && false === this.loading;

            },

            items: function() {

                if(!this.currentDir) {

                    return [
                        {
                            text: 'Dysk',
                            disabled: false
                        }
                    ];

                }

                const items = [];

                let dir = this.currentDir.parentDir;

                while(null !== dir) {

                    const props = this.$router.resolve({

                        name: 'folder_path',
                        params: {
                            id: dir.id
                        }

                    });

                    items.push({

                        text: dir.name,
                        disabled: false,
                        href: props.href,

                    });

                    dir = dir.parentDir;

                }

                try {

                    items.reverse();

                } catch {

                    //

                }

                items.unshift({

                    text: 'Dysk',
                    disabled: false,
                    href: '/#/dysk'

                });

                items.push({

                    text: this.currentDir.name,
                    disabled: false

                });

                return items;

            }

        },

        methods: {

            async onLoad() {

                if('drive_path' === this.$route.name) {

                    this.loading = false;

                    return;

                }

                const id = this.$route.params.id;

                await FoldersClient.getItem({

                    params: {

                        uuid: id

                    }

                }).then((res) => {

                    this.currentDir = res.data;

                }).catch((err) => {

                    console.log(err);

                }).finally(() => {

                    this.loading = false;

                });

            },

            onCreated(folder) {

                this.$refs.folders.push(folder);

            },

            onUploaded(response) {

                this.$refs.files.unshift(response);

            },

            onAddResumableUpload(file) {

                this.$refs.resumableUploads.addFile(file);

            }

        },

        async mounted() {

            await this.onLoad();

        }

    }

</script>