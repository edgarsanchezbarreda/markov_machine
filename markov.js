/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// Creates a map called chains where markov chains will be stored.
		let chains = new Map();

		// Iterates through text that is passed through function.
		for (let i = 0; i < this.words.length; i += 1) {
			// Sets variable "word" to current word in loop and "nextWord" to the next word if a word exists, else sets "nextWord" to null.
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			// This if statement checks to see if the map "chains" contains the current word in the loop.
			// If the current word being looped over is in the map, then the "nextWord" gets pushed into the list-value belonging to the current word.
			// If the current word being looped over is not stored as a key in the map, than it is stored as a key in the map and the "nextWord" is stored as its first value in a list.
			if (chains.has(word)) chains.get(word).push(nextWord);
			else chains.set(word, [ nextWord ]);
		}
		// The chains variable is stored as an instance of this specified class.
		this.chains = chains;
	}

	static choice(ar) {
		/** return random text from chains */
		return ar[Math.floor(Math.random() * ar.length)];
	}

	makeText(numWords = 100) {
		// "keys" is a shallow-copied array instance of the keys stored in the "chains" variable.
		let keys = Array.from(this.chains.keys());

		// "key" is set to a random key from the "keys" array.
		let key = MarkovMachine.choice(keys);

		// "out" is an empty list.
		let out = [];

		while (out.length < numWords && key !== null) {
			out.push(key);
			key = MarkovMachine.choice(this.chains.get(key));
		}
		return out.join(' ');
	}
}

module.exports = {
	MarkovMachine
};
