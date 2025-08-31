import Person from './Person.js';

// TODO: NPC에 붙어서 F키를 누르면 대화창이 뜨도록 구현

export default class Npc extends Person {
  constructor(data) {
    super(
      data.position.x * 40,
      data.position.y * 40,
      data.width,
      data.height,
      data.color
    );
    this.dialogue = data.dialogue;
  }

  update(canvasWidth, canvasHeight) {
    // NPC의 업데이트 로직 (예: AI 움직임)
  }

  draw(ctx) {
    super.draw(ctx);
  }

  getDialogue(status) {
    if (!status) {
      return this.dialogue.default;
    }
    return this.dialogue[status];
  }
}
