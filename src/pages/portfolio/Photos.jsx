import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ChevronsLeft, ChevronsRight } from 'lucide-react'
import '../Portfolio.css'
import './Photos.css'

import { photos } from '../../data/mediaData'

const categories = ['전체', '기업행사', '팀빌딩', '공식의전', '골든벨', '학교행사']
const ITEMS_PER_PAGE = 16

function Photos() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const filteredPhotos = activeCategory === '전체' 
    ? photos 
    : photos.filter(p => p.category === activeCategory)

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE)
  
  const currentPhotos = filteredPhotos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
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
    <div className="photos-page">
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
            <span className="page-badge">PHOTOS</span>
            <h1 className="page-title">
              행사<span className="gradient-text">스케치</span>
            </h1>
            <p className="page-desc">
              다양한 행사 현장의 생생한 모습을 사진으로 만나보세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="section">
        <div className="container">
          {/* Photos */}
          <div className="photos-grid">
            {currentPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="photo-item"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedIndex((currentPage - 1) * ITEMS_PER_PAGE + index)}
              >
                <img src={encodeURI(photo.image)} alt={photo.title} />
                <div className="photo-overlay">
                  <ZoomIn size={24} />
                  <span className="photo-category">{photo.category}</span>
                  <h4 className="photo-title">{photo.title}</h4>
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="lightbox-close"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>
            
            <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
              <ChevronLeft size={32} />
            </button>
            
            <motion.div
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={encodeURI(filteredPhotos[selectedIndex].image)} 
                alt={filteredPhotos[selectedIndex].title}
              />
              <div className="lightbox-info">
                <span className="lightbox-category">{filteredPhotos[selectedIndex].category}</span>
                <h3>{filteredPhotos[selectedIndex].title}</h3>
              </div>
            </motion.div>
            
            <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
              <ChevronRight size={32} />
            </button>
            
            <div className="lightbox-counter">
              {selectedIndex + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Photos

