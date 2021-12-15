/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(()=>{
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },  
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {

    createTweetElement(tweet);
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
   <article>
          <header>
            <div class='userId'>
              <img src=${tweet.user.avatars}><span>${tweet.user.name}</span>
            </div> <span>${tweet.user.handle}</span>
          </header>       
          <p>${tweet.content.text}</p>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <div class = "icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
  `)
  $(`#tweets-container`).append($tweet)
}

renderTweets(data);

});











// const $tweet = createTweetElement(tweetData);

// const createTweetElement = function() {

// };


// $(()=>{
//   $.ajax({
//     url: "/tweets",
//     method: "GET",
//     dataType: "json",
//     success: (data) => {
//       console.log("data", data);
//     },
//     error: (err) => {
//       console.log("error", err);
//     }
//   })
// })

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.+

