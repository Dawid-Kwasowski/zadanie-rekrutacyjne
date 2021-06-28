<template>
    
    <v-container fluid> 

        <v-overlay :value="!loaded">
        
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        
        </v-overlay>
        
        <h1 class="display-1 pa-4 dark">
            Kosz
        </h1>

        <v-breadcrumbs :items="items"></v-breadcrumbs>

        <v-divider></v-divider>

        <v-row class="mt-3">
            
            <v-col cols="12">

                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="500"
                >

                    <template v-slot:activator="{ on, attrs }">
                
                        <v-btn
                            depressed
                            color="red"
                            dark
                            v-on="on"
                            v-bind="attrs"
                        >

                            <v-icon left>
                                delete_forever
                            </v-icon>
                            
                            Opróżnij kosz
                        
                        </v-btn>

                    </template>

                    <v-card>
            
                        <v-card-title class="headline">
                            Czy na pewno chcesz opróżnić kosz?
                        </v-card-title>

                        <v-card-text>
                            Wszystkie pliki i foldery znajdujące się w koszu, zostaną na stałe usunięte z naszych serwerów i w żaden sposób nie będzie można ich potem przywrócić.
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
                                @click="clearTrash"
                                :loading="clearing"
                            >
                                Rozumiem, opróżnij kosz
                            </v-btn>

                        </v-card-actions>

                    </v-card>

                </v-dialog>

            </v-col>

        </v-row>

        <folders
            ref="folders"
            :parent-dir="currentDir"
            v-on:loaded="foldersLoaded = true"
            trash
        ></folders>

        <files
            ref="files"
            :current-dir="currentDir"
            v-on:loaded="filesLoaded = true"
            trash
        ></files>

        <v-snackbar
            v-model="cleared"
            top
            color="success"
            dark
        >
            
            <span class="text-subtitle-1">Kosz został opróżniony.</span>

            <template v-slot:action="{ attrs }">

                <v-icon
                    v-bind="attrs"
                    @click="cleared = null"
                >close</v-icon>

            </template>

        </v-snackbar>

    </v-container>

</template>

<script>

    import Folders from '../folder/List';

    import Files from '../file/List';

    import axios from 'axios';

    import authHeader from '../../helpers/authHeader';

    import authorizationException from '../../helpers/authorizationException';
    
    export default {

        components: {

            Folders,

            Files

        },

        data: () => ({

            items: [
                {
                    text: 'Dysk',
                    disabled: false,
                    href: '/#/dysk'
                },
                {
                    text: 'Kosz',
                    disabled: false
                }
            ],

            filesLoaded: false,

            foldersLoaded: false,

            currentDir: null,

            clearing: false,

            dialog: null,

            cleared: null

        }),

        computed: {

            loaded: function() {

                return true === this.filesLoaded && true === this.foldersLoaded;

            },

        },

        methods: {

            async clearTrash() {

                this.clearing = true;

                await axios.delete('/api/clear-trash',
                    {
                        headers: authHeader()
                    }
                ).then((res) => {

                    console.log(res);

                    this.$refs.files.files = [];

                    this.$refs.folders.folders = [];

                    this.cleared = true;

                }).catch((err) => {

                    authorizationException(err.response);

                }).finally(() => {

                    this.clearing = false;

                    this.dialog = null;

                });

            }

        }

    }

</script>