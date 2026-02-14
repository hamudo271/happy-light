import { motion } from 'framer-motion'
import { Crown, Users, Mic2, Palette, Headphones } from 'lucide-react'
import '../About.css'
import './Organization.css'

const teams = [
  {
    name: '대표이사',
    icon: Crown,
    members: [
      { name: '홍길동', position: 'CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' }
    ]
  },
  {
    name: '기획팀',
    icon: Palette,
    members: [
      { name: '김철수', position: '팀장', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
      { name: '이영희', position: '과장', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
      { name: '박민수', position: '대리', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    ]
  },
  {
    name: '진행팀',
    icon: Mic2,
    members: [
      { name: '최진호', position: '팀장', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop' },
      { name: '정수민', position: '과장', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
      { name: '강동원', position: '대리', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
      { name: '한소희', position: '사원', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' },
    ]
  },
  {
    name: '영업팀',
    icon: Users,
    members: [
      { name: '윤서영', position: '팀장', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
      { name: '임재현', position: '과장', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
      { name: '조유진', position: '대리', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
    ]
  },
  {
    name: '고객지원팀',
    icon: Headphones,
    members: [
      { name: '송지은', position: '팀장', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' },
      { name: '오민혁', position: '대리', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop' },
    ]
  },
]

function Organization() {
  return (
    <div className="organization-page">
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
            <span className="page-badge">ORGANIZATION</span>
            <h1 className="page-title">
              조직<span className="gradient-text">도</span>
            </h1>
            <p className="page-desc">
              각 분야 최고의 전문가들이 함께합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="section">
        <div className="container">
          <div className="org-chart">
            {teams.map((team, teamIndex) => (
              <motion.div
                key={teamIndex}
                className={`org-team ${teamIndex === 0 ? 'org-team-ceo' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: teamIndex * 0.1 }}
              >
                <div className="org-team-header">
                  <team.icon size={24} />
                  <h3>{team.name}</h3>
                </div>
                <div className="org-members">
                  {team.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="org-member">
                      <div className="org-member-image">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <div className="org-member-info">
                        <span className="org-member-name">{member.name}</span>
                        <span className="org-member-position">{member.position}</span>
                      </div>
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

export default Organization

