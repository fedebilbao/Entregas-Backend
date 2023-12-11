import{ messageModel } from "../models/views.model"

class MessageManager {

    async findAll(){
        const result = await messageModel.find()
        return result;

    }
    async findById(id){
        const result = await messageModel.findById(id);
        return result

    }
    async createOne(obj){
        const result = await messageModel.create(obj)
        return result
    }
    async updateOne(id,obj){
        const result = await messageModel.updateOne({_id: id }, obj);
        return result

    }
    async deleteOne(id){
        const result = await messageModel.deleteOne ({_id: id})
        return result
    }
}


export const messageManager = new MessageManager()