# The easy empty fill-in-the-blank and its corresponding answers.
easy_fib = ["Two balls and two", "___1___", "on him. Here's the pitch on the "
            "way. A swing and a belt! Left field...way back...BLUE JAYS WIN "
            "IT! The Blue Jays are", "___2___", "Series Champions, as Joe",
            "___3___", "hits a three-run home run in the ninth", "___4___",
            "and the Blue Jays have repeated as World Series Champions!",
            "___5___", "'em all, Joe! You'll never hit a bigger home run in "
            "your life!"]
easy_answers = ["strikes", "World", "Carter", "inning", "Touch"]

# The medium empty fill-in-the-blank and its corresponding answers.
medium_fib = ["1 and 1 on Jose. All eyes on the mound and the bearded Sam",
              "___1___", ". Now he comes set. Kicks, the 1-1 pitch. FLY BALL, "
              "DEEP", "___2___", "FIELD! YES SIR!", "___3___", "!", "___4___",
              "!", "___5___", "! Blue Jays 6,", "___6___", "3. Jose",
              "___7___", "is unbelievable!"]
medium_answers = ["Dyson", "LEFT", "THERE", "SHE", "GOES", "Rangers",
                  "Bautista"]

# The hard empty fill-in-the-blank and its corresponding answers.
hard_fib = ["Deux balles deux prises a Russell", "___1___", "et voila le "
            "signal de", "___2___", ". La balle est frappee avec force au "
            "champ gauche et...ELLE EST", "___3___", "!", "___4___", "!",
            "___5___", "!", "___6___", "!", "___7___", "! Le Quebec danse! Le",
            "___8___", "danse! Et RUSSELLLLL quel chef d'orchestre. Bonsoir, "
            "elle est partie."]
hard_answers = ["Martin", "McCann", "PARTIE", "RUSSELL", "RUSSELL", "RUSSELL",
                "RUSSELL", "Canada"]


def load_fib_difficulty():
    """Asks the user for a difficulty level and loads that level's data.

    Args:
        none.
    Returns:
        (list of str): empty fill-in-the-blank.
        (list of str): answer key.
        (str): difficulty level.
    """
    level = raw_input("\nPlease select a difficulty level for your Toronto "
                      "Blue Jays fill-in-the-blank (easy, medium, or hard): ")
    if level.lower() == "easy":
        return easy_fib, easy_answers, "easy"
    if level.lower() == "medium":
        return medium_fib, medium_answers, "medium"
    if level.lower() == "hard":
        return hard_fib, hard_answers, "hard"
    else:
        print "You selected an invalid difficulty level!"
        return load_fib_difficulty()


def remove_spaces_before_punc(fib_string):
    """Removes spaces before punctuation.

    Removes the spaces after blanks and before punctuation (i.e. ___n___ .)
    that are created by " ".join(fib).

    Args:
        fib_string (str): the concatenated fill-in-the-blank with the unwanted
        spaces.
    Returns:
        (str): the same string without the unwanted spaces.
    """
    fib_string = fib_string.replace(" .", ".")
    fib_string = fib_string.replace(" !", "!")
    return fib_string


def provide_link(level):
    """Provides a link to the video of the home run call.

    Args:
        level (str): the chosen difficulty level.
    Returns:
        (str): the home run video link.
    """
    if level == "easy":
        return "https://www.youtube.com/watch?v=-F5HwiGm7lg"
    if level == "medium":
        return "https://www.youtube.com/watch?v=Oc-LYFojWcw"
    if level == "hard":
        return ("http://bit.ly/russell-martins-hr-was-the-biggest-since-1993 "
                "(starts at 4:40)")


def guess_check(blank_number, fib, answers, answer):
    """Asks the user for a guess. If correct, moves to the next blank.

    Prompts the user to fill in the first blank. Displays the updated
    fill-in-the-blank when the user inputs the correct answer and prompts them
    to fill in the next blank. Prompts the user to try again when their guess
    is incorrect.

    Args:
        blank_number (int): the current blank number.
        fib (list of str): the fill-in-the-blank in its current state.
        answers (list of str): the answer key.
        answer (str): the answer to the current blank.
    Returns:
        (int): the next blank number.
    """
    blank = "___" + str(blank_number) + "___"
    guess = raw_input("Please fill in blank #" + str(blank_number) +
                      " (case-sensitive): ")
    if guess == answer:
        fib[fib.index(blank)] = answer
        print remove_spaces_before_punc(" ".join(fib)) + "\n"
        blank_number += 1
        return blank_number
    else:
        print "Incorrect. Please try again.\n"
        return guess_check(blank_number, fib, answers, answer)


def play_game():
    """Plays a full game of fill-in-the-blanks.

    Displays the chosen empty fill-in-the-blank. Game ends with a printed
    congratulations statement.

    Args:
        none.
    Returns:
        none.
    """
    fib, answers, level = load_fib_difficulty()
    print ("\nHere is the fill-in-the-blank for the " + level + " difficulty "
           "level:")
    print remove_spaces_before_punc(" ".join(fib)) + "\n"

    blank_number = 1
    for answer in answers:
        blank_number = guess_check(blank_number, fib, answers, answer)

    print ("Congratulations, you have filled in all of the blanks! Here is the"
           " link to the call:")
    print provide_link(level) + "\n"

play_game()
