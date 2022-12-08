const app = Vue.createApp({
    data() {
        return {
            api_key: "F6WJPL5LWHX5DJV8ZDZJR6NEC",
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

            console.log(results)

            this.day1 = results.days[0].temp
            this.day2 = results.days[1].temp
            this.day3 = results.days[2].temp
            this.day4 = results.days[3].temp
            this.day5 = results.days[4].temp

            this.high1 = results.days[0].tempmax
            this.high2 = results.days[1].tempmax
            this.high3 = results.days[2].tempmax
            this.high4 = results.days[3].tempmax
            this.high5 = results.days[4].tempmax

            this.low1 = results.days[0].tempmin
            this.low2 = results.days[1].tempmin
            this.low3 = results.days[2].tempmin
            this.low4 = results.days[3].tempmin
            this.low5 = results.days[4].tempmin

            this.date1 = results.days[0].datetime
            this.date2 = results.days[2].datetime
            this.date3 = results.days[3].datetime
            this.date4 = results.days[4].datetime
            this.date5 = results.days[5].datetime

            this.title = "Average 5-day Temp"

            console.log(this.low4)
            this.makeChart()
        },
        makeChart() {
            let myChart = document.getElementById('myChart').getContext('2d');

            Chart.defaults.global.defaultFontFamily = 'Arial';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';

            let temperature = new Chart(myChart, {
                type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
                data: {
                    labels: [this.date1, this.date1, this.date1, this.date1, this.date1],
                    datasets: [
                        {
                            label: "High",
                            backgroundColor: "red",
                            data: [
                                this.high1,
                                this.high2,
                                this.high3,
                                this.high4,
                                this.high5
                            ]
                        },
                        {
                            label: "Average",
                            backgroundColor: 'Yellow',
                            data: [
                                this.day1,
                                this.day2,
                                this.day3,
                                this.day4,
                                this.day5
                            ]
                        },
                        {
                            label: "Low",
                            backgroundColor: 'blue',
                            data: [
                                this.low1,
                                this.low2,
                                this.low3,
                                this.low4,
                                this.low5
                            ]
                        }
                    ]
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