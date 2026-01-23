import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  Instagram, Youtube, CheckCircle, Sparkles, ArrowDown
} from 'lucide-react'
import './Contact.css'



function Contact() {
  const contactInfoRef = useRef(null)

  const scrollToContactInfo = () => {
    contactInfoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    eventType: '',
    date: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setFormData({
            name: '',
            company: '',
            phone: '',
            email: '',
            eventType: '',
            date: '',
            message: ''
        })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setError(data.message || '문의 전송에 실패했습니다.')
      }
    } catch (err) {
      setError('서버 연결 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const eventTypes = [
    '기업행사',
    '체육대회',
    '팀빌딩',
    '학교행사',
    '골든벨',
    '공식의전행사',
    '레크레이션',
    '프로덕션지원 문의',
    '기타'
  ]

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero contact-hero">
        <div className="page-hero-bg"></div>
        <div className="contact-hero-shapes">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        <div className="container">
          <motion.div
            className="page-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-badge">
              <Sparkles size={14} />
              CONTACT US
            </span>
            <h1 className="page-title">
              1분만에<br />
              <span className="gradient-text">전문 상담 받기</span>
            </h1>
            
            <motion.div 
              className="hero-cta-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={scrollToContactInfo}
                className="btn btn-primary consulting-btn"
              >
                컨설팅
                <ArrowDown size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Message Marquee Section */}
      <section className="section message-marquee-section">
        <div className="marquee-track">
          <div className="marquee-item">
            <span className="marquee-text">당신의 생각이 그날의 <span className="highlight">최고의 퍼포먼스</span>가 되도록 함께 준비하겠습니다.</span>
          </div>
          <div className="marquee-item">
            <span className="marquee-text">당신의 생각이 그날의 <span className="highlight">최고의 퍼포먼스</span>가 되도록 함께 준비하겠습니다.</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-info-section" ref={contactInfoRef}>
        <div className="container">
          <div className="contact-info-grid">
            <motion.a
              href="tel:010-5728-8848"
              className="contact-info-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="contact-info-icon phone-icon">
                <Phone size={28} />
              </div>
              <div className="contact-info-content">
                <h3>전화 문의</h3>
                <p className="contact-info-main">010-5728-8848</p>
                <span className="contact-info-sub">친절하게 상담해드립니다</span>
              </div>
            </motion.a>

            <motion.a
              href="mailto:aura8848@gmail.com"
              className="contact-info-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="contact-info-icon email-icon">
                <Mail size={28} />
              </div>
              <div className="contact-info-content">
                <h3>이메일 문의</h3>
                <p className="contact-info-main">aura8848@gmail.com</p>
                <span className="contact-info-sub">24시간 내 답변드립니다</span>
              </div>
            </motion.a>

            <motion.div
              className="contact-info-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="contact-info-icon location-icon">
                <MapPin size={28} />
              </div>
              <div className="contact-info-content">
                <h3>오시는 길</h3>
                <p className="contact-info-main">광주 서구 운천로 247 스타타워 4층</p>
                <span className="contact-info-sub">관광기업지원센터</span>
              </div>
            </motion.div>

            <motion.div
              className="contact-info-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="contact-info-icon time-icon">
                <Clock size={28} />
              </div>
              <div className="contact-info-content">
                <h3>상담 시간</h3>
                <p className="contact-info-main">연중무휴 · 24시간 대응</p>
                <span className="contact-info-sub">언제든 문의 가능합니다</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Form */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="form-header">
                <h2>상담 신청하기</h2>
                <p>아래 양식을 작성해 주시면 빠르게 연락드리겠습니다</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={64} />
                  <h3>상담 신청이 완료되었습니다!</h3>
                  <p>빠른 시일 내에 연락드리겠습니다.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">이름 *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">회사/단체명</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="해피라이트 엔터테인먼트"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">연락처 *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">이메일</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="eventType">행사 유형 *</label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">선택해주세요</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">희망 일정</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                    <div className="form-group">
                    <label htmlFor="message">문의 내용 *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="행사 규모, 장소, 예산 등 자세한 내용을 적어주시면 더 정확한 상담이 가능합니다."
                      rows={5}
                      required
                    ></textarea>
                    <p className="form-note" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                      소규모행사도 가능합니다. 부담없이 남겨주세요.
                    </p>
                  </div>

                  <div className="form-privacy">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span className="checkmark"></span>
                      <span>개인정보 수집 및 이용에 동의합니다</span>
                    </label>
                  </div>

                  {error && (
                    <div className="form-error-message" style={{ color: '#ff4d4f', padding: '10px', background: '#fff1f0', borderRadius: '4px', marginBottom: '15px' }}>
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary form-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner" style={{ marginRight: '8px' }}>⏳</span>
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        상담 신청하기
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              className="contact-side"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="map-wrapper">
                <div className="map-placeholder">
                  <MapPin size={48} />
                  <p>광주 서구 운천로 247 스타타워 4층<br />(치평동, 스타타워) 관광기업지원센터</p>
                  <span>해피라이트엔터테인먼트</span>
                </div>
              </div>

              <div className="quick-contact">
                <h3>빠른 상담</h3>
                <p>전화 상담을 원하시면 지금 바로 연락주세요!</p>
                <a href="tel:010-5728-8848" className="quick-phone">
                  <Phone size={24} />
                  <span>010-5728-8848</span>
                </a>
              </div>


              <div className="social-links">
                <h3>SNS 채널</h3>
                <div className="social-buttons">
                  <a href="#" className="social-btn instagram">
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-btn youtube">
                    <Youtube size={20} />
                    <span>Youtube</span>
                  </a>
                  <a href="https://open.kakao.com/o/svQrVCw" className="social-btn kakao" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={20} />
                    <span>KakaoTalk</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="section faq-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">
              자주 묻는 <span className="gradient-text">질문</span>
            </h2>
          </motion.div>

          <div className="faq-grid">
            {[
              {
                q: '상담 비용이 있나요?',
                a: '아니요, 모든 상담은 무료입니다. 편하게 문의해주세요.'
              },
              {
                q: '얼마나 빨리 답변을 받을 수 있나요?',
                a: '평일 기준 24시간 이내에 답변드리고 있습니다.'
              },
              {
                q: '행사 몇 일 전에 문의해야 하나요?',
                a: '최소 2주 전 문의를 권장드리며, 급한 행사도 가능한 조율해드립니다.'
              },
              {
                q: '전국 어디서나 행사가 가능한가요?',
                a: '네, 전국 어디서든 행사 진행이 가능합니다.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

