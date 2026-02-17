import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Building2, Trophy, Users, GraduationCap, Mic2, PartyPopper,
  Landmark, Presentation, ChevronRight, Sparkles
} from 'lucide-react'
import './Services.css'

const services = [
  {
    id: 'ceremony',
    icon: Landmark,
    title: '공식의전행사',
    desc: '기공식, 준공식, 창립기념일 등 공식 의전 행사의 품격을 높여드립니다.',
    features: ['기공식/준공식', '창립기념일', '취임식/이취임식', '기념행사'],
    color: '#ff6b35',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'corporate',
    icon: Building2,
    title: '기업행사',
    desc: '기업의 중요한 순간을 성공적으로 이끄는 전문 기업행사 서비스',
    features: ['송년회/신년회', '시무식/종무식', '워크샵', '세미나'],
    color: '#7c3aed',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'teambuilding',
    icon: Users,
    title: '팀빌딩 프로그램',
    desc: '조직의 화합과 소통을 이끄는 맞춤형 팀빌딩 프로그램',
    features: ['팀 화합 프로그램', '리더십 강화', '커뮤니케이션', '문제해결 워크샵'],
    color: '#06d6a0',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'sports',
    icon: Trophy,
    title: '체육대회',
    desc: '임직원 화합과 건강한 조직문화를 위한 체육대회 전문 기획',
    features: ['기업 체육대회', '가족운동회', '스포츠 페스티벌', '걷기대회'],
    color: '#00d4ff',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'school',
    icon: GraduationCap,
    title: '학교행사',
    desc: '초등학교 운동회부터 대학 축제까지 학교 행사 전문',
    features: ['초등학교 운동회', '중고등학교 축제', '대학교 행사', '졸업식'],
    color: '#f72585',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'exhibition',
    icon: Presentation,
    title: '전시/컨벤션',
    desc: '전시회, 박람회, 컨벤션 등 대규모 행사 기획 및 운영',
    features: ['전시회 기획', '박람회 운영', '컨벤션 진행', '부스 운영'],
    color: '#ffd700',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'palsoon',
    icon:  Mic2, // Reusing Mic2 or finding a better one like Heart or Gift if available. Heart is already imported in ServiceDetail but not here. Sparkles is here. Let's use Sparkles for now or import Heart. Sparkles is good for celebration.
    title: '팔순잔치/결혼식사회',
    desc: '소중한 가족 행사를 더욱 품격 있고 아름답게 만들어드립니다.',
    features: ['팔순/칠순 잔치', '결혼식 전문 사회', '피로연 진행', '가족 모임'],
    color: '#fb7185',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'goldenbell',
    icon: PartyPopper,
    title: '골든벨 행사',
    desc: '참여와 재미를 극대화하는 도전! 골든벨 퀴즈쇼',
    features: ['기업 골든벨', '학교 골든벨', '단체 퀴즈쇼', '맞춤형 문제 제작'],
    color: '#ff6b35',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
  {
    id: 'recreation',
    icon: Mic2,
    title: '레크레이션',
    desc: '참가자 모두가 즐거운 전문 레크레이션 프로그램',
    features: ['학생 레크레이션', '성인 레크레이션', '가족 레크레이션', 'MC 진행'],
    color: '#7c3aed',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`
  },
]

function Services() {
  return (
    <div className="services-page">
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
            <span className="page-badge">SERVICES</span>
            <h1 className="page-title">
              사업<span className="gradient-text">분야</span>
            </h1>
            <p className="page-desc">
              모든 종류의 이벤트를 전문적으로 기획하고 운영합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/services/${service.id}`} className="service-item-link">
                  <div className="service-item-image">
                    <img src={service.image} alt={service.title} />
                    <div className="service-item-overlay">
                      <div 
                        className="service-item-icon"
                        style={{ '--service-color': service.color }}
                      >
                        <service.icon size={32} />
                      </div>
                    </div>
                  </div>
                  <div className="service-item-content">
                    <h3 className="service-item-title">{service.title}</h3>
                    <p className="service-item-desc">{service.desc}</p>
                    <ul className="service-item-features">
                      {service.features.map((feature, i) => (
                        <li key={i}>
                          <Sparkles size={12} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span className="service-item-link-text">
                      자세히 보기 <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section services-cta">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>원하시는 행사가 없으신가요?</h2>
            <p>어떤 형태의 행사든 맞춤 기획이 가능합니다. 지금 바로 상담받아보세요!</p>
            <Link to="/contact" className="btn btn-primary">
              무료 상담 신청
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services

