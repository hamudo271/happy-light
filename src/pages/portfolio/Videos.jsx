import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, X, Calendar, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../Portfolio.css'
import './Videos.css'

import { videos } from '../../data/mediaData'

const categories = ['전체', '기업행사', '팀빌딩', '공식의전', '골든벨', '학교행사']
const ITEMS_PER_PAGE = 12

function Videos() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const filteredVideos = activeCategory === '전체' 
    ? videos 
    : videos.filter(v => v.category === activeCategory)

  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE)
  
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="videos-page">
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
            <span className="page-badge">VIDEOS</span>
            <h1 className="page-title">
              행사<span className="gradient-text">영상</span>
            </h1>
            <p className="page-desc">
              성공적으로 진행된 주요 행사들의 하이라이트 영상
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="section">
        <div className="container">
          {/* Videos */}
          <div className="videos-grid">
            {currentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="video-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-play">
                    <Play size={32} fill="white" />
                  </div>
                  <span className="video-category">{video.category}</span>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <div className="video-meta">
                    <span><Calendar size={14} /> {video.date}</span>
                    <span><Eye size={14} /> {video.views.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn nav"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft size={20} />
              </button>
              <button 
                className="page-btn nav"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button 
                className="page-btn nav"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
              <button 
                className="page-btn nav"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight size={20} />
              </button>
            </div>
          )}

          {/* Category Filter */}
          <div className="category-filter" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="video-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={24} />
            </button>
            <div className="video-embed">
              {selectedVideo.videoUrl.endsWith('.mp4') ? (
                <video 
                  src={encodeURI(selectedVideo.videoUrl)} 
                  controls 
                  autoPlay 
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <span>{selectedVideo.category} · {selectedVideo.date}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Videos

