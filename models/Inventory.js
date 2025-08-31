export default class Inventory {
    constructor(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.item = [];
    this.topLeft = { x: topLeftX, y: topLeftY };
    this.bottomRight = { x: bottomRightX, y: bottomRightY };
    this.isShow = false;
}

setplayer(player){
    this.player = player;
}

setItem(){
    this.item = player.Inventory;
}

show(){
    this.isShow = true;
}

hide(){
    this.isShow = false;
}

draw(ctx) {
    if (!this.isShow) {
      return;
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; //투명도 조절 가능 (0~1사이 값)
    ctx.fillRect(
      this.topLeft.x,
      this.topLeft.y,
      this.bottomRight.x - this.topLeft.x,
      this.bottomRight.y - this.topLeft.y
    );

    //간단한 사각형으로 인벤토리 칸 분배
    

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


















