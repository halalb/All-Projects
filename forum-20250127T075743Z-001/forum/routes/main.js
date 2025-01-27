// main.js

// Function to fetch topic titles
function fetchTopicTitle(topicId, callback) {
    let sqlquery = "SELECT title FROM topics WHERE id = ?";
    db.query(sqlquery, [topicId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.length > 0 ? result[0].title : '');
        }
    });
}

module.exports = function (app, forumData) {

    // Home page
    app.get('/', function (req, res) {
        res.render('index.ejs', forumData);
    });

    // About page
    app.get('/about', function (req, res) {
        res.render('about.ejs', forumData);
    });

    // List of topics
    app.get('/topiclist', function (req, res) {
        let sqlquery = "SELECT * FROM topics";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let newData = Object.assign({}, forumData, { topics: result });
            res.render("topiclist.ejs", newData);
        });
    });

    // Add post page (fetch topics before rendering)
    app.get('/addpost', function (req, res) {
        let sqlquery = "SELECT * FROM topics";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let newData = Object.assign({}, forumData, { topics: result });
            res.render('addpost.ejs', newData);
        });
    });

    // List of users
    app.get('/userlist', function (req, res) {
        let sqlquery = "SELECT * FROM users";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let newData = Object.assign({}, forumData, { users: result });
            res.render("userlist.ejs", newData);
        });
    });

    // List of posts with topic titles
    app.get('/postlist', function (req, res) {
        let sqlquery = "SELECT * FROM posts";
        db.query(sqlquery, (err, posts) => {
            if (err) {
                res.redirect('/');
            }

            // Fetch topic titles for each post
            let fetchTopicTitles = posts.map(post => new Promise(resolve => {
                fetchTopicTitle(post.topicId, (err, title) => {
                    resolve(Object.assign({}, post, { topicTitle: title }));
                });
            }));

            Promise.all(fetchTopicTitles)
                .then(postsWithTitles => {
                    let newData = Object.assign({}, forumData, { posts: postsWithTitles, fetchTopicTitle: fetchTopicTitle });
                    res.render("postlist.ejs", newData);
                })
                .catch(error => {
                    console.error(error);
                    res.redirect('/');
                });
        });
    });

    // Save a new post
    app.post('/postadded', function (req, res) {
        let checkquery = "SELECT * FROM membership WHERE iduser = ?"
        let sqlquery = "INSERT INTO posts (content, userId, topicId) VALUES (?,?,?)";
        let newRecord = [req.body.content, req.body.userId, req.body.topicId];
        let isUser = true;
        
        db.query(checkquery, req.body.userId, (err, result) => {
            for (i=0; i<result.length; i++) {
                console.log(result[i]);
                if (result[i].idtopic == req.body.topicId) {
                    db.query(sqlquery, newRecord, (err, result) => {
                        if (err) {
                            console.error(err.message);
                            res.redirect('/');
                        }
                        res.send('New post added!');
                    });
                    isUser = true;
                    break;
                }
                isUser = false;
            }
            if (!isUser) {
                res.send("you aren't a member. Sorry.")
            }
        });
    });

    // ... (other routes)
};
