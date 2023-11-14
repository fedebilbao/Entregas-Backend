import { usersModel} from "../models/users.model.js"

class UsersManager {

    async findById(id){
        const response = await usersModel.findById(id);
        return response;
    }

    async findByEmail(email){
        const response = await usersModel.findOne({email});
        console.log (response);
        return response;
    }

    async createOne(obj){
        const response = await usersModel.create(obj);
        return response;
    }
}

export const usersManager = new UsersManager();