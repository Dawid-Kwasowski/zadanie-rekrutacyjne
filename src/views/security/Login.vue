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
                        
                        <v-toolbar-title>Zaloguj się</v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text>
                        
                        <v-form
                            v-model="valid"
                            ref="form"
                            lazy-validation
                            v-on:submit.prevent="onLogin"
                        >
                            
                            <v-text-field
                                label="Email"
                                name="login"
                                prepend-icon="mdi-account"
                                type="text"
                                v-model="email"
                                :rules="rules.email"
                            ></v-text-field>
          
                            <v-text-field
                                id="password"
                                label="Hasło"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                                :rules="rules.password"
                            ></v-text-field>
                        
                        </v-form>

                        <router-link
                            :to="{ name: 'restore_password_request_path' }"
                            class="text-decoration-none body-1"
                        >Zapomniałeś hasła?</router-link>
                    
                    </v-card-text>

                    <v-card-actions>
                        
                        <v-spacer></v-spacer>
                        
                        <v-btn
                            color="primary"
                            @click="onLogin"
                            :loading="loading"
                        >

                            Zaloguj

                            <v-icon right>login</v-icon>

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

        name: 'login',

        data: () => ({

            email: null,

            password: null,

            loading: false,

            rules: {

                email: [
                    v => !!v || 'Proszę podać email.'
                ],

                password: [
                    v => !!v || 'Proszę podać hasło.'
                ]

            },

            valid: true

        }),

        methods: {

            async onLogin() {

                if(!this.$refs.form.validate()) return;

                this.loading = true;

                axios.post('/api/login_check', {

                    username: this.email,

                    password: this.password

                }).then((res) => {

                    localStorage.setItem('jwt', JSON.stringify(res.data));

                    this.$store.dispatch('refreshUser');

                    this.$router.push("/");

                }).catch((err) => {

                    console.log(err);

                    alert('Bad credentials!');

                }).finally(() => {

                    this.loading = false;

                });

            }

        }

    }

</script>