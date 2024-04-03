$(document).ready(function () {
    $("#openModalBtn").click(function () {
        $("#myModal").modal('show');
    });

    function fetchRandomQuote() {
        $.ajax({
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            method: 'GET',
            success: function (response) {
                const quotes = JSON.parse(response).quotes;
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const quote = quotes[randomIndex];
                displayQuote(quote);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching random quote:', error);
            }
        });
    }

    function displayQuote(quote) {
        const quoteContainer = $('#quoteContainer');
        const quoteHTML = `
            <div class="card">
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${quote.quote}</p>
                        <footer class="blockquote-footer">${quote.author}</footer>
                    </blockquote>
                </div>
            </div>
        `;
        quoteContainer.html(quoteHTML);
    }

    fetchRandomQuote();

    $('#newQuoteBtn').click(function () {
        fetchRandomQuote();
    });

    $("#myModal .button").click(function () {
        const title = $('#title').val();
        const year = $('#year').val();
        const description = $('#description').val();
        const genre = $('#genre').val();
        const imageUrl = $('#imageUrl').val();

        if (title.trim().length > 250) {
            alert('Movie title should be maximum 250 characters.');
            return;
        }

        if (!/^\d{4}$/.test(year)) {
            alert('Please enter a valid year in YYYY format.');
            return;
        }

        if (description.trim().length > 500) {
            alert('Description should be maximum 500 characters.');
            return;
        }

        if (genre.trim() === '') {
            alert('Genre field cannot be empty.');
            return;
        }

        movies.unshift({
            title: title,
            year: year,
            description: description,
            genre: genre,
            imageUrl: imageUrl
        });

        populateMovies();

        $("#myModal").modal('hide');

        $('#title').val('');
        $('#year').val('');
        $('#description').val('');
        $('#genre').val('');
        $('#imageUrl').val('');
    });
});

function fetchMovies() {
    $.ajax({
        url: 'https://api.tvmaze.com/shows',
        method: 'GET',
        success: function (response) {
            movies = response.map(show => ({
                title: show.name,
                year: show.premiered.split('-')[0],
                description: truncateDescription(show.summary),
                genre: show.genres.join(', '),
                imageUrl: show.image.medium
            }));
            populateMovies();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching movies:', error);
        }
    });
}

function truncateDescription(summary) {
    const text = summary.replace(/<\/?[^>]+(>|$)/g, "");
    const sentences = text.split(/\.|\?|!/);
    const truncatedSentences = sentences.slice(0, 3);
    return truncatedSentences.join('. ');
}

fetchMovies();

$('#movieModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const title = button.data('title');
    const year = button.data('year');
    let description = button.data('description');
    const genre = button.data('genre');
    const modal = $(this);
    modal.find('.modal-title').text(title);
    modal.find('.modal-body').html(`
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Genre:</strong> ${genre}</p>
    `);
});


$('#genreFilter').change(function () {
    const selectedGenre = $(this).val();
    filterMoviesByGenre(selectedGenre);
});

function filterMoviesByGenre(genre) {
    const filteredMovies = genre === 'all' ? movies : movies.filter(movie => movie.genre.includes(genre));
    populateMovies(filteredMovies);
}

function populateMovies(moviesData = movies) {
    const $moviePosters = $('#moviePosters');
    $moviePosters.empty();
    moviesData.forEach(movie => {
        $moviePosters.append(`
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${movie.imageUrl}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text flex-fill">${movie.description}</p>
                        <p class="card-text">${movie.genre}</p>
                        <button class="button btn-sm mt-auto" data-bs-toggle="modal" data-bs-target="#movieModal" data-title="${movie.title}" data-year="${movie.year}" data-description="${movie.description}" data-genre="${movie.genre}">View Details</button>
                    </div>
                </div>
            </div>
        `);
    });
}

populateMovies();
