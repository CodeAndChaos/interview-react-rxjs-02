import { Subject } from 'rxjs';
import { TIME_TO_ARCHIVE } from '../config/globalSettings';
import { StateTweet, Tweet } from './datasource';

const subject: Subject<StateManagement> = new Subject();

interface StateManagement {
    tweets: StateTweet[]
    archive: StateTweet[]
}

export const initialState: StateManagement = {
    tweets: [],
    archive: []
}

let state = initialState;
let idCounter = 0;

export const twitterStore = {
    subscribe: (setState: any) => subject.subscribe(setState),
    addTweet: (tweet: Tweet) => {
        console.log("add observer", tweet.timestamp)
        idCounter += 1;

        const stateTweet: StateTweet = {
            ...tweet,
            id: idCounter,
            favorite: false
        }

        state = {
            ...state,
            tweets: [stateTweet, ...state.tweets]
        }

        subject.next(state)
        setTimeout(() => { twitterStore.archiveTweet(tweet.timestamp) }, TIME_TO_ARCHIVE)
    },
    setFavorite: (id: number, value: boolean) => {
        let tweet = state.tweets.find(val => val.id === id) || state.tweets.find(val => val.id === id)
        if (tweet) {
            tweet.favorite = value;
        }
        subject.next(state)
    },
    clear: () => {
        idCounter = 0;
        state = initialState;
        subject.next(state)
    },
    archiveTweet: (timestamp: number) => {
        const removedTweet = state.tweets.findIndex(val => val.timestamp === timestamp)
        if (removedTweet !== -1) {
            state = {
                ...state,
                archive: [state.tweets[removedTweet], ...state.archive]
            }
            state.tweets.splice(removedTweet)
        }

        subject.next(state)
    }
}