// app.js

// Set up module imports here
import Player from './models/Player.js';
import Game from './models/Game.js';
import Npc from './models/Npc.js';
import ChatBox from './models/ChatBox.js';
import getNpcData from './data/npcData.js';

// 게임 인스턴스
let game;
let player;
const npcs = [];
window.gameStatus = 'default';

// Main application code
function init() {
  console.log('Game Application initialized');
  
  // 게임 초기화
  game = new Game('gameCanvas');
  
  const canvasSize = game.getCanvasSize();
  const cellSize = 40; // Player 클래스와 동일한 셀 크기
  const gridCenterX = Math.floor(canvasSize.width / cellSize / 2);
  const gridCenterY = Math.floor(canvasSize.height / cellSize / 2);

  // 하단 채팅 상자 생성
  const chatBox = new ChatBox(0, canvasSize.height - 150, canvasSize.width, canvasSize.height);

  // NPC 상호작용 함수
  async function tryInteract(gridX, gridY) {
    if (chatBox.isShow) {
      chatBox.hide();
      return;
    }
    for (let i = 0; i < npcs.length; i++) {
      const npc = npcs[i];
      if (
        gridX + 1 === npc.gridX && gridY === npc.gridY ||
        gridX - 1 === npc.gridX && gridY === npc.gridY ||
        gridX === npc.gridX && gridY + 1 === npc.gridY ||
        gridX === npc.gridX && gridY - 1 === npc.gridY
      ) {
        if (npc.name) {
          chatBox.setMessageHeader(`[${npc.name}]`);
        }
        chatBox.setMessage(npc.getDialogue(window.gameStatus));
        chatBox.show();
        if (npc.onInteract && npc.onInteract[window.gameStatus]) {
          const isYes = await chatBox.getUserResponse();
          npc.onInteract[window.gameStatus](isYes);
          chatBox.hide();
        }
        break; // 첫 번째로 만나는 NPC와만 상호작용
      }
    }
  }
  
  // 플레이어 생성 (그리드 중앙에 배치)
  player = new Player(
    gridCenterX * cellSize,  // x 위치 (그리드 중앙)
    gridCenterY * cellSize,  // y 위치 (그리드 중앙)
    40,  // 너비
    40,  // 높이
    '#4ecdc4',  // 색상
    tryInteract  // 상호작용 함수
  );

  const npcData = getNpcData();
  npcData.forEach(data => {
    const npc = new Npc(data);
    npcs.push(npc);
  });
  
  // 게임에 플레이어 추가
  game.addGameObject(player);
  npcs.forEach(npc => game.addGameObject(npc));
  game.addGameObject(chatBox);

  // 게임 시작
  game.start();
  
  console.log('Game started! Use arrow keys to move the character.');
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// Export any functions or variables that need to be used in other modules
export {
  init
};