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
    var top_tag;
    var tags;
    var genres = [];
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
                    //after i get the top tags I will sort them out and make sure there are no duplicates
                    //to give a sense of valuation

//                    top_tag = data.toptags.tag[0].name;

                    //incrase value if duplicate
                    // this is a crappy way of doing things, but that's what i had at the moment
                    //doesn't wokr
                    //add other validations like trimming to lowercase and some regex maybe? to match a certain numeber of matched cases.
                    if (true) { //change this
                        //if I can't find any values
                        genres.push({"genre": top_tag, "value": 1});
                    } else {
                        //find a way for the object not to create another entry when in this block

                    }
//                     console.log(genres);

                } catch (error) {
                    console.log(error.message);
                }
            }, error: function (code, message) {
                console.log(code);
            }
        });
    }(i));
     console.log(genres);
//    console.log(container);
</script>
</body>
</html>