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
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(
      this.topLeft.x,
      this.topLeft.y,
      this.bottomRight.x - this.topLeft.x,
      this.bottomRight.y - this.topLeft.y
    );

    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(this.message, this.topLeft.x + 10, this.topLeft.y + 30);

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