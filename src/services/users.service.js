import { usersManager } from "../dao/managers/usersManager.js";

export const findById = (id) =>{
    const user = usersManager.findById(id);
    return user
}

export const createOne = (id) =>{
    const user = usersManager.createOne(id);
    return user
}

export const findByEmail = (email) =>{
    const user = usersManager.findByEmail(email);
    return user
}