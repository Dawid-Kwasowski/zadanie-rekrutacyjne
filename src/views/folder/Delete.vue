<template>
    
    <v-dialog
        v-model="dialog"
        persistent
        max-width="400"
    >
        
        <v-card>
            
            <v-card-title class="headline">
                Czy na pewno chcesz usunąć?
            </v-card-title>

            <v-card-text>
                {{ text }}
            </v-card-text>

            <v-card-actions>
                
                <v-spacer></v-spacer>

                <v-btn
                    color="error"
                    text
                    @click="dialog = null"
                >
                    Anuluj
                </v-btn>

                <v-btn
                    color="success"
                    text
                    @click="deletePermanently ? onDeletePermanently() : onDelete()"
                    :loading="loading"
                >
                    {{ deletePermanently ? 'Rozumiem, usuń' : 'Rozumiem, przenieś do kosza' }}
                </v-btn>

            </v-card-actions>

        </v-card>

    </v-dialog>

</template>

<script>

    import FoldersClient from '../../clients/FoldersClient';
    
    export default {

        name: 'delete',

        props: {

            folder: {
                type: Object,
                required: true
            }

        },

        data: () => ({

            dialog: null,

            loading: false,

            deletePermanently: false

        }),

        computed: {

            text: function() {

                return this.deletePermanently ? 'Folder oraz cała jego zawartość zostaną na stałe usunięte z naszych serwerów i nie będzie można w żaden sposób tych danych przywrócić.' : 'Folder zostanie przeniesiony do kosza, skąd będzie go można przywrócić lub permanentnie usunąć z naszych serwerów.';

            }

        },

        methods: {

            open(permanently = false) {

                this.dialog = true;

                this.deletePermanently = permanently;

            },

            async onDeletePermanently() {

                this.loading = true;

                await FoldersClient.deleteItemFromTrash({

                    params: {

                        uuid: this.folder.id

                    }

                }).then(() => {

                    this.dialog = null;

                    this.$emit('deleted', this.folder);

                }).finally(() => {

                    this.loading = false;

                });

            },

            async onDelete() {

                this.loading = true;

                await FoldersClient.deleteItem({

                    params: {

                        uuid: this.folder.id

                    }

                }).then((res) => {

                    console.log(res);

                    this.dialog = null;

                    this.$emit('deleted', this.folder);

                }).finally(() => {

                    this.loading = false;

                });

            }

        }

    }

</script>