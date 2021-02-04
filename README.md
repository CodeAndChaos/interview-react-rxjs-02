# Twitter like App

## Original Problem

### Description

The task is to create a Twitter-like website. Please read through the document
and try to solve the following tasks step-by-step:

1. Create a small web application that runs completely in the browser.

- It must be a web-application using react and rxjs.
- Make sure that the application is build / running locally.

2. Take the tweets observable and render it as a list

- Use a Twitter-like structure/style.
- Order the list by date descending.
- Do not change the tweets observable.

3. Tweets older than 30 secs should not be shown in the list anymore.
4. Add the ability to like and unlike tweets.

- A liked tweet must look visually different than the other tweets.
- Above the list of tweets is a counter that shows the number of liked tweets contained within the list.

5. It must be possible to toggle between "all tweets" and "liked tweets".
6. It must be possible to clear the list of tweets.

### Data Source

```js
// rxjs is exposed by
// https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.4.0/rxjs.umd.min.js
const { interval, merge } = rxjs;
const { map } = rxjs.operators;

const createTweetSource = (frequency, account, attribute) => {
    return interval(frequency).pipe(map(i => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`
    })));
}
const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);

tweets.subscribe(console.log.bind(console));
```
