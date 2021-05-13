new Vue({
    el: '#app',
    data: {
        textToSearch: "",
        tmdbApiKey : '0924d7517f6c9a9c52bdbc940d50377f',
        moviesList: [],
        tvSeriesList: [],
    },
    methods: {
        makeAxiosSearch(searchType) {
            const axiosOptions = {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            }

            axios.get("https://api.themoviedb.org/3/search/movie", axiosOptions )
            .then((resp) => {
                if(searchType === "movie" ){
                    this.moviesList =  resp.data.results;
                }else if (searchType === "tv") {
                    this.tvSeriesList = resp.data.results.map((tvShow) => {
                        tvShow.original_title = tvShow.original_name;
                        tvShow.title = tvShow.original_name;

                        return tvShow
                    });
                }               
            })
        },
        doSeach() {
            /*
            prendere il tetso da ricercare
            this.textToSearch
            comporre la query string da usare durante la cchiamata alle API
            eseguo la chiamata all'end point che mi serve inviando la qiìuerystring appena creata
            nel then della risposta andro  salvare i dati in una variabile

            */
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");

           
        }
    },
})