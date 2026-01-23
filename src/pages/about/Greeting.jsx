import { motion } from 'framer-motion'
import { Quote, Heart, Target, Users } from 'lucide-react'
import '../About.css'
import './Greeting.css'

const values = [
  {
    icon: Heart,
    title: '진심을 담은 서비스',
    desc: '고객의 성공이 곧 우리의 성공입니다. 모든 행사에 진심을 담아 준비합니다.'
  },
  {
    icon: Target,
    title: '완벽을 향한 열정',
    desc: '사소한 디테일까지 놓치지 않는 꼼꼼함으로 완벽한 행사를 만들어갑니다.'
  },
  {
    icon: Users,
    title: '함께하는 성장',
    desc: '고객, 파트너, 직원 모두가 함께 성장하는 지속 가능한 가치를 추구합니다.'
  },
]

function Greeting() {
  return (
    <div className="greeting-page">
      {/* Background Effects */}
      <div className="greeting-bg-effects">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-particle p1"></div>
        <div className="bg-particle p2"></div>
        <div className="bg-particle p3"></div>
      </div>

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
            <span className="page-badge">GREETING</span>
            <h1 className="page-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              해피라이트 대표 <span className="gradient-text">인사말</span>
            </h1>
            <p className="page-desc">
              해피라이트 엔터테인먼트의 철학과 비전을 소개합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="section">
        <div className="container">
          <motion.div
            className="greeting-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="greeting-image">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" 
                alt="대표이사"
              />
              <div className="greeting-image-label">
                <span className="name">김영성</span>
                <span className="position">대표</span>
              </div>
            </div>
            
            <div className="greeting-message">
              <Quote className="quote-icon" size={48} />
              
              <h2 className="greeting-title">
                행사는 순간이지만,<br />
                <span className="gradient-text">그 순간의 완성도는 평생 기억됩니다.</span>
              </h2>
              
              <div className="greeting-text">
                <p>
                  안녕하십니까.<br />
                  해피라이트 엔터테인먼트 대표 김영성입니다.
                </p>
                <p>
                  저는 지난 20년 동안<br />
                  수많은 무대와 현장에서<br />
                  단 한 가지 원칙만을 지켜왔습니다.
                </p>
                <p className="highlight-text">
                  ‘행사는 잘 치러지는 것이 아니라,<br />
                  의도한 결과에 정확히 도달해야 한다는 것.’
                </p>
                <p>
                  해피라이트는 단순히 사람을 배치하고<br />
                  프로그램을 나열하는 회사가 아닙니다.
                </p>
                <p>
                  목적을 읽고,<br />
                  흐름을 설계하며,<br />
                  현장에서 발생하는 모든 변수를 통제하는<br />
                  실전 중심의 이벤트 기획사입니다.
                </p>
                <p>
                  우리는<br />
                  MC·기획·연출·운영을 분리하지 않습니다.<br />
                  처음 기획부터 마지막 박수까지,<br />
                  모든 책임을 한 팀이 집니다.
                </p>
                <p>
                  기업행사, 팀빌딩, 대규모 체육대회,<br />
                  학교·지역축제, 공공기관 행사까지<br />
                  규모와 형식이 달라도<br />
                  완성도의 기준은 단 하나입니다.
                </p>
                <p className="highlight-text">
                  “끝났을 때,<br />
                  잘했다는 말이 자연스럽게 나오는가.”
                </p>
                <p>
                  B2C, B2B, B2G 전 영역에서<br />
                  20년간 2,500회 이상의 현장을 통해<br />
                  검증된 방식으로만 제안합니다.
                </p>
                <p>
                  “현장에 강한 기획력, 따뜻한 감동이 있는 연출”<br />
                  그 기준을<br />
                  해피라이트가 함께 만듭니다.
                </p>
              </div>
              
              <div className="greeting-signature">
                <span>해피라이트 엔터테인먼트 대표</span>
                <span className="signature-name">김 영 성</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">OUR VALUES</span>
            <h2 className="section-title">
              우리의 <span className="gradient-text">핵심 가치</span>
            </h2>
          </motion.div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon">
                  <value.icon size={28} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Greeting

