from collections import defaultdict


class RouteTrie:
    def __init__(self, handler):
        self.root = RouteTrieNode(handler)

    def insert(self, path_parts, handler):
        node = self.root
        for part in path_parts:
            node.insert(part)
            node = node.children[part]
        node.handler = handler

    def find(self, path_parts):
        node = self.root
        for part in path_parts:
            if part in node.children:
                node = node.children[part]
            else:
                return None
        return node.handler


class RouteTrieNode:
    def __init__(self, handler=None):
        self.children = defaultdict(RouteTrieNode)
        self.handler = handler

    def insert(self, path):
        self.children[path] = RouteTrieNode()


class Router:
    def __init__(self, handler, not_found_handler):
        self.routeTrie = RouteTrie(handler)
        self.not_found_handler = not_found_handler

    def add_handler(self, path, handler):
        path_parts = self.split_path(path)
        self.routeTrie.insert(path_parts, handler)

    def lookup(self, path):
        path_parts = self.split_path(path)
        handler = self.routeTrie.find(path_parts)
        if handler is None:
            return self.not_found_handler
        else:
            return handler

    def split_path(self, path):
        path = path.strip("/")
        return path.split("/") if path else []


router = Router("root handler", "not found handler")
router.add_handler("/home/about", "about handler")  # add a route

# ----------------------------------------------------------------------------------------------------------------------
# Tests
# ----------------------------------------------------------------------------------------------------------------------

# Root Handler
print("Pass" if router.lookup("/") == "root handler" else "Fail")

# Partial Path
print("Pass" if router.lookup("/home") == "not found handler" else "Fail")

# Actual Path
print("Pass" if router.lookup("/home/about") == "about handler" else "Fail")
print("Pass" if router.lookup("/home/about/") == "about handler" else "Fail")

# Non Existent Path
print("Pass" if router.lookup("/home/about/me") == "not found handler" else "Fail")

# Empty Path
print("Pass" if router.lookup("") == "root handler" else "Fail")