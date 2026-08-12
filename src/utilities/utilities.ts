export let capitalizeFirstLetter = (str, fullName) => {

    return fullName ? str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '): 
    str.charAt(0).toUpperCase();
}