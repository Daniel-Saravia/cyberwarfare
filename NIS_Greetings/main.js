// Function to load content into the #content div
function loadContent(page) {
    fetch(page)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById('content').innerHTML = html;
        // Update the URL without reloading the page
        window.history.pushState({ page }, '', `#${page}`);
      })
      .catch((error) => {
        console.error('Error loading page:', error);
      });
  }
  
  // Event listeners for menu links
  document.querySelectorAll('.menu-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = event.target.getAttribute('data-page');
      loadContent(page);
    });
  });
  
  // Handle back/forward buttons
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
      loadContent(event.state.page);
    } else {
      loadContent('home.html');
    }
  });
  
  // Load default content on page load
  window.addEventListener('load', () => {
    const page = window.location.hash.substring(1) || 'home.html';
    loadContent(page);
  });
  