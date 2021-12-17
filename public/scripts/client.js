$(() => {
	loadTweets();
	$('#newTweetForm').on('submit', onSubmit);
	$(`#error-container`).hide();
});

const data = [
	{
		user: {
			name: 'Newton',
			avatars: 'https://i.imgur.com/73hZDYK.png',
			handle: '@SirIsaac'
		},
		content: {
			text: 'If I have seen further it is by standing on the shoulders of giants'
		},
		created_at: 1461116232227
	},
	{
		user: {
			name: 'Descartes',
			avatars: 'https://i.imgur.com/nlhLi3I.png',
			handle: '@rd'
		},
		content: {
			text: 'Je pense , donc je suis'
		},
		created_at: 1461113959088
	}
]; //displays tweets from tweeters datbase
const renderTweets = function(tweets) {
	for (let tweet of tweets) {
		const $tweet = createTweetElement(tweet);

		$(`#tweets-container`).prepend($tweet);
	}
};
// gets tweets from tweeters database
const loadTweets = function() {
	$.get('/tweets').then((data) => {
		renderTweets(data);
	});
};
// listens for submission then either creates a new tweet or displays an error for the client
const onSubmit = function(event) {
	event.preventDefault();

	if ($('#counter').val() < 0) {
		return $(`#error-container`).slideDown();
	}

	if ($('#counter').val() == 140) {
		return $(`#error-container`).slideDown();
	}

	const data = $(this).serialize();
	$.post('/tweets', data).then(() => {
		$(`#error-container`).slideUp();
		loadTweets();
		$('textarea#tweet-text').val('');
		$('#counter').val(140);
	});
};

// prevents cross site scripting through tweeting
const newEscape = function(str) {
	let div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};

// Takes clients information and displays it in the format of a tweet, profile, and options for interacting with the content
const createTweetElement = function(tweet) {
	let $tweet = $(`
   <article>
          <header>
            <div class='userId'>
              <img src=${newEscape(tweet.user.avatars)}><span>${newEscape(tweet.user.name)}</span>
            </div> <span>${newEscape(tweet.user.handle)}</span>
          </header>       
          <p>${newEscape(tweet.content.text)}</p>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <div class = "icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
  `);
	return $tweet;
};
