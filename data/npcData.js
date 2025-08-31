/*
 * position x 범위: 0 ~ 19
 * position y 범위: 0 ~ 14
 */

const data = [
  {
    name: '환자',
    dialogue: {
      default: '난 여기 있을 사람이 아니야. 봐, 이렇게 멀쩡하잖아?'
    },
    position: { x: 11, y: 7 }
  },
  {
    name: '환자 2',
    dialogue: {
      default: '이곳은 위험해. 빨리 떠나는 게 좋겠어.'
    },
    position: { x: 4, y: 3 }
  },
  {
    name: '환자 3',
    dialogue: {
      default: '어제부터 저쪽 벽에서 이상한 소리가 들려...'
    },
    position: { x: 17, y: 13 }
  },
];

export default function getNpcData() {
  return data.map((npc, idx) => ({
    ...npc,
    id: idx,
    width: 40,
    height: 40,
    color: '#ff6b6b',
  }));
}
