export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.gameObjects = [];
    this.lastTime = 0;
    this.keys = {}; // 키 입력 상태를 저장할 객체
    this.initInput();
    this.player = null; // 플레이어 객체를 저장할 변수
    this.npc = null; // NPC 객체를 저장할 변수
    
    // 게임 루프 바인딩
    this.gameLoop = this.gameLoop.bind(this);
  }
  

  initInput() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      if (e.code === 'KeyF' && this.npc?.isPlayerNear) {
        this.npc.isTalking = !this.npc.isTalking; 
        // F 키를 눌러 대화 시작/종료
      }
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }


  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }
  
  removeGameObject(gameObject) {
    const index = this.gameObjects.indexOf(gameObject);
    if (index > -1) {
      this.gameObjects.splice(index, 1);
    }
  }
  
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop();
    }
  }
  
  stop() {
    this.isRunning = false;
  }
  
  gameLoop(currentTime = 0) {
    if (!this.isRunning) return;
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // 캔버스 클리어
    this.clearCanvas();
    
    // 모든 게임 오브젝트 업데이트 및 그리기
    this.gameObjects.forEach(gameObject => {
      if (gameObject.update) {
        gameObject.update(this.canvas.width, this.canvas.height, deltaTime);
      }
      if (gameObject.draw) {
        gameObject.draw(this.ctx);
      }
    });
    
    // 다음 프레임 요청
    requestAnimationFrame(this.gameLoop);
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  getCanvasSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }
}
