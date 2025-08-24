export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.gameObjects = [];
    this.lastTime = 0;
    this.player = null; // 플레이어 객체를 저장할 변수
    this.npcs = []; // NPC 객체들을 저장할 배열
    this.items = []; // 아이템 객체들을 저장할 배열
    this.interactables = []; // 상호작용 가능한 객체들을 저장할 배열
    // 게임 루프 바인딩
    this.gameLoop = this.gameLoop.bind(this);
  }

  setPlayer(player) {
    this.player = player;
  }

  setNpcs(npcs) {
    this.npcs = npcs;
  }

  setItems(items) {
    this.items = items;
  }

  setInteractable(npcs, items) {
    this.interactable = [...npcs, ...items];
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
    // 플레이어와 NPC 상호작용 힌트 제공
    this.reanderInteractionHint();
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

  removeGameObject(objectToRemove) {
    this.items = this.items.filter(item => item !== itemToRemove);
    this.npcs = this.npcs.filter(npc => npc !== npcToRemove);
    // 각각의 배열에서 제거
    this.interactables = this.interactables.filter(obj => obj !== itemToRemove || obj !== npcToRemove);
    // 상호작용 가능 요소 배열에서 제거
    this.gameObjects = this.gameObjects.filter(obj => obj !== itemToRemove || obj !== npcToRemove);
    // 게임오브젝트에서 제거 (포함시) 이게 아마 모습이 없어지는 진정한 코드?!
  }

  reanderInteractionHint() {
      if (!this.player || this.interactable.length === 0) return; // 플레이어나 상호작용객체가 없으면 힌트 표시하지 않음
      if (this.player.inInteraction) return; // 플레이어가 상호작용 중이면 힌트 표시하지 않음
      if (!Array.isArray(this.interactable) || this.interactable.length === 0) return; // 상호작용 객체가 없으면 힌트 표시하지 않음

      const player = this.player;
      const interactable = this.interactable;
      // 상호작용 가능한 NPC나 아이템

      this.interactable.forEach(int => {
        const isNear = 
        (player.gridX + 1 === int.gridX && player.gridY === int.gridY) ||
        (player.gridX - 1 === int.gridX && player.gridY === int.gridY) ||
        (player.gridX === int.gridX && player.gridY + 1 === int.gridY) ||
        (player.gridX === int.gridX && player.gridY - 1 === int.gridY);
    
        if (isNear) {
          this.ctx.fillStyle = 'rgba(254, 254, 24, 1)'; // 상호작용 힌트 색상
          this.ctx.font = '12px Arial';
          this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          this.ctx.shadowBlur = 5;
          this.ctx.shadowOffsetX = 2;
          this.ctx.shadowOffsetY = 2;
          if (int.type === 'Npc') {
            this.ctx.fillText('F를 눌러 대화 시작하기', int.x - 35, int.y + 55);
          }
          else if (int.type === 'Item') {
            this.ctx.fillText(`${int.name} 줍기`, int.x - 10, int.y + 55);
          }

          this.ctx.shadowColor = 'transparent'; // 그림자 제거
        }
      });
  }
}
