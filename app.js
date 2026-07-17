const situations = [
  {id:'medical',icon:'✚',ja:'体調が悪い',en:'Medical help',phrases:['ambulance','pain','allergy','medicine']},
  {id:'lost',icon:'⌖',ja:'道に迷った',en:'I am lost',phrases:['station','hotel','phone','family']},
  {id:'danger',icon:'!',ja:'危険を感じる',en:'I feel unsafe',phrases:['police','followed','safeplace','stay']},
  {id:'disaster',icon:'≋',ja:'災害にあった',en:'Disaster',phrases:['evacuation','water','injured','together']}
];

const languages = {
  en:{name:'English',voice:'en-US'},ja:{name:'日本語',voice:'ja-JP'},zh:{name:'中文',voice:'zh-CN'},ko:{name:'한국어',voice:'ko-KR'},es:{name:'Español',voice:'es-ES'}
};

const copy = {
  ambulance:{icon:'✚',ja:'救急車を呼んでください',en:'Please call an ambulance.',zh:'请叫救护车。',ko:'구급차를 불러 주세요.',es:'Llame a una ambulancia.'},
  pain:{icon:'●',ja:'ここが痛いです',en:'It hurts here.',zh:'这里很痛。',ko:'여기가 아파요.',es:'Me duele aquí.'},
  allergy:{icon:'A',ja:'アレルギーがあります',en:'I have an allergy.',zh:'我有过敏症。',ko:'알레르기가 있어요.',es:'Tengo una alergia.'},
  medicine:{icon:'＋',ja:'薬が必要です',en:'I need medicine.',zh:'我需要药。',ko:'약이 필요해요.',es:'Necesito medicina.'},
  station:{icon:'⌖',ja:'駅はどこですか？',en:'Where is the station?',zh:'车站在哪里？',ko:'역이 어디예요?',es:'¿Dónde está la estación?'},
  hotel:{icon:'□',ja:'このホテルに行きたいです',en:'I need to get to this hotel.',zh:'我想去这家酒店。',ko:'이 호텔에 가고 싶어요.',es:'Necesito llegar a este hotel.'},
  phone:{icon:'☎',ja:'電話を貸してください',en:'May I use your phone?',zh:'可以借用您的电话吗？',ko:'전화를 빌려 주세요.',es:'¿Puedo usar su teléfono?'},
  family:{icon:'◎',ja:'家族とはぐれました',en:'I am separated from my family.',zh:'我和家人走散了。',ko:'가족과 헤어졌어요.',es:'Me separé de mi familia.'},
  police:{icon:'!',ja:'警察を呼んでください',en:'Please call the police.',zh:'请报警。',ko:'경찰을 불러 주세요.',es:'Llame a la policía.'},
  followed:{icon:'⇢',ja:'誰かにつけられています',en:'Someone is following me.',zh:'有人在跟踪我。',ko:'누군가 저를 따라오고 있어요.',es:'Alguien me está siguiendo.'},
  safeplace:{icon:'⌂',ja:'安全な場所へ連れて行ってください',en:'Please take me somewhere safe.',zh:'请带我去安全的地方。',ko:'안전한 곳으로 데려가 주세요.',es:'Lléveme a un lugar seguro.'},
  stay:{icon:'◉',ja:'助けが来るまで一緒にいてください',en:'Please stay until help arrives.',zh:'请陪我等到救援到来。',ko:'도움이 올 때까지 함께 있어 주세요.',es:'Quédese hasta que llegue ayuda.'},
  evacuation:{icon:'⇥',ja:'避難所はどこですか？',en:'Where is the evacuation shelter?',zh:'避难所在哪里？',ko:'대피소가 어디예요?',es:'¿Dónde está el refugio?'},
  water:{icon:'◒',ja:'水が必要です',en:'I need water.',zh:'我需要水。',ko:'물이 필요해요.',es:'Necesito agua.'},
  injured:{icon:'✚',ja:'けがをした人がいます',en:'Someone is injured.',zh:'有人受伤了。',ko:'다친 사람이 있어요.',es:'Hay una persona herida.'},
  together:{icon:'∞',ja:'一緒に避難しましょう',en:"Let's evacuate together.",zh:'我们一起避难吧。',ko:'함께 대피해요.',es:'Evacuemos juntos.'}
};

const grid=document.querySelector('#situationGrid');
const panel=document.querySelector('#phrasePanel');
const list=document.querySelector('#phraseList');
const dialog=document.querySelector('#displayDialog');
const languageSelect=document.querySelector('#languageSelect');
let currentPhrase=null;
let soundOn=true;

situations.forEach(s=>{
  const button=document.createElement('button');
  button.className='situation-card';button.type='button';
  button.innerHTML=`<span class="situation-icon" aria-hidden="true">${s.icon}</span><strong>${s.ja}</strong><small>${s.en}</small>`;
  button.addEventListener('click',()=>openSituation(s));grid.append(button);
});

function openSituation(s){
  document.querySelector('#selectedContext').textContent=`${s.icon} ${s.ja} / ${s.en}`;
  list.replaceChildren();
  s.phrases.forEach(key=>{
    const p=copy[key],button=document.createElement('button');
    button.className='phrase-button';button.type='button';
    button.innerHTML=`${p.ja}<span aria-hidden="true">→</span>`;
    button.addEventListener('click',()=>showPhrase(key));list.append(button);
  });
  panel.hidden=false;panel.scrollIntoView({behavior:'smooth'});
}

function showPhrase(key){
  currentPhrase=key;const p=copy[key],lang=languageSelect.value;
  document.querySelector('#displayLanguage').textContent=languages[lang].name;
  document.querySelector('#displayIcon').textContent=p.icon;
  document.querySelector('#displayText').textContent=p[lang];
  document.querySelector('#displayOriginal').textContent=lang==='ja'?'':p.ja;
  dialog.showModal();if(soundOn)speak();
}

function speak(){
  if(!currentPhrase||!('speechSynthesis'in window))return;
  speechSynthesis.cancel();const lang=languageSelect.value;
  const utterance=new SpeechSynthesisUtterance(copy[currentPhrase][lang]);
  utterance.lang=languages[lang].voice;utterance.rate=.82;speechSynthesis.speak(utterance);
}

document.querySelector('#startButton').addEventListener('click',()=>document.querySelector('#communicator').scrollIntoView({behavior:'smooth'}));
document.querySelector('#backButton').addEventListener('click',()=>document.querySelector('#communicator').scrollIntoView({behavior:'smooth'}));
document.querySelector('#closeDialog').addEventListener('click',()=>dialog.close());
document.querySelector('#doneButton').addEventListener('click',()=>dialog.close());
document.querySelector('#speakButton').addEventListener('click',speak);
document.querySelector('#soundToggle').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.setAttribute('aria-pressed',soundOn);if(!soundOn&&'speechSynthesis'in window)speechSynthesis.cancel()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open)dialog.close()});

if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
