function Pull() {
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
        buildTopTracks(tracksChart, topTracks, topTracksPlays, username);
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
        buildTopPlays(albumsChart, topAlbums, topPlays, username);
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
}
