<template>
    
    <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
    >
        
        <template v-slot:activator="{ on, attrs }">

            <v-btn
                depressed
                color="success"
                @click="dialog = true"
                v-on="on"
                v-bind="attrs"
            >

                <v-icon left>
                    create_new_folder
                </v-icon>
                
                Dodaj folder
            
            </v-btn>

        </template>

        <v-card>
                
            <v-card-title>
                
                <span class="headline">Dodaj folder</span>

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
                    @click="onCreate"
                    :loading="loading"
                >
                    
                    Dodaj

                </v-btn>

            </v-card-actions>

        </v-card>

    </v-dialog>

</template>

<script>

    import axios from 'axios';

    import authHeader from '../../helpers/authHeader';
    
    export default {

        name: 'new',

        props: {

            parentDir: {

                type: Object,
                required: false

            }

        },

        data: () => ({

            name: null,

            loading: false,

            dialog: null

        }),

        methods: {

            async onCreate() {

                this.loading = true;

                const data = {

                    name: this.name,

                    //owner: this.$currentUser['@id']
                    owner: this.$store.state.user['@id']

                };

                if(this.parentDir) {

                    data.parentDir = this.parentDir['@id'];

                }

                await axios.post('/api/folders', data,
                {

                    headers: authHeader()

                }).then((res) => {

                    console.log(res);

                    this.$emit('created', res.data);

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