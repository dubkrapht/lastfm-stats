<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Last Fm Statistics</title>
    <script type="text/javascript" src="lastfm.api.md5.js"></script>
    <script type="text/javascript" src="lastfm.api.js"></script>
    <script type="text/javascript" src="lastfm.api.cache.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
</head>
<body>
<div id="wrapper">
    <div id="content">
        <canvas id="tagsChart" width="400" height="400"></canvas>
    </div>
</div>
<script>
    //cache
    var cache = new LastFMCache();
    var ctx = document.getElementById("tagsChart");
    var tagsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["Electronic", "Indie", "Post-Rock", "Ambient"],
            datasets: [
                {
                    label: "Yoann303 dataset",
                    data: [4, 1, 3, 20]
                }
            ]
        }
    })
    //create lastfm object
    var lastfm = new LastFM({
        apiKey: '76305a32595a40f5d298af26c890a9b9',
        apiSecret: '629f12eb1d53f50c80d4688192db2d15',
        cache: cache
    });

    var loved_albums;
    var top_tag;
    var tags;
    var genres = [];
    var ac_g = [];
    var top_tag_index = 0;

    //get top albums and use this data for genres afterwards
    lastfm.user.getTopAlbums({user: 'yoann303', period: '7day', limit: 5}, {
        success: function (data) {
            loved_albums = data.topalbums.album;
//        console.log(loved_albums);
        }, error: function (code, message) {
            //bla bla error
        }
    });

    //get top tags
    for (var i = 0; i < loved_albums.length; i++) (function (i) {
        lastfm.album.getTopTags({artist: loved_albums[i].artist.name, album: loved_albums[i]['name']}, {
            success: function (data) {
                try {
                    tags = data.toptags.tag;
                    //usually first tag is the release year so I'm adding this to pass through that
                    //although in needs more work after I run some tests.
                    for(var j = 0; j < tags.length; j++) {
                        if (!isNaN(tags[j].name))
                            continue;
                        else {
                            top_tag = tags[j].name;
                            break;
                        }
                    }
                    //TODO: genres repetition values
                    //add other validations like trimming to lowercase and some regex maybe? to match a certain numeber of matched cases.
                    genres[top_tag_index] = top_tag;
                    top_tag_index++
                    //get the actual data
                    if(top_tag_index == loved_albums.length) {
                        console.log(genres);
                        //define a function outside and use it to populate the chart
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }, error: function (code, message) {
                console.log(code);
            }
        });
    }(i));

</script>
</body>
</html>