import axios from "axios";
import {map, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

interface listingParams {
    t: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
    after?: string
    limit?: number
}

export const redditAPI = {
    getHot: (subreddit: string, params: listingParams) => {
        return fromPromise(axios.get(`http://reddit.com/r/${subreddit}/hot.json`, {
            params: params
        })).pipe(
            tap(() => console.log(new Date())),
            map(it => it.data)
        );
    },
    getTop: (subreddit: string, params: listingParams) => {
        return fromPromise(axios.get(`http://reddit.com/r/${subreddit}/top.json`, {
            params: params
        })).pipe(
            tap(() => console.log(new Date())),
            map(it => it.data)
        );
    },
};
