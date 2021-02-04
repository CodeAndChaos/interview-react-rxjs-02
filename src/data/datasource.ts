import { interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { twitterStore } from './state';

export interface Tweet {
    account: string;
    timestamp: number;
    content: string;
}

export interface StateTweet extends Tweet {
    favorite: boolean;
    id: number
}

export const createTweetSource = (frequency: number, account: string, attribute: string) => {
    return interval(frequency).pipe(map((i): Tweet => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`
    })));
}

export const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);


//tweets.subscribe(console.log.bind(console));
tweets.subscribe(twitterStore.addTweet)
