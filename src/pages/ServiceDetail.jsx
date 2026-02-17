import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, Trophy, Users, GraduationCap, Mic2, PartyPopper,
  Landmark, Presentation, Check, ArrowRight, Phone
} from 'lucide-react'
import './ServiceDetail.css'

const servicesData = {
  ceremony: {
    icon: Landmark,
    title: '공식의전행사',
    subtitle: '품격 있는 공식 의전의 완성',
    desc: '기공식, 준공식, 창립기념일, 취임식 등 기업과 기관의 중요한 공식 행사를 품격 있게 기획하고 진행합니다. 20년 이상의 경험을 바탕으로 프로토콜에 맞는 완벽한 의전 서비스를 제공합니다.',
    color: '#ff6b35',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '공식 의전 프로토콜 준수',
      '고급 무대 및 장비 설치',
      '전문 MC 및 사회자 섭외',
      '귀빈 응대 서비스',
      '기념품 및 행사 물품 준비',
      '사진/영상 촬영 서비스'
    ],
    programs: ['기공식/준공식', '창립기념일', '취임식/이취임식', '개관식/개업식', '시상식', '기념식전']
  },
  corporate: {
    icon: Building2,
    title: '기업행사',
    subtitle: '성공적인 기업 이벤트의 시작',
    desc: '송년회, 시무식, 워크샵, 세미나 등 기업의 다양한 행사를 전문적으로 기획합니다. 기업 문화와 목적에 맞는 맞춤형 프로그램으로 임직원 모두가 만족하는 행사를 만들어 드립니다.',
    color: '#7c3aed',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '기업 맞춤형 프로그램 기획',
      '전문 MC 및 진행자 배치',
      '음향/조명/영상 장비 지원',
      '케이터링 서비스 연계',
      '포토존 및 이벤트 부스',
      '경품 행사 및 추첨 진행'
    ],
    programs: ['송년회/신년회', '시무식/종무식', '창립기념일', '워크샵', '세미나', '신제품 런칭']
  },
  teambuilding: {
    icon: Users,
    title: '팀빌딩 프로그램',
    subtitle: '조직의 시너지를 높이는 특별한 경험',
    desc: '조직의 화합과 소통 강화를 위한 다양한 팀빌딩 프로그램을 제공합니다. 실내외 다양한 활동을 통해 팀워크를 강화하고 조직 문화를 개선합니다.',
    color: '#06d6a0',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '조직 진단 기반 맞춤 설계',
      '다양한 실내외 활동',
      '전문 퍼실리테이터 진행',
      '팀 단합 게임 프로그램',
      '리더십 강화 프로그램',
      '결과 분석 및 피드백'
    ],
    programs: ['팀 화합 프로그램', '리더십 캠프', '커뮤니케이션 워크샵', '문제해결 챌린지', '야외 어드벤처', '실내 미션']
  },
  sports: {
    icon: Trophy,
    title: '체육대회',
    subtitle: '건강한 조직문화의 시작',
    desc: '임직원 화합과 건강한 조직문화 형성을 위한 체육대회를 전문적으로 기획합니다. 다양한 종목과 프로그램으로 모든 참가자가 즐길 수 있는 행사를 만들어 드립니다.',
    color: '#00d4ff',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '맞춤형 종목 구성',
      '전문 심판 및 진행 요원',
      '대형 에어바운스 설치',
      '응원 도구 및 유니폼',
      '시상식 및 경품 행사',
      '안전 관리 시스템'
    ],
    programs: ['기업 체육대회', '가족 운동회', '스포츠 페스티벌', '걷기대회', '마라톤', '부서대항전']
  },
  school: {
    icon: GraduationCap,
    title: '학교행사',
    subtitle: '학생들의 추억을 만드는 특별한 순간',
    desc: '초등학교 운동회부터 대학 축제까지, 학교의 다양한 행사를 안전하고 즐겁게 기획합니다. 교육적 가치와 재미를 모두 갖춘 프로그램을 제공합니다.',
    color: '#f72585',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '학년별 맞춤 프로그램',
      '안전한 행사 진행',
      '교육적 레크레이션',
      '학부모 참여 프로그램',
      '기념 촬영 서비스',
      '친환경 행사 물품'
    ],
    programs: ['초등학교 운동회', '중학교 체육대회', '고등학교 축제', '대학교 행사', '졸업식', '입학식']
  },
  exhibition: {
    icon: Presentation,
    title: '전시/컨벤션',
    subtitle: '성공적인 전시와 컨벤션의 파트너',
    desc: '전시회, 박람회, 컨벤션 등 대규모 행사의 기획부터 운영까지 원스톱 서비스를 제공합니다. 효과적인 전시 연출과 참관객 관리로 성공적인 행사를 만들어 드립니다.',
    color: '#ffd700',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '전시 공간 디자인',
      '부스 설계 및 시공',
      '참관객 등록 시스템',
      '세미나/컨퍼런스 진행',
      '네트워킹 프로그램',
      '사후 리포트 제공'
    ],
    programs: ['기업 전시회', '채용박람회', '산업 박람회', '컨퍼런스', '세미나', '신제품 발표회']
  },
  goldenbell: {
    icon: PartyPopper,
    title: '골든벨 행사',
    subtitle: '참여와 재미가 넘치는 퀴즈쇼',
    desc: 'TV 프로그램 형식의 골든벨 퀴즈쇼를 기업, 학교, 단체에 맞게 기획합니다. 맞춤형 문제 제작과 전문 진행으로 참가자 모두가 즐기는 행사를 만들어 드립니다.',
    color: '#ff6b35',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '맞춤형 문제 제작',
      '전문 MC 진행',
      '전자 답안 시스템',
      '화려한 무대 연출',
      '경품 및 시상',
      '실시간 점수 집계'
    ],
    programs: ['기업 골든벨', '학교 골든벨', '단체 퀴즈쇼', '가족 골든벨', '온라인 골든벨', '하이브리드 골든벨']
  },
  recreation: {
    icon: Mic2,
    title: '레크레이션',
    subtitle: '모두가 하나되는 즐거운 시간',
    desc: '학생, 성인, 가족 등 다양한 대상에 맞는 레크레이션 프로그램을 제공합니다. 전문 레크레이션 강사가 참가자 모두가 즐길 수 있는 프로그램을 진행합니다.',
    color: '#7c3aed',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '대상별 맞춤 프로그램',
      '전문 레크레이션 강사',
      '다양한 게임 도구',
      '음향/마이크 장비',
      '팀 대항 게임',
      '참여형 이벤트'
    ],
    programs: ['학생 레크레이션', '성인 레크레이션', '가족 레크레이션', '야유회', 'MT 프로그램', '워크샵 레크레이션']
  },
  palsoon: {
    icon: PartyPopper, // Or Heart if imported (need to check imports)
    title: '팔순잔치/결혼식사회',
    subtitle: '일생에 단 한 번뿐인 소중한 순간',
    desc: '부모님의 은혜에 감사하는 팔순/칠순 잔치부터 새로운 출발을 알리는 결혼식 사회까지, 가족의 소중한 행사를 진심을 담아 진행합니다. 품격 있는 진행으로 감동과 기쁨을 선사합니다.',
    color: '#fb7185',
    image: `${import.meta.env.BASE_URL}images/portfolio-sample-1.jpg`,
    features: [
      '주인공 맞춤형 식순 기획',
      '품격 있는 전문 사회자',
      '헌수 및 축하 공연',
      '성장동영상 제작',
      '음향 및 조명 연출',
      '스냅 사진 촬영'
    ],
    programs: ['팔순/칠순 잔치', '결혼식 주례 없는 예식', '결혼식 전문 사회', '피로연 파티', '돌잔치', '가족 모임']
  }
}

function ServiceDetail() {
  const { serviceId } = useParams()
  const service = servicesData[serviceId]

  if (!service) {
    return (
      <div className="not-found">
        <h1>서비스를 찾을 수 없습니다</h1>
        <Link to="/services" className="btn btn-primary">
          서비스 목록으로
        </Link>
      </div>
    )
  }

  return (
    <div className="service-detail-page">
      {/* Hero */}
      <section className="service-detail-hero">
        <div className="hero-image">
          <img src={encodeURI(service.image)} alt={service.title} />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="hero-icon"
              style={{ '--service-color': service.color }}
            >
              <service.icon size={40} />
            </div>
            <h1 className="hero-title">{service.title}</h1>
            <p className="hero-subtitle">{service.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="service-detail-grid">
            <motion.div
              className="service-detail-main"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>서비스 소개</h2>
              <p className="service-description">{service.desc}</p>

              <h3>주요 특징</h3>
              <ul className="features-list">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h3>프로그램 종류</h3>
              <div className="programs-grid">
                {service.programs.map((program, index) => (
                  <div key={index} className="program-item">
                    {program}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="service-detail-sidebar"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sidebar-card">
                <h4>빠른 상담 신청</h4>
                <p>전문 컨설턴트가 맞춤 상담을 도와드립니다</p>
                <a href="tel:010-1234-5678" className="btn btn-primary">
                  <Phone size={18} />
                  010-1234-5678
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  온라인 문의하기
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="sidebar-card">
                <h4>다른 서비스 보기</h4>
                <ul className="other-services">
                  {Object.entries(servicesData)
                    .filter(([key]) => key !== serviceId)
                    .slice(0, 4)
                    .map(([key, s]) => (
                      <li key={key}>
                        <Link to={`/services/${key}`}>
                          <s.icon size={16} />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail

