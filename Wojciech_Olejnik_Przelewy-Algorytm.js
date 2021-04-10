// function that returns a random integer between min and max
const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function that capitalizes interest, changes the interest rate and sends a transfer when conditions are met
const makeTransfer = (account, highestAccount) => {
  account.saldo -= account.balance * account.commission; // deduction of transfer commission
  highestAccount.balance += account.balance; // transfer to a bank account with the highest interest rate
  account.balance = 0; // deleting the account contents after a transfer
}

// function displaying the total capital every minute
const showTotal = (accountsArray) => {
  let totalCapital = null;
    accountsArray.map(account => totalCapital += account.balance);
    console.log('Total capital: ', totalCapital);
    accountsArray.map(account => console.log('Capital at ', account.name, ': ', account.balance));
}

// function finding the bank with the currently highest interest rate
const findHighestValue = (accountsArray) => {
  let highestInterestRate = accountsArray[0].interestRate;
  let account = accountsArray[0];
  for(let i = 0; i < accountsArray.length; i++){
    if(accountsArray[i].interestRate > highestInterestRate){
      highestInterestRate = accountsArray[i].interestRate;
      account = accountsArray[i];
    }
  }
  return account;
};

// function that capitalizes interest, changes the interest rate and sends a transfer when conditions are met
const makeProcess = (account, accountsArray) => {

  // setting an interval for the function executing a transfer with a frequency appropriate for the selected bank
  setInterval(() => {

    account.balance += account.balance * account.interestRate; // capitalization of interest
    account.interestRate = randomInt(1, 20)/100; //change in interest rate after capitalisation

    // condition that blocks the function for an account with a balance of 0
    if(account.balance > 0){ 

      // assigning the account with the highest interest rate to a variable
      const highestAccount = findHighestValue(accountsArray);

      // condition that blocks the possibility of sending a transfer to the same bank in which the capital is located
      if(highestAccount.name !== account.name){

        // a condition that checks whether it is profitable to make a transfer
        if((highestAccount.interestRate - account.interestRate) > account.commission){
          makeTransfer(account, highestAccount);
        }
      }
    }
  },(account.capitalizationCycle));
}

class Account {
  constructor(name){
    this.name = name;
    this.interestRate = randomInt(1, 20)/100; // random account interest rate expressed in %
    this.capitalizationCycle = randomInt(5, 10) * 1000; // random capitalization cycle prepared for use in the "setInterval" function
    this.commission = randomInt(1, 15)/100; // random bank transfer commission
    this.balance = 15000; // opening balance
  }
}

// instances of the Account class as owned accounts
const account1 = new Account('Bank1'); 
const account2 = new Account('Bank2');
const account3 = new Account('Bank3');

// create an array of objects with accounts
const accountsArray = [];
accountsArray.push(account1, account2, account3);

showTotal(accountsArray); 
setInterval(() => {showTotal(accountsArray)}, 60000);

makeProcess(account1, accountsArray); 
makeProcess(account2, accountsArray); 
makeProcess(account3, accountsArray);
