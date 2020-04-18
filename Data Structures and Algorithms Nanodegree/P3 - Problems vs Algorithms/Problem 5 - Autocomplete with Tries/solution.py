from collections import defaultdict


class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.isWord = False

    def suffixes(self, suffix=''):
        suffixes = []
        for char, node in self.children.items():
            if node.isWord:
                suffixes.append(suffix + char)
            if node.children:
                suffixes += node.suffixes(suffix + char)
        return suffixes


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            node = node.children[char]
        node.isWord = True

    def exists(self, word):
        node = self.find(word)
        return node.isWord if node else False

    def find(self, prefix):
        node = self.root
        for char in prefix:
            if char in node.children:
                node = node.children[char]
            else:
                return None
        return node


# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------

trie = Trie()
wordList = [
    "ant", "anthology", "antagonist", "antonym",
    "fun", "function", "factory",
    "trie", "trigger", "trigonometry", "tripod"
]
for word in wordList:
    trie.insert(word)

# Find
print("Pass" if type(trie.find("a")) is TrieNode else "Fail")
print("Pass" if trie.find("b") is None else "Fail")

# Exists
assert trie.exists("ant") is True
assert trie.exists("tripod") is True
assert trie.exists("anthony") is False
assert trie.exists("bob") is False
print("Pass" if trie.find("b") is None else "Fail")
print("Pass" if trie.find("b") is None else "Fail")
print("Pass" if trie.find("b") is None else "Fail")
print("Pass" if trie.find("b") is None else "Fail")


# Suffixes
node = trie.find("a")
print("Pass" if node.suffixes() == ["nt", "nthology", "ntagonist", "ntonym"] else "Fail")

node = trie.find("")
print("Pass" if node.suffixes() == ["ant", "anthology", "antagonist", "antonym", "fun", "function", "factory", "trie", "trigger", "trigonometry", "tripod"] else "Fail")

node = trie.find("facto")
print("Pass" if node.suffixes() == ["ry"] else "Fail")

node = trie.find("factory")
print("Pass" if node.suffixes() == [] else "Fail")