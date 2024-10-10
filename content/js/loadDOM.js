document.addEventListener("DOMContentLoaded", () => {
  function fetchAndInsert(url, tag) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        const element = document.querySelector(tag);
        if (element) {
          element.insertAdjacentHTML('beforeend', data);
        } else {
          console.warn(`Element with tag "${tag}" not found.`);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  fetchAndInsert("/content/snippets/header.html", "header");
  fetchAndInsert("/content/snippets/footer.html", "footer");
  fetchAndInsert("/content/snippets/head.html", "head");
});