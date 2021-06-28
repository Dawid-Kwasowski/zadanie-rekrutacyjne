<template>
    
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

</template>

<script>

    import axios from 'axios';

    import authHeader from '../../helpers/authHeader';
    
    export default {

        name: 'create',

        data: () => ({

            name: null,

            loading: false

        }),

        methods: {

            async onCreate() {

                this.loading = true;

                await axios.post('/api/folders', {

                    name: this.name

                }, {

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

                this.$emit('close');

            }

        }

    }

</script>