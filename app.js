// app.js

// Set up module imports here
import Player from './models/Player.js';
import Game from './models/Game.js';
import Npc from './models/Npc.js';
import ChatBox from './models/ChatBox.js';
import Item from './models/Item.js';
import Inventory from './models/Inventory.js';
import npcData from './data/npcData.js';

// 게임 인스턴스
let game;
let player;
let npcs = [];
let item1;

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

  // 인벤토리 생성
  const inventory = new Inventory(150, canvasSize.height - 150, canvasSize.width, canvasSize.height);

  // NPC 상호작용 함수
  function tryInteract(gridX, gridY) {
    const interactables = [...npcs, item1]; // 상호작용 가능한 모든 객체 배열
    interactables.forEach(obj => {
      if (
        gridX + 1 === obj.gridX && gridY === obj.gridY ||
        gridX - 1 === obj.gridX && gridY === obj.gridY ||
        gridX === obj.gridX && gridY + 1 === obj.gridY ||
        gridX === obj.gridX && gridY - 1 === obj.gridY
      ) 
       if (chatBox.isShow && player.currentNpc === obj) {
        const obj = player.currentNpc;
        if(player.talkingProgress < obj.dialogueLength) {
        chatBox.setMessage(obj.dialogue[player.talkingProgress]);
        chatBox.setNpc(obj);
        chatBox.show();
        }

        else if (player.talkingProgress === obj.dialogueLength){
        player.talkingProgress = 0;
        player.inInteraction = false; // 대화가 끝나면 상호작용 중지
        player.currentNpc = null;
        chatBox.hide();
        }
      }
       else if (player.talkingProgress === 0 && obj.type === 'Npc') {
        chatBox.setMessage(obj.dialogue[0]);
        chatBox.setNpc(obj);
        chatBox.show();
        player.currentNpc = obj;
        player.talkingProgress = 0;
        player.inInteraction = true; // 대화창이 열리면 상호작용 상태 변경
      }
        else if (obj.type === 'Item') {
        chatBox.setMessage(`**${obj.name} 를 획득했다!**`);
        chatBox.setNpc(null);
        chatBox.setItem(obj);
        chatBox.show();
        player.inInteraction = true;
        //2초 뒤에 채팅박스 자동으로 닫기
        setTimeout(() => {
          chatBox.hide();
          player.inInteraction = false;
          removeGameObject(obj);
        }, 2000);
        // 아이템 획득 처리
        player.obtainItem(obj);
        }
    });
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

  for (let i = 0; i < npcData.length; i++) {
    const npcDatum = npcData[i];
    npcs.push(new Npc(
      npcDatum.position.x * cellSize,
      npcDatum.position.y * cellSize,
      40,
      40,
      npcDatum.color,
      npcDatum.name,
      npcDatum.dialogue
    ));
  }

  item1 = new Item(
    (gridCenterX - 1) * cellSize,  // x 위치 (그리드 중앙 오른쪽)
    (gridCenterY - 1) * cellSize,  // y 위치 (그리드 중앙)
    20,  // 너비
    20,  // 높이
    'ID 카드', // 이름
    '#7bef60ff',  // 색상
  );
  
  // 게임에 플레이어 추가
  game.addGameObject(player);
  npcs.forEach(npc => game.addGameObject(npc));
  game.addGameObject(item1);
  game.addGameObject(chatBox);
  game.addGameObject(inventory);
  game.setPlayer(player);
  game.setNpcs(npcs);
  game.setItems([item1]);
  game.setInteractable(npcs, [item1]);
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