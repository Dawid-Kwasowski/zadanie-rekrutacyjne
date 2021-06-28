<template>
    
    <v-container fill-height>

        <v-row
            align="center"
            justify="center"
        >

            <v-col>
        
                <v-card class="elevation-12 mx-auto" max-width="500">
                    
                    <v-toolbar
                        color="secondary"
                        dark
                        flat
                    >
                        
                        <v-toolbar-title>Przywróc hasło</v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text>
                        
                        <v-form
                            v-model="valid"
                            ref="form"
                            lazy-validation
                        >
                            
                            <v-text-field
                                label="Email"
                                name="login"
                                prepend-icon="mdi-account"
                                type="text"
                                v-model="email"
                                :rules="rules.email"
                            ></v-text-field>

                            <router-link
                                :to="{ name: 'login_path' }"
                                class="text-decoration-none body-1"
                            >Zaloguj się!</router-link>

                        </v-form>

                    </v-card-text>

                    <v-card-actions>
                        
                        <v-spacer></v-spacer>
                        
                        <v-btn
                            color="primary"
                            @click="onReset"
                            :loading="loading"
                        >

                            Zresetuj hasło

                            <v-icon right>restore</v-icon>

                        </v-btn>
                    
                    </v-card-actions>

                </v-card>

            </v-col>

        </v-row>

    </v-container>

</template>

<script>

    import axios from 'axios';
    
    export default {

        name: 'request',

        data: () => ({

            email: null,

            loading: false,

            rules: {

                email: [
                    v => !!v || 'Proszę podać email.'
                ],

            },

            valid: true

        }),

        methods: {

            async onReset() {

                console.log('Reset!');

                this.loading = true;

                await axios.post('/api/reset-password', {

                    email: this.email

                }).then((res) => {

                    console.log(res);

                    //Changed

                }).catch((err) => {

                    console.log(err);

                }).finally(() => {

                    this.loading = false;

                });

            }

        }

    }

</script>