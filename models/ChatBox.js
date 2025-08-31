export default class ChatBox {
  constructor(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.messageHeader = '';
    this.message = '';
    this.topLeft = { x: topLeftX, y: topLeftY };
    this.bottomRight = { x: bottomRightX, y: bottomRightY };
    this.isShow = false;
    this.isUserInteracting = false;
  }

  setMessage(message) {
    this.message = message;
  }

  setMessageHeader(header) {
    this.messageHeader = header;
  }

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
    this.messageHeader = '';
    this.message = '';
  }

  async getUserResponse() {
    this.isUserInteracting = true;
    const thisbind = this;

    return new Promise((resolve) => {
      document.addEventListener('keydown', function handler(event) {
        document.removeEventListener('keydown', handler);
        thisbind.isUserInteracting = false;
        resolve(event.key.toLowerCase() === 'y');
      });
    });
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

    let drawYPosition = this.topLeft.y + 30;
    const lineHeight = 25;

    // 헤더 (일반적으로 NPC 이름)
    if (this.messageHeader) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(this.messageHeader, this.topLeft.x + 10, drawYPosition);
      drawYPosition += lineHeight;
    }

    // 대화 내용
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(this.message, this.topLeft.x + 10, drawYPosition);
    drawYPosition += lineHeight;

    if (this.isUserInteracting) {
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText('Yes(Y)', this.topLeft.x + 10, drawYPosition);
      ctx.fillText('No(N)', this.topLeft.x + 100, drawYPosition);
      drawYPosition += lineHeight;
    }

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