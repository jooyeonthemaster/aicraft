'use client';

/**
 * 동적 폼 컴포넌트
 * 템플릿의 스키마에 따라 자동으로 입력 필드를 생성
 */

import { useState } from 'react';
import { TemplateField } from '@/types/templates';

interface DynamicFormProps {
  fields: TemplateField[];
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  isLoading?: boolean;
}

export default function DynamicForm({
  fields,
  onSubmit,
  submitButtonText = '생성하기',
  isLoading = false
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 필드 값 변경
  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 에러 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 폼 검증
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.name];

      // 필수 필드 체크
      if (field.required && (!value || value === '')) {
        newErrors[field.name] = `${field.label}은(는) 필수 항목입니다`;
        return;
      }

      // 타입 체크
      if (value && field.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          newErrors[field.name] = `${field.label}은(는) 숫자여야 합니다`;
          return;
        }

        // 범위 체크
        if (field.min !== undefined && numValue < field.min) {
          newErrors[field.name] = `${field.label}은(는) ${field.min} 이상이어야 합니다`;
        }
        if (field.max !== undefined && numValue > field.max) {
          newErrors[field.name] = `${field.label}은(는) ${field.max} 이하여야 합니다`;
        }
      }

      // 커스텀 검증
      if (value && field.validation) {
        const result = field.validation(value);
        if (result !== true && typeof result === 'string') {
          newErrors[field.name] = result;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  // 필드 렌더링
  const renderField = (field: TemplateField) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    const baseInputClass = `
      w-full px-4 py-3 rounded-lg border-2 transition-all
      ${error 
        ? 'border-red-300 focus:border-red-500 bg-red-50' 
        : 'border-gray-300 focus:border-blue-500 bg-white'
      }
      focus:outline-none focus:ring-2 focus:ring-blue-500/20
    `;

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={baseInputClass}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={baseInputClass}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={baseInputClass}
          >
            <option value="">선택하세요</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => {
              const isSelected = Array.isArray(value) && value.includes(option);
              return (
                <label
                  key={option}
                  className={`
                    flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      const currentValue = Array.isArray(value) ? value : [];
                      const newValue = e.target.checked
                        ? [...currentValue, option]
                        : currentValue.filter(v => v !== option);
                      handleChange(field.name, newValue);
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className={`ml-3 ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value || field.min || 0}
              onChange={(e) => handleChange(field.name, Number(e.target.value))}
              min={field.min || 0}
              max={field.max || 100}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{field.min || 0}</span>
              <span className="font-bold text-blue-600">{value || field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>

          {renderField(field)}

          {errors[field.name] && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* 제출 버튼 */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full py-4 px-6 rounded-xl font-bold text-white text-lg
            transition-all transform
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              처리 중...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}

