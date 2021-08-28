export const getPricesOnly = ( startingArray, propertyName ) => {
    const newArray = [];
    for (let i = 0; i < startingArray.length;  i++) {
        newArray.push( startingArray[i][propertyName]);
    }
    return newArray;
}

export const calculateAverage = ( array ) => {
    const average = array.reduce( function (sum, value) {
        return sum + value;
    }, 0) / array.length;
    return average;
}

export const formatNumber = ( type, number ) => {
    if ( 'currency' === type ) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
    } else if ( 'percent' === type ) {
        return number.toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2});
    }
}
