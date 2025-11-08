'use client';

/**
 * ✨ Luxury Data Input - Spreadsheet Style
 * 프로덕션 레벨 테이블 입력 UI
 */

import { useState, useEffect } from 'react';
import { TemplateField, IndustryType } from '@/types/templates';
import FileUploader from './FileUploader';
import { sampleData } from '@/lib/sampleData';

interface DataInputProps {
  schema: TemplateField[];
  onDataReady: (data: any[]) => void;
  onError?: (error: string) => void;
  templateName: string;
  industry: IndustryType;
}

type InputMode = 'table' | 'file';

export default function DataInput({
  schema,
  onDataReady,
  onError,
  templateName,
  industry
}: DataInputProps) {
  const [mode, setMode] = useState<InputMode>('table');
  const [rows, setRows] = useState<any[]>([]);

  // 초기 빈 행으로 시작
  useEffect(() => {
    // 빈 행 1개만 추가
    setRows([createEmptyRow()]);
  }, [industry]);

  // 테스트 데이터 불러오기
  const loadSampleData = () => {
    const defaultData = sampleData[industry] || [];
    if (defaultData.length > 0) {
      setRows(defaultData);
      onDataReady(defaultData);
    }
  };

  // 빈 행 생성
  const createEmptyRow = () => {
    const emptyRow: any = {};
    schema.forEach(field => {
      if (field.type === 'number' || field.type === 'range') {
        emptyRow[field.name] = field.min || 0;
      } else if (field.type === 'multiselect') {
        emptyRow[field.name] = [];
      } else if (field.type === 'select') {
        emptyRow[field.name] = field.options?.[0] || '';
      } else {
        emptyRow[field.name] = '';
      }
    });
    return emptyRow;
  };

  // 새 행 추가
  const addNewRow = () => {
    setRows([...rows, createEmptyRow()]);
  };

  // 행 삭제
  const deleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    onDataReady(newRows);
  };

  // 셀 값 변경
  const updateCell = (rowIndex: number, fieldName: string, value: any) => {
    const newRows = [...rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [fieldName]: value };
    setRows(newRows);
    onDataReady(newRows);
  };

  // 파일 업로드 완료
  const handleFileUploaded = (data: any[]) => {
    setRows(data);
    onDataReady(data);
  };

  // 필수 필드만 표시 (테이블이 너무 넓어지지 않도록)
  const displayFields = schema.filter(f => 
    f.required || ['menuName', 'dishName', 'itemName', 'price', 'ingredients', 'description', 'courseType', 'origin'].includes(f.name)
  ).slice(0, 6); // 최대 6개 컬럼

  return (
    <div className="space-y-6">
      {/* 모드 선택 탭 */}
      <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setMode('table')}
          className={`
            flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all
            ${mode === 'table'
              ? 'bg-white text-teal-700 shadow-md border-2 border-teal-200'
              : 'text-slate-600 hover:text-slate-900'
            }
          `}
        >
          📊 테이블 입력
        </button>
        <button
          onClick={() => setMode('file')}
          className={`
            flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all
            ${mode === 'file'
              ? 'bg-white text-teal-700 shadow-md border-2 border-teal-200'
              : 'text-slate-600 hover:text-slate-900'
            }
          `}
        >
          📁 파일 업로드
        </button>
      </div>

      {/* 테이블 입력 모드 */}
      {mode === 'table' && (
        <div className="space-y-4 animate-fadeIn">
          {/* 안내 메시지 & 샘플 데이터 로드 */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-sm font-bold text-teal-900 mb-1">스프레드시트 스타일 입력</p>
                  <p className="text-xs text-teal-700">
                    아래 테이블에서 직접 수정하거나 우측 버튼으로 샘플 데이터를 불러오세요.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={loadSampleData}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
              >
                <span className="flex items-center space-x-2">
                  <span>✨</span>
                  <span>테스트 데이터 불러오기</span>
                </span>
              </button>
            </div>
          </div>

          {/* 테이블 컨테이너 */}
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* 테이블 헤더 */}
                <thead>
                  <tr className="bg-gradient-to-r from-teal-600 to-teal-700">
                    <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider w-12">
                      #
                    </th>
                    {displayFields.map((field) => (
                      <th
                        key={field.name}
                        className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        <div className="flex items-center space-x-1">
                          <span>{field.label}</span>
                          {field.required && <span className="text-amber-300">*</span>}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider w-20">
                      삭제
                    </th>
                  </tr>
                </thead>

                {/* 테이블 바디 */}
                <tbody className="divide-y divide-slate-200">
                  {rows.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className="hover:bg-teal-50/50 transition-colors group"
                    >
                      {/* 행 번호 */}
                      <td className="px-4 py-3 text-sm font-semibold text-slate-600">
                        {rowIndex + 1}
                      </td>

                      {/* 데이터 셀들 */}
                      {displayFields.map((field) => (
                        <td key={field.name} className="px-4 py-3">
                          {field.type === 'select' ? (
                            <select
                              value={row[field.name] || ''}
                              onChange={(e) => updateCell(rowIndex, field.name, e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
                            >
                              {field.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'number' || field.type === 'range' ? (
                            <input
                              type="number"
                              value={row[field.name] || ''}
                              onChange={(e) => updateCell(rowIndex, field.name, parseInt(e.target.value) || 0)}
                              min={field.min}
                              max={field.max}
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                          ) : field.type === 'textarea' ? (
                            <textarea
                              value={row[field.name] || ''}
                              onChange={(e) => updateCell(rowIndex, field.name, e.target.value)}
                              placeholder={field.placeholder}
                              rows={2}
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
                            />
                          ) : field.type === 'multiselect' ? (
                            <input
                              type="text"
                              value={Array.isArray(row[field.name]) ? row[field.name].join(', ') : ''}
                              onChange={(e) => {
                                const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
                                updateCell(rowIndex, field.name, values);
                              }}
                              placeholder="쉼표로 구분"
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={row[field.name] || ''}
                              onChange={(e) => updateCell(rowIndex, field.name, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                          )}
                        </td>
                      ))}

                      {/* 삭제 버튼 */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteRow(rowIndex)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="행 삭제"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex space-x-3">
            <button
              onClick={addNewRow}
              className="flex-1 py-3 px-6 bg-white text-teal-700 border-2 border-teal-300 rounded-xl font-semibold hover:bg-teal-50 transition-all shadow-md hover:shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>새 행 추가</span>
              </span>
            </button>
          </div>

          {/* 데이터 개수 표시 */}
          {rows.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-900">
                      ✅ {rows.length}개 데이터 준비 완료
                    </p>
                    <p className="text-xs text-emerald-700">
                      AI가 이 데이터를 기반으로 앱을 생성합니다
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-slate-700">Ready</span>
                </div>
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
