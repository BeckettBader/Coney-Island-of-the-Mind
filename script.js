const apiKey = '7st38CMG5TJkkhDAJ6fXtVcCxQnK9Gc4';
const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';


document.addEventListener('DOMContentLoaded', () => {
    // Fetch recent tech news data for NYC
    setCurrentPage();
    fetchRecentTechNewsNYC();

});

async function fetchRecentTechNewsNYC() {
    try {
        // Set the date range for articles from 3 weeks ago to today
        const today = new Date();
        const threeWeeksAgo = new Date();
        threeWeeksAgo.setDate(today.getDate() - 30); 

        // Format dates as YYYY-MM-DD
        const formattedToday = formatDate(today);
        const formattedThreeWeeksAgo = formatDate(threeWeeksAgo);

        const response = await fetch(`${apiUrl}?q=technology&fq=glocations:("NEW YORK CITY")&begin_date=${formattedThreeWeeksAgo}&end_date=${formattedToday}&api-key=${apiKey}`);
        const data = await response.json();

        // Check if the response contains articles
        if (data.response.docs && data.response.docs.length > 0) {
            displayTechNews(data.response.docs);
        } else {
            displayErrorMessage();
        }
    } catch (error) {
        console.error('Error fetching tech news:', error);
        displayErrorMessage();
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function displayTechNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear loading message

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        const headline = document.createElement('h3');
        headline.textContent = article.headline.main;

        const snippet = document.createElement('p');
        snippet.textContent = article.snippet;

        const url = document.createElement('a');
        url.href = article.web_url;
        url.textContent = 'Read more';

        articleElement.appendChild(headline);
        articleElement.appendChild(snippet);
        articleElement.appendChild(url);

        newsContainer.appendChild(articleElement);
    });
}

function displayErrorMessage() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Failed to load tech news. Please try again later.</p>';
}

function setCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop(); // Get the last part of the path (filename)
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }
    });
}

const whyTechTextContainer = document.getElementById('why-tech-text');
whyTechTextContainer.innerHTML = 'Welcome to the exciting blend of New York City\'s rich history and its tech scene...';