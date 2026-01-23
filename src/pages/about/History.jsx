import { motion } from 'framer-motion'
import { Calendar, Building2, Trophy, Star, Users, Award } from 'lucide-react'
import '../About.css'
import './History.css'

const historyData = [
  {
    year: '2024',
    events: [
      { month: '11월', title: '누적 행사 진행 2,500건 돌파' },
      { month: '09월', title: '삼성전자 공식 행사 파트너 선정' },
      { month: '05월', title: '대한민국 이벤트대상 대상 수상' },
    ]
  },
  {
    year: '2023',
    events: [
      { month: '12월', title: 'LG전자 창립 75주년 행사 성공 개최' },
      { month: '08월', title: '파트너사 500개 돌파' },
      { month: '03월', title: '골든벨 행사 1000회 진행 달성' },
    ]
  },
  {
    year: '2022',
    events: [
      { month: '10월', title: '대기업 팀빌딩 프로그램 런칭' },
      { month: '06월', title: '신규 사옥 이전 (강남구 테헤란로)' },
      { month: '02월', title: '온라인 하이브리드 행사 시스템 구축' },
    ]
  },
  {
    year: '2020',
    events: [
      { month: '07월', title: '비대면 행사 솔루션 개발' },
      { month: '01월', title: '창립 10주년 기념행사' },
    ]
  },
  {
    year: '2015',
    events: [
      { month: '12월', title: '누적 행사 1,000건 달성' },
      { month: '08월', title: '초등학교 운동회 전문 서비스 런칭' },
    ]
  },
  {
    year: '2010',
    events: [
      { month: '03월', title: '해피라이트 엔터테인먼트 설립' },
    ]
  },
]

const achievements = [
  { icon: Calendar, number: '2,500+', label: '행사 진행' },
  { icon: Building2, number: '500+', label: '파트너 기업' },
  { icon: Trophy, number: '15+', label: '수상 경력' },
  { icon: Star, number: '98%', label: '고객 만족도' },
]

function History() {
  return (
    <div className="history-page">
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
            <span className="page-badge">HISTORY</span>
            <h1 className="page-title">
              주요<span className="gradient-text">실적</span>
            </h1>
            <p className="page-desc">
              해피라이트 엔터테인먼트의 성공 스토리
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="section achievements-section">
        <div className="container">
          <div className="achievements-grid">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <item.icon className="achievement-icon" size={32} />
                <span className="achievement-number">{item.number}</span>
                <span className="achievement-label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">TIMELINE</span>
            <h2 className="section-title">
              해피라이트의 <span className="gradient-text">발자취</span>
            </h2>
          </motion.div>

          <div className="timeline">
            {historyData.map((yearData, yearIndex) => (
              <motion.div
                key={yearIndex}
                className="timeline-year"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
              >
                <div className="timeline-year-label">
                  <span>{yearData.year}</span>
                </div>
                <div className="timeline-events">
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="timeline-event">
                      <span className="event-month">{event.month}</span>
                      <span className="event-title">{event.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default History

