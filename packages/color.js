function hexToDecimal(hexColor) {
    hexColor = hexColor.replace(/^#/, '');

    const decimalColor = parseInt(hexColor, 16);

    return decimalColor;
}

module.exports = {
    hexToDecimal
}
