/**
 * =============================================================================
 * main.jsx - 앱의 시작점 (Entry Point)
 * =============================================================================
 * 
 * 이 파일은 React 앱이 처음 시작되는 곳입니다.
 * HTML의 <div id="root"></div> 요소에 React 앱을 렌더링합니다.
 * 
 * 📌 주요 역할:
 * 1. React 앱을 DOM에 마운트 (연결)
 * 2. 전역 Provider들을 설정 (테마, 라우팅 등)
 * 3. 전역 CSS 스타일 불러오기
 * 
 * =============================================================================
 */

// React 핵심 라이브러리
import React from 'react'
import ReactDOM from 'react-dom/client'

// 페이지 이동을 위한 라우터 (HashRouter 방식 - GitHub Pages 호환성용)
import { BrowserRouter } from 'react-router-dom'

// 메인 앱 컴포넌트
import App from './App'

// 전역 스타일 (색상, 폰트, 공통 스타일 등)
import './styles/global.css'

// 다크/라이트 모드를 관리하는 테마 Provider
import { ThemeProvider } from './context/ThemeContext'

/**
 * React 앱 렌더링
 * 
 * 구조 설명 (바깥쪽 → 안쪽):
 * - React.StrictMode: 개발 모드에서 잠재적 문제를 감지
 * - ThemeProvider: 다크/라이트 테마 상태를 앱 전체에 제공
 * - HashRouter: GitHub Pages 호환성을 위해 Hash 기반 라우팅 사용 (#/path)
 * - App: 실제 앱 컴포넌트
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

