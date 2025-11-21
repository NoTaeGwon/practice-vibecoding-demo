## TODO 웹 앱 개발 체크리스트 (TDD 중심)

`docs/design.md` 설계를 기반으로, **코어 비즈니스 로직은 TDD**로 진행하기 위한 작업 순서 체크리스트이다.  
각 단계의 **커밋 포인트 예시**도 함께 정리했다.

---

### 0. 실제 진행 순서 가이드 (프론트엔드 우선)

- **권장 작업 순서**
  1. 1장: 공통 환경 세팅
  2. 6장: 프론트엔드 도메인 & 상태 관리 (TDD)
  3. 7장: 프론트엔드 API 연동 로직 (초기에는 mock/localStorage 기반)
  4. 8장: 프론트엔드 UI 컴포넌트 구현 (Mantine)
  5. 2~4장: 백엔드 도메인/Repository/Lambda 핸들러 (TDD)
  6. 5장: 인프라(CDK) 구성 및 실제 API 배포
  7. 9장: 프론트엔드의 Cognito 연동
  8. 10장: 통합 테스트 및 마무리

---

### 1. 공통 환경 세팅

- [x] **모노레포 구조 및 워크스페이스 설정**
  - [x] 루트 `package.json` 생성 및 npm/pnpm workspaces 설정
  - [x] `apps/web`, `apps/api`, `infra/cdk` (필요 시 `packages/shared`) 디렉터리 생성
  - **커밋 포인트**: `chore: 모노레포 구조 및 워크스페이스 초기 설정` (진행 완료)

- [ ] **Node/패키지 환경 세팅**
  - [ ] 루트와 각 앱에 필요한 `package.json` 생성 (현재: 루트, `apps/web` 완료 / `apps/api`, `infra/cdk` 미구현)
  - [x] 공통 의존성 추가: TypeScript, Jest, ts-jest, @types/jest, ESLint 등
  - [x] 프론트엔드 의존성 추가: React, React DOM, Vite, @testing-library/react, Mantine 관련 패키지 등 (`apps/web` 완료)
  - [ ] 백엔드 의존성 추가: AWS SDK(v3), Jest 관련 도구 등
  - **커밋 포인트**: `chore: 프로젝트 초기 세팅 및 의존성 추가`

- [x] **TypeScript / Jest 설정 (프론트엔드)**
  - [x] `apps/web/tsconfig.json` 작성
  - [x] `apps/web/jest.config.cjs`, `apps/web/jest.setup.cjs` 작성
  - [x] `npm run test:web` 스크립트 추가 및 동작 확인
  - **커밋 포인트**: `test(web): Jest 및 TypeScript 테스트 환경 구성`

- [x] **프론트엔드 품질 도구 및 Git 훅 설정**
  - [x] 루트 `.eslintrc.cjs` 설정 및 `npm run lint:web` 스크립트 추가
  - [x] `scripts/precommit-web.cjs` 작성: `apps/web` 실행 코드 변경 시 lint → test → build 수행
  - [x] Husky `.husky/pre-commit` 훅에서 `precommit-web.cjs` 실행
  - **커밋 포인트**: `chore(web): ESLint/Jest 설정 및 Husky pre-commit 추가`

---

### 2. 백엔드 도메인 로직 (순수 함수, TDD)

- [ ] **Todo 타입 및 도메인 유틸 정의 (TDD)**
  - [ ] `Todo`, `TodoCreateInput` 등 타입 정의
  - [ ] ID 생성, 타임스탬프 생성 헬퍼에 대한 테스트 작성
  - [ ] 테스트를 통과하도록 도메인 유틸 구현
  - **커밋 포인트**: `feat(api): Todo 도메인 타입 및 유틸 TDD로 구현`

- [ ] **서비스 계층 설계 (TDD)**
  - [ ] `TodoRepository` 인터페이스 설계 (create, list, update, delete)
  - [ ] `createTodo`, `listTodos`, `updateTodo`, `deleteTodo` 서비스 함수 테스트 작성
    - [ ] 성공 케이스
    - [ ] 잘못된 입력/에러 케이스
  - [ ] in-memory fake 리포지토리를 사용해 서비스 함수 구현
  - **커밋 포인트**: `feat(api): Todo 서비스 계층 TDD로 구현 (in-memory repo 기반)`

---

### 3. DynamoDB 리포지토리 구현 (TDD 권장)

- [ ] **DynamoDB 리포지토리 구현**
  - [ ] DynamoDB용 `TodoRepositoryDynamo` 클래스/모듈 설계
  - [ ] DocumentClient 또는 v3 DynamoDBClient mock 기반 테스트 작성
  - [ ] `create`, `list`, `update`, `delete`에 대한 실제 구현
  - **커밋 포인트**: `feat(api): DynamoDB TodoRepository 구현 및 테스트`

---

### 4. Lambda 핸들러 레벨 (TDD)

- [ ] **`createTodoHandler` (POST /todos)**
  - [ ] 이벤트에서 JWT/`userId` 추출 로직 테스트 작성
  - [ ] body 검증 실패 / 성공 / 서비스 에러 케이스 테스트
  - [ ] 핸들러 구현 및 공통 응답 포맷 적용
  - **커밋 포인트**: `feat(api): createTodo Lambda 핸들러 TDD로 구현`

- [ ] **`listTodosHandler` (GET /todos)**
  - [ ] 필터 없는 경우, `q` 있는 경우 테스트 작성
  - [ ] 핸들러 구현 및 서비스 계층과 연동
  - **커밋 포인트**: `feat(api): listTodos Lambda 핸들러 TDD로 구현`

- [ ] **`updateTodoHandler` / `deleteTodoHandler`**
  - [ ] Path parameter(`todoId`) 처리 테스트
  - [ ] 존재하지 않는 TODO, 권한 문제 등 에러 케이스 테스트
  - [ ] 핸들러 구현
  - **커밋 포인트**: `feat(api): update/delete Todo Lambda 핸들러 TDD로 구현`

---

### 5. 인프라(CDK) 구성

- [ ] **CDK 프로젝트 스켈레톤**
  - [ ] CDK 초기화 및 기본 스택 생성
  - [ ] 빈 Lambda, DynamoDB 테이블 리소스 선언
  - **커밋 포인트**: `chore(infra): CDK 스택 초기 구조 생성`

- [ ] **API Gateway / Lambda / DynamoDB / Cognito 연결**
  - [ ] REST API 리소스(/todos) 및 메서드 정의
  - [ ] Lambda 통합 및 적절한 IAM Role 설정
  - [ ] Cognito User Pool 및 Authorizer 연결
  - **커밋 포인트**: `feat(infra): API Gateway-Lambda-DynamoDB-Cognito 아키텍처 구성`

---

### 6. 프론트엔드 도메인 & 상태 관리 (TDD)

- [x] **Todo 타입 및 API 클라이언트 인터페이스 정의 (1차: 도메인 타입)**
  - [x] 프론트엔드용 `Todo` 타입 정의 (`apps/web/src/types/todo.ts`)
  - [ ] `TodoApiClient` 인터페이스 설계 (create, list, update, delete)
  - **커밋 포인트**: `feat(web): Todo 타입 및 API 클라이언트 인터페이스 정의`

- [x] **`todoReducer` 상태/액션 TDD**
  - [x] 상태 구조 정의: `todos, filter, searchQuery, loading, error` (`TodoState`)
  - [x] 각 액션(`ADD_TODO`, `UPDATE_TODO`, `DELETE_TODO`, `SET_FILTER`, `SET_SEARCH_QUERY`, `SET_TODOS`)에 대한 리듀서 테스트 작성 (`todoReducer.test.ts`)
  - [x] 리듀서 구현 (`todoReducer.ts`)
  - **커밋 포인트**: `feat(web): todoReducer TDD로 구현`

- [x] **`TodoContext` (Provider) TDD**
  - [x] Context 생성/Provider 동작 테스트 (초기 상태, dispatch 전달 등) (`TodoContext.test.tsx`)
  - [x] Provider 구현 (`TodoContext.tsx`) 및 훅(`useTodoState`, `useTodoDispatch`) 제공
  - [ ] Provider를 앱 루트에 연결 (`App`/`main`에서 사용) ← 이후 단계에서 적용
  - **커밋 포인트**: `feat(web): TodoContext 및 Provider TDD로 구현`

---

### 7. 프론트엔드 API 연동 로직 (TDD)

- [x] **API 서비스 레이어 (1차: localStorage/mock 기반)**
  - [x] `TodoApiClient` 인터페이스 및 `localTodoApi` 구현 (`apps/web/src/services/todoApi.ts`)
  - [x] `fetchTodos`, `createTodo`, `updateTodo`, `deleteTodo` 함수 테스트 작성 및 통과 (`todoApi.test.ts`)
  - [ ] 이후 실제 백엔드 API 호출로 교체 (동일 인터페이스 사용)
  - **커밋 포인트**: `feat(web): Todo API 서비스 레이어 TDD로 구현`

- [x] **Context + API 통합**
  - [x] 초기 로딩, TODO 추가 시 API + reducer가 함께 동작하는지 RTL 테스트 작성 (`useTodos.test.tsx`)
  - [x] 커스텀 훅 `useTodos` 구현 (`apps/web/src/hooks/useTodos.ts`)
  - [ ] 삭제/완료 토글 시나리오에 대한 추가 통합 테스트는 추후 보강
  - **커밋 포인트**: `feat(web): Context와 API 통합 로직 TDD로 구현`

---

### 8. 프론트엔드 UI 컴포넌트 (UI/UX, TDD 선택)

- [x] **Mantine 기반 기본 컴포넌트 구현**
  - [x] 레이아웃: `AppShell` + `Container` 구성 (`apps/web/src/App.tsx`)
  - [x] 입력/버튼: `TextInput` + `Button`으로 TODO 추가 영역 구현 (`TodoInput.tsx`)
  - [x] 필터/검색: `SegmentedControl` + `TextInput`으로 필터/검색 UI 구현 (`FilterBar.tsx`, `SearchBar.tsx`)
  - [x] 리스트: `Checkbox`, `Group`, `ActionIcon`, `Card`, `Stack` 등을 사용해 TODO 항목 표시 (`TodoItem.tsx`, `TodoList.tsx`, `TodoPage.tsx`)
  - [x] `TodoInput`, `TodoList`, `TodoItem`, `FilterBar`, `SearchBar`, `TodoPage` 컴포넌트로 분리
  - [ ] 필요 시 간단한 렌더링/상호작용 테스트 추가 (현재는 미구현)
  - **커밋 포인트**: `feat(web): Mantine 기반 TODO UI 컴포넌트 구현`

---

### 9. 인증(Cognito) 프론트엔드 연동

- [ ] **로그인/로그아웃 흐름**
  - [ ] Cognito Hosted UI 또는 SDK 연동
  - [ ] 토큰 저장/삭제, 만료 처리 로직 구현
  - [ ] API 호출 시 `Authorization: Bearer JWT` 헤더 주입
  - **커밋 포인트**: `feat(web): Cognito 인증 연동 및 JWT 기반 호출 구현`

---

### 10. 통합 테스트 및 마무리

- [ ] **엔드투엔드 흐름 확인**
  - [ ] 스테이지/로컬 환경에서 로그인 → TODO 생성 → 조회 → 수정/삭제 흐름 실제 테스트
  - [ ] 발견된 버그 수정
  - [ ] `design.md`, `requirements.md` 최신 상태로 업데이트
  - **커밋 포인트**: `chore: 통합 테스트 및 문서 업데이트`


