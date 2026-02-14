/**
 * =============================================================================
 * vite.config.js - Vite 빌드 도구 설정 파일
 * =============================================================================
 *
 * Vite는 프론트엔드 개발 서버 및 빌드 도구입니다.
 *
 * 📌 주요 기능:
 * 1. 개발 서버 실행 (npm run dev) - 코드 변경 시 자동 새로고침
 * 2. 프로덕션 빌드 (npm run build) - 최적화된 파일 생성
 * 3. 빌드 미리보기 (npm run preview)
 *
 * 📌 왜 Vite를 사용하나요?
 * - 빠른 개발 서버 시작 속도
 * - 코드 변경 시 즉시 반영 (Hot Module Replacement)
 * - 최신 JavaScript 기능 자동 지원
 *
 * =============================================================================
 */

// Vite 설정 함수
import { defineConfig } from "vite";

// React 플러그인 - JSX 문법 지원, Fast Refresh 기능 등
import react from "@vitejs/plugin-react";

// Vite 설정 내보내기
export default defineConfig({
  base: "/",

  // 플러그인 목록
  plugins: [
    react(), // React 지원 활성화
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5005",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // 🔧 추가 설정이 필요하면 아래에 작성할 수 있습니다:

  // server: {
  //   port: 3000,        // 개발 서버 포트 변경
  //   open: true,        // 서버 시작 시 브라우저 자동 열기
  // },

  // build: {
  //   outDir: 'dist',    // 빌드 결과물 폴더
  // },
});
