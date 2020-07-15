import {redditAPI} from "../api/reddit";
import {bufferCount, delay, map} from "rxjs/operators";
import {Database} from "./database";
import {concat, Observable} from "rxjs";
import {Post, PostStatus} from "../types/types";

export class Harvester {

    constructor(
        protected database: Database,
    ) {
    }

    // TODO: implement last post
    // setLastPost(pageId, postId){
    //     this.database.updatePage(pageId, {lastPostId: postId})
    // }

    convertApiPost(post: any, pageId: string): Post {
        return {
            _id: post.id,
            title: post.title,
            subreddit: post.subreddit,
            upvote_ratio: post.upvote_ratio,
            ups: post.ups,
            media: post.url,
            permalink: post.permalink,
            status: PostStatus.Idle,
            page: pageId,
            createdAt: new Date(),
            postedAt: undefined,
        }
    }

    // Select relevant posts
    getTopByDay(subreddit, pageId): Observable<Post[]>{
        return redditAPI.getTop(subreddit, {t: 'day', limit: 15}).pipe(
            map(it => it.data.children),
            map(it => it.map(it => this.convertApiPost(it.data, pageId)))
        )
    }

    harvest(page) {
        const { subreddits } = page;
        concat(
            ...subreddits.map(it => this.getTopByDay(it, page.id)
                .pipe(
                    delay(1000),
                )
            )
        ).pipe(
            bufferCount(subreddits.length),
            map((it: Array<Array<Post>>) => {
                const arr1: Post[] = it[0];
                const arr2: Post[] = it[1];
                return [...arr1, ...arr2]
            })
        ).subscribe(r => {
            this.database.addPosts(r)
        });
    }
}