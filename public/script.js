$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        const searchTerm = $('#searchInput').val();

        $.ajax({
            url: 'http://localhost:3000/search', //search //linktodb
            method: 'GET',
            data: {
                search: searchTerm
            },
            success: function(response) {
                displayResults(response);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });

    function displayResults(results) {
        $('#searchResults').empty();
        results.forEach(function(result) {
            $('#searchResults').append(`<p>${result.join(', ')}</p>`);
        });
    }
});
