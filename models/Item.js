export default class Item {
  constructor(x, y, width, height, name , color = '#7bef60ff') {
    this.cellSize = 40; // 그리드 한 칸의 크기
    this.width = width;
    this.height = height;
    this.color = color;
    this.name = name;
    this.type = 'Item';

    // 그리드 좌표로 변환
    this.gridX = Math.floor(x / this.cellSize);
    this.gridY = Math.floor(y / this.cellSize);

    // 실제 픽셀 좌표 (그리드 좌표 기반으로 계산)
    this.x = this.gridX * this.cellSize;
    this.y = this.gridY * this.cellSize;
  }

  update(canvasWidth, canvasHeight) {
    
  }
  
  draw(ctx) {
    // 사물을 간단한 사각형으로 그리기
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + 10, this.y + 10, this.width, this.height);
    
    // 테두리 추가
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + 10, this.y + 10, this.width, this.height);
  }
}