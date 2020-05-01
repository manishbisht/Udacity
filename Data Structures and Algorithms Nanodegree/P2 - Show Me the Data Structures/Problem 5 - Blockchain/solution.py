import hashlib
from time import time


class Block:
    def __init__(self, timestamp, data, previous_hash=None):
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calc_hash()

    def calc_hash(self):
        sha = hashlib.sha256()
        hash_str = str(self.timestamp) + str(self.data) + str(self.previous_hash)
        sha.update(hash_str.encode("utf-8"))
        return sha.hexdigest()


class Chain(object):
    def __init__(self):
        self.head = None
        self.last_node = None
        self.next = None
        self.previous = None

    def add_node(self, data):
        if self.head is None:
            self.head = Block(timestamp=time(), data=data)
            self.last_node = self.head
            return

        self.last_node.next = Block(
            timestamp=time(), data=data, previous_hash=self.last_node.hash
        )
        self.last_node.next.previous = self.last_node
        self.last_node = self.last_node.next
        return

    def __iter__(self):
        node = self.last_node
        while node.previous_hash:
            yield node.hash
            node = node.previous
        else:
            yield self.head.hash

    def __repr__(self):
        node_list = [n for n in self]
        node_list.reverse()
        return str(node_list)


chain = Chain()
chain.add_node("one")
print(chain)
chain.add_node("two")
print(chain)
chain.add_node("one")
print(chain)