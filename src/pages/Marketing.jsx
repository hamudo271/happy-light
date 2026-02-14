import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Youtube, Tv, ArrowRight, Heart, Sparkles, Megaphone } from 'lucide-react'
import './Marketing.css'

function Marketing() {
  return (
    <div className="marketing-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <motion.div
            className="page-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-badge">COLLABORATION</span>
            <h1 className="page-title">
              마케팅 <span className="gradient-text">제안</span>
            </h1>
            <p className="page-desc">
              콘텐츠 협업 및 광고 제안을 환영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="marketing-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header text-center">
              <Megaphone size={40} className="section-icon" style={{ color: '#fb7185', marginBottom: '1rem' }} />
              <h2 className="section-title">협업 제안 안내</h2>
            </div>
            <div className="intro-card">
              <p>
                본 페이지는 해피라이트 엔터테인먼트의 추가 핵심 사업인 
                <strong>'행사 기획·운영 서비스'</strong>와 직접적으로 경쟁하거나 혼재되지 않는 영역으로,
                <br />
                대표 개인 브랜딩을 기반으로 한 <strong>'영상·콘텐츠 협업 광고 제안'</strong>을 접수하기 위한 보조 창구입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section profile-section">
        <div className="container">
          <div className="grid-2-col">
            <motion.div
              className="profile-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>크리에이터 소개</h3>
              <p className="profile-desc">
                해피라이트 김영성 대표는 유튜브와 인스타그램, 틱톡 채널 
                <strong>'광주일번'</strong>, <strong>'인싸영감'</strong>을 운영 중인 
                지역 기반 인플루언서로, 지역 밀착형 콘텐츠 활동을 지속해오고 있습니다.
              </p>
              <div className="social-links-box">
                <a href="https://www.youtube.com/@%EA%B4%91%EC%A3%BC%EC%9D%BC%EB%B2%88" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                  <Youtube size={20} /> 광주일번
                </a>
                <a href="https://www.instagram.com/gwangju.first" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                  <Instagram size={20} /> @gwangju.first
                </a>
                <a href="https://tv.naver.com/gwangjufirst" target="_blank" rel="noopener noreferrer" className="social-btn naver">
                  <Tv size={20} /> 네이버 클립
                </a>
              </div>
            </motion.div>
            <motion.div
              className="profile-note"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="note-card">
                <Sparkles size={24} style={{ color: '#fb7185' }} />
                <h4>다양한 협업 진행</h4>
                <p>
                  소상공인 가게, 지역 공간, 거리, 축제, 공공 프로젝트 등에서 
                  영상 홍보 및 콘텐츠 협업 제안이 꾸준히 유입되고 있습니다.
                </p>
                <p className="highlight">
                  특히 지역 홍보, 공공 캠페인, 사회적 가치가 있는 프로젝트의 경우 
                  재능기부 또는 비상업적 무료 협업 형태로도 진행하고 있습니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="section bg-light">
        <div className="container">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="section-title text-center mb-5">제안 접수 영역</h2>
            <div className="scope-grid">
              <div className="scope-card">
                <div className="card-icon">💼</div>
                <h3>상업적 영상 협업</h3>
                <p>브랜드 홍보, 제품 리뷰, 매장 소개 등 마케팅 목적의 콘텐츠 제작</p>
              </div>
              <div className="scope-card">
                <div className="card-icon">🏛️</div>
                <h3>지역·공공 목적 홍보</h3>
                <p>지자체 축제, 공공 캠페인, 관광지 소개 등 공익적 성격의 홍보</p>
              </div>
              <div className="scope-card">
                <div className="card-icon">🤝</div>
                <h3>사회공헌 콘텐츠</h3>
                <p>재능기부, 봉사활동, 사회적 가치 확산을 위한 프로젝트</p>
              </div>
            </div>
            <p className="scope-footer text-center mt-4">
              위 항목들을 구분 없이 제안 접수 중심으로 운영하며, 향후 별도의 전문 마케팅 회사 및 아카데미 구축 전까지 공식적이고 신뢰도 있는 소통 창구 역할을 수행합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="guide-box"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="guide-header">
              <Heart size={28} className="guide-icon" />
              <h2>상담 및 진행 안내</h2>
            </div>
            <div className="guide-content">
              <p>제안 내용과 목적에 따라 가장 적합한 방식으로 검토해드립니다.</p>
              
              <div className="guide-details">
                <div className="guide-item commercial">
                  <h4>상업 협업 / 마케팅</h4>
                  <p>기획, 진행, 편집 비용이 발생할 수 있습니다.</p>
                </div>
                <div className="guide-item public">
                  <h4>공공 · 비영리 목적 홍보</h4>
                  <p>
                    상황에 따라 <strong>비상업적 무료 협업</strong>으로 진행됩니다.
                    <br />
                    <span className="small-text">* 단, 편집비 등 실비는 소액 추가될 수 있습니다.</span>
                  </p>
                </div>
              </div>
              
              <div className="action-area mt-5 text-center">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  협업 제안하기
                  <ArrowRight size={20} />
                </Link>
                <p className="mt-3 text-muted">
                  고객센터(문의폼)를 통해 상세 내용을 남겨주시면 빠르게 답변드리겠습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Marketing
