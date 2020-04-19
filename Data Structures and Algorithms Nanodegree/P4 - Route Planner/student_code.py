import math
from queue import PriorityQueue

def shortest_path(graph, start, goal):
    
    pathQueue = PriorityQueue()
    pathQueue.put(start, 0)
    
    prev = {start: None}
    score = {start: 0}

    while not pathQueue.empty():
        curr = pathQueue.get()

        if curr == goal:
            generatePath(prev, start, goal)

        for node in graph.roads[curr]:
            updateScore = score[curr] + euclideanDistance(graph.intersections[curr], graph.intersections[node])
            
            if node not in score or updateScore < score[node]:
                score[node] = updateScore
                totalScore = updateScore + euclideanDistance(graph.intersections[curr], graph.intersections[node])
                pathQueue.put(node, totalScore)
                prev[node] = curr

    return generatePath(prev, start, goal)

def euclideanDistance(current, node):
    return math.sqrt(((current[0] - node[0]) ** 2) + ((current[1] - node[1]) ** 2))

def generatePath(prev, start, goal):
    curr = goal
    path = [curr]
    while curr != start:
        curr = prev[curr]
        path.append(curr)
    path.reverse()
    return path