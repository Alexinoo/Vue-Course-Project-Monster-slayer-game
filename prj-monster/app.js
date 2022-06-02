
function getRandomValue( min , max ){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({

    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
        }
    } ,

    computed:{},

    methods : {

        attackMonster(){

            const attackValue = getRandomValue(5 , 12)
            this.monsterHealth = this.monsterHealth - attackValue
            //shorthand: this.monsterHealth -= attackValue
            // Monster to attack Player
            this.attackPlayer()
        },

        attackPlayer() {

            const attackValue = getRandomValue(8, 15)
            this.playerHealth = this.playerHealth - attackValue
        },

    },


})

app.mount('#game')