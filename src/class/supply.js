import Substance from './substance.js';

//Apply类表示游戏中的补给物品

class Supply extends Substance {
  constructor() {
    super();
    this.name = '';
    this.state = 'appear';
  }
}

export default Supply;