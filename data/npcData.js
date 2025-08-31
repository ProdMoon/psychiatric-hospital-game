/*
 * position x 범위: 0 ~ 19
 * position y 범위: 0 ~ 14
 */

const data = [
  {
    id: 'patient1',
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '난 여기 있을 사람이 아니야. 봐, 이렇게 멀쩡하잖아?',
      foundDeadBody: '으악! 으아아악!',
      phase2: '난 여기 있을 사람이 아니야. 난 여기 있을 사람이 아니야. 난 여기 있을 사람이 아니야. 난 여기 있을 사람이 아니야. 난 여기 있을 사람이 아니야.',
      end: '너도 나랑 같은 사람이야.',
    },
    position: { x: 17, y: 9 },
    onInteract: {
      phase2: (key) => {
        if (key === 'y') {
          window.gameNpcs
            .find(npc => npc.id === 'patient1')
            .setDialogue('phase2', '난 여기 있을 사람이 아니야. 날 이곳에 집어넣은 자식을 평생 저주하겠어.')
            .setInteraction('phase2', undefined);
          
          window.gameNpcs
            .find(npc => npc.id === 'nurse')
            .setDialogue('phase2', '저 환자분은 늘 그런 말씀을 하세요. 너무 신경쓰지 마세요.');

          window.gameNpcs
            .find(npc => npc.id === 'patient2')
            .setDialogue('phase2', '이곳을 빨리 떠나고 싶은가?')
            .setInteraction('phase2', (key) => {
              if (key === 'y') {
                window.gameStatus = 'end';
                window.gamePlayer.setGridPosition(17, 7);
                window.gamePlayer.color = '#ff6b6b';
                window.gameNpcs
                  .find(npc => npc.id === 'patient1')
                  .setGridPosition(17, 9);
              } else if (key === 'n') {
                window.gameStatus = 'default';
              }
            });
        }
      },
    }
  },
  {
    id: 'patient2',
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '이곳은 위험해. 빨리 떠나는 게 좋겠어.',
      foundDeadBody: '으악! 으아아악!',
      end: '너도 나랑 같은 사람이야.',
    },
    position: { x: 17, y: 11 },
  },
  {
    id: 'patient3',
    name: '환자',
    color: '#ff6b6b',
    dialogue: {
      default: '어제부터 저쪽 벽에서 이상한 소리가 들려...',
      foundDeadBody: '으악! 으아아악!',
      phase2: '뭐라고? 이상한 소리라니... 들은 적 없어.',
      end: '너도 나랑 같은 사람이야.',
    },
    position: { x: 17, y: 13 },
  },
  {
    id: 'wall',
    color: '#ffffff00',
    dialogue: {
      default: '벽에 작은 균열이 있다... 꺼내볼까?',
      foundDeadBody: '균열을 건드렸더니 무너져 내렸다. 뒤틀린 시체가 발견되었다...',
      phase2: '단단해 보이는 벽이다.',
      end: '단단해 보이는 벽이다.',
    },
    position: { x: -1, y: 13 },
    onInteract: {
      default: (key) => {
        if (key === 'y') {
          window.gameStatus = 'foundDeadBody';
        }
      },
    },
  },
  {
    id: 'nurse',
    name: '간호사',
    color: '#1a535c',
    dialogue: {
      default: '충분한 수면을 취하세요. 그렇지 않으면 환각이 올 수 있어요.',
      foundDeadBody: '잠을 충분히 자지 않으셨군요? 잠을 충분히 주무셔야 해요!',
      phase2: '환각이 보인다구요? 무슨 말씀을 하시는 거죠?',
      end: '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하'
    },
    position: { x: 13, y: 0 },
    onInteract: {
      foundDeadBody: (key) => {
        if (key === 'y') {
          window.gameStatus = 'phase2';
          window.gamePlayer.setGridPosition(10, 7);
          window.gameNpcs
            .find(npc => npc.id === 'patient1')
            .setGridPosition(17, 3);
        }
      },
    },
  },
];

export default function getNpcData() {
  return data.map((npc) => ({
    ...npc,
    width: 40,
    height: 40,
  }));
}
