'use client';

/**
 * 파일 업로더 컴포넌트
 * 드래그 앤 드롭, 파일 검증, 미리보기 지원
 */

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { TemplateField, ParseFileResponse } from '@/types/templates';
import { parseAndValidateFile, detectFileFormat } from '@/lib/parsers';

interface FileUploaderProps {
  schema: TemplateField[];
  onFileUploaded: (data: any[]) => void;
  onError?: (error: string) => void;
  acceptedFormats?: string[];
}

export default function FileUploader({
  schema,
  onFileUploaded,
  onError,
  acceptedFormats = ['.xlsx', '.xls', '.csv', '.json', '.txt']
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<ParseFileResponse | null>(null);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 드래그 시작
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 드래그 중
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 드래그 종료
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 파일 드롭
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  // 파일 선택
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  // 파일 처리
  const processFile = async (file: File) => {
    setIsProcessing(true);
    setUploadedFile(file);
    setParseResult(null);
    setPreviewData(null);

    try {
      // 파일 형식 확인
      const format = detectFileFormat(file);
      console.log('파일 형식:', format);

      // 파일 파싱 및 검증
      const result = await parseAndValidateFile(file, schema);
      setParseResult(result);

      if (result.success && result.data) {
        // 미리보기 데이터 (최대 5개)
        setPreviewData(result.data.slice(0, 5));
        
        // 부모 컴포넌트에 데이터 전달
        onFileUploaded(result.data);
      } else {
        onError?.(result.error || '파일 처리 실패');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파일 처리 중 오류 발생';
      setParseResult({
        success: false,
        error: errorMessage
      });
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // 파일 선택 버튼 클릭
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 제거
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setParseResult(null);
    setPreviewData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 업로드 영역 */}
      {!uploadedFile && (
        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-8 text-center transition-all
            ${isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 bg-white'
            }
          `}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="space-y-4">
            {/* 아이콘 */}
            <div className="flex justify-center">
              <svg 
                className={`w-16 h-16 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
            </div>

            {/* 안내 텍스트 */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                파일을 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-sm text-gray-500">
                지원 형식: {acceptedFormats.join(', ')}
              </p>
              <p className="text-xs text-gray-400">
                최대 파일 크기: 10MB
              </p>
            </div>

            {/* 업로드 버튼 */}
            <button
              onClick={handleButtonClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              파일 선택
            </button>
          </div>
        </div>
      )}

      {/* 처리 중 */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>
              <p className="font-semibold text-blue-900">파일 처리 중...</p>
              <p className="text-sm text-blue-700">잠시만 기다려주세요</p>
            </div>
          </div>
        </div>
      )}

      {/* 업로드 완료 및 검증 결과 */}
      {uploadedFile && parseResult && !isProcessing && (
        <div className="space-y-4">
          {/* 파일 정보 */}
          <div className={`
            rounded-xl p-4 border-2
            ${parseResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
            }
          `}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${parseResult.success ? 'bg-green-100' : 'bg-red-100'}
                `}>
                  {parseResult.success ? (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>

                <div>
                  <p className={`font-semibold ${parseResult.success ? 'text-green-900' : 'text-red-900'}`}>
                    {uploadedFile.name}
                  </p>
                  <p className={`text-sm ${parseResult.success ? 'text-green-700' : 'text-red-700'}`}>
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  
                  {parseResult.success && parseResult.data && (
                    <p className="text-sm text-green-700 mt-1">
                      ✓ {parseResult.data.length}개 데이터 로드 완료
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 에러 메시지 */}
            {parseResult.error && (
              <div className="mt-3 p-3 bg-red-100 rounded-lg">
                <p className="text-sm text-red-800 font-medium">❌ {parseResult.error}</p>
              </div>
            )}

            {/* 검증 결과 */}
            {parseResult.validation && (
              <div className="mt-3 space-y-2">
                {/* 에러 */}
                {parseResult.validation.errors.length > 0 && (
                  <div className="p-3 bg-red-100 rounded-lg">
                    <p className="text-sm font-medium text-red-900 mb-1">검증 실패:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {parseResult.validation.errors.map((error, i) => (
                        <li key={i} className="text-xs text-red-800">{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 경고 */}
                {parseResult.validation.warnings.length > 0 && (
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900 mb-1">⚠️ 주의사항:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {parseResult.validation.warnings.map((warning, i) => (
                        <li key={i} className="text-xs text-yellow-800">{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 데이터 미리보기 */}
          {previewData && previewData.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">데이터 미리보기 (최대 5개)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="px-3 py-2 text-left font-semibold text-gray-700">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                        {Object.values(row).map((value: any, j) => (
                          <td key={j} className="px-3 py-2 text-gray-600">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parseResult.data && parseResult.data.length > 5 && (
                <p className="text-xs text-gray-500 mt-2">
                  ... 외 {parseResult.data.length - 5}개 데이터
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

