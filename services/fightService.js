import { fightRepository } from '../repositories/fightRepository.js';

class FightsService {
  // OPTIONAL TODO: Implement methods to work with fights

  create(data) {
    const item = fightRepository.create(data);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fightsService = new FightsService();

export { fightsService };
