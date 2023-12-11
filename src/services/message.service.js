import { messageManager } from "../dao/managers/MessageManager.js";


export const findAll = () => {
    const messages = messageManager.findAll();
    return messages;
}

export const findById = (id) =>{
    const message = messageManager.findById(id);
    return message
}

export const createOne = (id) =>{
    const message = messageManager.createOne(id);
    return message
}

export const updateOne = (id,obj) =>{
    const message = messageManager.updateOne({_id: id }, obj);
    return message
}

export const deleteOne = (id) => {
    const message = messageManager.deleteOne ({_id: id})
    return message
}