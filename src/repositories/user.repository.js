export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUserByEmail = (email) => this.dao.getByEmail(email);

    createUser = (userData) => this.dao.create(userData);

    getUserById = (id) => this.dao.getById(id);
}