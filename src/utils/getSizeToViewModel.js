export const getSizeToViewModel = (sizes,sizeNumber)=>{
    const size = sizes.find(el=> el.id === sizeNumber)
    return {label:`${size.label}(${size.number})`, value:size.id,id:size.id}
}