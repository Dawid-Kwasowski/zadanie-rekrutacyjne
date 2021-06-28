<template>
    
    <v-row>

        <v-col cols="2" v-if="!parentDir && !trash">
            
            <div class="text-center">
                
                <v-icon
                    x-large
                    color="red"
                    @dblclick="$router.push({ name: 'bin_path' })"
                    @click="trashClick"
                >
                    delete
                </v-icon>

                <h3 class="text-h6 font-weight-light">
                    Kosz
                </h3>

            </div>

        </v-col>

        <v-col
            cols="2"
            v-for="folder in folders"
            :key="folder.id"
        >

            <folder
                :folder="folder"
                v-on:deleted="onDeleted"
                v-on:restored="onRestored"
                :trash="trash"
                v-on:updated="onUpdated"
            ></folder>

        </v-col>

        <v-snackbar
            v-model="restored"
            top
            color="success"
            dark
        >
            
            <span class="text-subtitle-1">Folder został przywrócony.</span>

            <template v-slot:action="{ attrs }">

                <v-icon
                    v-bind="attrs"
                    @click="restored = null"
                >close</v-icon>

            </template>

        </v-snackbar>

    </v-row>
    
</template>

<script>

    //import FoldersClient from '../../clients/FoldersClient';

    //import authHeader from '../../helpers/authHeader';

    //import EditDialog from './Edit';

    //import DeleteDialog from './Delete';

    import Folder from './Item';
    
    export default {

        name: 'list',

        components: {

            //EditDialog,

            //DeleteDialog,

            Folder

        },

        props: {

            parentDir: {

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

            folders: [
                {
                    "@id": "/api/folders/e97d65ad-656c-4f1d-a8b2-a0b98fa47d83",
                    "@type": "Folder",
                    "name": "Przykładowy folder",
                    "files": [],
                    "id": "e97d65ad-656c-4f1d-a8b2-a0b98fa47d83",
                    "owner": "/api/users/e4ec958e-13ca-4f93-bc37-ca8558d668e0",
                    "parentDir": null,
                    "children": []
                },
                {
                    "@id": "/api/folders/7be41b79-babd-4f5e-86ef-9ad427d44648",
                    "@type": "Folder",
                    "name": "Folder 2",
                    "files": [],
                    "id": "7be41b79-babd-4f5e-86ef-9ad427d44648",
                    "owner": "/api/users/e4ec958e-13ca-4f93-bc37-ca8558d668e0",
                    "parentDir": null,
                    "children": []
                }
            ],

            menu: null,

            x: 0,

            y: 0,

            loading: true,

            selectedFolder: {},

            selected: null,

            restored: null

        }),

        methods: {

            async onLoad() {

                /*const requestBody = {

                    headers: authHeader(),

                    params: {

                        'exists[deletedAt]': true === this.trash ? true : false

                    }

                };*/

                const params = {

                    'exists[deletedAt]': true === this.trash ? true : false,

                    'exists[parentDir]': !this.parentDir ? false : true

                };

                if(this.parentDir) {

                    params['parentDir.uuid'] = this.parentDir.id;

                }

                this.loading = false;

                this.$emit('loaded');

                /*await FoldersClient.getCollection({

                    params

                }).then((res) => {

                    this.folders = res.data['hydra:member'];

                }).catch((err) => {

                    console.log(err);

                }).finally(() => {

                    this.loading = false;

                    this.$emit('loaded');

                });*/

            },

            showMenu(e, folder) {

                e.preventDefault();

                this.menu = false;
                
                this.x = e.clientX;
                
                this.y = e.clientY;
                
                this.$nextTick(() => {
                    
                    this.menu = true;

                    this.selectedFolder = folder;
                
                });

            },

            push(folder) {

                this.folders.push(folder);

            },

            onEdit() {

                this.menu = null;

                this.selected = null;

                this.$refs.editDialog.open();

            },

            onDelete() {

                this.menu = null;

                this.selected = null;

                this.$refs.deleteDialog.open();

            },

            onUpdated(folder) {

                const index = this.folders.findIndex((item) => {

                    return item.id === folder.id;

                });

                if(index === -1) return;

                this.folders.splice(index, 1, folder);

            },

            onDeleted(folder) {

                const index = this.folders.findIndex((item) => {

                    return item.id === folder.id;

                });

                if(index === -1) return;

                this.folders.splice(index, 1);

            },

            onRestored(folder) {

                const index = this.folders.findIndex((item) => {

                    return item.id === folder.id;

                });

                if(index === -1) return;

                this.folders.splice(index, 1);

                this.restored = true;

            },

            trashClick() {

                
                
            }

        },

        mounted() {

            this.onLoad();

        }

    }

</script>