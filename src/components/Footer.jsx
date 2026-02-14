/**
 * =============================================================================
 * Footer.jsx - 하단 푸터 컴포넌트
 * =============================================================================
 * 
 * 웹사이트 하단에 표시되는 푸터입니다.
 * 
 * 📌 주요 내용:
 * 1. CTA 섹션 - 상담 유도 영역 (전화번호, 온라인 문의 링크)
 * 2. 회사 정보 - 로고, 회사 소개
 * 3. 빠른 링크 - 주요 페이지 바로가기
 * 4. 연락처 정보 - 전화, 이메일, 주소
 * 5. 소셜 미디어 링크
 * 6. 저작권 및 법적 링크
 * 
 * 📌 구조:
 * ┌─────────────────────────────────────────────┐
 * │  CTA 섹션 (상담 유도)                        │
 * ├─────────────────────────────────────────────┤
 * │  회사정보  │  회사소개  │  사업분야  │ 연락처 │
 * ├─────────────────────────────────────────────┤
 * │  저작권 정보 / 개인정보처리방침 / 이용약관    │
 * └─────────────────────────────────────────────┘
 * 
 * =============================================================================
 */

// 페이지 이동을 위한 Link 컴포넌트
import { Link } from 'react-router-dom'

// 애니메이션 효과
import { motion } from 'framer-motion'

// 아이콘들
import { 
  Sparkles,       // 반짝이 (로고)
  Phone,          // 전화
  Mail,           // 이메일
  MapPin,         // 위치
  Instagram,      // 인스타그램
  Youtube,        // 유튜브
  MessageCircle,  // 카카오톡
  ArrowUpRight,   // 화살표 (링크용)
  Heart,          // 하트
  Clock,          // 시계
  Tv              // TV (네이버)
} from 'lucide-react'

// 푸터 전용 스타일
import './Footer.css'

/**
 * Footer 컴포넌트
 * 
 * 모든 페이지 하단에 표시되는 공통 푸터입니다.
 */
function Footer() {
  // 현재 연도 자동 계산 (저작권 표시용)
  const currentYear = new Date().getFullYear()

  /**
   * 페이지 맨 위로 스크롤
   * smooth: 부드러운 스크롤 애니메이션
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-text">
              <h2>특별한 행사를 계획 중이신가요?</h2>
              <p>
                전문 컨설턴트가 무료로 상담해드립니다.<br />
                <span style={{ fontSize: '0.9em', opacity: 0.9 }}>소규모행사도 가능합니다. 부담없이 남겨주세요.</span>
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:010-5728-8848" className="cta-phone">
                <Phone size={20} />
                <span>010-5728-8848</span>
              </a>
              <Link to="/contact" className="cta-link">
                상담신청하기
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-main">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section footer-brand">
              <Link to="/" className="footer-logo">
                <img 
                  src={`${import.meta.env.BASE_URL}images/happylight.png`} 
                  alt="해피라이트" 
                  className="footer-logo-image"
                />
              </Link>
              <p className="footer-desc">
                특별한 순간을 완벽하게 만들어드립니다.<br />
                기업행사, 팀빌딩, 체육대회, 공연 등<br />
                모든 이벤트를 전문적으로 기획합니다.
              </p>
              <div className="footer-social">
                <a href="https://www.instagram.com/gwangju.first" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} />
                </a>
                <a href="https://www.youtube.com/@%EA%B4%91%EC%A3%BC%EC%9D%BC%EB%B2%88" className="social-link" aria-label="Youtube" target="_blank" rel="noopener noreferrer">
                  <Youtube size={18} />
                </a>
                <a href="https://tv.naver.com/gwangjufirst" className="social-link" aria-label="Naver Clip" target="_blank" rel="noopener noreferrer">
                  <Tv size={18} />
                </a>
                <a href="https://open.kakao.com/o/svQrVCw" className="social-link" aria-label="KakaoTalk" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">회사소개</h4>
              <ul className="footer-links">
                <li><Link to="/about/greeting">인사말</Link></li>
                <li><Link to="/about/organization">조직도</Link></li>
                <li><Link to="/about/history">주요실적</Link></li>
                <li><Link to="/about/notice">공지사항</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">사업분야</h4>
              <ul className="footer-links">
                <li><Link to="/services/corporate">기업행사</Link></li>
                <li><Link to="/services/teambuilding">팀빌딩 프로그램</Link></li>
                <li><Link to="/services/sports">체육대회</Link></li>
                <li><Link to="/services/school">학교행사</Link></li>
                <li><Link to="/services/goldenbell">골든벨 행사</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-title">연락처</h4>
              <ul className="footer-contact">
                <li>
                  <Phone size={16} />
                  <a href="tel:010-5728-8848">010-5728-8848</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:aura8848@gmail.com">aura8848@gmail.com</a>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>광주 서구 운천로 247 스타타워 4층<br />관광기업지원센터</span>
                </li>
                <li>
                  <Clock size={16} />
                  <span>
                    상담 가능 시간<br />
                    <span style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>연중무휴 · 24 시간 대응</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright">
              © {currentYear} 해피라이트. All rights reserved.
            </p>

          </div>
          <div className="footer-bottom-right">
            <div className="footer-legal">
              <Link to="/privacy">개인정보처리방침</Link>
              <Link to="/terms">이용약관</Link>
            </div>
            <button className="scroll-top" onClick={scrollToTop} aria-label="맨 위로">
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 다른 파일에서 사용할 수 있도록 내보내기
export default Footer
