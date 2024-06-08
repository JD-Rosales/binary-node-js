import { userRepository } from '../repositories/userRepository.js';

class UserService {
  // TODO: Implement methods to work with user

  create(data) {
    const item = userRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    const item = userRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }

  updateUser(id, dataToUpdate) {
    const item = userRepository.update(id, dataToUpdate);
    if (!item) {
      return null;
    }
    return item;
  }

  deleteUser(id) {
    const item = userRepository.delete(id);
    if (!item.length) {
      return null;
    }

    return item;
  }
}

const userService = new UserService();

export { userService };
