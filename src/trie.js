class Trie {
  constructor() {
    (this.root = new Node("")), (this.excluded = {});
		this.green = 'green'
		this.gold = 'gold'
		this.red ='red'
    this.occurrences = {}
  }
  insert(val) {
    this.add(this.root, val.split(""));
  }
  add(node, word) {
    if (!word.length) {
      node.complete = true;
      return;
    }
    let char = word.shift();
    if (node.children[char]) {
      this.add(node.children[char], word);
    } else {
      node.children[char] = new Node(char);
      this.add(node.children[char], word);
    }
  }
  retrieve(val) {
    const node = this.find(this.root, val.split(""));
    if (!node) return "Not Found";
    return this.traverse(node, val, []);
  }
  find(node, term) {
    if (!term.length) return node;
    let char = term.shift();
    let child = node.children[char];
    if (child) {
      return this.find(child, term);
    } else {
      return null;
    }
  }
  traverse(node, word, found) {
    if (!node) return found;
    let children = Object.keys(node.children);
    children.forEach((char) => {
      let child = node.children[char];
      let temp = word.concat(child.val);
      if (child.complete) {
        found.push(temp);
      } else {
        this.traverse(child, temp, found);
      }
    });
    return found;
  }
  async findPotential(wordArr, excluded, contains) {
    let char = wordArr[0];
    let start = [];
    while (char) {
      start.push({ 
				char,
				color: this.green
				});
      wordArr.shift();
      char = wordArr[0];
    }
    let node = this.find(this.root, start.length ? start.map(item => item.char) : '');
    if (!node) return [[{ char: 'Could not Find any Matches', color: this.red}]];
    this.updateOccurrences(contains)
		const words = this.fillInBlanks(node, wordArr, start, [], excluded, contains);
		return words.length ? words : [[{ char: 'Not Found', color: this.green}]]
  }
  fillInBlanks(node, wordArr, word, found, excluded, contains) {
    let copy = [...wordArr];
    if (!copy.length) return found;
    let char = copy.shift();
    if (char) {
      let child = node.children[char];
      if (child) {
				let val = { char: child.val, color: this.green}  
        let temp = word.concat(val);
        if (child.complete) {
          let canInsert = this.canInsert(contains, temp);
          if (canInsert) {
            found.push(temp);
          }
        } else {
          this.fillInBlanks(child, copy, temp, found, excluded,contains);
        }
      }
    } else {
      for (const [letter, child] of Object.entries(node.children).sort()) {
        if (excluded[letter] === "wrong") continue;
				let val = excluded[letter] === 'contains' ? { char: child.val, color: this.gold} : { char: child.val, color: ''} 
        let temp = word.concat(val);
        if (child.complete) {
          let canInsert = this.canInsert(contains, temp);
          if (canInsert) {
            found.push(temp);
          }
        } else {
          this.fillInBlanks(child, copy, temp, found, excluded, contains);
        }
      }
    }
    return found;
  }
  canInsert(arr, word) {
		let letters = word.map( c => c.char)
    if (arr.length === 0) return true;
    for (let i = 0; i < arr.length; i++) {
      let total = this.occurrences[arr[i]]
      if(total < 2){
        if (!letters.includes(arr[i])) {
          return false;
        }
      } else {
        let count = 0;
        let compare = arr[i]
        letters.forEach(letter => {
          if(letter === compare){
            count++
          }
        })
        if(count < total){
          return false
        }
      }
    }
    return true;
  }
  updateOccurrences(contains){
    this.occurrences = {} 
      contains.forEach(item => {
        if(this.occurrences[item]){
          this.occurrences[item]++
        } else{
          this.occurrences[item] = 1
        }
      })
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.children = {};
    this.complete = false;
  }
}

const TRIE = new Trie();

export default TRIE;
