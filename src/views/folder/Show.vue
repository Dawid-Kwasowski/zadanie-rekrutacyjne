<template>
    
    <v-container fluid> 

        <v-overlay :value="!loaded">
        
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        
        </v-overlay>
        
        <h1 class="display-1 pa-4 dark" v-if="currentDir">
            {{ currentDir.name }}
        </h1>

        <v-breadcrumbs :items="items"></v-breadcrumbs>

        <v-divider></v-divider>

        <v-row
            class="mt-3"
            v-if="currentDir"
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
                    :current-dir="currentDir"
                ></upload-file>

            </v-col>

        </v-row>

        <folders
            ref="folders"
            :parent-dir="currentDir"
            v-if="currentDir"
            v-on:loaded="foldersLoaded = true"
        ></folders>

        <files
            ref="files"
            :current-dir="currentDir"
            v-if="currentDir"
            v-on:loaded="filesLoaded = true"
        ></files>

    </v-container>

</template>

<script>

    import CreateFolder from '../folder/New';

    import UploadFile from '../file/Upload';

    import Folders from '../folder/List';

    import Files from '../file/List';

    import axios from 'axios';

    import authHeader from '../../helpers/authHeader';
    
    export default {

        components: {

            CreateFolder,

            UploadFile,

            Folders,

            Files

        },

        data: () => ({

            currentDir: null,

            filesLoaded: false,

            foldersLoaded: false

        }),

        computed: {

            loaded: function() {

                return null !== this.currentDir && true === this.filesLoaded && true === this.foldersLoaded;

            },

            items: function() {

                if(!this.currentDir) return [];

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

                return [
                    {
                        text: 'Dysk',
                        disabled: false,
                        href: '/#/dysk'
                    },
                    {
                        text: this.currentDir.name,
                        disabled: false
                    }
                ]
 
            }

        },

        methods: {

            async onLoad() {

                const id = this.$route.params.id;

                await axios.get(`/api/folders/${id}`).then((res) => {

                    console.log(res);

                    this.currentDir = res.data;

                    console.log(this.currentDir);

                }).catch((err) => {

                    console.log(err);

                });

            },

            onCreated(folder) {

                this.$refs.folders.push(folder);

            },

            onUploaded(response) {

                this.$refs.files.unshift(response);

            },

        },

        mounted() {

            console.log(this.$router);

            this.onLoad();

        }

    }

</script>