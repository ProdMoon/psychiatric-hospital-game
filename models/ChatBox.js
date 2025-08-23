export default class ChatBox {
  constructor(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.message = '';
    this.topLeft = { x: topLeftX, y: topLeftY };
    this.bottomRight = { x: bottomRightX, y: bottomRightY };
    this.isShow = false;
  }

  setMessage(message) {
    this.message = message;
  }
  
  setNpc(npc) {
    this.npc = npc;
  }

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }

  draw(ctx) {
    if (!this.isShow) {
      return;
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; //투명도 조절 가능 (0~1사이 값)
    ctx.fillRect(
      this.topLeft.x,
      this.topLeft.y,
      this.bottomRight.x - this.topLeft.x,
      this.bottomRight.y - this.topLeft.y
    );
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial bold';
    ctx.fillText(this.npc ? this.npc.name: '', this.topLeft.x + 10, this.topLeft.y + 30);

    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(this.message, this.topLeft.x + 10, this.topLeft.y + 60);

    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.font = '16px Arial';
    ctx.fillText('Press F to continue ▼', this.bottomRight.x - 170, this.bottomRight.y - 20);

    // 대화창 테두리
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.topLeft.x,
      this.topLeft.y,
      this.bottomRight.x - this.topLeft.x,
      this.bottomRight.y - this.topLeft.y
    );
  }
}