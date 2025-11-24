## TODO 웹 앱 모노레포

간단한 TODO 웹 애플리케이션을 **프론트엔드 + 백엔드 + 인프라(CDK)** 를 포함한 모노레포 형태로 구현하는 프로젝트입니다.  
요구사항 정의, 설계, 구현 체크리스트를 통해 **문서 → 설계 → TDD 기반 구현** 흐름을 연습하는 것을 목표로 합니다.

---

### 1. 문서 구조

- `docs/requirements.md`  
  - TODO 웹 앱에 대한 **요구사항 정의서**입니다.
- `docs/design.md`  
  - 요구사항을 기반으로 한 **아키텍처/도메인/프론트/백엔드/인프라 설계 문서**입니다.
  - Mermaid 시퀀스 다이어그램과 SVG 아키텍처 다이어그램(`docs/architecture.svg`)을 포함합니다.
- `docs/checklist.md`  
  - 설계 내용을 실제 구현 단계로 옮긴 **실행용 체크리스트(TDD 중심)** 입니다.

문서를 먼저 읽은 뒤, `checklist.md` 를 따라가며 구현을 진행하는 흐름을 추천합니다.

---

### 2. 모노레포 구조

루트 `package.json` 에서 npm/pnpm workspaces를 사용해 여러 앱과 패키지를 한 리포지토리에서 관리합니다.

```text
.
├─ apps/
│  ├─ web/    # React + Vite + Mantine 기반 프론트엔드
│  └─ api/    # Lambda 핸들러 및 도메인 로직 (Node.js / TypeScript)
├─ infra/
│  └─ cdk/    # AWS CDK 스택 (API Gateway, Lambda, DynamoDB, Cognito 등)
├─ packages/
│  └─ shared/ # (선택) 프론트/백엔드에서 공통으로 사용하는 타입/유틸
└─ docs/      # 요구사항/설계/체크리스트/다이어그램
```

---

### 3. 기술 스택 (요약)

- **프론트엔드**
  - React + Vite
  - UI: Mantine
  - 상태 관리: React Context + `useReducer`
  - 테스트: Jest, React Testing Library (`apps/web` 전용 설정)
  - 품질 도구: ESLint
  - Git 훅: Husky pre-commit 훅에서 `apps/web` 실행 코드 변경 시에만 lint → test → build 자동 실행
  - 배포: GitHub Pages (GitHub Actions CI/CD)

- **백엔드**
  - Node.js (TypeScript)
  - AWS API Gateway + Lambda
  - DynamoDB (TODO 데이터 저장)
  - 인증: AWS Cognito (User Pool + JWT)
  - 인프라 관리: AWS CDK

- **개발 방식**
  - 코어 비즈니스 로직(도메인, 서비스, Lambda 핸들러, 상태 관리, API 레이어)은 **TDD** 로 구현
  - 프론트엔드 UI/UX는 실행 가능한 코드 우선, 필요 시 최소한의 테스트만 추가

자세한 내용은 `docs/requirements.md` 및 `docs/design.md` 를 참고하세요.

---

### 4. 초기 설정 & 실행 (개요)

> ⚠ 현재 리포지토리는 **Node.js와 npm/pnpm이 설치되어 있다는 가정** 하에 구성되어 있습니다.

1. **Node.js 설치**
   - `https://nodejs.org` 에서 LTS 버전 설치 (또는 nvm 사용)

2. **의존성 설치**
   - 루트에서:
     ```bash
     npm install
     ```
   - 이후 각 워크스페이스(`apps/web`, `apps/api`, `infra/cdk`) 에서 필요한 스크립트/설정을 추가해 나갈 예정입니다.

3. **체크리스트 따라 구현 진행**
   - `docs/checklist.md` 를 열고 1번부터 순서대로 체크해가며 작업합니다.
   - 각 단계가 끝날 때마다 체크리스트에 있는 **커밋 메시지 예시**를 참고해 Git 커밋을 남깁니다.

---

### 5. Git 사용 규칙 (요약)

- 설계 변경 전에는 `docs/requirements.md`, `docs/design.md` 를 먼저 수정합니다.
- 새로운 기능/단계 구현 후에는 `docs/checklist.md` 의 진행 상황을 갱신합니다.
- 커밋 전에 문서와 코드가 현재 상태를 잘 반영하는지 확인합니다.
 - 프론트엔드 실행 코드(`apps/web/src` 등)를 변경한 커밋에서는, pre-commit 훅이 자동으로
   - `npm run lint:web`
   - `npm run test:web`
   - `npm run build:web`
   을 순서대로 실행하며, 실패하면 커밋이 차단됩니다.

이 README는 프로젝트 전반의 개요만 다루며, 구체적인 구현 순서와 세부 설계는 `docs/` 폴더를 기준으로 관리합니다.


