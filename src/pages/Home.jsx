import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { 
  ArrowRight, Play, Star, Users, Calendar, Award, 
  Building2, GraduationCap, Trophy, Mic2, PartyPopper,
  Sparkles, ChevronRight, Zap, Heart, Target, 
  Video, Landmark, HeartHandshake
} from 'lucide-react'
import './Home.css'

const stats = [
  { number: 'B2C', label: '개인 고객', icon: Heart },
  { number: 'B2B', label: '기업 고객', icon: Building2 },
  { number: 'B2G', label: '공공기관', icon: Landmark },
  { number: '100%', label: '맞춤 서비스', icon: Star },
]

const services = [
  {
    icon: Award,
    title: '공식 의전·기념식 행사',
    desc: '기념식, 개소식, 준공식, 선포식, 개통식 등 격과 안정이 요구되는 공식행사',
    path: '/services/ceremony',
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)'
  },
  {
    icon: Building2,
    title: '기업행사·조직 커뮤니케이션',
    desc: '창립기념식·워크숍·송년/신년회 등 조직의 메시지를 전달하는 기업 맞춤 행사',
    path: '/services/corporate',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
  },
  {
    icon: Users,
    title: '팀빌딩 프로그램',
    desc: '사람과 팀을 변화시키는 시그니처 프로그램 (팀빌딩, 레크레이션, 팀크레이션)',
    path: '/services/teambuilding',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
  },
  {
    icon: Trophy,
    title: '체육대회·명랑운동회',
    desc: '소규모부터 대규모까지 참여·몰입·분위기를 완성하는 스포츠형 행사',
    path: '/services/sports',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)'
  },
  {
    icon: GraduationCap,
    title: '학교·청소년 단체캠프 행사',
    desc: '수학여행·MT·대동제·학교 축제 등 교육·안전·몰입을 고려한 학교 맞춤 행사',
    path: '/services/school',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  },
  {
    icon: PartyPopper,
    title: '축제·전시·컨벤션 행사',
    desc: '마을축제·지역축제·전시·컨벤션 등 기획부터 운영까지 책임지는 종합 토탈 이벤트',
    path: '/services/exhibition',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
  },
]

const portfolioItems = [
  {
    title: '삼성전자 체육대회',
    category: '기업행사',
    image: import.meta.env.BASE_URL + '해피라이트/KakaoTalk_20250905_153826410/KakaoTalk_20250902_104124578_12.jpg',
    size: 'large'
  },
  {
    title: '현대자동차 팀빌딩',
    category: '팀빌딩',
    image: import.meta.env.BASE_URL + '해피라이트/레크레이션/1555984699091.jpg',
    size: 'medium'
  },
  {
    title: '서울초 가을운동회',
    category: '학교행사',
    image: import.meta.env.BASE_URL + '해피라이트/레크레이션/1478390046277.jpg',
    size: 'small'
  },
  {
    title: '네이버 골든벨',
    category: '골든벨',
    image: import.meta.env.BASE_URL + '해피라이트/KakaoTalk_20250905_153826410/KakaoTalk_20250902_104115575_28.jpg',
    size: 'small'
  },
]

const partners = [
  '삼성전자', 'LG전자', '현대자동차', 'SK', 'CJ', '롯데', 
  '네이버', '카카오', '쿠팡', '배달의민족', 'KT', 'POSCO'
]

const features = [
  {
    icon: Mic2,
    title: 'MC & 강사진행',
    desc: '현장 경험이 풍부한 전문 MC와 강사진'
  },
  {
    icon: PartyPopper,
    title: '행사 기획/연출',
    desc: '콘셉트부터 연출까지 원스톱 서비스'
  },
  {
    icon: Video,
    title: '영상광고 제작',
    desc: '감동을 담은 홍보영상 및 기록 제작'
  }
]

function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg-v2.png`}
            alt="Hero Background" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <motion.div 
          className="container hero-content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} />
            <span>종합 행사대행 기획사</span>
          </motion.div>
          
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            현장에 강한 기획력
            <br />
            <span className="gradient-text">따뜻한 감동</span>의 연출
          </motion.h1>
          
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            해피라이트 엔터테인먼트는 다양한 현장에서 축적된 경험과 전문성을 바탕으로
            <br />
            MC, 강사 진행, 기획·연출까지 아우르는 종합 행사대행 기획사입니다.
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/contact" className="btn btn-primary hero-btn-primary">
              무료 상담 신청
              <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="btn btn-secondary hero-btn-secondary">
              <Play size={18} />
              포트폴리오 보기
            </Link>
          </motion.div>
          
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="hero-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <stat.icon className="hero-stat-icon" size={20} />
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
      </section>

      {/* About Section - 회사 소개 */}
      <section className="section about-section" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/subtle-pattern-v2.png)` }}>
        <div className="container">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-text">
              <h2 className="about-title">
                행사의 시작부터 끝까지,<br />
                <span className="gradient-text">해피라이트</span>가 함께합니다
              </h2>
              <p className="about-desc">
                우리는 단순한 행사대행사가 아닙니다.<br />
                작게는 가족의 소중한 순간부터,<br />
                크게는 기업·학교·지역축제, 도시재생 문화사업,<br />
                대규모 캠프와 전시회까지—<br />
                <strong>어떤 자리든 따뜻하고 즐겁게 채워드립니다.</strong>
              </p>
            </div>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            className="about-tagline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            👉 웃음이 넘치는 현장, 감동이 남는 추억<br />
            그 중심에 <strong>해피라이트 엔터테인먼트</strong>가 있습니다.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/service-wave-v2.png)` }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Sparkles size={12} />
              주요 서비스 영역
            </span>
            <h2 className="section-title">
              모든 <span className="gradient-text">순간</span>을 특별하게
            </h2>
            <p className="section-subtitle" style={{ wordBreak: 'keep-all' }}>
              B2C(개인), B2B(기업), B2G(공공기관) 전 영역에서 맞춤형 서비스를 제공합니다
            </p>
          </motion.div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.path} className="service-card">
                  <div className="service-card-bg" style={{ background: service.gradient }}></div>
                  <div 
                    className="service-icon"
                    style={{ '--service-color': service.color }}
                  >
                    <service.icon size={28} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <span className="service-link">
                    자세히 보기 <ChevronRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="services-banner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}image 2.png`} 
              alt="Special Event" 
              style={{ 
                maxWidth: '100%', 
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section portfolio-section">
        <div className="portfolio-bg"></div>
        <div className="container">

          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Sparkles size={12} />
              PORTFOLIO
            </span>
            <h2 className="section-title">
              최근 <span className="gradient-text">진행 행사</span>
            </h2>
            <p className="section-subtitle">
              다양한 기업과 함께한 성공적인 행사 사례를 확인하세요
            </p>
          </motion.div>
          
          <div className="portfolio-bento">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                className={`portfolio-item portfolio-${item.size}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{item.category}</span>
                    <h4 className="portfolio-title">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="portfolio-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/portfolio" className="btn btn-primary">
              더 많은 사례 보기
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Sparkles size={12} />
              PARTNERS
            </span>
            <h2 className="section-title">
              함께하는 <span className="gradient-text">파트너사</span>
            </h2>
          </motion.div>
          
          <motion.div
            className="partners-marquee"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="partners-track">
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="partner-item">
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
