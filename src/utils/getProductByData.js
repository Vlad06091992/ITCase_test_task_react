import {getProductColor} from "../services/api";
import {getSizeToViewModel} from "./getSizeToViewModel";
import {store} from "../store/store";

export  const getProductByData = async (productId,colorId,sizeId,productIdUnical) => {
    const res = await getProductColor(productId,colorId)
    let sizeViewModel = getSizeToViewModel(store.sizes,sizeId)
    return {...res, size:sizeViewModel.label,productIdUnical }
}