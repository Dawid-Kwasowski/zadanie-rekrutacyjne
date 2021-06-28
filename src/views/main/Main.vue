<template>

    <v-container fill-height>
    
        <v-row>

            <v-col cols="2"></v-col>
            
            <v-col cols="3">

                <v-speed-dial
                    v-model="drive"
                    :open-on-hover="true"
                    :transition="'slide-y-reverse-transition'"
                >

                    <template v-slot:activator>
                
                        <v-card
                            :class="`d-flex align-center ${drive ? 'hovered' : 'default'}`"
                            height="360"
                            @click="$router.push({ name: 'drive_path' })"
                        >

                            <v-img
                                height="360"
                                src="/images/drive.jpg"
                            ></v-img>

                        </v-card>

                    </template>

                    <h2 class="display-3 font-weight-light text-center" style="color: #F5F5F5;">
                        Mój dysk
                    </h2>

                </v-speed-dial>

            </v-col>

            <v-col cols="2"></v-col>

            <v-col cols="3">

                <v-speed-dial
                    v-model="team"
                    :open-on-hover="true"
                    :transition="'slide-y-reverse-transition'"
                >

                    <template v-slot:activator>
                
                        <v-card
                            :class="`d-flex align-center ${team ? 'hovered' : 'default'}`"
                            height="360"
                            @click="$router.push({ name: 'teams_path' })"
                        >

                            <v-img
                                height="360"
                                src="/images/team.jpg"
                            ></v-img>

                        </v-card>

                    </template>

                    <h2 class="display-3 font-weight-light text-center" style="color: #F5F5F5;">
                        Zespoły
                    </h2>

                </v-speed-dial>

            </v-col>

            <v-col cols="2"></v-col>

        </v-row>

    </v-container>

</template>

<script>
    
    export default {

        data: () => ({

            drive: false,

            team: false

        }),

        methods: {

            test() {

                alert('Clicked!');

            }

        },

    }

</script>

<style type="text/css" scoped>
    
    .hovered {

        opacity: 1;
        cursor: pointer;

    }

    .default {

        opacity: 0.7;

    }

</style>