import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, ChevronRight, Calendar, Eye, Search } from 'lucide-react'
import '../About.css'
import './Notice.css'

const notices = [
  {
    id: 1,
    category: '공지',
    title: '2024년 연말 행사 예약 안내',
    date: '2024.11.15',
    views: 1234,
    isImportant: true,
    content: '2024년 연말 행사(송년회, 시무식 등) 예약이 시작되었습니다. 조기 마감이 예상되오니 서둘러 문의 바랍니다.'
  },
  {
    id: 2,
    category: '이벤트',
    title: '신규 고객 첫 행사 10% 할인 이벤트',
    date: '2024.11.10',
    views: 892,
    isImportant: true,
    content: '11월 한 달간 신규 고객 대상 첫 행사 10% 할인 이벤트를 진행합니다.'
  },
  {
    id: 3,
    category: '공지',
    title: '대한민국 이벤트대상 대상 수상',
    date: '2024.10.28',
    views: 2156,
    isImportant: false,
    content: '해피라이트 엔터테인먼트가 2024 대한민국 이벤트대상에서 대상을 수상하였습니다.'
  },
  {
    id: 4,
    category: '안내',
    title: '추석 연휴 운영 안내',
    date: '2024.09.10',
    views: 567,
    isImportant: false,
    content: '추석 연휴(9/16~18) 동안 상담 운영이 제한됩니다.'
  },
  {
    id: 5,
    category: '공지',
    title: '새로운 팀빌딩 프로그램 출시',
    date: '2024.08.20',
    views: 1089,
    isImportant: false,
    content: '조직 활성화를 위한 새로운 팀빌딩 프로그램 5종이 출시되었습니다.'
  },
  {
    id: 6,
    category: '이벤트',
    title: '여름 특가 프로모션 종료 안내',
    date: '2024.08.31',
    views: 445,
    isImportant: false,
    content: '8월 말까지 진행된 여름 특가 프로모션이 종료되었습니다.'
  },
  {
    id: 7,
    category: '안내',
    title: '사옥 이전 안내',
    date: '2024.06.01',
    views: 789,
    isImportant: false,
    content: '6월 1일부터 강남구 테헤란로 새 사옥에서 업무를 시작합니다.'
  },
  {
    id: 8,
    category: '공지',
    title: '파트너사 500개 돌파 감사 이벤트',
    date: '2024.05.15',
    views: 1567,
    isImportant: false,
    content: '파트너사 500개 돌파를 기념하여 감사 이벤트를 진행합니다.'
  },
]

function Notice() {
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="notice-page">
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
            <span className="page-badge">NOTICE</span>
            <h1 className="page-title">
              공지<span className="gradient-text">사항</span>
            </h1>
            <p className="page-desc">
              해피라이트의 새로운 소식을 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notice List */}
      <section className="section">
        <div className="container">
          <div className="notice-controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="공지사항 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <span className="notice-count">총 {filteredNotices.length}건</span>
          </div>

          <div className="notice-list">
            {filteredNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                className={`notice-item ${notice.isImportant ? 'important' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedNotice(notice)}
              >
                <div className="notice-main">
                  {notice.isImportant && (
                    <span className="notice-badge important">중요</span>
                  )}
                  <span className={`notice-badge ${notice.category}`}>
                    {notice.category}
                  </span>
                  <h3 className="notice-title">{notice.title}</h3>
                </div>
                <div className="notice-meta">
                  <span className="notice-date">
                    <Calendar size={14} />
                    {notice.date}
                  </span>
                  <span className="notice-views">
                    <Eye size={14} />
                    {notice.views.toLocaleString()}
                  </span>
                  <ChevronRight size={18} className="notice-arrow" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal */}
          {selectedNotice && (
            <motion.div
              className="notice-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
            >
              <motion.div
                className="notice-modal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div className="modal-badges">
                    {selectedNotice.isImportant && (
                      <span className="notice-badge important">중요</span>
                    )}
                    <span className={`notice-badge ${selectedNotice.category}`}>
                      {selectedNotice.category}
                    </span>
                  </div>
                  <button 
                    className="modal-close"
                    onClick={() => setSelectedNotice(null)}
                  >
                    ✕
                  </button>
                </div>
                <h2 className="modal-title">{selectedNotice.title}</h2>
                <div className="modal-meta">
                  <span><Calendar size={14} /> {selectedNotice.date}</span>
                  <span><Eye size={14} /> 조회수 {selectedNotice.views.toLocaleString()}</span>
                </div>
                <div className="modal-content">
                  <p>{selectedNotice.content}</p>
                  <p>
                    자세한 내용은 고객센터(010-1234-5678)로 문의해주시기 바랍니다.
                    항상 최선을 다하는 해피라이트가 되겠습니다.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Notice

