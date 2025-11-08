'use client';

/**
 * 코드 버전 히스토리
 * 각 수정 단계를 추적하고 되돌리기 가능
 */

import { CodeVersion } from '@/types/templates';

interface VersionHistoryProps {
  versions: CodeVersion[];
  currentVersionIndex: number;
  onVersionSelect: (index: number) => void;
}

export default function VersionHistory({
  versions,
  currentVersionIndex,
  onVersionSelect
}: VersionHistoryProps) {
  if (versions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 flex items-center">
          <span className="text-lg mr-2">📚</span>
          버전 히스토리 ({versions.length}개)
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          이전 버전으로 되돌릴 수 있습니다
        </p>
      </div>

      {/* 버전 목록 */}
      <div className="max-h-80 overflow-y-auto">
        {versions.map((version, index) => {
          const isCurrent = index === currentVersionIndex;
          const isNewer = index > currentVersionIndex;

          return (
            <button
              key={version.id}
              onClick={() => onVersionSelect(index)}
              disabled={isCurrent}
              className={`
                w-full p-4 text-left transition-all border-b border-gray-100
                ${isCurrent 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 cursor-default' 
                  : isNewer
                  ? 'bg-white hover:bg-gray-50 cursor-pointer opacity-60'
                  : 'bg-white hover:bg-gray-50 cursor-pointer'
                }
              `}
            >
              {/* 버전 정보 */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`
                    text-xs font-bold px-2 py-1 rounded-full
                    ${isCurrent 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    v{versions.length - index}
                  </span>
                  {isCurrent && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      현재
                    </span>
                  )}
                  {index === 0 && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                      최초
                    </span>
                  )}
                </div>
                
                {/* 시간 */}
                <span className="text-xs text-gray-500">
                  {new Date(version.timestamp).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* 변경 요청 */}
              {version.userRequest && (
                <p className="text-xs text-gray-700 mb-1">
                  <span className="font-semibold text-purple-600">📝 요청:</span> {version.userRequest}
                </p>
              )}

              {/* 변경 사항 요약 */}
              {version.changesSummary && (
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-blue-600">✨ 변경:</span> {version.changesSummary}
                </p>
              )}

              {/* 되돌리기 안내 */}
              {!isCurrent && !isNewer && (
                <p className="text-xs text-blue-600 mt-2">
                  👆 클릭하여 이 버전으로 되돌리기
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* 안내 메시지 */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          💡 이전 버전 클릭 시 해당 시점으로 되돌아갑니다
        </p>
      </div>
    </div>
  );
}


