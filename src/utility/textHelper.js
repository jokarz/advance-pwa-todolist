

export const toTitleCase =  val => val.replace(/\w\S*/g,txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const toCapFirst = val => val.charAt(0).toUpperCase() + val.substr(1);

