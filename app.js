// app.js

// Set up module imports here
import Player from './models/Player.js';
import Game from './models/Game.js';
import Npc from './models/Npc.js';

// 게임 인스턴스
let game;
let player;
let npc;

// Main application code
function init() {
  console.log('Game Application initialized');
  
  // 게임 초기화
  game = new Game('gameCanvas');
  
  // 플레이어 생성 (그리드 중앙에 배치)
  const canvasSize = game.getCanvasSize();
  const cellSize = 40; // Player 클래스와 동일한 셀 크기
  const gridCenterX = Math.floor(canvasSize.width / cellSize / 2);
  const gridCenterY = Math.floor(canvasSize.height / cellSize / 2);
  
  player = new Player(
    gridCenterX * cellSize,  // x 위치 (그리드 중앙)
    gridCenterY * cellSize,  // y 위치 (그리드 중앙)
    40,  // 너비
    40,  // 높이
    '#4ecdc4'  // 색상
  );

  npc = new Npc(
    (gridCenterX + 2) * cellSize,  // x 위치 (그리드 중앙 오른쪽)
    gridCenterY * cellSize,  // y 위치 (그리드 중앙)
    40,  // 너비
    40,  // 높이
    '#ff6b6b'  // 색상
  );
  
  game.player = player; // 게임에 플레이어 객체 설정
  game.npc = npc; // 게임에 NPC 객체 설정

  // 게임에 플레이어 추가
  game.addGameObject(player);
  game.addGameObject(npc);

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