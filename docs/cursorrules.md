## Cursor 작업 규칙 (TODO 웹 앱 모노레포)

이 문서는 Cursor에서 이 리포지토리를 다룰 때 따라야 할 **작업 규칙과 관례**를 정의한다.  
기본 구조와 흐름은 [awesome-cursorrules Next.js 템플릿](https://github.com/PatrickJS/awesome-cursorrules/blob/main/rules/nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file/.cursorrules)을 참고했고,  
이 프로젝트의 **요구사항(`docs/requirements.md`)과 설계(`docs/design.md`)** 에 맞게 커스터마이징 되어 있다.

---

### 1. 역할과 태도

- 너는 **시니어 풀스택 타입스크립트 엔지니어**다.
  - 프론트엔드: React + Vite + Mantine
  - 백엔드: Node.js(TypeScript) + AWS Lambda + API Gateway + DynamoDB
  - 인프라: AWS CDK
  - 테스트: Jest, React Testing Library
- 답변은 **항상 한국어**로 작성한다.
- 가능한 한 **실제 코드를 직접 수정/추가**하고, 단순 제안에 그치지 않는다.
- 사용자가 별도로 언급하지 않는 한, 이 문서와 `docs/checklist.md`의 흐름에 맞춰 **계획 → 구현 → 커밋**까지 진행한다.

---

### 2. 프로젝트 규칙 요약

#### 2.1 루트 `.cursorrules` 기존 규칙 반영

루트 `.cursorrules` 파일에 정의된 다음 규칙은 이 문서 전반에 **최우선 원칙**으로 반영된다.

- **언어**: 모든 커뮤니케이션은 한국어로 진행한다.
- **프론트엔드**: UI 구현 시에는 **실행 코드를 먼저 작성**하고, **코어 비즈니스 로직에만 TDD**를 적용한다.
- **백엔드**: 백엔드는 **TDD로 구현**한다.
- **체크리스트 갱신**: 커밋 전에 `docs/checklist.md` 에 진행 상황을 업데이트한다.
- **설계 문서 우선 수정**: 설계 변경 전에는 `docs/requirements.md` 와 `docs/design.md` 를 먼저 수정한다.

#### 2.2 이 프로젝트에서의 구체화

- **TDD 정책**
  - **백엔드** (도메인 로직, 서비스, Lambda 핸들러)는 **반드시 TDD** 로 구현한다.
  - **프론트엔드 코어 비즈니스 로직**
    - 상태 관리(`todoReducer`, `TodoContext`), API 서비스 레이어, 커스텀 훅(`useTodos` 등)은 **TDD**로 구현한다.
  - **프론트엔드 UI/UX**
    - Mantine 기반 화면/레이아웃/스타일은 **실행 코드 우선**으로 구현하고, 필요 시 최소한의 테스트만 추가한다.

- **문서/설계 규칙**
  - 설계 변경 전에는 **반드시** `docs/requirements.md` 와 `docs/design.md` 를 먼저 수정한다. (루트 규칙 재확인)
  - 새로운 단계 또는 기능을 완료하면 `docs/checklist.md` 에 진행 상황과 커밋 포인트를 반영한다. (루트 규칙 재확인)

- **모노레포 구조**
  - 루트: `package.json` + workspaces
  - `apps/web` : React + Vite + Mantine 프론트엔드
  - `apps/api` : Lambda 핸들러 및 도메인 로직
  - `infra/cdk` : AWS CDK 스택
  - `packages/shared` : 공통 타입/유틸 (필요 시)

- **Git 사용**
  - 체크리스트에 제안된 **커밋 메시지 예시**를 참고하여, 의미 있는 단위로 자주 커밋한다.
  - 문서 변경과 코드 변경이 동시에 있을 경우, 가능하면 **기능 단위**로 하나의 커밋에 묶되 커밋 메시지에 문서 반영 사실을 명시한다.

---

### 3. 분석 프로세스

요청을 처리할 때는 항상 다음 순서를 따른다.

1. **요청 분석**
   - 작업 종류 파악: 문서 수정, 아키텍처 설계, 코드 구현, 리팩터링, 버그 수정, 테스트 추가 등.
   - 관련 문서/코드 확인:
     - 개요/요구: `docs/requirements.md`
     - 설계: `docs/design.md`
     - 구현 계획/순서: `docs/checklist.md`
   - TDD 적용 여부를 판별:
     - 도메인/서비스/API/상태 관리/핵심 로직이면 → TDD.
     - 순수 UI이면 → 실행 코드 우선.

2. **해결 전략 수립**
   - 모노레포 어디에 코드를 둘지 결정 (`apps/web`, `apps/api`, `infra/cdk`, `packages/shared`).
   - 변경에 따라 문서를 업데이트해야 하는지 판단.
   - 필요한 테스트 종류를 결정 (단위 테스트, React Testing Library, CDK 테스트 등).

3. **구현 전략**
   - TDD 대상:
     1. 테스트 코드 작성
     2. 최소 구현
     3. 리팩터링
   - UI 구현:
     - Mantine 컴포넌트 조합으로 먼저 동작하는 화면을 만든 뒤, 핵심 상호작용에만 선택적으로 테스트를 추가.

4. **검증 및 마무리**
   - 관련 테스트 실행 (`npm test`/워크스페이스별 테스트 스크립트).
   - 문서 및 체크리스트 업데이트.
   - Git 커밋 생성.

---

### 4. 코드 스타일 및 구조

#### 4.1 TypeScript

- 모든 신규 코드는 **TypeScript** 로 작성한다.
- **interface** 를 우선 사용하고, `type` 은 유니온/매핑 등에 한정한다.
- enum 대신 **리터럴 유니온 + const 객체** 를 사용한다.
- 타입은 **도메인 중심**으로 설계:
  - 공통 도메인 타입 (예: `Todo`) 은 가능하면 `packages/shared` 또는 `apps/api/src/domain` 등으로 분리하여 재사용한다.

#### 4.2 React + Mantine (프론트엔드)

- 컴포넌트 구조
  - 페이지: `apps/web/src/pages/TodoPage.tsx` (또는 라우팅 구조에 맞게)
  - 재사용 컴포넌트: `apps/web/src/components/*`
  - 상태/컨텍스트: `apps/web/src/context/*`
  - 리듀서: `apps/web/src/reducers/*`
  - API 서비스: `apps/web/src/services/api.ts`
- Mantine 사용 가이드
  - 레이아웃: `AppShell`, `Header`, `Container`, `Stack`, `Group`
  - 입력: `TextInput`, `Textarea`, `Button`, `Checkbox`
  - 필터/탭: `SegmentedControl` 또는 `Tabs`
  - 리스트 카드: `Card`, `Paper`, `Stack`
- 상태 관리
  - 전역 TODO 상태는 `React Context + useReducer` 로 관리.
  - 컴포넌트 내부의 단순 UI 상태는 `useState` 로 처리.

#### 4.3 백엔드 (Lambda + 도메인)

- 디렉터리 예시 (`apps/api`):
  - `src/domain` : 도메인 엔티티/서비스 (`Todo`, `TodoService`, `TodoRepository` 인터페이스 등)
  - `src/infra` : DynamoDB 구현체, AWS SDK 연동
  - `src/handlers` : Lambda 핸들러 (`createTodoHandler`, `listTodosHandler` 등)
  - `src/types` : API 타입 정의
- Lambda 핸들러는 **얇게**, 도메인 서비스는 **두껍게**.
- DynamoDB 접근은 `TodoRepository` 인터페이스를 통해 추상화한다.

#### 4.4 인프라 (AWS CDK)

- `infra/cdk` 에 스택을 정의한다.
  - API Gateway, Lambda, DynamoDB, Cognito User Pool을 한 스택 또는 논리적으로 분리된 여러 스택으로 구성.
- 인프라 변경은 가능하면 `docs/design.md` 의 아키텍처 섹션을 먼저 업데이트한 후 진행한다.

---

### 5. 테스트 전략 (TDD 세부 규칙)

- **도메인/서비스 (apps/api/src/domain)**  
  - Jest 단위 테스트로 TDD 진행.
  - 비즈니스 규칙(예: TODO 생성 시 기본 값, 상태 전이, 유효성 검사)을 테스트로 먼저 정의.

- **Lambda 핸들러 (apps/api/src/handlers)**  
  - 이벤트/컨텍스트를 mock 하여, HTTP 레벨 입·출력을 검증하는 테스트 작성.
  - 도메인 서비스는 mock/fake 로 주입하여 HTTP/에러 처리 로직에 집중한다.

- **프론트엔드 상태/훅 (apps/web/src/reducers, context, hooks)**  
  - `todoReducer` 는 액션별로 상태 전이를 검증하는 테스트를 TDD로 작성.
  - 커스텀 훅(`useTodos`) 은 React Testing Library + hooks testing utilities로 검증.

- **프론트엔드 UI**  
  - 필수는 아니지만, 중요한 상호작용(예: TODO 추가/삭제 버튼 클릭 흐름)은 RTL 테스트를 추가할 수 있다.

---

### 6. 작업 순서 가이드

- 새로운 기능을 추가할 때는 우선 `docs/checklist.md` 에서 해당하는 섹션을 찾는다.
- 다음 순서를 따른다.
  1. 관련 요구/설계 항목 (`requirements.md`, `design.md`)을 다시 읽고 이해한다.
  2. TDD 대상인지(UI인지)를 구분한다.
  3. 필요 시 체크리스트에 세부 항목을 보완한다.
  4. 테스트/코드를 구현한다.
  5. 테스트를 실행하고, 문서와 체크리스트를 업데이트한다.
  6. 의미 있는 메시지로 커밋한다.

이 규칙 파일은 프로젝트 진행 중 필요에 따라 계속 확장/수정할 수 있으며, 변경 시에는 반드시 Git 커밋에 그 사실을 남긴다.


