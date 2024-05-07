class PrimeNumbers {

    private readonly cachedPrimes: number[] = [];
    private readonly checkArray: boolean[] = [];

    private constructor(cachedPrimes: number[], checkArray: boolean[]) {
      this.cachedPrimes = cachedPrimes;
      this.checkArray = checkArray;
    }

    public static load(upTo: number) {
      // set all array slots to false corresponding to numbers 
      // (if 2 is prime then numbers[2] = false, etc)
      const numbers = new Array(upTo+1).fill(false);
      // 0 and 1 are not prime
      numbers[0] = numbers[1] = true;
      // iterate through all numbers up to the square root of the max number
      for (let i = 2; i <= Math.sqrt(upTo); i++) {
        // if the number is not marked as not prime
        if (!numbers[i]) {
          // iterate through all multiples of the number and mark them as not prime
          for (let j = i * 2; j <= upTo; j += i) {
            numbers[j] = true;
          }
        }
      }
      // collect all primes (optional, but potencially useful for the user of the class)
      const primes: number[] = [];
      numbers.forEach((isPrime, number) => {
        if (!isPrime) {
          primes.push(number);
        }
      });
      // return a new instance of the class with the primes and the check array
      return new PrimeNumbers(primes, numbers);
    }

    public isPrime(n: number): boolean {
      return !this.checkArray[n];
    }

    public getPrimes(): number[] {
      return this.cachedPrimes;
    }
}

const primeNumbersLoader = PrimeNumbers.load(10);
console.log(primeNumbersLoader.getPrimes()); // [2, 3, 5, 7]
console.log(primeNumbersLoader.isPrime(7)); // true
console.log(primeNumbersLoader.isPrime(10)); // false