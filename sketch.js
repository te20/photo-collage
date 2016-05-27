var imgs = [];

function preload() {
  imgs[0] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/12093551_1404305876535349_720114381_n.jpg?ig_cache_key=MTI1NjMxMDA5NzQ1MDYwNTUxMw%3D%3D.2");
  imgs[1] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/13108670_103700513384316_177254976_n.jpg?ig_cache_key=MTI1NjMwOTM1NjU3NzEzNTU0OQ%3D%3D.2");
  imgs[2] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/13116728_503809063148407_64730927_n.jpg?ig_cache_key=MTI1NjMwOTc2MjM4NDQzNjE2NA%3D%3D.2");
  imgs[3] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/13257161_887211481404867_1602173577_n.jpg?ig_cache_key=MTI1NjMxMDM5MjA5MjA3MjkxMg%3D%3D.2");
  imgs[4] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/13266879_1018244158259085_1815267322_n.jpg?ig_cache_key=MTI1NjMwOTA3NjcwODAwNjgzNA%3D%3D.2");
  imgs[5] = loadImage("https://scontent.cdninstagram.com/t51.2885-15/e35/13277584_1601233296854972_849925808_n.jpg?ig_cache_key=MTI1NjMwODA3MDk0NzQ2MjA0OA%3D%3D.2");
}

function setup() {
  createCanvas(600, 800);
  /*
    getMedia('altobohe', function(links) {
      console.log(links);
      links.forEach(function(link, index) {
        var img = createImg(link).hide();
        append(imgs, img);
      });
  */
  console.log(imgs);
  var x, y;

  for (var i = 0; i < imgs.length; i++) {
    x = random(width);
    y = random(height);
    console.log(i + ': x = ' + x + ' y = ' + y);
    console.log(imgs[i]);
    image(imgs[i], x, y, imgs[i].width / 4, imgs[i].height / 4);
  }
  //});
}

function draw() {}

function getAccessToken() {
  var url = "https://api.instagram.com/oauth/authorize/" +
    "?client_id=c0f707f4839d49509f7d08015cb3a2f7" +
    "&redirect_uri=http://bohelabo.jp" +
    "&scope=public_content" +
    "&response_type=token";
  window.open(url);
}

function getSelf() {
  httpGet('https://api.instagram.com/v1/users/self/', {
      "access_token": "3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e"
    },
    "jsonp",
    function(res) {
      console.log(res.data.id);
    }
  );
}

function getUser() {
  httpGet('https://api.instagram.com/v1/users/3262439581', {
      "access_token": "3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e"
    },
    "jsonp",
    function(res) {
      console.log(res.data.id);
    }
  );
}

function findUser(name) {
  httpGet('https://api.instagram.com/v1/users/search', {
      'q': name,
      "access_token": "3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e"
    },
    "jsonp",
    function(res) {
      console.log(res);
    }
  );
}

function getMedia(name, callback) {
  var url = 'https://api.instagram.com/v1/users/search?q=' + name +
    "&access_token=3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e";
  loadJSON(url, function(res) {
    if (res.meta.code === 200) {
      getPhotos(res, callback);
    }
  }, "jsonp");
}

function getPhotos(res, callback) {
  res.data.forEach(function(data) {
    console.log('ID: ' + data.id);
    var url = 'https://api.instagram.com/v1/users/' + data.id + "/media/recent/" +
      "?access_token=3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e";
    loadJSON(url, function(res) {
      console.log(res);
      if (res.meta.code === 200) {
        createPhotoList(res, callback);
      }
    }, "jsonp");
  });
}

function createPhotoList(res, callback) {
  var links = res.data.map(function(data) {
    return data.images.standard_resolution.url;
  });
  callback(links);
}

/*
function getMedia(name, callback) {
  httpGet('https://api.instagram.com/v1/users/search', {
      'q': name,
      "access_token": "3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e"
    },
    "jsonp",
    function(res) {
      // console.log(res);
      if (res.meta.code !== 200) {
        console.log("#### Error in search user");
        return;
      }
      res.data.forEach(function(data) {
        console.log('ID: ' + data.id);
        httpGet('https://api.instagram.com/v1/users/' + data.id + "/media/recent/", {
            "access_token": "3262439581.c0f707f.228d1a4930e74d0184e719c64bfc0d1e"
          },
          "jsonp",
          function(res) {
            if (res.meta.code !== 200) {
              console.log("##### Error in get media");
            }
            var links = res.data.map(function(data) {
              return data.images.standard_resolution.url;
            });
            callback(links);
          });
      });
    });
}
*/