'use client';

/**
 * 데이터 입력 컴포넌트
 * 파일 업로드 또는 텍스트 직접 입력 선택 가능
 */

import { useState, useEffect } from 'react';
import { TemplateField, IndustryType } from '@/types/templates';
import FileUploader from './FileUploader';
import { sampleData, sampleTextData } from '@/lib/sampleData';

interface DataInputProps {
  schema: TemplateField[];
  onDataReady: (data: any[]) => void;
  onError?: (error: string) => void;
  templateName: string;
  industry: IndustryType;
}

type InputMode = 'file' | 'text';

export default function DataInput({
  schema,
  onDataReady,
  onError,
  templateName,
  industry
}: DataInputProps) {
  const [mode, setMode] = useState<InputMode>('text');
  const [textInput, setTextInput] = useState('');
  const [parsedItems, setParsedItems] = useState<any[]>([]);

  // 컴포넌트 마운트 시 샘플 데이터 자동 로드
  useEffect(() => {
    const defaultText = sampleTextData[industry] || '';
    setTextInput(defaultText);
    
    // 샘플 데이터 자동 적용
    const defaultData = sampleData[industry] || [];
    if (defaultData.length > 0) {
      setParsedItems(defaultData);
      onDataReady(defaultData);
    }
  }, [industry]);

  // 텍스트 입력 파싱
  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      onError?.('데이터를 입력해주세요');
      return;
    }

    try {
      // 줄바꿈으로 구분된 각 항목을 파싱
      const lines = textInput.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        onError?.('데이터를 입력해주세요');
        return;
      }

      // 간단한 파싱: 각 줄을 하나의 항목으로 처리
      const items = lines.map((line, index) => {
        const trimmedLine = line.trim();
        
        // 템플릿별 기본 데이터 구조 생성
        if (templateName.includes('요식업') || templateName.includes('restaurant')) {
          // 쉼표로 구분 시도: "메뉴명, 가격, 설명"
          const parts = trimmedLine.split(',').map(p => p.trim());
          return {
            menuName: parts[0] || `메뉴 ${index + 1}`,
            price: parseInt(parts[1]) || 10000,
            category: '기타',
            ingredients: parts[2] ? [parts[2]] : ['정보 없음'],
            allergens: [],
            spicyLevel: 1,
            description: parts[2] || parts[0] || `메뉴 ${index + 1}`,
            isVegetarian: false,
            isVegan: false,
            calories: 300
          };
        } else if (templateName.includes('부동산') || templateName.includes('realestate')) {
          const parts = trimmedLine.split(',').map(p => p.trim());
          return {
            propertyName: parts[0] || `매물 ${index + 1}`,
            location: parts[1] || '서울',
            price: parseInt(parts[2]) || 100000,
            area: parseInt(parts[3]) || 30,
            rooms: 3,
            bathrooms: 1,
            floor: 5,
            buildYear: 2020,
            propertyType: '아파트',
            features: [],
            description: parts[0] || `매물 ${index + 1}`
          };
        } else if (templateName.includes('의료') || templateName.includes('medical')) {
          const parts = trimmedLine.split(',').map(p => p.trim());
          return {
            departmentName: parts[0] || `진료과 ${index + 1}`,
            doctor: parts[1] || '담당의',
            specialty: [parts[2] || '일반진료'],
            symptoms: [parts[3] || '일반증상'],
            treatmentAreas: [parts[4] || '전신'],
            description: parts[0] || `진료과 ${index + 1}`,
            waitTime: 30,
            availableDays: ['월', '화', '수', '목', '금']
          };
        } else if (templateName.includes('쇼핑몰') || templateName.includes('ecommerce')) {
          const parts = trimmedLine.split(',').map(p => p.trim());
          return {
            productName: parts[0] || `상품 ${index + 1}`,
            price: parseInt(parts[1]) || 30000,
            category: parts[2] || '기타',
            brand: parts[3] || '브랜드',
            tags: [parts[4] || '일반'],
            colors: ['기본'],
            sizes: ['M'],
            description: parts[0] || `상품 ${index + 1}`,
            rating: 4.0,
            stock: 100
          };
        } else if (templateName.includes('여행') || templateName.includes('travel')) {
          const parts = trimmedLine.split(',').map(p => p.trim());
          return {
            destinationName: parts[0] || `여행지 ${index + 1}`,
            country: parts[1] || '한국',
            region: parts[2] || '동아시아',
            priceRange: parts[3] || '보통',
            bestSeason: ['봄', '여름'],
            activities: [parts[4] || '관광'],
            travelStyle: ['휴식'],
            description: parts[0] || `여행지 ${index + 1}`,
            duration: 5
          };
        }

        // 기본 반환
        return { name: trimmedLine, description: trimmedLine };
      });

      setParsedItems(items);
      onDataReady(items);
    } catch (error) {
      onError?.('데이터 파싱 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  };

  // 파일 업로드 완료
  const handleFileUploaded = (data: any[]) => {
    onDataReady(data);
  };

  return (
    <div className="space-y-6">
      {/* 모드 선택 탭 */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setMode('text')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium transition-all
            ${mode === 'text'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          ✏️ 텍스트 입력
        </button>
        <button
          onClick={() => setMode('file')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium transition-all
            ${mode === 'file'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          📁 파일 업로드
        </button>
      </div>

      {/* 텍스트 입력 모드 */}
      {mode === 'text' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900 mb-2">
              💡 <strong>텍스트 입력 가이드</strong>
            </p>
            <div className="text-xs text-blue-800 space-y-1">
              <p>• 한 줄에 하나씩 입력하세요</p>
              <p>• 쉼표(,)로 구분하여 상세 정보 입력 가능</p>
              {templateName.includes('요식업') && (
                <p className="mt-2 font-semibold">예시: 김치찌개, 12000, 돼지고기와 김치로 만든 얼큰한 찌개</p>
              )}
              {templateName.includes('부동산') && (
                <p className="mt-2 font-semibold">예시: 강남아파트, 서울 강남구, 150000, 32</p>
              )}
              {templateName.includes('의료') && (
                <p className="mt-2 font-semibold">예시: 정형외과, 김철수, 척추, 허리통증, 허리</p>
              )}
              {templateName.includes('쇼핑몰') && (
                <p className="mt-2 font-semibold">예시: 면티셔츠, 39000, 의류, BASIC, 베이직</p>
              )}
              {templateName.includes('여행') && (
                <p className="mt-2 font-semibold">예시: 발리, 인도네시아, 동남아시아, 보통, 서핑</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="여기에 데이터를 입력하세요... (한 줄에 하나씩)"
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              입력된 줄 수: {textInput.split('\n').filter(line => line.trim()).length}개
            </p>
          </div>

          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className={`
              w-full py-3 px-6 rounded-xl font-semibold transition-all
              ${textInput.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            데이터 적용하기
          </button>

          {/* 파싱된 항목 미리보기 */}
          {parsedItems.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-900 font-semibold mb-2">
                ✅ {parsedItems.length}개 데이터가 준비되었습니다!
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {parsedItems.slice(0, 5).map((item, i) => (
                  <div key={i} className="text-xs text-green-800">
                    {i + 1}. {Object.values(item).slice(0, 3).join(' · ')}
                  </div>
                ))}
                {parsedItems.length > 5 && (
                  <p className="text-xs text-green-700">... 외 {parsedItems.length - 5}개</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 파일 업로드 모드 */}
      {mode === 'file' && (
        <div className="animate-fadeIn">
          <FileUploader
            schema={schema}
            onFileUploaded={handleFileUploaded}
            onError={onError}
          />
        </div>
      )}
    </div>
  );
}

