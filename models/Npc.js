import Person from './Person.js';

// TODO: NPC에 붙어서 F키를 누르면 대화창이 뜨도록 구현

export default class Npc extends Person {
  constructor(x, y, width, height, color, dialogue) {
    super(x, y, width, height, color);
    this.dialogue = dialogue;
  }

  update(canvasWidth, canvasHeight) {
    // NPC의 업데이트 로직 (예: AI 움직임)
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
