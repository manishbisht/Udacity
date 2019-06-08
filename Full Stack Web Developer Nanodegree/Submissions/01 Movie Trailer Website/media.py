"""
This module contains the movie class that will be used in entertainment_center.py
"""

class Movie():
    """
    Movie Object is initialised

    Args:
        movie_title: Title of the Movie
        movie_storyline: Movie storyline or short description
        movie_image: movie poster image url
        mvie_trailer: movie trailer url
    """
    def __init__(self, movie_title, movie_storyline, movie_image, movie_trailer):
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = movie_image
        self.trailer_youtube_url = movie_trailer