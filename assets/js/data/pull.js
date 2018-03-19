function Pull() {
  this.global = {}
  let iterator = 0;
  this.getTopTracks = (username, period, limit) => {
    const topTracks = [];
    const topTracksPlays = [];
    lastfm.user.getTopTracks({
      user: username,
      period,
      limit,
    }, {
      success: (data) => {
        data.toptracks.track.forEach((track) => {
          topTracks.push(track.name + " by " + track.artist.name);
          topTracksPlays.push(track.playcount);
        });
        this.global.topTracks = topTracks;
        this.global.topTracksPlays = topTracksPlays;
        document.querySelector('#topTrackImg > img').setAttribute('src', data.toptracks.track[0].image[2]['#text']);
        document.querySelector('#topTrackName > p').innerHTML = topTracks[0];
        buildTopTracks(tracksChart, topTracks.slice(0, 10), topTracksPlays.slice(0, 10), username);
      },
      error: (code, message) => {
        console.log(message);
      }
    });
  }

  //get top albums and use this data for genres afterwards
  this.getTopTags = (username, period, limit) => {
    const topTags = [];
    const topPlays = [];
    const topAlbums = [];
    let topTagsCount = {};
    lastfm.user.getTopAlbums({
      user: username,
      period,
      limit,
    }, {
      success: (data) => {
        const top_albums = data.topalbums.album;
        _.map(top_albums, item => {
          topAlbums.push(item.name + " by " + item.artist.name);
          topPlays.push(item.playcount);
        });
        this.global.topAlbums = topAlbums;
        this.global.topAlbumsPlays = topPlays;
        document.querySelector('#topAlbumImg > img').setAttribute('src', data.topalbums.album[0].image[2]['#text']);
        document.querySelector('#topAlbumName > p').innerHTML = topAlbums[0];
        buildTopAlbums(albumsChart, topAlbums.slice(0, 10), topPlays.slice(0, 10), username);
        _.forEach(top_albums, (album) => {
          lastfm.album.getTopTags({
            artist: album.artist.name,
            album: album.name
          }, {
            success: data => {
              const tags = data.toptags.tag.slice(0, 10).map(obj => obj.name).filter((tag) => {
                if (/^\d+$/.test(tag) // check for year tags, thank you estremadures
                  ||
                  tag.toLowerCase().indexOf('albums i') !== -1 ||
                  tag.toLowerCase().indexOf('best of') !== -1 ||
                  tag.toLowerCase().indexOf('favorite') !== -1 ||
                  tag.toLowerCase().indexOf('favourite') !== -1 ||
                  tag.toLowerCase() === album.artist.name ||
                  tag.toLowerCase().indexOf('awesome') !== -1 ||
                  tag.split(' ').length > 3) {
                  return false;
              }
              return true;
            });
              tags.forEach((tag) => {
                topTags.push(tag);
              });
              iterator++;
              if (iterator == limit) {
                topTags.forEach((item) => {
                  topTagsCount[item] = (topTagsCount[item] || 0) + 1;
                });
                topTagsCount = _.fromPairs(_.sortBy(_.toPairs(topTagsCount), (a) => {
                  return a[1]
                }).reverse());
                buildGenres(tagsChart, Object.keys(topTagsCount).slice(0, limit), Object.values(topTagsCount).slice(0, limit), username);
                // reset chart
                iterator = 0;
              }
            },
            error: (code, message) => {
              console.log(message);
            }
          });
        });
      },
      error: (code, message) => {
        console.log(message);
      }
    });
  }

  this.getTopArtists = (username, period, limit) => {
    const topArtists = [];
    const topArtistsPlays = [];
    let iteratorr = 0;
    lastfm.user.getTopArtists({
      user: username,
      period,
      limit,
    }, {
      success: (data) => {
        data.topartists.artist.forEach((artist) => {
          topArtists.push(artist.name);
          topArtistsPlays.push(artist.playcount);
        });
        this.global.topArtists = topArtists;
        this.global.topArtistsPlays = topArtistsPlays;
        document.querySelector('#topArtistImg > img').setAttribute('src', data.topartists.artist[0].image[2]['#text']);
        document.querySelector('#topArtistName > p').innerHTML = topArtists[0];
        buildTopArtists(artistsChart, topArtists.slice(0, 10), topArtistsPlays.slice(0, 10), username);
        const topArtistsTags = [];
        let topArtistsTagsCount = {};
        topArtists.forEach((artist) => {
          lastfm.artist.getTopTags({
            artist,
          }, {
            success: (data) => {
              data.toptags.tag.slice(0, 10).forEach((tag) => {
                topArtistsTags.push(tag.name);
              });
              iterator++;
              if (iterator == limit) {
                topArtistsTags.forEach((item) => {
                  topArtistsTagsCount[item] = (topArtistsTagsCount[item] || 0) + 1;
                });
                topArtistsTagsCount = _.fromPairs(_.sortBy(_.toPairs(topArtistsTagsCount), (a) => {
                  return a[1]
                }).reverse());
                buildTopArtistsGenres(artistsTagsChart, Object.keys(topArtistsTagsCount).slice(0, limit), Object.values(topArtistsTagsCount).slice(0, limit), username);
                // reset chart
                iterator = 0;
              }
            },
            error: (code, message) => {
              console.log(message);
            }
          });
        });
      },
      error: (code, message) => {
        console.log(message);
      }
    });
  }
}
