export default class Person {
  constructor(x, y, width, height, color = '#ff6b6b') {
    this.cellSize = 40; // 그리드 한 칸의 크기
    this.width = width;
    this.height = height;
    this.color = color;

    // 그리드 좌표로 변환
    this.gridX = Math.floor(x / this.cellSize);
    this.gridY = Math.floor(y / this.cellSize);

    // 실제 픽셀 좌표 (그리드 좌표 기반으로 계산)
    this.x = this.gridX * this.cellSize;
    this.y = this.gridY * this.cellSize;
  }

  setGridPosition(gridX, gridY) {
    this.x = gridX * this.cellSize;
    this.y = gridY * this.cellSize;
    this.gridX = gridX;
    this.gridY = gridY;
  }

  update(canvasWidth, canvasHeight) {
    
  }
  
  draw(ctx) {
    // 플레이어를 간단한 사각형으로 그리기
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // 테두리 추가
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    // 얼굴 표현 (간단한 눈)
    ctx.fillStyle = '#333';
    ctx.fillRect(this.x + 5, this.y + 5, 3, 3);
    ctx.fillRect(this.x + this.width - 8, this.y + 5, 3, 3);
  }
}