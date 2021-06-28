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

    import FileObjectsClient from '../../clients/FileObjectsClient';
    
    export default {

        name: 'delete',

        props: {

            file: {
                type: Object,
                required: true
            },

        },

        data: () => ({

            dialog: null,

            loading: false,

            deletePermanently: null

        }),

        computed: {

            text: function() {

                return this.deletePermanently ? 'Plik zostanie na stałe usunięty z naszych serwerów i nie będzie można w żaden sposób przywrócić.' : 'Plik zostanie przeniesiony do kosza, skąd będzie można go przywrócić lub permanentnie usunąć z naszych serwerów.';

            }

        },

        methods: {

            open(permanently = false) {

                this.deletePermanently = permanently;

                this.dialog = true;

            },

            async onDelete() {

                this.loading = true;

                await FileObjectsClient.deleteItem({

                    params: {

                        uuid: this.file.id

                    }

                }).then((res) => {

                    console.log(res);

                    this.dialog = null;

                    this.$emit('deleted', this.file);

                }).finally(() => {

                    this.loading = false;

                });

            },

            async onDeletePermanently() {

                this.loading = true;

                await FileObjectsClient.deleteItemFromTrash({

                    params: {

                        uuid: this.file.id

                    }

                }).then(() => {

                    this.dialog = null;

                    this.$emit('deleted', this.file)

                }).finally(() => {

                    this.loading = false;

                });

            }

        }


    }

</script>