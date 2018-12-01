class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    if (this.creator) {
      num +=
        this.creator.numberOfOffspring +
        this.creator.numberOfVampiresFromOriginal;
    }
    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (!this.creator) return true;
    if (!vampire.creator) return false;

    let thisVampire = this.numberOfVampiresFromOriginal;
    let otherVampire = vampire.numberOfVampiresFromOriginal;
    return thisVampire < otherVampire ? true : false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let findVampireWithName = null;
    if (this.name == name) {
      findVampireWithName = this;
    }
    this.offspring.map(offsp => {
      if (offsp.vampireWithName(name)) {
        findVampireWithName = offsp.vampireWithName(name);
      }
    });
    return findVampireWithName;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let sum = 0;

    for (const child of this.offspring) {
      if (child.offspring) {
        sum += 1 + child.totalDescendents;
      }
    }
    return sum;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let arr = [];

    if (this.yearConverted > 1980) {
      arr.push(this);
    }
    for (const child of this.offspring) {
      arr = arr.concat(child.allMillennialVampires);
    }
    return arr;
  }

  /** Tree traversal methods **/

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {}
}

// npm test -- test/1*.js  # will run file test/1_addOffspring.js only
// npm test -- test/2*.js  # will run file test/2_numberOfOffspring.js only
// npm test -- test/3*.js  # will run file test/3_numberOfVampiresFromOriginal.js only
// npm test -- test/4*.js  # will run file test/4
module.exports = Vampire;
