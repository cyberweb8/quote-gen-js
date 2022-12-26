const quoteTxt = document.getElementById('quote');
const authorTxt = document.getElementById('author');

const newQuoteBtn = document.getElementById('new-quote');
const twitterQuoteBtn = document.getElementById('twitter');

const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    data.quoteAuthor === ''
      ? (authorTxt.innerText = 'Unknown')
      : (authorTxt.innerText = data.quoteAuthor);

    data.quoteText.length > 120
      ? quoteTxt.classList.add('long-quote')
      : quoteTxt.classList.remove('long-quote');
    quoteTxt.innerText = data.quoteText;
    complete();
  } catch (error) {
    getQuote();
    console.log('whoops, no quote. ' + error);
  }
}

function shareOnTwitter() {
  const quote = quoteTxt.innerText;
  const author = authorTxt.innerText;
  const twitterApiUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterApiUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterQuoteBtn.addEventListener('click', shareOnTwitter);

getQuote();
