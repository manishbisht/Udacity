"""
Read file into texts and calls.
It's ok if you don't understand how to read files.
"""
import csv
with open('texts.csv', 'r') as f:
    reader = csv.reader(f)
    texts = list(reader)

with open('calls.csv', 'r') as f:
    reader = csv.reader(f)
    calls = list(reader)


"""
TASK 1:
How many different telephone numbers are there in the records? 
Print a message:
"There are <count> different telephone numbers in the records."
"""

uniqueNumbers = {}

for text in texts:
    uniqueNumbers[text[0]] = 1
    uniqueNumbers[text[1]] = 1

for call in calls:
    uniqueNumbers[call[0]] = 1
    uniqueNumbers[call[1]] = 1

print "There are {} different telephone numbers in the records.".format(len(uniqueNumbers.keys()))