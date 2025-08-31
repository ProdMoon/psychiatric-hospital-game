/*
 * position x 범위: 0 ~ 19
 * position y 범위: 0 ~ 14
 */

const data = [
  {
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '난 여기 있을 사람이 아니야. 봐, 이렇게 멀쩡하잖아?',
      foundDeadBody: '으악! 으아아악!',
    },
    position: { x: 17, y: 9 },
  },
  {
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '이곳은 위험해. 빨리 떠나는 게 좋겠어.',
      foundDeadBody: '으악! 으아아악!',
    },
    position: { x: 17, y: 11 },
  },
  {
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '어제부터 저쪽 벽에서 이상한 소리가 들려...',
      foundDeadBody: '으악! 으아아악!',
    },
    position: { x: 17, y: 13 },
  },
  {
    color: '#ffffff00',
    dialogue: {
      default: '벽에 작은 균열이 있다... 꺼내볼까?',
      foundDeadBody: '균열을 건드렸더니 무너져 내렸다. 뒤틀린 시체가 발견되었다...',
    },
    position: { x: -1, y: 13 },
    onInteract: {
      default: (isYes) => {
        if (isYes) {
          window.gameStatus = 'foundDeadBody';
        }
      },
    },
  },
  {
    name: '간호사',
    color: '#1a535c',
    dialogue: {
      default: '충분한 수면을 취하세요. 그렇지 않으면 환각이 올 수 있어요.',
      foundDeadBody: '잠을 충분히 자지 않으셨군요? 잠을 충분히 주무셔야 해요!',
    },
    position: { x: 13, y: 0 },
    onInteract: {
      foundDeadBody: (isYes) => {
        if (isYes) {
          window.gameStatus = 'phase2';
        }
      },
    },
  },
];

export default function getNpcData() {
  return data.map((npc, idx) => ({
    ...npc,
    id: idx,
    width: 40,
    height: 40,
  }));
}
