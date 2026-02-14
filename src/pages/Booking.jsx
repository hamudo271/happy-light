import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Laugh, Mic, Music, Users, GraduationCap, Package,
  ArrowRight, Star, Phone
} from 'lucide-react'
import './Booking.css'

const bookingCategories = [
  {
    id: 'operation',
    icon: Package,
    title: '행사 운영 지원',
    desc: '기획부터 현장 운영까지, 성공적인 행사를 위한 토탈 솔루션',
    count: 'Total',
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop'
  },
  {
    id: 'mc',
    icon: Mic,
    title: 'MC / 레크 강사',
    desc: '전문 MC와 레크레이션 강사로 행사를 완벽하게 진행합니다',
    count: '100+',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop'
  },
  {
    id: 'casting',
    icon: Laugh,
    title: '개그맨 / 가수 섭외',
    desc: '행사의 분위기를 살리는 인기 개그맨과 가수를 섭외해 드립니다',
    count: '250+',
    color: '#f72585',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop'
  },
  {
    id: 'performance',
    icon: Users,
    title: '공연팀 소개',
    desc: '댄스, 마술, 비보이 등 다양한 공연팀을 섭외합니다',
    count: '80+',
    color: '#06d6a0',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop'
  },
  {
    id: 'lecturer',
    icon: GraduationCap,
    title: '특강 강사',
    desc: '동기부여, 리더십, 소통 등 분야별 전문 강사를 연결합니다',
    count: '150+',
    color: '#ff6b35',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop'
  },
  {
    id: 'equipment',
    icon: Package,
    title: '행사 용품 렌탈',
    desc: '에어바운스, 게임도구, 음향장비 등 모든 행사용품 대여',
    count: '300+',
    color: '#ffd700',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop'
  },
]

function Booking() {
  return (
    <div className="booking-page">
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
            <span className="page-badge">BOOKING</span>
            <h1 className="page-title">
              프로덕션 <span className="gradient-text">지원</span>
            </h1>
            <p className="page-desc">
              행사에 필요한 모든 것을 원스톱으로 해결해 드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section">
        <div className="container">
          <div className="booking-grid">
            {bookingCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/booking/${cat.id}`} className="booking-card">
                  <div className="booking-card-image">
                    <img src={cat.image} alt={cat.title} />
                    <div className="booking-card-overlay">
                      <div 
                        className="booking-card-icon"
                        style={{ '--cat-color': cat.color }}
                      >
                        <cat.icon size={28} />
                      </div>
                    </div>
                  </div>
                  <div className="booking-card-content">
                    <div className="booking-card-header">
                      <h3>{cat.title}</h3>
                      <span className="booking-card-count">{cat.count}</span>
                    </div>
                    <p>{cat.desc}</p>
                    <span className="booking-card-link">
                      자세히 보기 <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section booking-features">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">WHY US</span>
            <h2 className="section-title">
              해피라이트 <span className="gradient-text">프로덕션 지원</span>
            </h2>
          </motion.div>

          <div className="features-grid">
            <motion.div
              className="feature-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="feature-icon">
                <Star size={24} />
              </div>
              <h4>프리미엄 네트워크</h4>
              <p>20년간 쌓아온 연예인, MC, 강사와의 직접 네트워크로 빠르고 합리적인 섭외가 가능합니다.</p>
            </motion.div>
            
            <motion.div
              className="feature-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-icon">
                <Phone size={24} />
              </div>
              <h4>빠른 응대</h4>
              <p>문의 접수 후 24시간 이내 맞춤 제안을 드리며, 급한 섭외도 신속하게 처리합니다.</p>
            </motion.div>
            
            <motion.div
              className="feature-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="feature-icon">
                <Package size={24} />
              </div>
              <h4>원스톱 서비스</h4>
              <p>섭외부터 행사 당일 진행까지 모든 것을 책임지고 관리해 드립니다.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section booking-cta">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>원하시는 프로덕션 지원 항목이 있으신가요?</h2>
            <p>전문 컨설턴트가 맞춤 상담을 도와드립니다</p>
            <div className="cta-buttons">
              <a href="tel:010-1234-5678" className="btn btn-primary">
                📞 010-1234-5678
              </a>
              <Link to="/contact" className="btn btn-secondary">
                온라인 문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Booking

