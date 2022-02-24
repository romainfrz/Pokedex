const app = Vue.createApp({
    data() {
        return {
            pokemonDisplayed: [{}],
            numbers: 1126,
            numberByPage: 40,
            page: 1,
            infos: {},
            id: 0,
            searchById: '',
            searchByName: '',
            isClicked: false,
            AllTypes: [{}]
        }
    },
    mounted() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${(this.page - 1) * this.numberByPage}`)
            .then(response => response.json())
            .then(data => this.pokemonDisplayed = data.results)
            .catch(error => console.log(error))
    },
    methods: {
        getId(url) {
            return url.split("/")[6]
        },
        getImage(id) {
            respUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png"
            return respUrl
        },
        getWeight(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => this.infos.weight = data.weight)
        },
        getHeight(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => this.infos.height = data.height)
        },
        getTypes(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => this.infos.types = data.types)
        },
        getInfos(url) {
            this.id = this.getId(url)
            this.changeClicked()
            fetch(url)
                .then(response => response.json())
                .then(data => this.infos = data)

        },
        getIdByUrl(url) {
            this.id = this.getId(url)
            fetch(url)
                .then(response => response.json())
                .then(data => this.infos = data)
        },
        addPage() {
            if (this.page < (this.numbers / this.numberByPage)) {
                this.page += 1
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            }
        },
        add5Page() {
            if (this.page < ((this.numbers / this.numberByPage) - 5)) {
                this.page += 5
            }
            else {
                this.page = (this.numbers / this.numberByPage)
            }
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                .then(response => response.json())
                .then(data => this.pokemonDisplayed = data.results)
        },
        removePage() {
            if (this.page > 1) {
                this.page -= 1
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            }
        },
        remove5Page() {
            if (this.page > 5) {
                this.page -= 5
            }
            else {
                this.page = 1
            }

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                .then(response => response.json())
                .then(data => this.pokemonDisplayed = data.results)
        },
        changeClicked() {
            this.isClicked = !this.isClicked
        },
        changeNumberByPage(number) {
            this.numberByPage = number
            this.page = 1
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                .then(response => response.json())
                .then(data => this.pokemonDisplayed = data.results)
        },
        sortListById() {
            console.log(this.searchById)
            if (this.searchById != "" || this.searchById != " ") {
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${(this.searchById - 1)}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            } else {
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            }
            this.searchById  = '' 

        },
        sortListByName() {
            console.log(this.searchByName)
            if (this.searchByName != "" || this.searchByName != " " || this.searchByName != undefined) {
                let url = "https://pokeapi.co/api/v2/pokemon/" + this.searchByName.toLowerCase()
                this.getIdByUrl(url)
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${(this.infos.id - 1)}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            } else {
                fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.numberByPage}&offset=${(this.page - 1) * this.numberByPage}`)
                    .then(response => response.json())
                    .then(data => this.pokemonDisplayed = data.results)
            }
            this.searchByName = ''
        }
    }

}).mount('#app')