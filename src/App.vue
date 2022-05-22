<template>
  <header>
    <h1>Wordle Suggestions</h1>
  </header>
  <div class="container">
    <WordBox @guess="handleGuess" :guess="guessMatrix" />
    <div class="keyboard">
      <KeyRow @keyPress="handleKeypress" :keys="topRow" location="top" />
      <KeyRow @keyPress="handleKeypress" :keys="middleRow" location="middle" />
      <KeyRow @keyPress="handleKeypress" :keys="bottomRow" location="bottom" />
    </div>
    <div>
      <ul>
        <li v-for="word in possible" :key="word">
          <span
            v-for="char in word"
            :class="char.color"
            :key="word + char + char.color"
          >
            {{ char.char ? char.char.toUpperCase() : char.char }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WordBox from "./components/WordBox.vue";
import KeyRow from "./components/KeyRow.vue";
import TRIE from "./trie";

export default {
  name: "App",
  components: {
    WordBox,
    KeyRow,
  },
  data() {
    return {
      totalGuesses: 6,
      remainingGuesses: 5,
      guessIndex: 0,
      topRow: [..."qwertyuiop"],
      middleRow: [..."asdfghjkl"],
      bottomRow: ["Find", ..."zxcvbnm", "Clear"],
      guessMatrix: [],
      currentMatrix: 0,
      message: "",
      exclusion: {},
      boardIndexes: {},
      wordleTrie: TRIE,
      possible: [],
      loading: false,
    };
  },
  methods: {
    handleGuess(letter, index, prev) {
      if (letter === "") letter = null;
      this.guessMatrix[index].letter = letter ? letter.toLowerCase() : null;
      if (letter) {
        let keyState = this.exclusion[letter];
        if (keyState === "unknown") {
          // contains is prev state change it to correct
          this.updateKeyboard("contains", letter);
        }
      } else {
        let keyState = this.exclusion[prev];
        if (keyState === "correct") {
          this.updateKeyboard(keyState, prev);
        }
      }
    },
    async handleKeypress(letter, keyState) {
      if (letter === "Find") {
        let contains = [];
        let selectionCount = 0;
        for (const [char, state] of Object.entries(this.exclusion)) {
          if (state === "contains") {
            contains.push(char);
            selectionCount++;
          }
          if (state === "wrong") {
            selectionCount++;
          }
        }
        let nullCount = 0;
        const guess = this.guessMatrix.map((c) => {
          if (c.letter === null) {
            nullCount++;
          } else {
            contains.push(c.letter);
          }
          return c.letter;
        });
        console.log(contains);
        if (nullCount === 5) {
          if (selectionCount > 0) {
            this.possible = await TRIE.findPotential(
              guess,
              this.exclusion,
              contains
            );
          } else {
            this.possible = [[{ char: "Provide at least one Input" }]];
          }
        } else {
          this.possible = await TRIE.findPotential(
            guess,
            this.exclusion,
            contains
          );
        }
      } else if (letter === "Clear") {
        this.init();
      } else {
        this.updateKeyboard(keyState, letter);
      }
    },
    updateKeyboard(keyState, letter) {
      let state = this.updateKeyState(keyState, letter);
      let { location, index } = this.boardIndexes[letter];
      this.exclusion[letter] = state;
      switch (location) {
        case "top":
          this.topRow[index].keyState = state;
          break;
        case "middle":
          this.middleRow[index].keyState = state;
          break;
        case "bottom":
          this.bottomRow[index].keyState = state;
          break;
      }
    },
    updateKeyState(state, letter) {
      let picked = false;
      let guesses = this.guessMatrix.map((char) => char.letter);
      if (guesses.includes(letter)) picked = true;
      switch (state) {
        case "unknown":
          return "wrong";
        case "wrong":
          return "contains";
        case "contains":
          if (!picked) {
            return "unknown";
          }
          return "correct";
        case "correct":
          if (picked) {
            return "wrong";
          }
          return "unknown";
      }
    },
    init() {
      let matrix = [];
      for (let i = 0; i < 5; i++) {
        const baseLetter = {
          letter: null,
        };
        matrix[i] = baseLetter;
      }
      this.guessMatrix = matrix;

      const fillKeyRow = (row, location) => {
        let objRow = [];
        row.forEach((letter, index) => {
          if (letter !== "Find") {
            this.exclusion[letter] = "unknown";
            this.boardIndexes[letter] = {
              index,
              location,
            };
          }
          let obj = {
            letter,
            keyState: "unknown",
          };
          objRow.push(obj);
        });
        return objRow;
      };

      this.topRow = fillKeyRow([..."qwertyuiop"], "top");
      this.middleRow = fillKeyRow([..."asdfghjkl"], "middle");
      this.bottomRow = fillKeyRow(["Find", ..."zxcvbnm", "Clear"], "bottom");
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
#app {
  font-family: "Ubuntu Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  margin-top: 60px;
}
h1 {
  text-align: center;
  font-size: 3.5rem;
}
.keyboard {
  margin: 0 8px;
}
.green {
  color: #538d4e;
}

.gold {
  color: #c9b458;
}

.grey {
  color: #787c7e;
}
.light-grey {
  color: #d3d6da;
}
.container {
  margin: 0 auto;
  max-width: 600px;
}
ul {
  padding: 0;
  margin: 0 auto;
  justify-content: center;
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
li {
  margin: 5px;
  text-align: center;
}
span {
  font-size: 2.5rem;
}
</style>
