#SharkTankBot

The souce code for [@SharkTankBot](https://twitter.com/SharkTankBot) on Twitter.

To use:
Simply rename fakeconfig.js to config.js and plug in your Twitter credentials.

run `$ npm install`.

Then run 
```
node bot.js
```

If you would like to run the bot forever, install the forever npm package
`npm install -g forever`

Then run the script using forever:
```
forever start --spinSleepTime 10000 bot.js
```

---



Initially forked from [https://github.com/nisrulz/twitterbot-nodejs](https://github.com/nisrulz/twitterbot-nodejs)
