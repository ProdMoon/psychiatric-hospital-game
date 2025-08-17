import Person from './Person.js';

// TODO: NPC에 붙어서 F키를 누르면 대화창이 뜨도록 구현

export default class Npc extends Person {
  constructor(x, y, width, height, color = '#ff6b6b') {
    super(x, y, width, height, color);
    this.isTalking = false; // 대화 상태
    this.isPlayerNear = false; // 플레이어가 근처에 있는지 여부
  }

  update(canvasWidth, canvasHeight) {
    // NPC의 업데이트 로직 (예: AI 움직임)
  }

  draw(ctx) {
    super.draw(ctx);


    if (this.isTalking){
      // 대화 창 표시
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x, this.y - 40, 160, 20);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText("...선생님 일어나셨나요?", this.x + 5, this.y - 15);
    }
    else if (this.isPlayerNear){
      // 상호작용 위한 안내 표시
      ctx.font = '12px Arial';
      ctx.fillStyle = '#ffff00'
      ctx.fillText("F 키를 눌러 대화", this.x, this.y -10);
    }

    //여기에 대화창을 만들면 될 것 같다.

  }
}
