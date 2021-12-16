$(document).ready(function() {
	let counter = document.getElementById('counter');
	let textArea = document.getElementById('tweet-text');
	let maxChars = 140;

	$('#tweet-text').on('input', function() {
		let remaining = maxChars - textArea.value.length;
		if (remaining <= 0) {
			counter.style.color = 'red';
		} else {
			counter.style.color = 'black';
		}
		counter.textContent = remaining;
	});
});
