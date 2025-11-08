'use client';

/**
 * ✨ Luxury Footer - Rolex-Inspired
 * lunus, 대표: 홍채민
 */

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 to-slate-800 border-t border-teal-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">🌙</span>
              </div>
              <h3 className="text-2xl font-bold text-white">lunus</h3>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              AI Restaurant App Builder
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              레스토랑 비즈니스를 위한<br/>
              프리미엄 AI 앱 빌더
            </p>
          </div>

          {/* Company Info */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-teal-400 mb-4 uppercase tracking-wider">
              Company
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xs text-slate-500">대표:</span>
                <span className="text-sm font-semibold text-slate-300">홍채민</span>
              </div>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} lunus
              </p>
              <p className="text-xs text-slate-600">
                All rights reserved.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-bold text-teal-400 mb-4 uppercase tracking-wider">
              Support
            </h4>
            <div className="space-y-2">
              <button className="block w-full md:w-auto text-xs text-slate-400 hover:text-teal-400 transition-colors">
                개인정보처리방침
              </button>
              <button className="block w-full md:w-auto text-xs text-slate-400 hover:text-teal-400 transition-colors">
                이용약관
              </button>
              <button className="block w-full md:w-auto text-xs text-slate-400 hover:text-teal-400 transition-colors">
                문의하기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Premium Badge */}
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-800 border border-teal-500/30">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-teal-400">Premium Quality</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-slate-600">Powered by</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-slate-500">Next.js 16</span>
                <span className="text-slate-700">•</span>
                <span className="text-xs font-semibold text-slate-500">Gemini AI</span>
                <span className="text-slate-700">•</span>
                <span className="text-xs font-semibold text-slate-500">Tailwind 4</span>
              </div>
            </div>

            {/* Social Links (Optional) */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-600">Connect:</span>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:border-teal-500 flex items-center justify-center transition-colors group">
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:border-teal-500 flex items-center justify-center transition-colors group">
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      </div>
    </footer>
  );
}
