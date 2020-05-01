import sys
from collections import Counter
from heapq import heappop, heappush
from operator import itemgetter


class BinaryTreeNode(object):
    def __init__(self, value, weight):
        self.value = value
        self.weight = weight
        self.right = None
        self.left = None

    def __lt__(self, other_node):
        return other_node.weight > self.weight


class HuffmanCodingTree(object):
    def __init__(self, sentence):
        self.sentence = sentence
        self.tree = self.merge_nodes()
        self.codes = {}

    def create_tree(self, sentence):
        frequency_map = sorted(Counter(sentence).items(), key=itemgetter(1))
        tree_nodes = [BinaryTreeNode(i[0], i[1]) for i in frequency_map]
        return tree_nodes

    def merge_nodes(self):
        tree = self.create_tree(self.sentence)

        while len(tree) > 1:
            left_node = heappop(tree)
            right_node = heappop(tree)
            merged_node = BinaryTreeNode(None, left_node.weight + right_node.weight)
            merged_node.left, merged_node.right = left_node, right_node
            heappush(tree, merged_node)
        return tree[0]

    def encoder(self, node, encoded_data=""):
        if node is None:
            return
        if node.value is not None:
            self.codes[node.value] = encoded_data
            return

        self.encoder(node.left, encoded_data + "0")
        self.encoder(node.right, encoded_data + "1")


def huffman_encoding(data):
    huffman_encoded = HuffmanCodingTree(data)
    huffman_encoded.encoder(huffman_encoded.tree)
    gotten_data = ""
    for char in data:
        gotten_data += huffman_encoded.codes.get(char)
    return gotten_data, huffman_encoded


def huffman_decoding(encoded_data, tree):
    code = ""
    decoded_text = ""
    decoded_codes = dict((v, k) for k, v in tree.codes.items())
    if encoded_data is "":
        decoded_text = tree.sentence
    for data in encoded_data:
        code += data
        if code in decoded_codes:
            char = decoded_codes[code]
            decoded_text += char
            code = ""
    return decoded_text


if __name__ == "__main__":
    codes = {}

    a_great_sentence = "The bird is the word"
    numbers_in_sentence = "I got 1, 2, 3, 4, 5, 7, 8 M's in my bank accounts"
    same_letter = "AAAAA"
    space = " "

    print("The size of the data is: {!r}\n".format(sys.getsizeof(a_great_sentence)))
    print("The content of the data is: {!r}\n".format(a_great_sentence))

    print("The size of the data is: {!r}\n".format(sys.getsizeof(numbers_in_sentence)))
    print("The content of the data is: {!r}\n".format(numbers_in_sentence))

    print("The size of the data is: {!r}\n".format(sys.getsizeof(same_letter)))
    print("The content of the data is: {!r}\n".format(same_letter))

    print("The size of the data is: {!r}\n".format(sys.getsizeof(space)))
    print("The content of the data is: {!r}\n".format(space))

    encoded_data, tree = huffman_encoding(a_great_sentence)
    encoded_numbers_in_sentence, numbers_in_sentence_tree = huffman_encoding(numbers_in_sentence)
    encoded_same_letter, same_letter_tree = huffman_encoding(same_letter)
    encoded_space, space_tree = huffman_encoding(space)

    print(
        "The size of the encoded data is: {} {} {}\n".format(
            sys.getsizeof(int(encoded_data, base=2)),
            sys.getsizeof(int(encoded_numbers_in_sentence, base=2)),
            sys.getsizeof(encoded_same_letter),
            sys.getsizeof(encoded_space)
        )
    )
    print("The content of the encoded data is: {!r}\n".format(encoded_data))
    print("The content of the encoded data is: {!r}\n".format(encoded_numbers_in_sentence))
    print("The content of the encoded data is: {!r}\n".format(encoded_same_letter))
    print("The content of the encoded data is: {!r}\n".format(encoded_space))

    decoded_data = huffman_decoding(encoded_data, tree)
    decoded_numbers_in_sentence = huffman_decoding(encoded_numbers_in_sentence, numbers_in_sentence_tree)
    decoded_same_letter = huffman_decoding(encoded_same_letter, same_letter_tree)
    decoded_space = huffman_decoding(encoded_space, space_tree)

    print("The size of the decoded data is: {!r}\n".format(sys.getsizeof(decoded_data)))
    print("The content of the encoded data is: {!r}\n".format(decoded_data))
    print("The size of the decoded data is: {!r}\n".format(sys.getsizeof(decoded_numbers_in_sentence)))
    print("The content of the encoded data is: {!r}\n".format(decoded_numbers_in_sentence))
    print("The size of the decoded data is: {!r}\n".format(sys.getsizeof(decoded_space)))
    print("The content of the encoded data is: {!r}\n".format(decoded_same_letter))
    print("The size of the decoded data is: {!r}\n".format(sys.getsizeof(decoded_same_letter)))
    print("The content of the encoded data is: {!r}\n".format(decoded_space))