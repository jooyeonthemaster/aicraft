'use client';

/**
 * Footer 컴포넌트
 * lunus, 대표: 홍채민
 */

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* 브랜드 정보 */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">🌙</span>
              <h3 className="text-2xl font-bold text-gray-900">lunus</h3>
            </div>
            <p className="text-sm text-gray-600">
              AI로 더 스마트한 비즈니스를
            </p>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-300"></div>

          {/* 회사 정보 */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-gray-500">대표:</span>
              <span className="text-sm font-semibold text-gray-800">홍채민</span>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-300"></div>

          {/* 저작권 */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} lunus
            </p>
            <p className="text-xs text-gray-400 mt-1">
              All rights reserved.
            </p>
          </div>

          {/* 추가 링크 (선택사항) */}
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <button className="hover:text-gray-900 transition-colors">
              개인정보처리방침
            </button>
            <span>|</span>
            <button className="hover:text-gray-900 transition-colors">
              이용약관
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

