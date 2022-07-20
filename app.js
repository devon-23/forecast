const app = Vue.createApp({
    data() {
        return {
            api_key: "",
            url_base: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
            query: '',
            weather: {},
            title: '',
            day1: 0,
            day2: 0,
            day3: 0,
            day4: 0,
            day5: 0,
            date1: '',
            date2: '',
            date3: '',
            date4: '',
            date5: '',
        }
    },
    methods: {
        fetchWeather(e) {
            if (e.key == "Enter") {
                fetch(`${this.url_base}${this.query}?unitGroup=us&key=${this.api_key}&contentType=json`)
                .then(res => {
                  return res.json();
                }).then(this.getAverage);
            }
        },
        getAverage (results) {

            this.day1 = results.days[0].temp
            this.day2 = results.days[1].temp
            this.day3 = results.days[2].temp
            this.day4 = results.days[3].temp
            this.day5 = results.days[4].temp

            this.date1 = results.days[0].datetime
            this.date2 = results.days[2].datetime
            this.date3 = results.days[3].datetime
            this.date4 = results.days[4].datetime
            this.date5 = results.days[5].datetime

            this.title = "Average 5-day Temp"

            this.makeChart()
        },
        makeChart() {
            let myChart = document.getElementById('myChart').getContext('2d');
            let date = new Date()

            let year = date.getFullYear()
            //global options

            Chart.defaults.global.defaultFontFamily = 'Arial';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';

            let massPopChart = new Chart(myChart, {
                type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
                data: {
                    labels: [this.date1, this.date1, this.date1, this.date1, this.date1],
                    datasets: [{
                         label: ['Average', 'low', 'high'],
                        data: [
                            this.day1,
                            this.day2,
                            this.day3,
                            this.day4,
                            this.day5
                        ],
                        //backgroundColor: 'green'
                        backgroundColor: [ //can also use hex / rgba colors
                            'red',
                            'orange',
                            'yellow'
                        ],
                        borderWidth: 1,
                        borderColor: 'grey',
                        hoverBorderWidth: 3,
                        hoverBorderColor: 'black'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: this.title,
                        fontSize: 25
                    },
                    legend: {
                        display: 'false',
                        position: 'right',
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            })
        }
    }
})

app.mount('#app')