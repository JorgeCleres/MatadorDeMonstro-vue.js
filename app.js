new Vue ({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
/* verificando se a vida do jogador ou do monstro é igual a 0
            para ver quem venceu */
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.log = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 12, especial,'jogador', 'monstro', 'player')
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12, false, 'monstro', 'jogador', 'monster')
            }
        },

        hurt(atr, min, max, especial, source, target, cls){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
        },

        healAndHurt(){
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'jogador', 'monster')
        },

        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`jogador ganhor força de ${heal},`, 'player  ')
        },

        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            console.log(this.value)
            return Math.round(value)  
        },
        registerLog(text, cls) {
            //unshift = coloca a primeiro elemento do array no inicio da lista
            this.logs.unshift({text, cls})
        }
    },
    watch: {
        hasResult(value) {
            if(value) this.running = false
        }
    }
})