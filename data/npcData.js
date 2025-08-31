import { hiakintiaDialogue, patientDialogue } from "./dialogue.js"

const data = [
  {
    name: '간호사 - 히아킨티아',
    color: '#ff7ecbff',  // 색상
    dialogue: hiakintiaDialogue,
    position: { x: 11, y: 8 }
  },
  {
    name: '환자 - ',
    color: '#ff6b6b',  // 색상
    dialogue: patientDialogue,
    position: { x: 12, y: 11 }
  },
  {
    name: '환자 - 2',
    color: '#ff6b6b',  // 색상
    dialogue: patientDialogue,
    position: { x: 12, y: 13 }
  }
]

export default data;