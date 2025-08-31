// app.js

// Set up module imports here
import Player from './models/Player.js';
import Game from './models/Game.js';
import Npc from './models/Npc.js';
import ChatBox from './models/ChatBox.js';
import Item from './models/Item.js';
import Inventory from './models/Inventory.js';

// 게임 인스턴스
let game;
let player;
let npc1;
let npc2;
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
    const interactables = [npc1, npc2, item1]; // 상호작용 가능한 모든 객체 배열
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

  npc1 = new Npc(
    (gridCenterX + 1) * cellSize,  // x 위치 (플레이어의 바로 오른쪽)
    (gridCenterY + 1)* cellSize,  // y 위치 (플레이어의 바로 아래)
    40,  // 너비
    40,  // 높이
    '#ff7ecbff',  // 색상
    '간호사 - 히아킨티아', // 이름
    [
     '선생님이 일어나셨다아!!',
     '어머, 죄송해요!!',
     '..정신이 좀 드세요? 헤헤...',
     '정신을 차려보니 중환자 병동 안이네요...',
     '여긴 선생님이 담당하시던 환자들이 있던 곳이에요.',
     '여기에서 나가려면 비밀번호를 입력하는 특수한 문을 지나야 해요.',
     '이번 비밀번호는 335503336인데, 아까 입력해보니 안되더라고요...',
     '...벌써 비밀번호가 바뀔 시기가 다 되었나봐요.',
     '...어라?',
     '새로운 비밀번호 관련 정보가 분명 있었는데!',
     '아무래도 환자들이 비밀번호를 가져간 것 같아요!',
     '환자들과 대화해서 비밀번호를 알아내야겠어요...',
     '어라..? 저기 무언가가  떨어져 있네요?',
     '!!!',
     '저건 선생님의 신원 카드에요!',
     '다행히 옆에는 환자들의 진료 기록지도 있네요!',
     '저 정보들을 토대로 환자들과 대화할 수 있겠어요.',
     '물론, 환자들은 선생님이 알고 있는 것과 다른 정보를 제공할 수도 있어요',
     '그 점에 유의해서 힌트를 모아 탈출해 봅시다..!'
    ]  // 대화 내용
  );

  npc2 = new Npc(
    (gridCenterX + 2) * cellSize,  // x 위치 (그리드 중앙 오른쪽)
    (gridCenterY + 4) * cellSize,  // y 위치 (그리드 중앙)
    40,  // 너비
    40,  // 높이
    '#ff6b6b',  // 색상
    '환자 - ',// 이름
    ['무슨 일 일까요?'],  // 대화 내용
  );

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
  game.addGameObject(npc1);
  game.addGameObject(npc2);
  game.addGameObject(item1);
  game.addGameObject(chatBox);
  game.addGameObject(inventory);
  game.setPlayer(player);
  game.setNpcs([npc1, npc2]);
  game.setItems([item1]);
  game.setInteractable([npc1, npc2], [item1]);
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