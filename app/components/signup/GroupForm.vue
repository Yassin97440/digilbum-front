<template>
    <div class="space-y-8 max-w-md mx-auto">
        <div class="text-center space-y-4">
            <h2
                class="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Configuration du groupe
            </h2>
            <p class="text-sm text-white/70">
                Vous pouvez créer un nouveau groupe ou rejoindre un groupe existant
            </p>
        </div>

        <v-radio-group v-model="haveAgroup" class="flex justify-center gap-6 py-4" inline>
            <v-radio label="Rejoindre un groupe" :value="1" color="orange-accent-3"
                class="transition-all duration-300 hover:opacity-80">
            </v-radio>
            <v-radio label="Créer un groupe" :value="2" color="orange-accent-3"
                class="transition-all duration-300 hover:opacity-80">
            </v-radio>
        </v-radio-group>

        <div v-if="haveAgroup === 1" class="space-y-6">
            <v-card class="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 class="text-xl font-medium mb-4 text-orange-400">Rejoindre un groupe</h3>
                <v-text-field v-model="joinCode" label="Code d'invitation" placeholder="Entrez le code d'invitation"
                    variant="outlined" density="comfortable" class="bg-white/5 border-white/20 rounded-xl transition-all duration-300
                 hover:bg-white/10 hover:border-white/30" prepend-icon="mdi-ticket-account">
                </v-text-field>
            </v-card>
        </div>

        <div v-else-if="haveAgroup === 2" class="space-y-6">
            <v-card class="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 class="text-xl font-medium mb-4 text-orange-400">Créer un groupe</h3>

                <div class="space-y-4">
                    <v-text-field v-model="groupName" label="Nom du groupe" placeholder="Donnez un nom à votre groupe"
                        variant="outlined" density="comfortable" class="bg-white/5 border-white/20 rounded-xl transition-all duration-300
                   hover:bg-white/10 hover:border-white/30" prepend-icon="mdi-account-group">
                    </v-text-field>

                    <v-combobox v-model="groupType" label="Type de groupe" :items="['Famille', 'Amis', 'Entreprise']"
                        variant="outlined" density="comfortable" class="bg-white/5 border-white/20 rounded-xl transition-all duration-300
                   hover:bg-white/10 hover:border-white/30" prepend-icon="mdi-shape">
                    </v-combobox>
                </div>
            </v-card>
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
