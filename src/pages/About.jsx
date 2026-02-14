import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Users, History, Bell, ArrowRight } from 'lucide-react'
import './About.css'

const aboutLinks = [
  {
    icon: MessageCircle,
    title: '인사말',
    desc: '해피라이트 엔터테인먼트의 철학과 비전을 소개합니다',
    path: '/about/greeting',
    color: '#ff6b35'
  },
  {
    icon: Users,
    title: '조직도',
    desc: '전문가들로 구성된 우리 팀을 만나보세요',
    path: '/about/organization',
    color: '#7c3aed'
  },
  {
    icon: History,
    title: '주요실적',
    desc: '20년간 쌓아온 성공적인 행사 기록들',
    path: '/about/history',
    color: '#06d6a0'
  },
  {
    icon: Bell,
    title: '공지사항',
    desc: '해피라이트의 최신 소식을 확인하세요',
    path: '/about/notice',
    color: '#00d4ff'
  },
]

function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <motion.div
            className="page-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-badge">ABOUT US</span>
            <h1 className="page-title">
              회사<span className="gradient-text">소개</span>
            </h1>
            <p className="page-desc">
              20년의 경험, 2,500건의 성공적인 행사<br />
              해피라이트가 걸어온 길을 소개합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Links */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {aboutLinks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={item.path} className="about-card">
                  <div 
                    className="about-card-icon"
                    style={{ '--card-color': item.color }}
                  >
                    <item.icon size={32} />
                  </div>
                  <h3 className="about-card-title">{item.title}</h3>
                  <p className="about-card-desc">{item.desc}</p>
                  <span className="about-card-link">
                    바로가기 <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section company-overview">
        <div className="container">
          <div className="overview-grid">
            <motion.div
              className="overview-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">COMPANY</span>
              <h2 className="section-title">
                대한민국 <span className="gradient-text">No.1</span><br />
                이벤트 전문 기업
              </h2>
              <p className="overview-text">
                해피라이트 엔터테인먼트는 다양한 현장에서 축적된 경험과 전문성을 바탕으로,
                MC, 강사 진행, 기획·연출까지 아우르는 종합 행사대행 기획사입니다.
                가족행사, 학교행사, 기업행사, 문화/공공행사까지 폭넓은 서비스를 제공합니다.
              </p>
              <p className="overview-text">
                전문 MC, 레크레이션 강사, 행사 기획자 등 각 분야 최고의 
                전문가들이 고객님의 특별한 순간을 완벽하게 만들어 드립니다.
              </p>
              <div className="overview-stats">
                <div className="overview-stat">
                  <span className="overview-stat-number">20+</span>
                  <span className="overview-stat-label">년 경력</span>
                </div>
                <div className="overview-stat">
                  <span className="overview-stat-number">2,500+</span>
                  <span className="overview-stat-label">행사 진행</span>
                </div>
                <div className="overview-stat">
                  <span className="overview-stat-number">500+</span>
                  <span className="overview-stat-label">파트너 기업</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="overview-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop" 
                  alt="해피라이트 행사"
                />
              </div>
              <div className="image-decoration"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

