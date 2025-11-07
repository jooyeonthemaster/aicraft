/**
 * 파일 파싱 시스템
 * 엑셀, CSV, JSON, TXT 파일을 파싱하여 데이터로 변환
 */

import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { FileFormat, TemplateField, ParseFileResponse } from '@/types/templates';

// ============================================
// Excel 파서
// ============================================

export async function parseExcelFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(new Error(`Excel 파싱 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsBinaryString(file);
  });
}

// ============================================
// CSV 파서
// ============================================

export async function parseCSVFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          const errorMessages = results.errors.map(e => e.message).join(', ');
          reject(new Error(`CSV 파싱 실패: ${errorMessages}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(new Error(`CSV 파싱 실패: ${error.message}`));
      }
    });
  });
}

// ============================================
// JSON 파서
// ============================================

export async function parseJSONFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        
        // JSON이 배열이 아니면 배열로 감싸기
        const arrayData = Array.isArray(data) ? data : [data];
        resolve(arrayData);
      } catch (error) {
        reject(new Error(`JSON 파싱 실패: ${error instanceof Error ? error.message : '잘못된 JSON 형식'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsText(file);
  });
}

// ============================================
// TXT 파서 (간단한 형식)
// ============================================

export async function parseTXTFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
          reject(new Error('빈 파일입니다'));
          return;
        }
        
        // 첫 줄을 헤더로 사용
        const headers = lines[0].split('\t').map(h => h.trim());
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split('\t').map(v => v.trim());
          const row: any = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          data.push(row);
        }
        
        resolve(data);
      } catch (error) {
        reject(new Error(`TXT 파싱 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`));
      }
    };
    
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsText(file);
  });
}

// ============================================
// 자동 파일 형식 감지
// ============================================

export function detectFileFormat(file: File): FileFormat {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'xlsx':
    case 'xls':
      return 'excel';
    case 'csv':
      return 'csv';
    case 'json':
      return 'json';
    case 'txt':
      return 'txt';
    default:
      throw new Error(`지원하지 않는 파일 형식: .${extension}`);
  }
}

// ============================================
// 통합 파서
// ============================================

export async function parseFile(file: File): Promise<any[]> {
  const format = detectFileFormat(file);
  
  switch (format) {
    case 'excel':
      return parseExcelFile(file);
    case 'csv':
      return parseCSVFile(file);
    case 'json':
      return parseJSONFile(file);
    case 'txt':
      return parseTXTFile(file);
    default:
      throw new Error(`지원하지 않는 파일 형식: ${format}`);
  }
}

// ============================================
// 데이터 검증
// ============================================

export function validateData(
  data: any[],
  schema: TemplateField[]
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (data.length === 0) {
    errors.push('데이터가 비어있습니다');
    return { valid: false, errors, warnings };
  }
  
  // 필수 필드 확인
  const requiredFields = schema.filter(f => f.required).map(f => f.name);
  const dataFields = Object.keys(data[0]);
  
  // 누락된 필수 필드 체크
  const missingFields = requiredFields.filter(field => !dataFields.includes(field));
  if (missingFields.length > 0) {
    errors.push(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  // 각 행 데이터 검증
  data.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field] || row[field] === '') {
        errors.push(`${index + 1}번째 행: ${field} 필드가 비어있습니다`);
      }
    });
    
    // 타입 검증
    schema.forEach(fieldSchema => {
      const value = row[fieldSchema.name];
      if (value === undefined || value === null || value === '') return;
      
      if (fieldSchema.type === 'number') {
        if (isNaN(Number(value))) {
          errors.push(`${index + 1}번째 행: ${fieldSchema.label}은(는) 숫자여야 합니다`);
        }
      }
      
      // 범위 검증
      if (fieldSchema.min !== undefined && Number(value) < fieldSchema.min) {
        errors.push(`${index + 1}번째 행: ${fieldSchema.label}은(는) ${fieldSchema.min} 이상이어야 합니다`);
      }
      
      if (fieldSchema.max !== undefined && Number(value) > fieldSchema.max) {
        errors.push(`${index + 1}번째 행: ${fieldSchema.label}은(는) ${fieldSchema.max} 이하여야 합니다`);
      }
    });
  });
  
  // 경고 생성
  if (data.length > 100) {
    warnings.push(`데이터가 ${data.length}개로 많습니다. AI 처리 시간이 길어질 수 있습니다.`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// ============================================
// 데이터 정규화
// ============================================

export function normalizeData(data: any[], schema: TemplateField[]): any[] {
  return data.map(row => {
    const normalized: any = {};
    
    schema.forEach(field => {
      const value = row[field.name];
      
      if (value === undefined || value === null || value === '') {
        normalized[field.name] = field.required ? undefined : null;
        return;
      }
      
      switch (field.type) {
        case 'number':
        case 'range':
          normalized[field.name] = Number(value);
          break;
        
        case 'multiselect':
          // 쉼표로 구분된 문자열을 배열로 변환
          if (typeof value === 'string') {
            normalized[field.name] = value.split(',').map(v => v.trim()).filter(v => v);
          } else if (Array.isArray(value)) {
            normalized[field.name] = value;
          } else {
            normalized[field.name] = [value];
          }
          break;
        
        case 'select':
          normalized[field.name] = String(value).trim();
          break;
        
        default:
          // text, textarea
          if (field.name.includes('ingredients') || field.name.includes('features') || 
              field.name.includes('tags') || field.name.includes('activities') || 
              field.name.includes('symptoms') || field.name.includes('specialty')) {
            // 쉼표로 구분된 필드는 배열로 변환
            if (typeof value === 'string') {
              normalized[field.name] = value.split(',').map(v => v.trim()).filter(v => v);
            } else if (Array.isArray(value)) {
              normalized[field.name] = value;
            } else {
              normalized[field.name] = [value];
            }
          } else {
            normalized[field.name] = String(value).trim();
          }
      }
    });
    
    return normalized;
  });
}

// ============================================
// 전체 파싱 및 검증 프로세스
// ============================================

export async function parseAndValidateFile(
  file: File,
  schema: TemplateField[]
): Promise<ParseFileResponse> {
  try {
    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: '파일 크기가 10MB를 초과합니다'
      };
    }
    
    // 파일 파싱
    const rawData = await parseFile(file);
    
    // 데이터 검증
    const validation = validateData(rawData, schema);
    
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors[0],
        validation
      };
    }
    
    // 데이터 정규화
    const normalizedData = normalizeData(rawData, schema);
    
    return {
      success: true,
      data: normalizedData,
      validation
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '파일 파싱 중 오류가 발생했습니다'
    };
  }
}

