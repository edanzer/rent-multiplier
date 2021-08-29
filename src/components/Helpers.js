export const formatNumber = ( type, number ) => {
    if ( 'currency' === type ) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});
    } else if ( 'percent' === type ) {
        return number.toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2});
    }
}
