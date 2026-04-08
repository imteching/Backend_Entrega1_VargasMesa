import { UserModel } from "../../models/user.model";

export default class UserDAO {
    getByEmail = (email) => {
        return UserModel.findOne({ email });
    };

    create = (userData) => {
        return UserModel.create(userData);
    };

    getById = (id) => {
        return UserModel.findById(id);
    };
}