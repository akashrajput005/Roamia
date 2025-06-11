async function search() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const resultBox = document.getElementById('recommendationResults');
    resultBox.innerHTML = '';
  
    if (!keyword.trim()) {
      alert("Please enter a valid search query");
      return;
    }
  
    try {
      const response = await fetch('travel_recommendation_api.json'); // your JSON file
      const data = await response.json();
  
      const matches = data.places.filter(place => {
        const tag = place.keyword.toLowerCase();
        return tag.includes(keyword) || keyword.includes(tag);
      });
  
      if (matches.length === 0) {
        resultBox.innerHTML = '<p>No results found.</p>';
        return;
      }
  
      matches.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${place.imageUrl}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        `;
        resultBox.appendChild(card);
      });
    } catch (error) {
      console.error("Failed to fetch JSON:", error);
      resultBox.innerHTML = '<p>Error fetching data</p>';
    }
  }
  
  function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendationResults').innerHTML = '';
  }
  