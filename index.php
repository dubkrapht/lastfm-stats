<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Last Fm Statistics</title>
    <script type="text/javascript" src="lastfm.api.md5.js"></script>
    <script type="text/javascript" src="lastfm.api.js"></script>
    <script type="text/javascript" src="lastfm.api.cache.js"></script>
</head>
<body>
<div id="info"></div>
<script>
    //cache
    var cache = new LastFMCache();

    //create lastfm object
    var lastfm = new LastFM({
        apiKey: '76305a32595a40f5d298af26c890a9b9',
        apiSecret: '629f12eb1d53f50c80d4688192db2d15',
        cache: cache
    });

    // load user info
    var loved_albums;
    lastfm.user.getTopAlbums({user: 'yoann303', period: '7day', limit: 5}, {
        success: function (data) {
            loved_albums = data.topalbums.album;
//        console.log(loved_albums);
        }, error: function (code, message) {
            //bla bla error
        }
    });

    for (var i = 0; i < loved_albums.length; i++) {
//        console.log(loved_albums[i]['name']);
        lastfm.album.getTopTags({artist: loved_albums[i].artist.name, album: loved_albums[i]['name']}, {
            success: function (data) {
                try {
                    var top_tag = data.toptags.tag[0].name;
                    console.log(top_tag);                   
                } catch (error) {
                    console.log(error.message);
                }
            }, error: function (code, message) {
                console.log(code);
            }
        });
    }
</script>
</body>
</html>