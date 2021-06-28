<template>
    
    <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
    >

        <v-card>
                
            <v-card-title>
                
                <span class="headline">Zmień nazwę</span>

            </v-card-title>

            <v-card-text>
                
                <v-form>
                    
                    <v-row>
                        
                        <v-col cols="12">
                            
                            <v-text-field
                                label="Nazwa folderu"
                                required
                                prepend-icon="folder"
                                v-model="name"
                            ></v-text-field>

                        </v-col>

                    </v-row>

                </v-form>

            </v-card-text>

            <v-card-actions>
                
                <v-spacer></v-spacer>

                <v-btn
                    text
                    color="red"
                    dark
                    @click="onClose"
                >
                    
                    Zamknij

                </v-btn>

                <v-btn
                    text
                    color="success"
                    dark
                    @click="onUpdate"
                    :loading="loading"
                >
                    
                    Zapisz

                </v-btn>

            </v-card-actions>

        </v-card>

    </v-dialog>

</template>

<script>

    import FoldersClient from '../../clients/FoldersClient';
    
    export default {

        name: 'new',

        props: {

            folder: {

                type: Object,
                required: true

            },

        },

        data: () => ({

            name: null,

            loading: false,

            dialog: null

        }),

        methods: {

            open() {

                this.name = this.folder.name;

                this.dialog = true;

            },

            async onUpdate() {

                this.loading = true;

                const data = {

                    name: this.name

                };

                await FoldersClient.putItem({

                    params: {
                        uuid: this.folder.id
                    },

                    data

                }).then((res) => {

                    console.log(res);

                    this.$emit('updated', res.data);

                    this.onClose();

                }).catch((err) => {

                    console.log(err);

                }).finally(() => {

                    this.loading = false;

                });

            },

            onClose() {

                this.name = null;

                this.dialog = null;

                this.$emit('close');

            }

        }

    }

</script>