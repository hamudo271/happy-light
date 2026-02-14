# 🎉 해피라이트 - 이벤트 기획 웹사이트

이벤트 기획 전문 회사 "해피라이트"의 공식 웹사이트입니다.

---

## 📁 프로젝트 구조

```
happy write A/
│
├── 📂 src/                    # 프론트엔드 소스 코드
│   ├── 📂 components/         # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx         # 상단 네비게이션 헤더
│   │   ├── Header.css         # 헤더 스타일
│   │   ├── Footer.jsx         # 하단 푸터
│   │   ├── Footer.css         # 푸터 스타일
│   │   └── Layout.jsx         # 페이지 공통 레이아웃
│   │
│   ├── 📂 context/            # React Context (전역 상태 관리)
│   │   └── ThemeContext.jsx   # 다크/라이트 테마 관리
│   │
│   ├── 📂 pages/              # 페이지 컴포넌트
│   │   ├── Home.jsx           # 메인 홈페이지
│   │   ├── About.jsx          # 회사소개
│   │   ├── Services.jsx       # 사업분야
│   │   ├── Portfolio.jsx      # 포트폴리오
│   │   ├── Booking.jsx        # 섭외 및 대여
│   │   ├── Contact.jsx        # 고객센터
│   │   ├── 📂 about/          # 회사소개 하위 페이지
│   │   └── 📂 portfolio/      # 포트폴리오 하위 페이지
│   │
│   ├── 📂 styles/             # 전역 스타일
│   │   └── global.css         # 전역 CSS (색상, 폰트 등)
│   │
│   ├── App.jsx                # 앱 메인 + 라우팅 설정
│   └── main.jsx               # 앱 진입점 (Entry Point)
│
├── 📂 server/                 # 백엔드 서버 코드
│   ├── index.js               # 서버 메인 파일
│   ├── package.json           # 서버 패키지 설정
│   └── .env                   # 환경 변수 (비밀번호 등)
│
├── 📂 public/                 # 정적 파일 (이미지 등)
│
├── index.html                 # HTML 템플릿
├── vite.config.js             # Vite 빌드 도구 설정
├── package.json               # 프론트엔드 패키지 설정
└── README.md                  # 이 파일
```

---

## 🚀 시작하기

### 1. 프론트엔드 실행 (필수)

```bash
# 1. 프로젝트 폴더로 이동
cd "happy write A"

# 2. 패키지 설치 (처음 한 번만)
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 **http://localhost:5173** 접속

### 2. 백엔드 서버 실행 (선택 - 문의 폼 기능 필요 시)

```bash
# 1. 서버 폴더로 이동
cd server

# 2. 패키지 설치 (처음 한 번만)
npm install

# 3. 환경 변수 설정
# .env 파일을 만들고 이메일 정보 입력 (아래 설명 참고)

# 4. 서버 실행
npm run dev
```

서버가 **http://localhost:5000** 에서 실행됩니다.

---

## ⚙️ 환경 변수 설정 (백엔드)

`server/.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# 서버 포트
PORT=5000

# 이메일 설정 (Gmail 기준)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=앱비밀번호16자리

# 문의 수신 이메일
ADMIN_EMAIL=admin@gmail.com
```

### Gmail 앱 비밀번호 발급 방법
1. Google 계정 → 보안 → **2단계 인증 활성화**
2. Google 계정 → 보안 → **앱 비밀번호**
3. '앱 선택' → '기타' → 이름 입력
4. 생성된 16자리 비밀번호 사용

---

## 📌 주요 기술 스택

### 프론트엔드
| 기술 | 설명 |
|------|------|
| React | UI 라이브러리 |
| Vite | 빌드 도구 (빠른 개발 서버) |
| React Router | 페이지 라우팅 |
| Framer Motion | 애니메이션 |
| Lucide React | 아이콘 |

### 백엔드
| 기술 | 설명 |
|------|------|
| Express | 웹 서버 프레임워크 |
| Nodemailer | 이메일 전송 |
| Helmet | 보안 헤더 |
| express-rate-limit | DDoS 방어 |
| geoip-lite | IP 기반 국가 차단 |

---

## 📂 주요 파일 설명

### 프론트엔드

| 파일 | 설명 |
|------|------|
| `src/main.jsx` | 앱 시작점. React를 DOM에 연결 |
| `src/App.jsx` | 라우팅 설정. URL별 페이지 매핑 |
| `src/components/Header.jsx` | 상단 메뉴바. 네비게이션 + 테마 전환 |
| `src/components/Footer.jsx` | 하단 정보. 연락처 + 링크 |
| `src/components/Layout.jsx` | 페이지 공통 레이아웃 |
| `src/context/ThemeContext.jsx` | 다크/라이트 모드 관리 |
| `vite.config.js` | Vite 설정 파일 |

### 백엔드

| 파일 | 설명 |
|------|------|
| `server/index.js` | 서버 메인. API + 보안 설정 |
| `server/.env` | 환경 변수 (이메일 비밀번호 등) |

---

## 🛡️ 보안 기능 (백엔드)

1. **DDoS 방어**: IP당 요청 횟수 제한
2. **국가 차단**: 중국, 홍콩 IP 차단
3. **해외 제한**: 한국 외 IP는 더 엄격한 제한
4. **입력 검증**: 문의 폼 데이터 유효성 검사
5. **CORS**: 허용된 도메인만 API 호출 가능
6. **보안 헤더**: XSS, 클릭재킹 방어

---

## 🔧 자주 쓰는 명령어

```bash
# 프론트엔드 개발 서버
npm run dev

# 프론트엔드 빌드 (배포용)
npm run build

# 빌드 결과 미리보기
npm run preview

# 백엔드 서버 실행
cd server && npm run dev
```

---

## ❓ 문제 해결

### "모듈을 찾을 수 없습니다" 오류
```bash
npm install
```

### "포트가 이미 사용 중입니다" 오류
- 다른 터미널에서 이미 서버가 실행 중인지 확인
- 해당 터미널을 종료하거나 다른 포트 사용

### 이메일이 발송되지 않음
- `.env` 파일 설정 확인
- Gmail 앱 비밀번호 사용 여부 확인
- 2단계 인증 활성화 확인

---

## 📞 연락처

- 전화: 010-3433-1282
- 이메일: info@eventup.kr

---

© 2025 해피라이트. All rights reserved.

