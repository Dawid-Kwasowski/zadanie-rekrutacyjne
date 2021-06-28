<template>
    
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="secondary"
        dark
        app
        v-if="!home"
    >
        
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

        <v-toolbar-title
            class="ml-0 pl-4 mr-5 pr-5"
            @click="$router.push({ name: 'main_path' })"
        >

            DSM Cloud

        </v-toolbar-title>

        <!--<v-spacer></v-spacer>!-->

        <v-autocomplete
            rounded
            prepend-inner-icon="search"
            v-model="select"
            :items="files"
            :loading="searching"
            :search-input.sync="search"
            hide-no-data
            solo
            dense
            single-line
            clearable
            label="Szukaj na dysku"
            hide-details
            style="max-width: 460px;"
            return-object
            item-text="name"
            @input="onInput"
        >
            
            <template v-slot:item="data">

                <v-list-item-avatar :rounded="false">
                    <img :src="data.item.previewImage.url">
                </v-list-item-avatar>
                
                <v-list-item-content>
                    
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                
                </v-list-item-content>

                <v-list-item-icon>
                    
                    <v-icon :color="data.item.icon.color" v-html="data.item.icon.icon"></v-icon>
                
                </v-list-item-icon>

            </template>

        </v-autocomplete>

        <v-spacer></v-spacer>

        <v-icon
            @click="$router.push({ name: 'main_path' })"
        >logout</v-icon>

    </v-app-bar>

</template>

<script>
    
    export default {

        name: 'app-bar',

        props: {

            home: {

                type: Boolean,
                required: true

            },

        },

        data: () => ({

            select: null,

            files: [],

            searching: false,

            search: null,

            drawer: true

        }),

        watch: {

            search: function(val) {

                if(val && !this.loading && !this.select) this.onSearch();

            },

            drawer: function(val) {

                this.$emit('drawer', val);

            }

        },

        methods: {

            async onSearch() {

                return;

            },

            onInput() {

                if(this.select) {

                    const route = this.select.folder ? {

                        name: 'folder_path',

                        params: {

                            id: this.select.folder.id

                        }

                    } : {

                        name: 'drive_path'

                    };

                    this.$router.push(route).catch(() => {

                        //

                    });

                    this.select = null;

                }

                console.log(this.select);

            }

        }

    }

</script>