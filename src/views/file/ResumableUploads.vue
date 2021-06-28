<template>
    
    <v-navigation-drawer
        absolute
        permanent
        right
        width="360"
        expand-on-hover
        v-if="uploads.length"
    >
        
        <template v-slot:prepend>

            <v-list-item three-line>

                <v-list-item-avatar>
                    
                    <v-icon color="deep-purple">fas fa-cloud-upload-alt</v-icon>

                </v-list-item-avatar>
                
                <v-list-item-content>
                    
                    <v-list-item-title>
                        Przesyłane pliki
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        Znajdują się tutaj wszystkie przesyłane pliki powyżej 100MB
                    </v-list-item-subtitle>

                </v-list-item-content>

            </v-list-item>

        </template>

        <v-divider></v-divider>

        <v-list dense two-line>
            
            <v-list-item
                v-for="upload in uploads"
                :key="upload.id"
            >

                <v-list-item-avatar>
                    
                    <v-icon>file_copy</v-icon>

                </v-list-item-avatar>

                <v-list-item-content>

                    <v-list-item-title>
                        {{ upload.file.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        
                        <v-progress-linear
                            :value="upload.progress"
                            height="12"
                            striped
                        >
                            
                            <template v-slot:default="{ value }">
                                {{ `${value}%` }}
                            </template>

                        </v-progress-linear>
                    
                    </v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-action>

                    <v-btn icon>
                        <v-icon>pause</v-icon>
                    </v-btn>
                    
                    <v-btn icon>
                        <v-icon>
                            highlight_off
                        </v-icon>
                    </v-btn>

                </v-list-item-action>

            </v-list-item>

        </v-list>

    </v-navigation-drawer>

</template>

<script>

    import * as tus from "tus-js-client";

    import { v4 as uuidv4 } from 'uuid';

    import authHeader from '../../helpers/authHeader';

    //import authorizationException from '../../helpers/authorizationException';
    
    export default {

        name: 'resumable-uploads',

        data: () => ({

            uploads: []

        }),

        methods: {

            addFile(file) {

                console.log("Start");

                let filename = file.name;
                filename = filename.split('.');

                let index = this.uploads.push({

                    file,

                    progress: 0,

                    id: uuidv4(),

                    tusUpload: null

                });

                index -= 1;

                file.arrayIndex = index;

                console.log(file);

                const upload = new tus.Upload(file, {

                    endpoint: '/tus/',

                    retryDelays: [0, 3000, 5000, 10000, 20000],

                    metadata: {

                        filename: `${uuidv4()}.${filename[filename.length - 1]}`,
                        filetype: file.type

                    },

                    chunkSize: 10000000,

                    headers: authHeader(),

                    onProgress: (bytesUploaded, bytesTotal) => {

                        let percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);

                        this.uploads[upload.file.arrayIndex].progress = percentage;

                    },

                    onError: (error) => {

                        console.log(error);

                    },

                    onSuccess: (res) => {

                        //alert('Uploaded!');

                        console.log(res);

                        //this.$emit('uploaded', res);

                    },

                });

                this.uploads[index].tusUpload = upload;

                upload.start();

            },

        }

    }

</script>