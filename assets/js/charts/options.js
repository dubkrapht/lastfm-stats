function Option() {
	// options for building the charts
  this.genres = (labels, data, user) => {
    return {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: `${user} Top Genres`,
          data,
          borderColor: [
          'rgba(33,33,33,1)'
          ],
          backgroundColor: [
          'rgba(33,33,33,0.7)'
          ],
          borderWidth: 1,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        scale: {
          ticks: {
            display: false,
            beginAtZero: true,
            min: 0,
            stepSize: data[0],
          }
        }
      }
    };
  }

    this.artistGenre = (labels, data, user) => {
      return {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: 'Top Artists Genres',
            data,
            borderColor: ['rgba(33,33,33,0.7)'],
            borderWidth: 1,
            pointRadius: 0
          }],
        },
        options: {
          responsive: true,
          scale: {
            ticks: {
              display: false,
              beginAtZero: true,
              min: 0,
              stepSize: data[0]
            },
          },
        },
      };
    }

  this.topAlbums = (labels, data, user) => {
    return {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [{
          label: `${user} Top Albums`,
          data,
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 10
            }
          }]
        }
      }
    };
  }

  this.topTracks = (labels, data, user) => {
    return {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [
        {
          label: `${user} Top Tracks`,
          data,
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 5
            }
          }]
        }
      }
    };
  }

  this.topArtists = (labels, data, user) => {
    return {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [
        {
          label: `${user} Top Artists`,
          data,
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 10
            }
          }]
        }
      }
    };
  }
}
