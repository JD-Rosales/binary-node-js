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
}

const fighterService = new FighterService();

export { fighterService };
