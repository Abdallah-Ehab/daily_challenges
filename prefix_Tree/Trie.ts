interface Node {
  children: { [key: string]: Node },
  isEnd: boolean,
  val: string
}


// root is a dummy node
type root = Node | null


class Trie {
  root: root;
  constructor() {
    this.root = ({ children: {}, isEnd: false, val: '' } as Node)
  };

  public insert(word: string, root: root = null, index: number = 0) {
    if (index === word.length) {
      root!.isEnd = true;
      return
    }
    let current_node: root;
    if (!root) {
      current_node = this.root
    } else {

      current_node = root;
    }
    const current_char: string = word[index]
    if (!current_node!.children[current_char]) {
      current_node!.children[current_char] = ({ children: {}, isEnd: false, val: current_char } as Node)
    }
    this.insert(word, current_node!.children[current_char], index + 1)
  }

  public search(word: string, root: root = null, isEnd: boolean = false, index: number = 0): boolean {
    if (index === word.length) {
      return isEnd;
    }
    let current_node;
    if (!root) {
      current_node = this.root
    } else {
      current_node = root
    }
    for (var child of Object.keys(current_node!.children)) {
      if (child === word[index]) {
        return this.search(word, current_node!.children[child], current_node!.children[child].isEnd, index + 1)
      }
    }
    return false;
  }

}


function test() {
  const trie = new Trie()
  const result: boolean[] = [];
  const words = ['hello', 'hell', 'helium', 'hot', 'hooters', 'a']
  for (const word of words) {
    trie.insert(word);
  }
  for (const word of [...words, 'how', 'hoooters', 'urmoom', 'ab']) {
    result.push(trie.search(word))
  }
  console.log(result)
}


test()


