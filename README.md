# Movies Landing Page

This is a simple landing page for movies, featuring a display of movie posters fetched from an external API, along with various functionalities for filtering movies by genre, adding new movies, and displaying random quotes.

## Features

- **Random Quote Display**: Utilizes an API to display a random quote on the page. Clicking the "New Quote" button fetches and displays another random quote.

- **Movie Display**: Fetches a list of movies from an external API and displays them as posters, each with information such as title, description, year, and genre.

- **Filtering by Genre**: Allows users to filter the displayed movies by genre using a dropdown menu.

- **Add New Movie**: Users can add new movies by clicking the "Add New Movie" button, which opens a modal with input fields for title, year, description, genre, and image URL.

## APIs Used

- **Random Quote API**: An external API is used to generate random quotes. Due to CORS issues with the original API, a different API was used.

- **Movies API**: Movies are fetched from the TVMaze API, which provides a wide range of TV show information, including posters, titles, genres, and summaries.

## Implementation

- **Random Quote**: The random quote functionality is implemented by fetching a list of quotes from the API and displaying a random quote on page load. Clicking the "New Quote" button fetches another random quote from the list.

- **Movies Display**: The movies are fetched from the TVMaze API and displayed as posters on the page, along with their respective information.

- **Filtering**: Users can filter movies by genre using a dropdown menu. The filtering is implemented dynamically on the client-side.

- **Adding New Movies**: Clicking the "Add New Movie" button opens a modal with input fields for adding a new movie. Input validation is performed to ensure the entered data is valid before adding the movie to the list.

## Usage

Simply open the `FrontEndTask.html` file in a web browser to view the Movies Landing Page. From there, you can interact with the various functionalities provided.

