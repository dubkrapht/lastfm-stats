function Option() {
	// options for building the charts
  this.genres = (labels, data, user) => {
    return {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: user + " dataset",
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
            max: 5,
            stepSize: 5
          }
        }
      }
    }
  };

  this.topPlays = (labels, data, user) => {
    return {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [{
          label: user + ' dataset',
          data,
        }]
      },
      options: {
        responsive: true,
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
          label: user + ' dataset',
          data,
        }
        ]
      },
      options: {
        responsive: true,
      }
    };
  }
}
