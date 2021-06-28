<template>
    
    <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
    >
        
        <v-card>
                
            <v-card-title>
                
                <span class="headline">Kopiuj link</span>

            </v-card-title>

            <v-card-text>

                <p>
                    Ustaw datę oraz godzinę wygaśnięcia linku. <strong>Uwaga, każdy posiadający ten link, będzie miał dostęp do tego pliku.</strong> Jeżeli ktoś nieuprawniony wszedł w posiadanie tego linku, skontaktuj się jak najszybciej z osobistym doradcą.
                </p>
                
                <v-form>
                    
                    <v-row>
                        
                        <v-col cols="6">

                            <v-menu
                                ref="dateMenu"
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >

                                <template v-slot:activator="{ on, attrs }">

                                    <v-text-field
                                        label="Data wygaśnięcia linku"
                                        v-model="date"
                                        prepend-icon="today"
                                        v-on="on"
                                        v-bind="attrs"
                                        readonly
                                        :disabled="indefinite"
                                    ></v-text-field>

                                </template>

                                <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                >
                                    
                                    <v-spacer></v-spacer>
                                    
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="dateMenu = false"
                                    >
                                        Zamknij
                                    </v-btn>
                                    
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dateMenu.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                
                                </v-date-picker>

                            </v-menu>

                        </v-col>

                        <v-col cols="6">

                            <v-menu
                                ref="timeMenu"
                                v-model="timeMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >

                                <template v-slot:activator="{ on, attrs }">
                            
                                    <v-text-field
                                        label="Godzina wygaśnięcia linku"
                                        prepend-icon="schedule"
                                        v-on="on"
                                        v-bind="attrs"
                                        readonly
                                        :disabled="indefinite"
                                        v-model="time"
                                    ></v-text-field>

                                </template>

                                <v-time-picker
                                    v-if="timeMenu"
                                    v-model="time"
                                    full-width
                                    @click:minute="$refs.timeMenu.save(time)"
                                    format="24hr"
                                ></v-time-picker>

                            </v-menu>

                        </v-col>

                        <v-col cols="12">
                            
                            <v-checkbox
                                label="Link bezterminowy"
                                v-model="indefinite"
                            ></v-checkbox>

                        </v-col>

                        <v-col cols="12"
                            v-if="signedUrl"
                        >
                            
                            <v-text-field
                                filled
                                readonly
                                v-model="signedUrl"
                                id="signedUrl"
                            >
                                
                                <template v-slot:append>

                                    <v-tooltip top>
                                        
                                        <template v-slot:activator="{ on, attrs }">

                                            <v-icon
                                                @click.prevent="onCopy"
                                                v-bind="attrs"
                                                v-on="on"
                                            >content_copy</v-icon>

                                        </template>

                                        <span>Kopiuj link</span>

                                    </v-tooltip>

                                </template>

                            </v-text-field>

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
                    @click="onGenerate"
                    :loading="loading"
                >
                    
                    Generuj link

                </v-btn>

            </v-card-actions>

        </v-card>

    </v-dialog>

</template>

<script>

    import AuthTokensClient from '../../clients/AuthTokensClient';
    
    export default {

        name: 'share-link',

        props: {

            file: {

                type: Object,
                required: true

            }

        },

        watch: {

            date: async function() {

                await this.onGenerate();

            },

            time: async function() {

                await this.onGenerate();

            },

            indefinite: async function() {

                await this.onGenerate();

            }

        },

        data: () => ({

            dialog: null,

            date: new Date().toISOString().substr(0, 10),

            dateMenu: false,

            indefinite: null,

            time: new Date().toISOString().substr(11, 5),

            timeMenu: false,

            signedUrl: null,

            loading: false,

            copied: false

        }),

        methods: {

            open() {

                this.dialog = true;

            },

            onClose() {

                this.indefinite = null;

                this.signedUrl = null;

                this.date = new Date().toISOString().substr(0, 10);

                this.time = new Date().toISOString().substr(11, 5);

                this.dialog = null;

            },

            onCopy() {

                if(!this.signedUrl) return;

                let input = document.getElementById('signedUrl');

                input.select();

                document.execCommand("copy");

                this.copied = true;

            },

            async onGenerate() {

                this.loading = true;

                const data = {

                    file: this.file['@id']

                };

                if(!this.indefinite) {

                    data.expiresAt = this.date + 'T' + this.time + ':00';

                }

                await AuthTokensClient.postItem({

                    data

                }).then((res) => {

                    this.signedUrl = res.data.signedUrl;

                }).catch(() => {

                    //alert('Nastąpił błąd podczas generowania linku.');

                    return;

                }).finally(() => {

                    this.loading = false;

                });

            }

        }

    }

</script>