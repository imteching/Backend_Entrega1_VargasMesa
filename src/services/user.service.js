import { createHash, isValidPassword } from "../utils/hash";

export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    register = async (userData) => {
        const exists = await this.userRepository.getUserByEmail(userData.email);
        if (exists) throw new Error("User already exists");

        userData.password = createHash(userData.password);

        return this.userRepository.createUser(userData);
    };

    login = async (email, password) => {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error("User not found");

        if (!isValidPassword(user, password))
            throw new Error("Invalid credentials");

        return user;
    };
}