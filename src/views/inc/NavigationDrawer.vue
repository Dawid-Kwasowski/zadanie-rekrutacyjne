<template>
    
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        v-if="!home"
        v-model="drawer"
        src="/images/background.jpg"
        dark
    >
        
        <v-list-item two-line v-if="$store.getters.authenticated"> 

            <v-list-item-avatar>
                
                <v-img
                    src="/images/team.jpg"
                ></v-img>
            
            </v-list-item-avatar>

            <v-list-item-content>
                
                <v-list-item-title>
                    {{ $store.state.user.email }}
                </v-list-item-title>
                
                <v-list-item-subtitle>Zalogowany</v-list-item-subtitle>
            
            </v-list-item-content>

        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            
            <v-list-item
                link
                :to="{ name: 'main_path' }"
                exact
            >

                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        Strona Główna
                    </v-list-item-title>
                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                exact
                :to="{ name: 'drive_path' }"
            >
                
                <v-list-item-action>
                    <v-icon>backup</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    
                    <v-list-item-title>
                        Mój dysk
                    </v-list-item-title>

                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                exact
                :to="{ name: 'bin_path' }"
            >
                
                <v-list-item-action>
                    <v-icon>delete</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    
                    <v-list-item-title>
                        Kosz
                    </v-list-item-title>

                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                exact
                :to="{ name: 'teams_path' }"
            >
                
                <v-list-item-action>
                    <v-icon>groups</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    
                    <v-list-item-title>
                        Zespoły
                    </v-list-item-title>

                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                exact
            >
                
                <v-list-item-action>
                    
                    <v-icon>account_circle</v-icon>

                </v-list-item-action>

                <v-list-item-content>
                    
                    <v-list-item-title>
                        Mój profil
                    </v-list-item-title>

                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                :to="{ name: 'main_path' }"
                exact
            >

                <v-list-item-action>
                    <v-icon>settings</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        Ustawienia
                    </v-list-item-title>
                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                exact
            >

                <v-list-item-action>
                    <v-icon>support_agent</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        Osobisty doradca
                    </v-list-item-title>
                </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                :to="{ name: 'main_path' }"
                exact
            >

                <v-list-item-action>
                    <v-icon>logout</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title>
                        Wyloguj
                    </v-list-item-title>
                </v-list-item-content>

            </v-list-item>

        </v-list>

        <v-divider></v-divider>

        <v-list-item three-line> 

            <v-list-item-avatar>
                
                <v-icon>storage</v-icon>
            
            </v-list-item-avatar>

            <v-list-item-content>
                
                <v-list-item-title>
                    Przestrzeń na dane
                </v-list-item-title>

                <v-list-item-subtitle>
                    
                    <v-progress-linear
                        :value="percentage"
                        color="white"
                    ></v-progress-linear>

                </v-list-item-subtitle>
                
                <v-list-item-subtitle>
                    Wykorzystano {{ limitExploited }} z {{ storageLimit }} ({{ percentage }}%)
                </v-list-item-subtitle>
            
            </v-list-item-content>

        </v-list-item>
    
    </v-navigation-drawer>

</template>

<script>

    const prettyBytes = require('pretty-bytes');
    
    export default {

        name: 'navigation-drawer',

        props: {

            home: {

                type: Boolean,
                required: true

            },

        },

        data: () => ({

            drawer: true

        }),

        computed: {

            storageLimit: {

                get: function() {

                    return prettyBytes(127800000);

                },

            },

            limitExploited: {

                get: function() {

                    return 0;

                },

                set: function(val) {

                    this.$currentUser.subscriptions[0].limitExploited = val;

                }

            },

            percentage() {

                return 0;

            }

        },

        mounted() {

            if(!this.$store.getters.authenticated){

                return;

            }

        }

    }

</script>