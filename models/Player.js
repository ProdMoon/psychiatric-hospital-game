import Person from './Person.js';
export default class Player extends Person {
  constructor(x, y, width, height, color, tryInteract) {
    super(x, y, width, height, color); // Person 클래스의 생성자 호출
    this.tryInteract = tryInteract; // 상호작용 함수 저장
    
    // 이동 상태 관리
    this.isMoving = false;
    this.moveDirection = null;
    this.moveProgress = 0;
    this.moveSpeed = 0.1; // 이동 속도 (0~1 사이의 값, 1에 가까울수록 빠름)
    
    // 이동 시작과 끝 위치
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = this.x;
    this.targetY = this.y;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      // 이미 이동 중이면 새로운 입력을 무시
      if (this.isMoving) return;
      
      switch(e.code) {
        case 'ArrowUp':
          this.startMove(0, -1);
          e.preventDefault();
          break;
        case 'ArrowDown':
          this.startMove(0, 1);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          this.startMove(-1, 0);
          e.preventDefault();
          break;
        case 'ArrowRight':
          this.startMove(1, 0);
          e.preventDefault();
          break;
        case 'KeyF':
          this.tryInteract(this.gridX, this.gridY);
          e.preventDefault();
          break;
      }
    });
  }
  
  startMove(deltaX, deltaY) {
    this.isMoving = true;
    this.moveProgress = 0;
    
    // 현재 위치를 시작점으로 설정
    this.startX = this.x;
    this.startY = this.y;
    
    // 목표 그리드 좌표 계산
    const newGridX = this.gridX + deltaX;
    const newGridY = this.gridY + deltaY;
    
    // 목표 픽셀 좌표 계산
    this.targetX = newGridX * this.cellSize;
    this.targetY = newGridY * this.cellSize;
    
    // 그리드 좌표 업데이트
    this.gridX = newGridX;
    this.gridY = newGridY;
  }
  
  update(canvasWidth, canvasHeight) {
    // 이동 중인 경우 애니메이션 처리
    if (this.isMoving) {
      this.moveProgress += this.moveSpeed;
      
      if (this.moveProgress >= 1) {
        // 이동 완료
        this.moveProgress = 1;
        this.isMoving = false;
      }
      
      // 현재 위치를 보간하여 계산
      this.x = this.lerp(this.startX, this.targetX, this.moveProgress);
      this.y = this.lerp(this.startY, this.targetY, this.moveProgress);
    }
    
    // 캔버스 경계 체크 (그리드 좌표 기준)
    const maxGridX = Math.floor(canvasWidth / this.cellSize) - 1;
    const maxGridY = Math.floor(canvasHeight / this.cellSize) - 1;
    
    this.gridX = Math.max(0, Math.min(this.gridX, maxGridX));
    this.gridY = Math.max(0, Math.min(this.gridY, maxGridY));
    
    // 경계를 벗어난 경우 실제 좌표도 수정
    if (!this.isMoving) {
      this.x = this.gridX * this.cellSize;
      this.y = this.gridY * this.cellSize;
    }
  }
  
  // 선형 보간 함수
  lerp(start, end, progress) {
    return start + (end - start) * progress;
  }
  
  draw(ctx) {
    // 그리드 라인 그리기 (디버깅용)
    this.drawGrid(ctx);
    
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
  
  // 그리드 라인 그리기 (시각적 도움)
  drawGrid(ctx) {
    const canvas = ctx.canvas;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // 세로 선
    for (let x = 0; x < canvas.width; x += this.cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // 가로 선
    for (let y = 0; y < canvas.height; y += this.cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
}
