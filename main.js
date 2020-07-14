const axios = require("axios");
const Datastore = require('nedb');

const db = new Datastore({ filename: 'database/index', autoload: true });

const express = require('express')
const app = express()
const port = 3000



const renderCard = (item) => {
    return `
        <div>
            <h2><a href="${item.permalink}">${item.title}</a></h2>
            <b>Upvotes: </b><span>${item.ups}</span><span>${item.upvote_ratio}</span>
            <img src="${item.url}" width="400"/>
            <hr>
        </div>
    `
};

const renderList = (items) => {
    return items.map(renderCard).join('');
}

app.get('/upload', (req, res) => {
    axios.get('http://reddit.com/r/memes.json').then(r => {
        const items = r.data.data.children;
        console.log('After: '+ r.data.data.after);

        const newArr = items.map(({data}) => {
            const it = data;

            return {
                title: it.title,
                subreddit: it.subreddit,
                upvote_ratio: it.upvote_ratio,
                ups: it.ups,
                url: it.url,
                permalink: it.permalink,
                id: it.id,
            };
        });

        db.insert(newArr, () => {
            console.log(newArr);
            res.send(JSON.stringify(newArr, null, 2))
        });
    });
    // res.send(renderList())
})

app.get('/', (req, res) => {
    db.find({}, {}, (err, r) => {
        console.log(r);
        res.send(renderList(r))
    });
})
// res.send(`<b>Hello!</b>`)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
