export let capitalizeFirstLetter = (str:string | null, fullName:boolean) => {
    if (!str) return;
    return fullName ? str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '): 
    str.charAt(0).toUpperCase();
}