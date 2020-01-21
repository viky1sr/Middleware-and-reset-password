const randomKey = (length, chars) => {
    var temp = ''
    if (chars.indexOf('a') > -1) temp += 'abcdefghijklmnopqrstuvwxyz'
    if (chars.indexOf('A') > -1) temp += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (chars.indexOf('#') > -1) temp += '01233456789'
    if (chars.indexOf('!') > -1) temp += "~`!@#$%^&*()_+-={}[];'\":,./<>?\|"
    
    var result=''
    for (var i = length; i > 0; i--)     
    result += temp[Math.floor(Math.random() * temp.length)]

    return result
}
module.exports = { randomKey }