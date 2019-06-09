"""
Read file into texts and calls.
It's ok if you don't understand how to read files
"""
import csv
with open('texts.csv', 'r') as f:
    reader = csv.reader(f)
    texts = list(reader)

with open('calls.csv', 'r') as f:
    reader = csv.reader(f)
    calls = list(reader)

"""
TASK 2: Which telephone number spent the longest time on the phone
during the period? Don't forget that time spent answering a call is
also time spent on the phone.
Print a message:
"<telephone number> spent the longest time, <total time> seconds, on the phone during 
September 2016.".
"""

callDuration = {}

for call in calls:
    if call[0] in callDuration.keys():
        callDuration[call[0]] += int(call[3])
    else:
        callDuration[call[0]] = int(call[3])

    if call[1] in callDuration.keys():
        callDuration[call[1]] += int(call[3])
    else:
        callDuration[call[1]] = int(call[3])


sortedCallDuration = sorted(callDuration.items(), key=lambda x: x[1], reverse=True)

print "{} spent the longest time, {} seconds, on the phone during September 2016.".format(sortedCallDuration[0][0], sortedCallDuration[0][1])
