/**
 * =============================================================================
 * server/index.js - 백엔드 서버 메인 파일
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

// .env 파일에서 환경 변수 불러오기
require('dotenv').config();

// Express 앱 생성
const app = express();

// 서버 포트 설정 (환경 변수 또는 기본값 5000)
const PORT = process.env.PORT || 5000;

// ===========================================
// 보안 미들웨어 설정
// ===========================================

/**
 * Helmet - 보안 HTTP 헤더 설정
 * XSS 공격, 클릭재킹 등 다양한 보안 위협으로부터 보호
 */
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],                                    // 기본 리소스는 같은 도메인만 허용
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],  // 스타일 허용 도메인
    fontSrc: ["'self'", "https://fonts.gstatic.com"],         // 폰트 허용 도메인
    imgSrc: ["'self'", "data:", "https:"],                    // 이미지 허용
    scriptSrc: ["'self'"],                                    // 스크립트는 같은 도메인만
  },
}));

// ===========================================
// IP 기반 국가 차단 미들웨어
// ===========================================

// 완전 차단할 국가 코드
const blockedCountries = ['CN', 'HK']; // 중국, 홍콩

// 강화된 제한을 적용할 국가 (차단은 아님)
const suspiciousCountries = ['RU', 'KP', 'IR']; // 러시아, 북한, 이란

/**
 * 국가별 접근 제어 미들웨어
 * 클라이언트 IP를 확인하여 특정 국가 차단
 */
const geoBlockMiddleware = (req, res, next) => {
  // 실제 클라이언트 IP 가져오기 (프록시 뒤에 있을 경우)
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress;
  
  // localhost는 항상 통과
  if (clientIP === '127.0.0.1' || clientIP === '::1' || clientIP === '::ffff:127.0.0.1') {
    return next();
  }

  // IP로 국가 정보 조회
  const geo = geoip.lookup(clientIP);
  
  // 차단 국가인 경우 403 에러 반환
  if (geo && blockedCountries.includes(geo.country)) {
    console.log(`🚫 차단됨: ${geo.country} (IP: ${clientIP})`);
    return res.status(403).json({
      success: false,
      message: 'Access denied from your region.',
      code: 'GEO_BLOCKED'
    });
  }

  // 의심스러운 국가는 로그만 기록 (차단하지 않음)
  if (geo && suspiciousCountries.includes(geo.country)) {
    console.log(`⚠️ 의심 접근: ${geo.country} (IP: ${clientIP})`);
  }

  // 요청 객체에 IP 정보 저장 (이후 미들웨어에서 사용)
  req.clientIP = clientIP;
  req.clientGeo = geo;
  next();
};

app.use(geoBlockMiddleware);

// ===========================================
// DDoS 방어 - Rate Limiting (요청 횟수 제한)
// ===========================================

/**
 * 전역 Rate Limiter
 * 모든 요청에 적용 - 15분에 100개 요청으로 제한
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15분
  max: 100,                   // IP당 최대 100 요청
  message: {
    success: false,
    message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    code: 'RATE_LIMITED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`🛑 Rate Limited: ${req.clientIP}`);
    res.status(429).json({
      success: false,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
      code: 'RATE_LIMITED'
    });
  }
});

/**
 * API 전용 Rate Limiter (더 엄격)
 * 1분에 10개 요청으로 제한
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1분
  max: 10,              // IP당 1분에 최대 10 요청
  message: {
    success: false,
    message: 'API 요청이 너무 많습니다. 천천히 시도해주세요.',
    code: 'API_RATE_LIMITED'
  }
});

/**
 * 문의 폼 전용 Rate Limiter (스팸 방지)
 * 1시간에 5개로 제한
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1시간
  max: 5,                     // IP당 시간당 최대 5개 문의
  message: {
    success: false,
    message: '문의가 너무 많습니다. 1시간 후에 다시 시도해주세요.',
    code: 'CONTACT_RATE_LIMITED'
  }
});

/**
 * 해외 IP 전용 Rate Limiter
 * 한국 IP보다 더 엄격하게 제한
 */
const foreignLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15분
  max: 30,                    // 해외 IP는 30개로 제한
  skip: (req) => {
    // 한국 IP는 이 제한 건너뛰기
    return req.clientGeo && req.clientGeo.country === 'KR';
  },
  message: {
    success: false,
    message: '해당 지역에서의 요청 제한을 초과했습니다.',
    code: 'FOREIGN_RATE_LIMITED'
  }
});

// Rate Limiter 적용
app.use(globalLimiter);
app.use(foreignLimiter);

// ===========================================
// 기본 미들웨어
// ===========================================

/**
 * CORS 설정
 * 허용된 도메인에서만 API 호출 가능
 */
const allowedOrigins = [
  'http://localhost:5173',   // Vite 개발 서버
  'http://localhost:3000',   // 대체 개발 서버
  process.env.FRONTEND_URL   // 운영 프론트엔드 URL
].filter(Boolean);  // undefined/null 제거

app.use(cors({
  origin: (origin, callback) => {
    // 서버간 요청 또는 허용된 도메인
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS 차단: ${origin}`);
      callback(new Error('CORS 정책에 의해 차단됨'));
    }
  },
  credentials: true  // 쿠키 포함 요청 허용
}));

// JSON 요청 본문 파싱 (크기 제한: 10KB)
app.use(express.json({ limit: '10kb' }));

// URL 인코딩된 본문 파싱
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ===========================================
// 이메일 전송 설정
// ===========================================

/**
 * Nodemailer 설정
 * Gmail SMTP를 사용하여 이메일 전송
 * 
 * ⚠️ Gmail 사용 시 '앱 비밀번호'를 사용해야 합니다.
 * 일반 비밀번호는 보안상 차단됩니다.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // 발신 이메일
    pass: process.env.EMAIL_PASS   // 앱 비밀번호 (16자리)
  }
});

/**
 * 문의 이메일 전송 함수
 * 
 * @param {Object} data - 문의 폼 데이터
 * @returns {Promise} - 이메일 전송 결과
 */
const sendContactEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `[해피라이트] 새로운 문의 - ${data.eventType}`,
    html: `
      <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #FF6B35, #FFD700); padding: 30px; border-radius: 16px 16px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">📬 새로운 문의가 접수되었습니다</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 16px 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; width: 120px;">이름</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">회사/기관</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.company || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">연락처</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">이메일</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.email || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">행사 유형</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                <span style="background: #FF6B35; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                  ${data.eventType}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">행사 예정일</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.date || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">예상 인원</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.participants || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">예산</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${data.budget || '-'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 12px;">
            <h3 style="margin: 0 0 12px 0; color: #333;">💬 문의 내용</h3>
            <p style="margin: 0; line-height: 1.8; color: #555;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 16px; background: #e8f4fd; border-radius: 12px; font-size: 14px; color: #666;">
            <strong>접수 정보</strong><br>
            • 접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}<br>
            • IP: ${data.clientIP || 'Unknown'}<br>
            • 지역: ${data.clientGeo ? `${data.clientGeo.country}, ${data.clientGeo.city || 'Unknown'}` : 'Unknown'}
          </div>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// ===========================================
// API 라우트 (엔드포인트)
// ===========================================

/**
 * 헬스 체크 API
 * 서버가 정상 작동 중인지 확인
 * 
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * 문의 폼 제출 API
 * 폼 데이터를 받아 이메일로 전송
 * 
 * POST /api/contact
 * 
 * Body:
 * - name: 이름 (필수)
 * - phone: 연락처 (필수)
 * - eventType: 행사 유형 (필수)
 * - message: 문의 내용 (필수)
 * - email: 이메일 (선택)
 * - company: 회사/기관 (선택)
 * - date: 행사 예정일 (선택)
 * - participants: 예상 인원 (선택)
 * - budget: 예산 (선택)
 */
app.post('/api/contact',
  // Rate Limiter 적용
  contactLimiter,
  apiLimiter,
  // 입력값 검증 규칙
  [
    body('name').trim().notEmpty().withMessage('이름을 입력해주세요.').isLength({ max: 50 }),
    body('phone').trim().notEmpty().withMessage('연락처를 입력해주세요.')
      .matches(/^[0-9-+() ]+$/).withMessage('올바른 연락처 형식이 아닙니다.'),
    body('eventType').trim().notEmpty().withMessage('행사 유형을 선택해주세요.'),
    body('message').trim().notEmpty().withMessage('문의 내용을 입력해주세요.')
      .isLength({ max: 2000 }).withMessage('문의 내용은 2000자 이내로 작성해주세요.'),
    body('email').optional().isEmail().withMessage('올바른 이메일 형식이 아닙니다.'),
    body('company').optional().trim().isLength({ max: 100 }),
    body('date').optional().trim(),
    body('participants').optional().trim().isLength({ max: 50 }),
    body('budget').optional().trim().isLength({ max: 50 }),
  ],
  async (req, res) => {
    try {
      // 입력 검증 결과 확인
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
          errors: errors.array()
        });
      }

      // 문의 데이터 준비
      const contactData = {
        ...req.body,
        clientIP: req.clientIP,
        clientGeo: req.clientGeo
      };

      // 이메일 전송 (환경 변수가 설정된 경우만)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendContactEmail(contactData);
        console.log(`✉️ 이메일 전송 완료: ${contactData.name}`);
      } else {
        // 이메일 설정 안 된 경우 로그만 출력
        console.log(`📝 문의 접수 (이메일 미설정):`, contactData);
      }

      // 성공 응답
      res.json({
        success: true,
        message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
      });

    } catch (error) {
      console.error('문의 폼 에러:', error);
      res.status(500).json({
        success: false,
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      });
    }
  }
);

// ===========================================
// 정적 파일 제공 (React Frontend)
// ===========================================

const path = require('path');

// dist 폴더의 정적 파일 제공
app.use(express.static(path.join(__dirname, '../dist')));

// ===========================================
// 에러 핸들링
// ===========================================

/**
 * 404 에러 핸들러 (API 경로만 처리)
 * 존재하지 않는 API 경로로 요청 시
 */
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청하신 API를 찾을 수 없습니다.',
    code: 'NOT_FOUND'
  });
});

/**
 * SPA 라우팅 처리 (모든 비 API 요청을 index.html로)
 * React Router가 클라이언트 사이드에서 라우팅을 처리하도록 함
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * 전역 에러 핸들러
 * 처리되지 않은 모든 에러를 잡음
 */
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  
  // CORS 에러 처리
  if (err.message === 'CORS 정책에 의해 차단됨') {
    return res.status(403).json({
      success: false,
      message: 'CORS 정책 위반',
      code: 'CORS_ERROR'
    });
  }

  // 기타 서버 에러
  res.status(500).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.',
    code: 'SERVER_ERROR'
  });
});

// ===========================================
// 서버 시작
// ===========================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 해피라이트 백엔드 서버                            ║
║                                                       ║
║   포트: ${PORT}                                          ║
║   상태: 실행 중                                        ║
║                                                       ║
║   🛡️  보안 기능:                                       ║
║   ✓ DDoS 방어 (Rate Limiting)                        ║
║   ✓ 중국/홍콩 IP 차단                                 ║
║   ✓ 해외 IP 강화 제한                                 ║
║   ✓ Helmet 보안 헤더                                  ║
║   ✓ CORS 정책                                         ║
║   ✓ 입력값 검증                                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// 다른 파일에서 테스트용으로 사용할 수 있도록 내보내기
module.exports = app;

