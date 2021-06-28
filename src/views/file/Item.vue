<template>

    <div>
    
        <v-card
            class="mx-auto"
            @contextmenu="showMenu"
            @dblclick="show"
            @click.prevent=""
        >

            <v-img
                :src="previewImage"
                height="150px"
            ></v-img>

            <v-card-title
                class="text-subtitle-1 font-weight-light d-inline-block text-truncate"
                style="max-width: 100%;"
            >
                
                <v-icon class="mr-3" :color="icon.color" v-html="icon.icon"></v-icon>
                
                <span>{{ file.name }}</span>
            
            </v-card-title>

        </v-card>

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
            ref="editDialog"
            v-on:updated="onUpdated"
            :file="file"
        ></edit-dialog>

        <delete-dialog
            ref="deleteDialog"
            v-on:deleted="onDeleted"
            :file="file"
        ></delete-dialog>

        <share-link
            ref="shareLink"
            :file="file"
        ></share-link>

        <v-snackbar
            v-model="edited"
            top
            color="primary"
            dark
        >
            
            <span class="text-subtitle-1">Nazwa została zmieniona pomyślnie!</span>

            <template v-slot:action="{ attrs }">

                <v-icon
                    v-bind="attrs"
                    @click="edited = null"
                >close</v-icon>

            </template>

        </v-snackbar>

        <preview-dialog
            :file="file"
            ref="previewDialog"
        ></preview-dialog>

    </div>

</template>

<script>

    import EditDialog from './Edit';

    import DeleteDialog from './Delete';

    import PreviewDialog from './Preview';

    import ShareLink from './ShareLink';

    import iconsHelper from '../../helpers/iconsHelper';

    import FileObjectsClient from '../../clients/FileObjectsClient';
    
    export default {

        name: 'item',

        components: {

            EditDialog,

            DeleteDialog,

            PreviewDialog,

            ShareLink

        },

        props: {

            file: {

                type: Object,

                required: true,

            },

            trash: {

                type: Boolean,

                required: false,

                default: false

            }

        },

        data: () => ({

            menu: null,

            x: 0,

            y: 0,

            selected: null,

            edited: null,

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
                            name: 'Udostępnij zespołowi',
                            icon: 'share',
                            color: 'light-blue'
                        },
                        {
                            name: 'Podgląd',
                            icon: 'preview',
                            method: 'show'
                        },
                        {
                            name: 'Zmień nazwę',
                            icon: 'mode_edit',
                            method: 'onEdit'
                        },
                        {
                            name: 'Pobierz',
                            icon: 'file_download',
                            method: 'onDownload'
                        },
                        {
                            name: 'Szczegóły',
                            icon: 'details'
                        },
                        {
                            name: 'Kopiuj link',
                            icon: 'content_copy',
                            method: 'onShareLink'
                        },
                        {
                            name: 'Wyślij',
                            icon: 'send_to_mobile'
                        },
                        {
                            name: 'Usuń',
                            icon: 'delete',
                            color: 'error',
                            method: 'onDelete'
                        },
                    ];

                }

            },

            previewImage: function() {

                if(this.file.previewImage) {

                    return this.file.previewImage.url;

                }else {

                    return '/images/file-empty-icon.png';

                }

            },

            icon: function() {

                const mimeType = this.file.mimeType;

                return iconsHelper.resolveIcon(mimeType);

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

            onEdit() {

                this.$refs.editDialog.open();

            },

            onUpdated(file) {

                this.$emit('updated', file);

                this.edited = true;

            },

            show() {

                if(this.trash) return;

                this.$refs.previewDialog.open();

            },

            onDownload() {

                window.open(this.file.downloadUrl);

            },

            onDelete() {

                this.$refs.deleteDialog.open();

            },

            onDeletePermanently() {

                this.$refs.deleteDialog.open(true);

            },

            onDeleted(file) {

                this.$emit('deleted', file);

            },

            handleMethod(method) {

                this[method]();

            },

            onShareLink() {

                this.$refs.shareLink.open();

            },

            async onRestoreFromTrash() {

                await FileObjectsClient.restoreItemFromTrash({

                    params: {

                        uuid: this.file.id

                    },

                    data: {}

                }).then((res) => {

                    console.log(res);

                    this.$emit('restored', this.file)

                }).catch((err) => {

                    console.log(err);

                });

            }

        },

    }

</script>