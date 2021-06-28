<template>
    
    <div class="text-center">

        <v-icon
            x-large
            color="primary"
            @click.prevent=""
            @dblclick="trash ? '' : $router.push({ name: 'folder_path', params: {'id': folder.id} })"
            @contextmenu="showMenu($event, folder)"
        >mdi-folder</v-icon>

        <h3 class="text-h6 font-weight-light">
            {{ folder.name }}
        </h3>

        <v-menu
            transition="scale-transition"
            :close-on-content-click="false"
            v-model="menu"
            :position-x="x"
            :position-y="y"
        >

            <v-card width="300">

                <v-list dense>

                    <v-subheader>Więcej</v-subheader>

                    <v-list-item-group
                        color="primary"
                        v-model="selected"
                    >

                        <v-list-item
                            v-for="item in items"
                            :key="item.name"
                            @click="handleMethod(item.method)"
                        >
                            
                            <v-list-item-icon>
                                
                                <v-icon
                                    v-html="item.icon"
                                    :color="item.color ? item.color : ''"
                                ></v-icon>

                            </v-list-item-icon>

                            <v-list-item-content>
                                
                                <v-list-item-title>
                                    {{ item.name }}
                                </v-list-item-title>

                            </v-list-item-content>

                        </v-list-item>

                    </v-list-item-group>

                </v-list>

            </v-card>

        </v-menu>

        <edit-dialog
            :folder="folder"
            ref="editDialog"
            v-on:updated="onUpdated"
        ></edit-dialog>

        <delete-dialog
            :folder="folder"
            ref="deleteDialog"
            v-on:deleted="onDeleted"
        ></delete-dialog>

    </div>

</template>

<script>

    import EditDialog from './Edit';

    import DeleteDialog from './Delete';

    import FoldersClient from '../../clients/FoldersClient';
    
    export default {

        components: {

            EditDialog,

            DeleteDialog

        },

        props: {

            folder: {

                type: Object,

                required: true

            },

            trash: {

                type: Boolean,

                required: false,

                default: true

            }

        },

        data: () => ({

            menu: null,

            x: 0,

            y: 0,

            selected: null,

        }),

        computed: {

            items: function() {

                if(true === this.trash) {

                    return [
                        {
                            name: 'Przywróc',
                            icon: 'restore_from_trash',
                            method: 'onRestoreFromTrash',
                            color: 'primary'
                        },
                        {
                            name: 'Usuń na stałe',
                            icon: 'delete',
                            color: 'error',
                            method: 'onDeletePermanently'
                        }
                    ];

                } else {

                    return [
                        {
                            name: 'Zmień nazwę',
                            icon: 'mode_edit',
                            method: 'onEdit'
                        },
                        {
                            name: 'Pobierz folder',
                            icon: 'file_download'
                        },
                        {
                            name: 'Szczegóły',
                            icon: 'details'
                        },
                        {
                            name: 'Udostępnij zespołowi',
                            icon: 'share',
                            color: 'light-blue'
                        },
                        {
                            name: 'Kopiuj link',
                            icon: 'content_copy'
                        },
                        {
                            name: 'Wyślij',
                            icon: 'send_to_mobile'
                        },
                        {
                            name: 'Usuń folder',
                            icon: 'delete',
                            color: 'error',
                            method: 'onDelete'
                        },
                    ];

                }

            }

        },

        methods: {

            showMenu(e) {

                e.preventDefault();

                this.menu = false;
                
                this.x = e.clientX;
                
                this.y = e.clientY;
                
                this.$nextTick(() => {
                    
                    this.menu = true;
                
                });

            },

            handleMethod(method) {

                this[method]();

            },

            onEdit() {

                this.selected = null;

                this.menu = null;

                this.$refs.editDialog.open();

            },

            onUpdated(folder) {

                this.$emit('updated', folder);

            },

            onDelete() {

                this.selected = null;

                this.menu = null;

                this.$refs.deleteDialog.open();

            },

            onDeletePermanently() {

                this.$refs.deleteDialog.open(true);

            },

            onDeleted() {

                this.$emit('deleted', this.folder);

            },

            async onRestoreFromTrash() {

                await FoldersClient.restoreItemFromTrash({

                    params: {

                        uuid: this.folder.id

                    },

                    data: {}

                }).then((res) => {

                    this.$emit('restored', res.data);

                }).catch((err) => {

                    console.log(err);

                });

            }

        }

    }

</script>