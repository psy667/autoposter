import {bindNodeCallback} from "rxjs";
import {Post} from "../types/types";

const Datastore = require('nedb');


export class Database{
    private pagesTable: any;
    private postsTable: any;

    constructor() {
        this.pagesTable = new Datastore({ filename: 'database/pages', autoload: true });
        this.postsTable = new Datastore({ filename: 'database/posts', autoload: true });
    }

    public addPosts(posts: Post[]): void {
        posts.forEach(post => {
            this.postsTable.insert(post, (err) => {
                if(err){
                    console.log('Error')
                } else {
                    console.log('Post saved')
                }
            })
        })
    }

    public getPosts() {

    }

    public updatePost() {

    }

    public updatePage(id, value) {
        return bindNodeCallback(callback => {
            this.pagesTable.update({_id: id}, {$set: value}, {}, callback)
        })
    }

    public getAllPages() {
        return bindNodeCallback(callback => {
            this.pagesTable.find({}, {}, callback);
        })
    }
}