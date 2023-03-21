
function filter(data, predicate) {
   const result = [];
   for (let i = 0; i < data.length; i++) {
     if (predicate(data[i])) {
       result.push(data[i]);
     }
   }
   return result;
}

function findLast(data, predicate) {
    for (let i = data.length - 1; i >= 0; i--) {
        if (predicate(data[i])) {
            return data[i];
        }
    }
}

function map(data, callback) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(callback(data[i]));
    }
    return result;
}

function pairIf(data1, data2, callback) {
   const result = [];
    for (let i = 0; i < data1.length; i++) {
        for (let j = 0; j < data2.length; j++) {
            if (callback(data1[i], data2[j])) {
                result.push([data1[i], data2[j]]);
            }
        }
    }
    return result;
}

function reduce(data1, data2, callback) {
    let result = data2;
    for (let i = 0; i < data1.length; i++) {
        callback(data1[i], result);
    }
    return result;
}

//First section of console.logs
const duplicate = pairIf(customers, customers, (customer1, customer2) => {
    return (customer1.id !== customer2.id) && (customer1.emailAddress === customer2.emailAddress);
});

const filteredTransactions = filter(transactions, (value) => {
    return (value.amount > 0 && value.amount !== undefined && value.amount !== null) 
    && (value.product === 'FIG_JAM' || value.product === 'FIG_JELLY' || value.product === 'SPICY_FIG_JAM' || value.product === 'ORANGE_FIG_JELLY');
});

const mostRecentTransaction = findLast(filteredTransactions, (value) => {
    return value.amount > 200;
});


const reduced = reduce(transactions, {small: 0, medium: 0, large: 0}, (value, counted) => {  
    if (value.amount < 25) {
        counted.small+=1;
    }
    else if (value.amount < 75) {
        counted.medium+=1;
    }
    else {
        counted.large+=1;
    }
}
);


//Customers with at least one transaction over $200
const filteredOver200 = filter(filteredTransactions, (value) => {
    return value.amount > 200;
});

const pairedCustomers = pairIf(customers, filteredOver200, (customer, transaction) => {
    return customer.id === transaction.customerId;
});

const transactionsOver200 = reduce(pairedCustomers, [], (value, result) => {
    if (!result.includes(value[1]) && !result.includes(value[0])) {
        result.push(value[0]);
    }
});

const customersNames = map(transactionsOver200, (value) => {
    return value.firstName + ' ' + value.lastName;
});

console.log(`Number of invalid transactions: ${filteredTransactions.length}`);
console.log(`Number of duplicate customers: ${duplicate.length/2}`);
console.log(`Most recent transaction over $200: $${mostRecentTransaction.amount}`);
console.log(`Number of small transactions: ${reduced.small}`);
console.log(`Number of medium transactions: ${reduced.medium}`);
console.log(`Number of large transactions: ${reduced.large}`);

console.log('Customers with transactions over $200:');
console.log(transactionsOver200);
console.log('Names of customers with transactions over $200:');
console.log(customersNames);
