// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor2) {
      let numberOfSimilarity = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor2.dna[i]) {
          numberOfSimilarity++;
        }
      }
      let percentageOfCommonDNA = (numberOfSimilarity / this.dna.length) * 100;
      console.log(
        `Specimen ${this.specimenNum} and Specimen ${pAequor2.specimenNum} have ${percentageOfCommonDNA}% DNA in common.`
      );
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter((el) => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6;
    },
  };
}

function pAequorCollectionFactory() {
  let pAequorCollection = [];
  let num = 1;
  while (pAequorCollection.length < 30) {
    let pAequor = pAequorFactory(num, mockUpStrand());
    if (pAequor.willLikelySurvive()) {
      pAequorCollection.push(pAequor);
    }
    num++;
  }
  return pAequorCollection;
}

console.log(pAequorCollectionFactory().length);
