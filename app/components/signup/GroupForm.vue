<template>

    <div>
        <h2 class="text-lg">Voulez-vous créer un nouveau groupe ou rejoindre un groupe à partir d'un code d'invitation?
        </h2>
        <p class="text-sm italic">vous pouvez passer cette étape</p>

        <v-radio-group class="justify-items-center" inline v-model="haveAgroup">
            <v-radio label="Rejoinde" :value="1"></v-radio>
            <v-radio label="Créer un group" :value="2"></v-radio>
        </v-radio-group>

        <div v-if="haveAgroup === 1">
            <v-card>

                <h2 class="text-lg">Rejoindre un groupe </h2>
                <v-text-field v-model="joinCode" rounded elevated variant="solo-filled"
                    label="Entrez de code d'invitation"></v-text-field>
            </v-card>

        </div>
        <div v-else-if="haveAgroup === 2">
            <div class="flex justify-center ">

                <v-card class="  rounded-lg min-w-80">

                    <v-container>
                        <v-row class=" p-0">
                            <v-text-field v-model="groupName" variant="solo-filled" label="Nom de votre Groupe" rounded
                                outlined clearable required></v-text-field>
                        </v-row>
                        <v-row class="p-0">
                            <v-combobox v-model="groupType" label="Quelle type de groupe voulez-vous créer?"
                                :items="['Famille', 'Amis', 'Entreprise',]" variant="solo-filled"></v-combobox>
                        </v-row>


                    </v-container>
                </v-card>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    data: () => ({
        haveAgroup: 0,
        joinCode: "",
        groupName: "",
        groupType: "",
    }),
    computed: {
    },
    watch: {
        'groupName': function () {
            this.dataChanged()
        },
        'joinCode': function () {
            this.dataChanged()
        },
        'groupType': function () {
            this.dataChanged()
        }
    },
    methods: {
        dataChanged() {
            const data = {}
            if (this.haveAgroup === 2) {
                data.haveAgroup = false,
                    data.name = this.groupName,
                    data.type = this.groupType

            }
            else {
                data.haveAgroup = true,
                    data.joinCode = this.joinCode
            }

            console.log("🚀 ~ dataChanged ~ data:", data)
            this.$emit('group-data-changed', data)
        },
        test() {
            console.log("dede", this.groupType)
        }

    },
};

</script>
