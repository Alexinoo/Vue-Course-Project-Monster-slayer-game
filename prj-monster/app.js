
function getRandomValue( min , max ){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({

    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound : 0,
            gameResults : null,
        }
    } ,

    computed:{
        monsterBarStyles(){
            if (this.monsterHealth < 0 ){
                return { width:  '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles(){

            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },

        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        },

    },

    // Add a watch property to monitor both playerHealth & monsterHealth
    watch : {
        playerHealth(value){
            // Check for draw
           
            if( value <= 0 && this.monsterHealth <= 0 ){
                //draw
                this.gameResults = 'Draw'
            }else if( value <= 0 ){
                //player lost
                this.gameResults = 'Monster'
            }

        },
        monsterHealth(value){

            // Check for Draw
            if (value <= 0 && this.playerHealth <= 0) {
                //draw
                this.gameResults = 'Draw'

            } else if (value <= 0) {
                //Monster lost
                this.gameResults = 'Player'
            }

        }
    },

    methods : {

        startGame(){
            this.playerHealth = 100
            this.monsterHealth  = 100
            this.currentRound  = 0
            this.gameResults =  null
        },

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
        },

        surrender(){

            this.gameResults = 'Monster'
        }

    },


})

app.mount('#game')