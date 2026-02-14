/**
 * =============================================================================
 * ThemeContext.jsx - 다크/라이트 테마 관리
 * =============================================================================
 * 
 * 앱 전체의 테마(다크모드/라이트모드)를 관리하는 Context입니다.
 * 
 * 📌 Context란?
 * React에서 여러 컴포넌트가 같은 데이터를 공유할 때 사용합니다.
 * props로 일일이 전달하지 않아도 어디서든 테마 정보에 접근할 수 있습니다.
 * 
 * 📌 사용법:
 * 1. 컴포넌트에서 useTheme() 훅 사용
 * 2. theme: 현재 테마 ('dark' 또는 'light')
 * 3. toggleTheme: 테마 전환 함수
 * 
 * 예시:
 * const { theme, toggleTheme } = useTheme();
 * <button onClick={toggleTheme}>테마 변경</button>
 * 
 * =============================================================================
 */

import { createContext, useContext, useEffect, useState } from 'react'

// Context 생성 - 테마 정보를 저장할 공간
const ThemeContext = createContext()

/**
 * ThemeProvider 컴포넌트
 * 
 * 앱 전체를 감싸서 테마 정보를 제공합니다.
 * main.jsx에서 <ThemeProvider>로 앱을 감싸고 있습니다.
 * 
 * @param {React.ReactNode} children - 하위 컴포넌트들
 */
export function ThemeProvider({ children }) {
  // 테마 상태 관리
  // 초기값: localStorage에 저장된 값 또는 시스템 설정 사용
  const [theme, setTheme] = useState(() => {
    // 1. 먼저 localStorage에서 저장된 테마 확인
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    
    // 2. 없으면 시스템 설정 확인 (OS의 다크모드 설정)
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  // 테마가 변경될 때마다 실행
  useEffect(() => {
    // HTML 요소에 data-theme 속성 설정
    // CSS에서 [data-theme="light"] 선택자로 스타일 변경
    const root = document.documentElement
    
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
    } else {
      root.removeAttribute('data-theme')
    }
    
    // 다음에 방문할 때를 위해 localStorage에 저장
    localStorage.setItem('theme', theme)
  }, [theme])

  /**
   * 테마 전환 함수
   * dark ↔ light 토글
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Context로 theme과 toggleTheme을 하위 컴포넌트에 제공
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme 훅 - 테마 정보에 접근하는 커스텀 훅
 * 
 * 사용 예시:
 * const { theme, toggleTheme } = useTheme();
 * 
 * @returns {{ theme: string, toggleTheme: () => void }}
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  
  // ThemeProvider 바깥에서 사용하면 에러 발생
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}
