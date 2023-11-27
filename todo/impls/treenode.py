class TreeNode:
    def __init__(self, obj, rating):
        self.obj = obj
        self.rating = rating
        self.weight = 0
        self.children = []

    def add(self, obj):
        self.children.append(obj)

    def __str__(self):
        out = '(' + str(self.obj) + ','
        out += str(self.rating) + ')'
        for child in self.children:
            out += str(child)
        return out

    def sort_leaves(self):
        def helper(root, result):
            if not root.children:
                result.append((root.obj, root.weight))
                return
            for child in root.children:
                helper(child, result)
        result = []
        helper(self, result)
        return result

    def compute_weights(self):
        total = sum([x.rating for x in self.children])
        for child in self.children:
            child.weight = self.weight * child.rating / total
            child.compute_weights()
        return 0
