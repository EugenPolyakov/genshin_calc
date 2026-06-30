export function debugLog(text){
    if (isDevel()) { console.log(text) }
}

function isDevel() {
    return typeof __DEVEL__ !== 'undefined' && __DEVEL__;
}