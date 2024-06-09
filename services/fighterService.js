import { fighterRepository } from '../repositories/fighterRepository.js';

class FighterService {
  // TODO: Implement methods to work with fighters

  create(data) {
    const item = fighterRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllFighters() {
    const item = fighterRepository.getAll();
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
