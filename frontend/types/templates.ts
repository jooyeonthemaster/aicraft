/**
 * Template System Types
 * 프로덕션 레벨 템플릿 시스템 타입 정의
 */

// ============================================
// 업종 타입 - 요식업 5가지 컨셉
// ============================================

export type IndustryType = 
  | 'fine-dining'      // 파인다이닝 - 고급 레스토랑
  | 'casual-dining'    // 캐주얼 다이닝 - 가족 레스토랑
  | 'cafe-brunch'      // 카페 & 브런치
  | 'fast-casual'      // 패스트 캐주얼 - 건강식
  | 'ethnic-dining';   // 에스닉 다이닝 - 세계 음식

export type UITheme = 'modern' | 'classic' | 'minimal';

// ============================================
// 파일 업로드 관련
// ============================================

export type FileFormat = 'excel' | 'csv' | 'json' | 'txt';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  format: FileFormat;
  content: string | ArrayBuffer;
  parsedData?: any[];
}

// ============================================
// 템플릿 데이터 스키마
// ============================================

// 요식업 - 메뉴 데이터
export interface RestaurantMenuData {
  menuName: string;
  price: number;
  category: string;
  ingredients: string[];
  allergens: string[];
  spicyLevel: number; // 0-5
  description: string;
  imageUrl?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  calories?: number;
}

// 부동산 - 매물 데이터
export interface RealEstatePropertyData {
  propertyName: string;
  location: string;
  price: number;
  area: number; // 평수
  rooms: number;
  bathrooms: number;
  floor: number;
  buildYear: number;
  propertyType: string; // 아파트, 빌라, 오피스텔 등
  features: string[];
  description: string;
  imageUrl?: string;
}

// 의료 - 진료과 데이터
export interface MedicalDepartmentData {
  departmentName: string;
  doctor: string;
  specialty: string[];
  symptoms: string[];
  treatmentAreas: string[];
  description: string;
  waitTime?: number; // 평균 대기시간(분)
  availableDays: string[];
}

// 쇼핑몰 - 상품 데이터
export interface EcommerceProductData {
  productName: string;
  price: number;
  category: string;
  brand: string;
  tags: string[];
  colors: string[];
  sizes: string[];
  description: string;
  imageUrl?: string;
  rating?: number;
  stock: number;
}

// 여행 - 여행지 데이터
export interface TravelDestinationData {
  destinationName: string;
  country: string;
  region: string;
  priceRange: string; // 저렴, 보통, 비쌈
  bestSeason: string[];
  activities: string[];
  travelStyle: string[]; // 어드벤처, 휴식, 문화, 쇼핑 등
  description: string;
  imageUrl?: string;
  duration: number; // 권장 일수
}

// ============================================
// 사용자 입력 데이터
// ============================================

// 요식업 - 고객 입력
export interface RestaurantUserInput {
  allergens: string[];
  dietaryPreferences: string[]; // 채식, 비건, 할랄 등
  spicyTolerance: number; // 0-5
  budget: number;
  preferences: string;
}

// 부동산 - 고객 입력
export interface RealEstateUserInput {
  budget: number;
  preferredLocations: string[];
  minArea: number;
  maxArea: number;
  rooms: number;
  familySize: number;
  preferences: string;
}

// 의료 - 환자 입력
export interface MedicalUserInput {
  symptoms: string[];
  painArea: string;
  duration: string;
  age: number;
  gender: string;
  additionalInfo: string;
}

// 쇼핑몰 - 고객 입력
export interface EcommerceUserInput {
  budget: number;
  preferredStyles: string[];
  preferredBrands: string[];
  purpose: string;
  preferences: string;
}

// 여행 - 고객 입력
export interface TravelUserInput {
  budget: number;
  travelStyle: string[];
  companions: string; // 혼자, 가족, 친구, 커플 등
  duration: number;
  season: string;
  preferences: string;
}

// ============================================
// 템플릿 정의
// ============================================

export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'range';
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  validation?: (value: any) => boolean | string;
}

export interface Template {
  id: IndustryType;
  name: string;
  description: string;
  icon: string;
  
  // 데이터 스키마
  dataSchema: {
    fields: TemplateField[];
    requiredFields: string[];
    fileFormats: FileFormat[];
    sampleData: any[];
  };
  
  // 사용자 입력 폼
  userInputSchema: {
    fields: TemplateField[];
  };
  
  // AI 프롬프트 템플릿
  promptTemplate: {
    systemPrompt: string;
    userPromptTemplate: (data: any, userInput: any) => string;
  };
  
  // UI 테마
  themes: {
    [key in UITheme]: ThemeConfig;
  };
}

// ============================================
// UI 테마 설정
// ============================================

export interface ThemeConfig {
  id: UITheme;
  name: string;
  description: string;
  preview: string; // 프리뷰 이미지 URL
  
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  
  typography: {
    fontFamily: string;
    headingSize: string;
    bodySize: string;
    headingWeight: string;
    bodyWeight: string;
  };
  
  layout: {
    containerMaxWidth: string;
    borderRadius: string;
    spacing: string;
    cardStyle: string;
  };
  
  components: {
    buttonStyle: string;
    inputStyle: string;
    cardStyle: string;
  };
}

// ============================================
// 업체 정보
// ============================================

export interface BusinessInfo {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  hours: string;
  description: string;
  features: string[];
  logoEmoji: string;
}

// ============================================
// 고객 질문 설정
// ============================================

export interface CustomerQuestion {
  id: string;
  label: string;
  fieldType: 'text' | 'number' | 'select' | 'multiselect' | 'range';
  options?: string[];
  required: boolean;
  placeholder?: string;
  aiInstruction?: string; // AI에게 이 데이터를 어떻게 활용할지 설명
}

// ============================================
// 앱 설정
// ============================================

export interface AppSettings {
  appTitle: string;
  welcomeMessage: string;
  primaryColor: string;
  aiCharacter: string; // 친근함, 전문적, 유머러스
  recommendationCount: number;
  additionalInstructions: string;
  customerQuestions?: CustomerQuestion[]; // 고객에게 물어볼 질문들
}

// ============================================
// 프로젝트 상태
// ============================================

export interface ProjectConfig {
  id: string;
  name: string;
  industry: IndustryType;
  theme: UITheme;
  uploadedFile?: UploadedFile;
  parsedData?: any[];
  businessInfo?: BusinessInfo;
  appSettings?: AppSettings;
  userInput?: any;
  generatedCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// API 요청/응답 타입
// ============================================

export interface GenerateAppRequest {
  industry: IndustryType;
  theme: UITheme;
  data: any[];
  userInput?: any;
  customInstructions?: string;
}

export interface GenerateAppResponse {
  code: string;
  templateUsed: IndustryType;
  themeUsed: UITheme;
  dataCount: number;
}

export interface ParseFileRequest {
  file: File;
  format: FileFormat;
  schema: TemplateField[];
}

export interface ParseFileResponse {
  success: boolean;
  data?: any[];
  error?: string;
  validation?: {
    valid: boolean;
    errors: string[];
    warnings: string[];
  };
}

// ============================================
// 코드 버전 관리 (반복 수정)
// ============================================

export interface CodeVersion {
  id: string;
  code: string;
  timestamp: Date;
  userRequest: string;
  changesSummary: string;
}

export interface RefinementMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeVersionId?: string;
}

