# Toonation 2025 - 재고 관리 시스템
Next.js 14와 React 18을 기반으로 구축된 재고 관리 시스템입니다. SOLID 원칙을 고려하여 Atomic Design 패턴으로 설계되었습니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [아키텍처](#아키텍처)
- [기술 스택](#기술-스택)
- [과제 실행 방법](#과제-실행-방법)
- [UI 테스트: Storybook](#ui-테스트-storybook)
- [기능 테스트: Jest](#기능-테스트-jest)
- [데이터 스토리지](#데이터-스토리지)
- [프로젝트 구조](#프로젝트-구조)

## 프로젝트 개요

이 프로젝트는 기프티콘 및 배송 아이템의 재고를 관리하고, 수령자 정보를 관리하는 시스템입니다. 컴포넌트 기반 아키텍처를 통해 재사용성과 유지보수성을 높였습니다.

## 아키텍처

### SOLID 원칙 적용

본 프로젝트는 SOLID 원칙을 고려하여 설계되었습니다:

- **단일 책임 원칙 (SRP)**: 각 컴포넌트와 함수는 하나의 명확한 책임만 가집니다.
- **개방-폐쇄 원칙 (OCP)**: 확장에는 열려있고 수정에는 닫혀있는 구조로 설계되었습니다.
- **리스코프 치환 원칙 (LSP)**: 인터페이스와 타입을 통해 일관된 동작을 보장합니다.
- **인터페이스 분리 원칙 (ISP)**: 필요한 기능만을 포함하는 작은 단위의 컴포넌트로 구성됩니다.
- **의존성 역전 원칙 (DIP)**: 추상화에 의존하며, 구체적인 구현에 의존하지 않습니다.

### Atomic Design 패턴

컴포넌트는 Atomic Design 패턴에 따라 다음과 같이 구성됩니다:

```
src/component/
├── atom/          # 가장 작은 단위의 컴포넌트 (Button, Input, Label 등)
├── organism/      # 여러 atom과 molecule을 조합한 복합 컴포넌트
└── container/     # 비즈니스 로직과 상태 관리를 담당하는 컨테이너 컴포넌트
```

- **Atom**: Button, Input, Label, Modal, Card 등 재사용 가능한 기본 컴포넌트
- **Organism**: InventoryHeader, FilterSection, RecipientInfoForm 등 기능 단위의 복합 컴포넌트
- **Container**: InventoryManagementContainer 등 상태 관리와 비즈니스 로직을 담당하는 최상위 컴포넌트

이러한 구조를 통해 컴포넌트의 재사용성과 테스트 용이성을 높였습니다.

## 기술 스택

- **Framework**: Next.js 14
- **UI Library**: React 18
- **State Management**: TanStack Query (React Query)
- **Styling**: CSS Modules
- **TypeScript**: 타입 안정성 보장
- **Testing**: Jest, React Testing Library, Storybook
- **Icons**: Tabler Icons

## 과제 실행 방법

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

3. **프로덕션 빌드**
   ```bash
   npm run build
   npm start
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

## UI 테스트: Storybook

Storybook을 사용하여 컴포넌트를 독립적으로 개발하고 테스트할 수 있습니다.

### Storybook 실행

```bash
npm run storybook
```

브라우저에서 [http://localhost:6006](http://localhost:6006) 접속하여 컴포넌트를 확인할 수 있습니다.

### Storybook 빌드

```bash
npm run build-storybook
```

빌드된 Storybook은 `storybook-static` 디렉토리에 생성됩니다.

### Storybook 설정

- **Addons**: 
  - `@storybook/addon-a11y`: 접근성 테스트
  - `@storybook/addon-docs`: 자동 문서 생성
  - `@storybook/addon-vitest`: Vitest 통합
  - `@chromatic-com/storybook`: 시각적 회귀 테스트

- **Story 파일 위치**: `src/**/*.stories.tsx`

### 예시

각 컴포넌트는 Storybook에서 다양한 상태와 변형을 확인할 수 있습니다:

- `Atom/Card`: 기본 카드 컴포넌트의 다양한 상태
- `Organism/AddressDisplay`: 주소 표시 컴포넌트

## 기능 테스트: Jest

Jest와 React Testing Library를 사용하여 기능 테스트를 수행합니다.

### 테스트 실행

```bash
npm test
```

### 테스트 설정

- **환경**: `jest-environment-jsdom` (브라우저 환경 시뮬레이션)
- **설정 파일**: `jest.config.js`
- **Setup 파일**: `jest.setup.js` (Testing Library 설정)

### 테스트 구조

테스트 파일은 `__tests__` 디렉토리 또는 `*.test.ts` / `*.test.tsx` 형식으로 작성됩니다.

**예시**: `src/util/__tests__/generateRandomId.test.ts`
- 기본 동작 테스트
- 랜덤성 검증
- 형식 검증
- 다중 호출 테스트

### 테스트 커버리지

현재 프로젝트에서는 유틸리티 함수와 핵심 로직에 대한 단위 테스트를 포함하고 있습니다.

## 데이터 스토리지

### JSON 파일 사용

본 프로젝트는 데이터 스토리지로 **JSON 파일**을 사용합니다.

#### JSON 파일 선택 이유

1. **단순성과 명확성**
   - 프로젝트의 요구사항이 복잡한 데이터베이스 설정 없이도 충분히 구현 가능
   - 데이터 구조를 직접 확인하고 수정할 수 있어 개발 및 디버깅이 용이

2. **빠른 프로토타이핑**
   - 별도의 데이터베이스 서버 설정이나 마이그레이션 과정이 불필요
   - 개발 초기 단계에서 빠르게 프로토타입을 구축하고 검증 가능

3. **파일 기반 백업 및 복구**
   - `inventory.backup.json`, `recipient-info.backup.json` 파일을 통한 간단한 백업 시스템
   - 데이터 손실 시 백업 파일로 즉시 복구 가능

#### 데이터 파일 구조

```
data/
├── inventory.json              # 재고 데이터 (현재)
├── inventory.backup.json       # 재고 데이터 백업
├── recipient-info.json         # 수령자 정보 (현재)
└── recipient-info.backup.json  # 수령자 정보 백업
```

#### 데이터 관리

데이터 관리는 `src/lib/fileStorage.ts`에서 처리됩니다:

- `getInventoryItems()`: 재고 목록 조회
- `saveInventoryItems()`: 재고 목록 저장
- `deleteInventoryItem()`: 재고 항목 삭제
- `getRecipientInfo()`: 수령자 정보 조회
- `saveRecipientInfo()`: 수령자 정보 저장
- `resetData()`: 백업 파일로 데이터 초기화


## 프로젝트 구조

```
toonation_2025/
├── data/                      # JSON 데이터 파일
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API Routes
│   │   └── donator/           # 페이지 라우트
│   ├── component/
│   │   ├── atom/              # Atomic Design - Atom 레벨
│   │   ├── organism/          # Atomic Design - Organism 레벨
│   │   └── container/         # Container 컴포넌트
│   ├── constant/              # 상수 정의
│   ├── context/               # React Context
│   ├── hooks/                 # Custom Hooks
│   ├── lib/                   # 라이브러리 및 유틸리티
│   ├── type/                  # TypeScript 타입 정의
│   └── util/                  # 유틸리티 함수
├── .storybook/                # Storybook 설정
├── jest.config.js             # Jest 설정
└── package.json               # 프로젝트 의존성
```

## 주요 기능

- ✅ 재고 목록 조회 및 필터링
- ✅ 재고 항목 상세 정보 확인
- ✅ 재고 항목 삭제
- ✅ 수령자 정보 관리
- ✅ 검색 기능 (상품명, 설명)
- ✅ 페이지네이션
- ✅ 정렬 기능
- ✅ 데이터 초기화 (백업 복구)
