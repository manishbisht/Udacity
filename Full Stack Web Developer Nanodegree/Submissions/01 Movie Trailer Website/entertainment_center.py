"""
Creates a list of Movies
"""
import media
import fresh_tomatoes

dear_zindigi = media.Movie("Dear Zindagi",
                           "An unconventional thinker (Shah Rukh Khan) helps a budding cinematographer (Alia Bhatt) gain a new perspective on life.",
                           "https://upload.wikimedia.org/wikipedia/en/9/9e/Dear_Zindagi_poster.jpg",
                           "https://www.youtube.com/watch?v=5DkO7ksXY8E")

befikre = media.Movie("Befikre",
                      "Set in Paris, Befikre is a free spirited, contemporary love story of Dharam and Shyra, who find love in an impulsive, engaging series of experiences.",
                      "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Befikre_poster.jpg/220px-Befikre_poster.jpg",
                      "https://www.youtube.com/watch?v=p7X7mwcEJ-w")

tum_bin2 = media.Movie("Tun Bin 2",
                       "Tum Bin II is 2016 Indian Hindi romantic drama film, starring Neha Sharma, Aashim Gulati,Aditya Seal and Shubhanshu Kesharwani in the lead roles.",
                       "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Tum_Bin_2_poster.jpg/220px-Tum_Bin_2_poster.jpg",
                       "https://www.youtube.com/watch?v=elyqJo1BD9c")

rock_on2 = media.Movie("Rock On 2", "This film tells the story of musicians and bands who grow and evolve.",
                       "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Rock_On_2_poster.jpg/220px-Rock_On_2_poster.jpg",
                       "https://www.youtube.com/watch?v=0IlxnwQyUIQ")

ae_dil_hai_mushkil = media.Movie("Ae Dil Hai Mushkil",
                                 "Still reeling from the effects of a recent breakup, a woman (Anushka Sharma) develops a budding friendship with a man (Ranbir Kapoor) who wants to take their relationship to the next level.",
                                 "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Ae_Dil_Hai_Mushkil2.jpg/220px-Ae_Dil_Hai_Mushkil2.jpg",
                                 "https://www.youtube.com/watch?v=Z_PODraXg4E")

force2 = media.Movie("Force 2",
                     "Brings back ACP Yashvardhan who teams up RAW Agent KK to bring down a master mind terrorist Shiv.",
                     "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Force_2-FL.jpg/220px-Force_2-FL.jpg",
                     "https://www.youtube.com/watch?v=r4O4Xec60_k")

movies = [dear_zindigi, befikre, tum_bin2, rock_on2, ae_dil_hai_mushkil, force2]

fresh_tomatoes.open_movies_page(movies)