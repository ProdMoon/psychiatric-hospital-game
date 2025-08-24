import Person from './Person.js';

export default class Npc extends Person {
  constructor(x, y, width, height, color, name, dialogue) {
    super(x, y, width, height, color);
    this.name = name; // NPC 이름 저장
    this.type = 'Npc';
    this.dialogue = dialogue; // 대화 내용을 배열로 저장
    this.dialogueLength = dialogue.length;
  }


  update(canvasWidth, canvasHeight) {
    // NPC의 업데이트 로직 (예: AI 움직임)
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
