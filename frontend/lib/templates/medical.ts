/**
 * 의료 템플릿
 * 진료과 추천 AI 시스템
 */

import { Template } from '@/types/templates';

export const medicalTemplate: Template = {
  id: 'medical',
  name: '의료 - 진료과 추천 AI',
  description: '환자의 증상을 분석하여 적절한 진료과를 추천합니다',
  icon: '🏥',
  
  dataSchema: {
    fields: [
      {
        name: 'departmentName',
        label: '진료과명',
        type: 'text',
        required: true,
        placeholder: '정형외과'
      },
      {
        name: 'doctor',
        label: '담당 의사',
        type: 'text',
        required: true,
        placeholder: '김철수 과장'
      },
      {
        name: 'specialty',
        label: '전문 분야 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '척추, 관절, 스포츠 손상'
      },
      {
        name: 'symptoms',
        label: '관련 증상 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '허리 통증, 무릎 통증, 어깨 결림'
      },
      {
        name: 'treatmentAreas',
        label: '치료 부위 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '허리, 무릎, 어깨, 발목'
      },
      {
        name: 'description',
        label: '진료과 설명',
        type: 'textarea',
        required: true
      },
      {
        name: 'waitTime',
        label: '평균 대기시간 (분)',
        type: 'number',
        required: false,
        placeholder: '30'
      },
      {
        name: 'availableDays',
        label: '진료 요일 (쉼표로 구분)',
        type: 'text',
        required: false,
        placeholder: '월,화,수,목,금'
      }
    ],
    requiredFields: ['departmentName', 'doctor', 'specialty', 'symptoms', 'treatmentAreas', 'description'],
    fileFormats: ['excel', 'csv', 'json'],
    sampleData: [
      {
        departmentName: '정형외과',
        doctor: '김철수 과장',
        specialty: ['척추', '관절', '스포츠 손상'],
        symptoms: ['허리 통증', '무릎 통증', '어깨 결림', '골절', '염좌'],
        treatmentAreas: ['허리', '무릎', '어깨', '발목', '손목'],
        description: '근골격계 질환 전문 진료과입니다',
        waitTime: 30,
        availableDays: ['월', '화', '수', '목', '금']
      }
    ]
  },
  
  userInputSchema: {
    fields: [
      {
        name: 'symptoms',
        label: '현재 증상 (쉼표로 구분)',
        type: 'text',
        required: true,
        placeholder: '예: 허리 통증, 다리 저림'
      },
      {
        name: 'painArea',
        label: '통증 부위',
        type: 'text',
        required: true,
        placeholder: '예: 허리, 다리'
      },
      {
        name: 'duration',
        label: '증상 지속 기간',
        type: 'select',
        required: true,
        options: ['1일 미만', '1-3일', '1주일 미만', '1-2주', '2주-1개월', '1개월 이상']
      },
      {
        name: 'age',
        label: '나이',
        type: 'number',
        required: true,
        min: 0,
        max: 120
      },
      {
        name: 'gender',
        label: '성별',
        type: 'select',
        required: true,
        options: ['남성', '여성']
      },
      {
        name: 'additionalInfo',
        label: '추가 정보',
        type: 'textarea',
        required: false,
        placeholder: '예: 기저질환, 복용 중인 약, 과거 병력 등'
      }
    ]
  },
  
  promptTemplate: {
    systemPrompt: `당신은 전문 의료 진료과 추천 AI입니다.

환자의 증상, 통증 부위, 지속 기간, 나이, 성별을 종합적으로 분석하여 적절한 진료과를 추천해주세요.

응답 형식 (반드시 JSON):
{
  "recommendations": [
    {
      "departmentName": "진료과명",
      "doctor": "담당 의사",
      "reason": "추천 이유 (증상과의 연관성 설명)",
      "matchScore": 95,
      "urgency": "긴급도 (낮음/보통/높음/응급)",
      "expectedTreatment": "예상 치료 방법",
      "waitTime": 30
    }
  ],
  "healthAdvice": "증상 완화를 위한 조언",
  "urgencyNote": "응급 상황인 경우 즉시 응급실 방문 권고",
  "alternativeDepartments": [
    {
      "departmentName": "대체 진료과명",
      "reason": "이 진료과도 가능한 이유"
    }
  ]
}

중요 주의사항:
1. 이는 의료 조언이 아니며 참고용입니다
2. 응급 증상의 경우 반드시 응급실 방문을 권고하세요
3. 증상이 심각하거나 지속되면 빠른 진료를 권장하세요`,

    userPromptTemplate: (departmentData: any[], userInput: any) => {
      const departmentList = departmentData.map(dept => `
진료과: ${dept.departmentName}
담당의: ${dept.doctor}
전문분야: ${dept.specialty.join(', ')}
관련 증상: ${dept.symptoms.join(', ')}
치료 부위: ${dept.treatmentAreas.join(', ')}
설명: ${dept.description}
평균 대기: ${dept.waitTime || '정보 없음'}분
진료 요일: ${dept.availableDays?.join(', ') || '정보 없음'}
`).join('\n---\n');

      return `다음 진료과 목록에서 환자에게 적절한 진료과를 추천해주세요.

【진료과 데이터】
${departmentList}

【환자 정보】
증상: ${userInput.symptoms}
통증 부위: ${userInput.painArea}
지속 기간: ${userInput.duration}
나이: ${userInput.age}세
성별: ${userInput.gender}
추가 정보: ${userInput.additionalInfo || '없음'}

위 환자 정보를 바탕으로 적절한 진료과를 JSON 형식으로 추천해주세요.

**중요**: 이는 의료 진단이 아니며, 참고용 정보입니다. 실제 진료가 필요합니다.`;
    }
  },
  
  themes: {
    modern: {
      id: 'modern',
      name: '클린',
      description: '깨끗하고 신뢰감 있는 의료 테마',
      preview: '/themes/medical-clean.png',
      colors: {
        primary: '#0EA5E9',
        secondary: '#0284C7',
        accent: '#38BDF8',
        background: '#F0F9FF',
        surface: '#FFFFFF',
        text: '#0C4A6E',
        textSecondary: '#475569',
        border: '#BAE6FD'
      },
      typography: {
        fontFamily: "'Pretendard', sans-serif",
        headingSize: '2rem',
        bodySize: '0.938rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '12px',
        spacing: '1.25rem',
        cardStyle: 'elevated'
      },
      components: {
        buttonStyle: 'rounded-lg bg-sky-500 hover:bg-sky-600 shadow-md',
        inputStyle: 'rounded-lg border border-sky-200 bg-white',
        cardStyle: 'rounded-xl bg-white shadow-lg border border-sky-100'
      }
    },
    classic: {
      id: 'classic',
      name: '따뜻함',
      description: '편안하고 안심되는 따뜻한 테마',
      preview: '/themes/medical-warm.png',
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#34D399',
        background: '#F0FDF4',
        surface: '#FFFFFF',
        text: '#064E3B',
        textSecondary: '#6B7280',
        border: '#BBF7D0'
      },
      typography: {
        fontFamily: "'Noto Sans KR', sans-serif",
        headingSize: '2rem',
        bodySize: '1rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '16px',
        spacing: '1.5rem',
        cardStyle: 'soft'
      },
      components: {
        buttonStyle: 'rounded-xl bg-emerald-500 hover:bg-emerald-600 shadow-md',
        inputStyle: 'rounded-lg border-2 border-emerald-200 bg-white',
        cardStyle: 'rounded-2xl bg-gradient-to-br from-white to-emerald-50 shadow-lg border border-emerald-200'
      }
    },
    minimal: {
      id: 'minimal',
      name: '전문가',
      description: '전문적이고 집중된 미니멀 디자인',
      preview: '/themes/medical-professional.png',
      colors: {
        primary: '#4F46E5',
        secondary: '#4338CA',
        accent: '#6366F1',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#1E1B4B',
        textSecondary: '#64748B',
        border: '#E0E7FF'
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        headingSize: '1.875rem',
        bodySize: '0.938rem',
        headingWeight: '600',
        bodyWeight: '400'
      },
      layout: {
        containerMaxWidth: '380px',
        borderRadius: '8px',
        spacing: '1rem',
        cardStyle: 'flat'
      },
      components: {
        buttonStyle: 'rounded-md bg-indigo-600 hover:bg-indigo-700 shadow-sm',
        inputStyle: 'rounded-md border border-indigo-200 bg-white',
        cardStyle: 'rounded-lg border border-indigo-200 bg-white shadow-sm'
      }
    }
  }
};

