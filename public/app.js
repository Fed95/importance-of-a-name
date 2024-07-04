document.getElementById('searchBar').addEventListener('input', function() {
    console.log("Searching for: ", this.value);
    const searchInput = this.value.toLowerCase();

    fetch('data/names.json')
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            const filteredNames = data.filter(item => item.name.toLowerCase().includes(searchInput));

            if (filteredNames.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            } else {
                fetch('search-result.html')
                    .then(response => response.text())
                    .then(template => {
                        filteredNames.forEach(item => {
                            let resultHTML = template.replace('{name}', item.name)
                                                     .replace('{audio}', item.audio);
                            resultsDiv.innerHTML += resultHTML;
                        });
                    })
                    .catch(error => console.error('Error fetching template:', error));
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
