
function getRandomValue( min , max ){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({

    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound : 0,
        }
    } ,

    computed:{
        monsterBarStyles(){
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles(){
            return { width: this.playerHealth + '%' }
        },

        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        },

    },

    methods : {

        attackMonster(){
            this.currentRound++
            const attackValue = getRandomValue(5 , 12)
            this.monsterHealth -= attackValue
            //longhand: this.monsterHealth = this.monsterHealth - attackValue
            // Monster to attack Player
            this.attackPlayer()
        },

        attackPlayer() {

            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
        },

        // We can only do it with 3 rounds
        specialAttackMonster(){
            this.currentRound++
            const attackValue = getRandomValue(10,25)
            this.monsterHealth  -= attackValue
            this.attackPlayer()
        } ,

        healPlayer(){
            this.currentRound++
            const healValue = getRandomValue(8,20)
            // We should not heal ourelves more than a 100
            if (this.playerHealth + healValue > 100 ){
                this.playerHealth = 100
            }else{

                this.playerHealth += healValue
            }
            this.attackPlayer()
        }

    },


})

app.mount('#game')