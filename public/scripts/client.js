/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(()=>{

loadTweets()
$("#newTweetForm").on("submit", onSubmit)
// renderTweets(data);
});



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
   const $tweet = createTweetElement(tweet);

    $(`#tweets-container`).prepend($tweet)
  }
}

const loadTweets = function() {
  $.get("/tweets")
    .then((data) => {
     renderTweets(data);
    })
}

const onSubmit = function(event) {
  event.preventDefault();
  const $error = createErrorElement();

  if ($('#counter').val() < 0) {
     return $(`#error-container`).append($error);
  }

  if ($('#counter').val() == 140) {
     return $(`#error-container`).append($error);
  }

  const data = $(this).serialize();
  $.post("/tweets", data)
    .then(() => {
      loadTweets();
    })
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
  return $tweet;
}

const createErrorElement = function() {
  let $error = $(`
    <div class = "errorMsg">
    <i class="fas fa-exclamation"></i>
    <h4>Sorry! This tweet format isn't what we expected :< </h4>
    <i class="fas fa-exclamation"></i>
    </div>
  `)
  return $error;
}













// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.+
