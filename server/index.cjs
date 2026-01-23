/**
 * =============================================================================
 * server/index.cjs - 백엔드 서버 메인 파일
 * =============================================================================
 * 
 * 이 파일은 Express.js 기반 백엔드 서버입니다.
 * 
 * 📌 주요 기능:
 * 1. 문의 폼 이메일 전송 API
 * 2. DDoS 공격 방어 (Rate Limiting)
 * 3. 국가별 IP 차단 (중국, 홍콩 등)
 * 4. 보안 헤더 설정 (Helmet)
 * 5. CORS 설정 (허용된 도메인만 접근)
 * 
 * 📌 실행 방법:
 * 1. cd server
 * 2. npm install (처음 한 번만)
 * 3. npm run dev (개발) 또는 npm start (운영)
 * 
 * 📌 환경 변수 설정 (.env 파일):
 * - EMAIL_USER: 발신 이메일 주소
 * - EMAIL_PASS: 이메일 앱 비밀번호
 * - ADMIN_EMAIL: 문의 수신 이메일
 * - FRONTEND_URL: 프론트엔드 URL
 * - PORT: 서버 포트 (기본값: 5000)
 * 
 * =============================================================================
 */

// ============================================
// 패키지 불러오기
// ============================================

const express = require('express');           // 웹 서버 프레임워크
const cors = require('cors');                 // Cross-Origin 요청 허용
const helmet = require('helmet');             // 보안 헤더 설정
const rateLimit = require('express-rate-limit'); // 요청 횟수 제한
const geoip = require('geoip-lite');          // IP로 국가 확인
const nodemailer = require('nodemailer');     // 이메일 전송
const { body, validationResult } = require('express-validator'); // 입력값 검증
const path = require('path');                 // 경로 처리

// .env 파일에서 환경 변수 불러오기
require('dotenv').config();

// Express 앱 생성
const app = express();

// 서버 포트 설정 (환경 변수 또는 기본값 5000)
const PORT = process.env.PORT || 5000;

// ===========================================
// 기본 미들웨어 설정 (로그 및 파싱)
// ===========================================

// CORS 설정
const allowedOrigins = [
  'http://localhost:5173',   // Vite 개발 서버
  'http://localhost:3000',   // 대체 개발 서버
  process.env.FRONTEND_URL,   // 운영 프론트엔드 URL
  'https://happy-light-production-ac2a.up.railway.app' // Railway URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS 차단: ${origin}`);
      callback(new Error('CORS 정책에 의해 차단됨'));
    }
  },
  credentials: true
}));

// Helmet 보안 헤더
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "https:"],
    scriptSrc: ["'self'"],
    connectSrc: ["'self'", ...allowedOrigins], 
  },
}));

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ===========================================
// IP 기반 국가 차단 미들웨어 (Static 보다 먼저)
// ===========================================

const blockedCountries = ['CN', 'HK']; // 차단 국가
const suspiciousCountries = ['RU', 'KP', 'IR']; // 요주의 국가

const geoBlockMiddleware = (req, res, next) => {
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress;
  
  // localhost 통과
  if (clientIP === '127.0.0.1' || clientIP === '::1' || clientIP === '::ffff:127.0.0.1') {
    return next();
  }

  // 정적 자원 예외 처리 (매우 중요)
  if (req.path.startsWith('/assets/') || req.path.startsWith('/vite.svg') || req.path.includes('.')) {
    // console.log(`⏩ 정적 자원 접근 허용: ${req.path}`); // 디버깅용, 너무 많으면 주석 처리
    return next();
  }

  const geo = geoip.lookup(clientIP);
  
  if (geo && blockedCountries.includes(geo.country)) {
    console.log(`🚫 차단됨: ${geo.country} (IP: ${clientIP})`);
    return res.status(403).json({
      success: false,
      message: 'Access denied from your region.',
      code: 'GEO_BLOCKED'
    });
  }

  if (geo && suspiciousCountries.includes(geo.country)) {
    console.log(`⚠️ 의심 접근: ${geo.country} (IP: ${clientIP})`);
  }

  req.clientIP = clientIP;
  req.clientGeo = geo;
  next();
};

app.use(geoBlockMiddleware);

// ===========================================
// 정적 파일 제공 (Express Static)
// ===========================================

// dist 경로를 __dirname 기준으로 확실하게 잡음s
const distPath = path.resolve(__dirname, '../dist');
console.log(`📂 정적 파일 서빙 경로: ${distPath}`);

// 정적 파일 서빙
app.use(express.static(distPath));


// ===========================================
// Rate Limiting (API 보호)
// ===========================================

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: '요청이 너무 많습니다.' }
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { success: false, message: 'API 요청 과부하.' }
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: '문의 횟수 초과.' }
});

app.use(globalLimiter);

// ===========================================
// 이메일 설정
// ===========================================

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `[해피라이트] 문의 - ${data.eventType}`,
    html: `
      <h2>새 문의 접수</h2>
      <p>이름: ${data.name}</p>
      <p>연락처: ${data.phone}</p>
      <p>유형: ${data.eventType}</p>
      <p>내용: ${data.message}</p>
      <p>IP: ${data.clientIP}</p>
    `
  };
  return transporter.sendMail(mailOptions);
};

// ===========================================
// API 라우트
// ===========================================

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server Running' });
});

app.post('/api/contact', contactLimiter, apiLimiter, [
    body('name').trim().notEmpty(),
    body('phone').trim().notEmpty(),
    body('eventType').trim().notEmpty(),
    body('message').trim().notEmpty(),
    body('email').optional().isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

      const contactData = { ...req.body, clientIP: req.clientIP, clientGeo: req.clientGeo };
      
      if (process.env.EMAIL_USER) {
        await sendContactEmail(contactData);
      }
      res.json({ success: true, message: '문의가 접수되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: '서버 에러' });
    }
  }
);

// API 404
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API Not Found' });
});

// ===========================================
// SPA Fallback & Error Handling
// ===========================================

// SPA Fallback
app.get(/(.*)/, (req, res) => {
  // 정적 파일 요청이 실패해서 여기까지 왔다면 404 처리 (MIME type 오류 방지)
  if (req.path.startsWith('/assets') || req.path.includes('.')) {
    console.warn(`⚠️ Missing Asset: ${req.path}`);
    return res.status(404).send('Not Found');
  }
  // 그 외에는 index.html 서빙 (Client-Side Routing)
  res.sendFile(path.join(distPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === 'CORS 정책에 의해 차단됨') {
    return res.status(403).json({ success: false, message: 'CORS Error' });
  }
  res.status(500).json({ success: false, message: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files mapped to: ${distPath}`);
});

module.exports = app;
