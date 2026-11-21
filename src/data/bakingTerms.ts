export type DepartmentId = 'all' | 'baking' | 'pastry' | 'chocolate' | 'science';

export type SubjectDepartmentId = Exclude<DepartmentId, 'all'>;

export type MasteryStatus = 'unseen' | 'known' | 'unknown';

export interface BakingTerm {
  id: string;
  department: SubjectDepartmentId;
  departmentLabel: string;
  termKo: string;
  termOrigin: string;
  pronunciation: string;
  examFocus: string;
  definition: string;
  keySpec: string;
  practiceTip: string;
}

export interface DepartmentTab {
  id: DepartmentId;
  label: string;
  shortDesc: string;
}

export const DEPARTMENT_TABS: DepartmentTab[] = [
  {
    id: 'all',
    label: '전체 전공',
    shortDesc: '제과제빵과 2학년 전체 심화 용어',
  },
  {
    id: 'baking',
    label: '제빵·발효학',
    shortDesc: '사전반죽, 천연발효종 및 공정 이론',
  },
  {
    id: 'pastry',
    label: '제과·파티세리',
    shortDesc: '프랑스 구움과자, 크림 및 라미네이션',
  },
  {
    id: 'chocolate',
    label: '초콜릿·설탕공예',
    shortDesc: '템퍼링 결정학 및 당류 공예 기법',
  },
  {
    id: 'science',
    label: '재료과학·위생',
    shortDesc: '단백질·전분 화학 및 HACCP 위생 관리',
  },
];

export const BAKING_TERMS: BakingTerm[] = [
  // 제빵·발효학 (7)
  {
    id: 'bake-01',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '오토리즈',
    termOrigin: 'Autolyse',
    pronunciation: '오토리즈 · 불어 자가분해',
    examFocus: '2학년 심화 · 발효제빵 실기',
    definition:
      '본 반죽 전 밀가루와 물만 먼저 섞어 일정 시간 휴지시키는 공정이다. 글루텐 형성이 자연스럽게 시작되고 전분이 수분을 충분히 흡수해 믹싱 시간을 단축한다.',
    keySpec: '휴지 20~60분 · 소금/이스트 제외',
    practiceTip:
      '바게트나 깜빠뉴처럼 껍질이 바삭하고 기공이 불규칙한 하드 브레드에서 산화 억제와 풍미 보존을 위해 필수적으로 적용한다.',
  },
  {
    id: 'bake-02',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '폴리쉬',
    termOrigin: 'Poolish',
    pronunciation: '폴리쉬 · 액상 사전반죽',
    examFocus: '국가자격·심화 필기 빈출',
    definition:
      '밀가루와 물을 1:1(수분율 100%) 비율로 섞고 소량의 생이스트(0.1~0.5%)를 넣어 발효시키는 액상 사전반죽(Pre-ferment)법이다.',
    keySpec: '수분율 100% · 발효 12~16시간',
    practiceTip:
      '표면에 잔거품이 올라오고 가운데가 살짝 가라앉기 시작할 때가 최적 사용 시점이다. 완성된 빵은 신전성이 좋고 크러스트가 얇고 바삭하다.',
  },
  {
    id: 'bake-03',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '비가',
    termOrigin: 'Biga',
    pronunciation: '비가 · 이탈리아식 된 사전반죽',
    examFocus: '2학년 심화 · 발효공정',
    definition:
      '이탈리아에서 유래한 된 반죽 형태의 사전반죽으로, 수분율 50~60%의 단단한 반죽에 소량의 이스트를 넣고 서늘하게 장기 발효한다.',
    keySpec: '수분율 50~60% · 온도 15~18°C',
    practiceTip:
      '치아바타나 파네토네처럼 수분 함량이 높거나 무거운 부재료가 들어가는 반죽의 뼈대(글루텐 탄력)를 보강할 때 사용한다.',
  },
  {
    id: 'bake-04',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '르방 리퀴드',
    termOrigin: 'Levain Liquide',
    pronunciation: '르방 리퀴드 · 액상 천연발효종',
    examFocus: '2학년 실기 · 사워도우',
    definition:
      '밀가루와 물을 동량으로 리프레시하여 야생 효모와 유산균을 공생 배양하는 천연발효종이다. 초산보다 젖산 생성 비율이 높아 부드러운 산미를 낸다.',
    keySpec: '수분율 100% · 적정 pH 4.0~4.3',
    practiceTip:
      '리프레시 후 부피가 2.5~3배로 부풀고 윗면이 돔 형태를 유지하는 피크 시점에 본 반죽에 투입해야 팽창력이 극대화된다.',
  },
  {
    id: 'bake-05',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '베이커스 퍼센트',
    termOrigin: "Baker's Percentage",
    pronunciation: '제빵 배합표 기준 비율',
    examFocus: '전공 필수 · 배합 계산',
    definition:
      '배합표에서 총 밀가루 무게를 100%로 고정하고, 나머지 모든 재료의 무게를 밀가루 대비 백분율로 환산하여 표기하는 제과제빵 표준 계량법이다.',
    keySpec: '밀가루 = 100% · 재료 합계 > 100%',
    practiceTip:
      '총 비율 합계로 분할 무게를 나누면 원하는 총 반죽량에 맞춰 각 재료의 g 수를 즉시 스케일링할 수 있어 실기시험 배합 수정에 필수적이다.',
  },
  {
    id: 'bake-06',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '오븐 스프링',
    termOrigin: 'Oven Spring',
    pronunciation: '오븐 팽창 · 굽기 초기 급팽창',
    examFocus: '필기·실기 핵심',
    definition:
      '반죽이 오븐에 들어간 직후 약 10~12분 동안 급격히 부피가 커지는 현상이다. 잔존 이스트의 최종 가스 생성, 기체 열팽창, 알코올 및 수분 기화가 복합 작용한다.',
    keySpec: '반죽 중심부 55~60°C 도달 시 정지',
    practiceTip:
      '초기 스팀 분사는 크러스트 형성을 늦춰 오븐 스프링을 극대화한다. 반대로 껍질이 너무 빨리 굳으면 옆면이 터지는 블로우아웃이 발생한다.',
  },
  {
    id: 'bake-07',
    department: 'baking',
    departmentLabel: '제빵·발효학',
    termKo: '전분 노화',
    termOrigin: 'Starch Retrogradation',
    pronunciation: '레트로그라데이션 · 굽기 후 경화',
    examFocus: '2학년 이론 · 저장성 관리',
    definition:
      '호화된 α-전분이 식으면서 수분을 잃고 아밀로오스·아밀로펙틴 사슬이 재결정화되어 β-전분으로 돌아가 빵 속질이 딱딱하고 푸석해지는 현상이다.',
    keySpec: '최대 가속 온도 0~4°C (냉장 온도)',
    practiceTip:
      '빵을 냉장 보관하면 노화가 가장 빠르게 진행되므로, 당일 소비하지 않을 빵은 밀봉 후 -18°C 이하로 급속 냉동해야 품질이 유지된다.',
  },

  // 제과·파티세리 (7)
  {
    id: 'past-01',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '파트 아 슈',
    termOrigin: 'Pâte à Choux',
    pronunciation: '파트 아 슈 · 호화 반죽',
    examFocus: '2학년 실기 · 에클레어/파리브레스트',
    definition:
      '물·우유, 버터, 소금을 끓인 뒤 박력분·강력분을 넣어 전분을 완전히 호화(α화)시키고, 달걀을 분할 투입해 수증기 압력으로 팽창시키는 이중 가열 반죽이다.',
    keySpec: '전분 호화 80°C 이상 · 바닥 얇은 피막 형성',
    practiceTip:
      '달걀 투입 시 반죽을 주걱으로 들었을 때 4~5cm 길이의 매끄러운 역삼각형(V자)을 그리며 천천히 떨어지는 농도가 이상적이다.',
  },
  {
    id: 'past-02',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '파트 푀이테',
    termOrigin: 'Pâte Feuilletée',
    pronunciation: '파트 푀이테 · 퍼프 페이스트리',
    examFocus: '2학년 심화 · 라미네이션',
    definition:
      '데트랑프(반죽) 안에 뵈라주(충전용 유지)를 감싸고 3절 또는 4절 접기를 반복하여 밀가루 반죽과 유지 층을 수백 겹으로 교차 적층한 파이 반죽이다.',
    keySpec: '적정 작업 온도 14~16°C · 휴지 30분 이상',
    practiceTip:
      '충전 유지와 반죽의 경도가 같아야 밀어 펴기 시 유지가 찢어지거나 삐져나오지 않는다. 굽기 전 냉장 휴지로 글루텐 수축을 방지한다.',
  },
  {
    id: 'past-03',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '크렘 파티시에르',
    termOrigin: 'Crème Pâtissière',
    pronunciation: '커스터드 크림 · 파티시에 크림',
    examFocus: '기초·심화 전 공정 필수',
    definition:
      '우유, 달걀노른자, 설탕, 전분(옥수수전분 또는 박력분)을 함께 끓여 전분 호화와 난황 단백질 응고로 점성을 잡은 프랑스 기본 커스터드 크림이다.',
    keySpec: '살균 및 호화 82~85°C · 끓인 후 1분 이상 교반',
    practiceTip:
      '완성 즉시 넓은 트레이에 얇게 펴 랩을 밀착(피막 방지)시킨 뒤 얼음물 중탕으로 급속 냉각해야 식중독균(황색포도상구균) 증식을 막는다.',
  },
  {
    id: 'past-04',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '크렘 앙글레즈',
    termOrigin: 'Crème Anglaise',
    pronunciation: '앙글레즈 소스 · 바닐라 커스터드 소스',
    examFocus: '무스·바바루아 베이스',
    definition:
      '전분 없이 우유, 설탕, 달걀노른자만을 약한 불에서 가열해 난황 단백질의 열응고만으로 걸쭉한 농도(나페 상태)를 낸 유동성 소스다.',
    keySpec: '목표 온도 82~84°C · 85°C 초과 시 응고 분리',
    practiceTip:
      '주걱 뒷면에 크림을 묻혀 손가락으로 선을 그었을 때 흐르지 않고 경계가 선명히 남는 "아 라 나페(à la nappe)" 상태에서 즉시 불을 끈다.',
  },
  {
    id: 'past-05',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '이탈리안 머랭',
    termOrigin: 'Meringue Italienne',
    pronunciation: '이탈리안 머랭 · 시럽 가열 머랭',
    examFocus: '무스·마카롱·버터크림 심화',
    definition:
      '거품을 낸 달걀흰자에 118~121°C(소프트 볼 단계)로 끓인 뜨거운 설탕 시럽을 가늘게 흘려 넣으며 휘핑해 만든 안정성과 광택이 가장 뛰어난 머랭이다.',
    keySpec: '시럽 온도 118~121°C · 40°C 이하까지 냉각 휘핑',
    practiceTip:
      '시럽이 볼 벽면이나 휘퍼 날개에 닿으면 설탕 결정이 튀어 덩어리지므로 흰자 표면을 향해 가늘고 일정한 줄기로 부어야 한다.',
  },
  {
    id: 'past-06',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '사블라주',
    termOrigin: 'Sablage',
    pronunciation: '사블라주 · 모래알 기법',
    examFocus: '타르트 · 파트 브리제/쉬크레',
    definition:
      '차가운 버터를 밀가루와 섞어 모래알(Sable)처럼 잘게 부수어 코팅한 뒤 수분을 넣는 혼합법이다. 밀가루 입자를 유지로 피복해 글루텐 형성을 최소화한다.',
    keySpec: '버터 온도 10~14°C · 바삭하고 부서지는 식감',
    practiceTip:
      '크림화법(Crémage)보다 수축이 적고 바삭한 타르트 쉘을 만들 때 적합하다. 반죽이 치대지지 않도록 프레자주(Fraisage)로 마무리한다.',
  },
  {
    id: 'past-07',
    department: 'pastry',
    departmentLabel: '제과·파티세리',
    termKo: '블루밍 (젤라틴 수화)',
    termOrigin: 'Gelatin Blooming',
    pronunciation: '젤라틴 불리기 · 수화 공정',
    examFocus: '무스·글라사주 실기',
    definition:
      '판 젤라틴이나 가루 젤라틴을 차가운 물에 담가 수분을 흡수시켜 팽윤시키는 전처리 과정이다. 열에 녹기 전 균일한 3차원 망상구조 형성을 돕는다.',
    keySpec: '찬물(10°C 이하) 5~10분 · 가루 젤라틴 1:5 비율',
    practiceTip:
      '젤라틴을 80°C 이상의 액체에 넣고 팔팔 끓이면 단백질 결합력이 손상되어 응고력이 크게 떨어지므로 50~60°C에서 녹여 사용한다.',
  },

  // 초콜릿·설탕공예 (7)
  {
    id: 'choc-01',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '템퍼링',
    termOrigin: 'Chocolate Tempering',
    pronunciation: '초콜릿 온도 조절 · 전결정화',
    examFocus: '2학년 쇼콜라티에 필수',
    definition:
      '커버춰 초콜릿의 코코아버터를 녹였다가 냉각·재가열하는 온도 커브를 통해 안정된 V형(β2) 지방 결정핵만 남기는 공정이다.',
    keySpec: '다크 45°C → 27°C → 31~32°C',
    practiceTip:
      '화이트·밀크 초콜릿은 유지방 함량이 높아 다크보다 작업 온도가 2~3°C 낮다(화이트 최종 28~29°C). 수분 혼입 시 시징(Seizing)이 발생한다.',
  },
  {
    id: 'choc-02',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '다형현상 V형 결정',
    termOrigin: 'Polymorphism Form V (β2)',
    pronunciation: '코코아버터 β2 결정',
    examFocus: '필기 고난도 · 쇼콜라 과학',
    definition:
      '코코아버터의 트라이글리세라이드가 가질 수 있는 6가지(I~VI) 결정 형태 중 가장 조밀하고 광택이 뛰어나며 입안 온도(33.8°C)에서 깔끔하게 녹는 이상적 결정이다.',
    keySpec: '융점 33.8°C · 스냅감과 수축 이형성 우수',
    practiceTip:
      '불안정한 I~IV형 결정이 남으면 몰드에서 분리되지 않고 표면에 하얀 꽃이 피는 지방 블룸(Fat Bloom)이 일어난다.',
  },
  {
    id: 'choc-03',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '커버춰 초콜릿',
    termOrigin: 'Couverture Chocolate',
    pronunciation: '코팅용 순수 코코아버터 초콜릿',
    examFocus: '재료학·초콜릿 구분',
    definition:
      '식물성 경화유(코코아 대용지) 없이 순수 코코아버터를 31% 이상(총 코코아 고형분 포함 규정 충족) 함유하여 유동성과 풍미가 뛰어난 전문가용 초콜릿이다.',
    keySpec: '코코아버터 31% 이상 · 템퍼링 필수',
    practiceTip:
      '코팅 초콜릿(컴파운드)은 템퍼링이 필요 없지만 커버춰는 반드시 템퍼링을 거쳐야 광택, 바삭한 스냅감, 몰드 수축을 얻을 수 있다.',
  },
  {
    id: 'choc-04',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '가나슈 유화',
    termOrigin: 'Ganache Emulsion',
    pronunciation: '수중유적형(O/W) 초콜릿 크림',
    examFocus: '봉봉·트러플·글라사주',
    definition:
      '따뜻한 생크림(수분)에 다진 초콜릿(지방·코코아 고형분)을 섞어 수분 입자와 지방 입자를 안정적으로 결합시킨 에멀전(유화물)이다.',
    keySpec: '중심부부터 작은 원으로 교반 · 유화 온도 35~40°C',
    practiceTip:
      '가나슈가 기름이 뜬 듯 분리되면 소량의 따뜻한 우유나 생크림을 넣고 중심에서부터 핸드블렌더나 주걱으로 강하게 유화해 복구할 수 있다.',
  },
  {
    id: 'choc-05',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '캐러멜화 반응',
    termOrigin: 'Caramelization',
    pronunciation: '당류의 열분해 갈변',
    examFocus: '필기 필수 · 마이야르 반응과 비교',
    definition:
      '아미노산 없이 순수 당류(설탕, 포도당 등)만을 고온으로 가열할 때 당 분자가 탈수·분해·중합되며 짙은 갈색 색소와 특유의 고소한 향미를 만드는 비효소적 갈변이다.',
    keySpec: '자당(설탕) 기준 160~180°C 시작',
    practiceTip:
      '설탕과 물만 끓일 때 냄비 벽면의 재결정화를 막기 위해 물엿이나 주석산(산)을 소량 첨가하고 붓으로 냄비 벽을 닦아준다.',
  },
  {
    id: 'choc-06',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '전화당',
    termOrigin: 'Invert Sugar',
    pronunciation: '트레몰린 · 포도당+과당 혼합당',
    examFocus: '2학년 심화 · 당류 기능성',
    definition:
      '설탕(이당류)을 산이나 효소(인버타아제)로 가수분해하여 포도당과 과당이 1:1로 분리된 액상 당이다. 보습력이 뛰어나고 설탕의 재결정화를 강력히 억제한다.',
    keySpec: '배합량 5~10% 치환 · 빙점 강하 효과',
    practiceTip:
      '가나슈나 마들렌에 소량 넣으면 수분 증발을 막아 촉촉함이 오래 유지되며, 아이스크림·소르베에서는 얼음 결정을 작게 만든다.',
  },
  {
    id: 'choc-07',
    department: 'chocolate',
    departmentLabel: '초콜릿·설탕공예',
    termKo: '새틴 슈가 (당기기)',
    termOrigin: 'Pulled Sugar / Sucre Tiré',
    pronunciation: '쉬크르 티레 · 공예용 설탕 당기기',
    examFocus: '설탕공예 실기 심화',
    definition:
      '이소말트나 설탕·물엿 시럽을 160°C 내외까지 끓인 뒤 대리석판에서 식혀 손으로 접고 당기기를 15~20회 이상 반복해 미세한 공기층과 진주 광택을 부여하는 공예 기법이다.',
    keySpec: '작업 온도 65~75°C · 습도 50% 이하 환경',
    practiceTip:
      '너무 많이 당기면 실크 광택이 흐려지고 부러지기 쉬우며, 보관 시 실리카겔이 든 밀폐 용기에 넣어야 습기 흡수로 인한 끈적임을 막는다.',
  },

  // 재료과학·위생 (7)
  {
    id: 'sci-01',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '글루테닌과 글리아딘',
    termOrigin: 'Glutenin & Gliadin',
    pronunciation: '밀 단백질 복합체 · 탄성과 점성',
    examFocus: '제빵 재료과학 최빈출',
    definition:
      '밀가루 단백질의 약 80~85%를 차지하는 불용성 단백질이다. 수분과 물리적 힘(믹싱)이 가해지면 이황화 결합으로 연결되어 망상구조인 글루텐을 형성한다.',
    keySpec: '글루테닌(탄성/강도) · 글리아딘(점성/신장성)',
    practiceTip:
      '설탕과 유지는 수분 흡수를 방해하고 지방 피막을 형성해 글루텐 발달을 억제하므로(연화제), 고율 배합 빵은 클린업 단계 이후에 유지를 투입한다.',
  },
  {
    id: 'sci-02',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '전분 호화',
    termOrigin: 'Starch Gelatinization',
    pronunciation: 'α화 · 전분 입자 팽윤 및 점성화',
    examFocus: '오븐 굽기·크림 제조 핵심',
    definition:
      '규칙적인 미셀 구조를 가진 생전분(β-전분)에 물과 열을 가하면 수소결합이 끊어지면서 수분을 흡수해 부풀고 점성이 높은 겔 상태로 변하는 현상이다.',
    keySpec: '밀 전분 호화 58~65°C · 충분한 수분 필요',
    practiceTip:
      '제빵 시 충분한 오븐 수분이 없으면 표면 전분이 호화되지 못해 껍질에 윤기가 나지 않고 푸석해진다. 크림류는 호화 후 충분히 식혀야 형태가 잡힌다.',
  },
  {
    id: 'sci-03',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '마이야르 반응',
    termOrigin: 'Maillard Reaction',
    pronunciation: '아미노-카보닐 반응 · 크러스트 갈변',
    examFocus: '필기 필수 · 캐러멜화와 비교',
    definition:
      '환원당(포도당, 과당, 맥아당, 유당)의 카보닐기와 단백질·아미노산의 아미노기가 열을 받아 반응하여 멜라노이딘 갈색 색소와 구수한 빵 굽는 향을 생성하는 반응이다.',
    keySpec: '140~165°C에서 활발 · 알칼리성에서 촉진',
    practiceTip:
      '설탕(비환원당)보다 분유(유당)나 맥아(맥아당), 꿀(과당·포도당)을 넣은 반죽이 오븐에서 훨씬 빠르고 진한 구운 색이 난다.',
  },
  {
    id: 'sci-04',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '레시틴 유화 작용',
    termOrigin: 'Lecithin Emulsification',
    pronunciation: '난황 천연 유화제 · 친수·친유기',
    examFocus: '파운드케이크·쇼콜라 재료학',
    definition:
      '달걀노른자나 대두에 풍부한 인지질(레시틴)이 물(친수기)과 기름(친유기)의 경계면 장력을 낮추어 두 성분이 분리되지 않고 균일하게 섞이도록 돕는 현상이다.',
    keySpec: '파운드케이크 분리 방지 · 노화 지연 효과',
    practiceTip:
      '크림법 반죽 시 달걀을 한꺼번에 넣으면 레시틴의 유화 한계를 넘어 수분과 버터가 분리(커들링)되므로 반드시 실온의 달걀을 소량씩 나눠 넣는다.',
  },
  {
    id: 'sci-05',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '수분활성도',
    termOrigin: 'Water Activity (Aw)',
    pronunciation: '자유수 비율 · 미생물 생육 지표',
    examFocus: '식품위생·저장성 시험 필수',
    definition:
      '식품 내 총 수분량 중 미생물이 실제 대사와 증식에 이용할 수 있는 자유수(Free Water)의 비율을 나타낸 수치로, 0에서 1.0 사이의 값을 가진다.',
    keySpec: '세균 Aw > 0.91 · 곰팡이 Aw > 0.80',
    practiceTip:
      '설탕이나 소금 농도를 높이면 자유수가 결합수로 묶여 수분활성도가 낮아지므로 잼, 마지팬, 양갱 등의 상온 보존 기간이 길어진다.',
  },
  {
    id: 'sci-06',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: '유지의 가소성',
    termOrigin: 'Plasticity of Fat',
    pronunciation: '외력 변형 후 형태 유지 성질',
    examFocus: '크림법·퍼프 페이스트리 재료학',
    definition:
      '버터, 마가린, 쇼트닝 같은 고체 유지가 액상 오일과 미세 고체 지방 결정이 공존함으로써 부서지거나 흐르지 않고 원하는 두께로 펴지고 형태를 유지하는 성질이다.',
    keySpec: '크림화 최적 온도 18~22°C (버터 기준)',
    practiceTip:
      '버터가 25°C 이상으로 녹아버리면 가소성과 공기 포집력(크리밍성)을 잃어 파운드케이크 부피가 작고 떡처럼 무거워진다.',
  },
  {
    id: 'sci-07',
    department: 'science',
    departmentLabel: '재료과학·위생',
    termKo: 'HACCP 중요관리점',
    termOrigin: 'Critical Control Point (CCP)',
    pronunciation: '해썹 위해요소 중점관리기준',
    examFocus: '2학년 식품위생학 필수',
    definition:
      '원료 입고부터 제조·유통까지 발생할 수 있는 생물학적·화학적·물리적 위해요소를 예방하거나 허용 수준 이하로 감소시킬 수 있는 가장 결정적인 공정 단계다.',
    keySpec: '제과제빵 대표 CCP: 오븐 가열·급속 냉각·금속 검출',
    practiceTip:
      '크림빵이나 생크림 케이크 제조장에서는 굽기 후 커스터드 크림의 중심 온도를 단시간 내 10°C 이하로 낮추는 냉각 공정과 금속 이물 검사가 핵심 CCP로 관리된다.',
  },
];
