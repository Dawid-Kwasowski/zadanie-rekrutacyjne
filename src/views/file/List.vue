<template>

    <div>
    
        <v-row
            class="mt-5"
            v-if="!loading || files.length"
        >

            <v-col
                cols="2"
                v-for="file in files"
                :key="file.id"
            >

                <file-object
                    :file="file"
                    v-on:deleted="onDeleted"
                    v-on:restored="onRestored"
                    v-on:updated="onUpdated"
                    :trash="trash"
                ></file-object>

            </v-col>

            <!--<v-col cols="12" v-if="!loading && !files.length && trash">
                
                <v-alert
                    border="top"
                    colored-border
                    type="info"
                    elevation="2"
                >
                    Kosz jest pusty. Pojawią się tutaj wszystkie tymczasowo usunięte pliki.
                </v-alert>

            </v-col>!-->

        </v-row>

        <scroll-loader
            :loader-method="loadMore"
            :loader-disable="disable"
        ></scroll-loader>

        <v-snackbar
            v-model="deleted"
            top
            color="success"
            dark
        >
            
            <span class="text-subtitle-1">Plik został usunięty.</span>

            <template v-slot:action="{ attrs }">

                <v-icon
                    v-bind="attrs"
                    @click="deleted = null"
                >close</v-icon>

            </template>

        </v-snackbar>

        <v-snackbar
            v-model="restored"
            top
            color="success"
            dark
        >
            
            <span class="text-subtitle-1">Plik został przywrócony.</span>

            <template v-slot:action="{ attrs }">

                <v-icon
                    v-bind="attrs"
                    @click="restored = null"
                >close</v-icon>

            </template>

        </v-snackbar>

    </div>

</template>

<script>

    //import axios from 'axios';

    //import authHeader from '../../helpers/authHeader';

    import FileObject from './Item';

    //import FileObjectsClient from '../../clients/FileObjectsClient';
    
    export default {

        name: 'list',

        components: {

            FileObject

        },

        props: {

            currentDir: {

                type: Object,
                required: false

            },

            trash: {

                type: Boolean,
                required: false,
                default: false

            }

        },

        data: () => ({

            files: [
                {

                    "@id": "/api/file_objects/c8f75e02-ad14-4f72-acf1-39547ce40c58",
                    "@type": "FileObject",
                    "filename": "60aba01ee59bd709930531.pdf",
                    "folder": null,
                    "id": "c8f75e02-ad14-4f72-acf1-39547ce40c58",
                    "name": "przykladwy.pdf",
                    "owner": "/api/users/e4ec958e-13ca-4f93-bc37-ca8558d668e0",
                    "mimeType": "application/pdf",
                    "url": "/api/files/01-zusammenfassung-60aba01ee59bd709930531.pdf/preview?exp=1623450524&sig=7bee2b9a01ca46a476d50053803f01980936237e9c8bc0d10bcf37ce090d2ae0",
                    "downloadUrl": "/api/files/01-zusammenfassung-60aba01ee59bd709930531.pdf/download?exp=1623450524&sig=befea6abe7915f9d19de8b05e93011787b00ceedbe9cec596a9fb88cf332a4c1",

                },
                {
                    "@id": "/api/file_objects/5816ffc6-ddf0-4f48-b4bf-5a905fb027c5",
                    "@type": "FileObject",
                    "filename": "01-zusammenfassung-3-60aba02a18abd516460206.pdf",
                    "folder": null,
                    "id": "5816ffc6-ddf0-4f48-b4bf-5a905fb027c5",
                    "name": "01-Zusammenfassung (3).pdf",
                    "owner": "/api/users/e4ec958e-13ca-4f93-bc37-ca8558d668e0",
                    "mimeType": "application/pdf",
                    "url": "/api/files/01-zusammenfassung-3-60aba02a18abd516460206.pdf/preview?exp=1623451306&sig=4a7202a25e8230d6f6b799a49b459f51b3a15c85ccae684014bbc450a35cfd5b",
                    "downloadUrl": "/api/files/01-zusammenfassung-3-60aba02a18abd516460206.pdf/download?exp=1623451306&sig=8d00aed148027ee403d2576ee0eb0da419be1b6727d0fa6591138c49844ee8ab",
                    "previewImage": {
                        "@id": "/api/preview_images/d398015e-e013-4f67-8d6c-ce811e3421c0",
                        "@type": "PreviewImage",
                        "id": "d398015e-e013-4f67-8d6c-ce811e3421c0",
                        "url": "/images/example_pdf.jpg"
                    },
                    "deletedAt": null
                }
            ],

            page: 1,

            maxPageCount: 1,

            loading: true,

            deleted: null,

            restored: null

        }),

        computed: {

            disable: function() {

                return this.page >= this.maxPageCount;

            }

        },

        methods: {

            async onLoad() {

                const params = {

                    'order[updatedAt]': 'desc',

                    page: this.page,

                    'exists[deletedAt]': this.trash === true ? true : false

                };

                if(!this.currentDir && !this.trash) {

                    params['exists[folder]'] = false;

                }else if(this.currentDir && !this.trash) {

                    params['folder.uuid'] = this.currentDir.id;

                }

                this.loading = false;

                this.$emit('loaded');

                /*await FileObjectsClient.getCollection({

                    params

                }).then((res) => {

                    this.maxPageCount = Math.ceil(res.data['hydra:totalItems'] / 30);

                    const files = res.data['hydra:member'];

                    files.forEach((file) => {

                        this.files.push(file);

                    });

                }).catch((err) => {

                    console.log(err);

                }).finally(() => {

                    this.loading = false;

                    this.$emit('loaded');

                });*/

            },

            async loadMore() {

                this.page += 1;

                await this.onLoad();

            },

            unshift(file) {

                this.files.unshift(file);

            },

            onDeleted(file) {

                const index = this.files.findIndex((item) => {

                    return item.id === file.id;

                });

                if(index === -1) return;

                this.files.splice(index, 1);

                this.deleted = true;

            },

            onRestored(file) {

                const index = this.files.findIndex((item) => {

                    return item.id === file.id;

                });

                if(index === -1) return;

                this.files.splice(index, 1);

                this.restored = true;

            },

            onUpdated(file) {

                const index = this.files.findIndex((item) => {

                    return item.id === file.id;

                });

                if(index === -1) return;

                this.files.splice(index, 1, file);

            }

        },

        mounted() {

            this.onLoad();

        }

    }

</script>