# 🚀 GitScope — AI-Powered Git Workflow for VS Code  
Your Git process, simplified and accelerated by AI.

**GitScope**는 VS Code 안에서 Git 작업을 더 빠르고, 안전하고, 똑똑하게 수행할 수 있도록 설계된 AI 기반 Git 확장입니다.  
Gemini를 활용해 **브랜치명 추천**, **커밋 메시지 생성**, **간편한 Git 명령 실행**을 지원합니다.

---

# ✨ 주요 기능

## 🧠 1. AI 기반 Git 자동화  
GitScope는 변경된 파일을 분석하여 깔끔한 기록을 만드는 데 필요한 AI 도구를 제공합니다.

### • 🌳 AI Branch Name Recommendation  
- 작업 내용을 기반으로 **자동 브랜치명 추천**  
- Git 규칙에 맞는 일관된 네이밍 패턴 유지
<img src="./images/demo_recommand_branch.gif" alt="AI 브랜치명 추천 시연" width="1000" />

### • 🪶 AI Commit Message Generator  
- 스테이징된 파일을 분석해 **최적의 커밋 메시지 자동 생성**  
- 생성된 메시지는 클립보드로 자동 복사  
- 불필요한 설명 없이 “한 번에 깔끔한 커밋” 가능  
<img src="./images/demo_recommand_commitmessage.gif" alt="AI 커밋메시지 추천 시연" width="1000" />


---

## 🔄 2. 단순하고 직관적인 Git 명령  
GitScope는 복잡한 Git 명령을 누르기 쉬운 VS Code Command Palette 명령으로 제공합니다.

| GitScope 명령 | Git 명령 | 설명 |
|--------------|----------|------|
| **🧭 GitScope Navigator 열기** | - | 브랜치 전략별 워크플로우 UI |
| **🔗 Clone Remote Repository** | `git clone` | 원격 저장소 클론 |
| **📥 Pull Changes** | `git pull` | 최신 변경 사항 가져오기 |
| **➕ Stage All Changes** | `git add .` | 전체 변경 사항 스테이징 |
| **🪶 Generate Commit Message** | - | AI 커밋 메시지 생성 |
| **🚀 Commit Changes** | `git commit` | 변경 사항 커밋 |
| **☁️ Push to Remote** | `git push` | 변경 사항 푸시 |
| **🌳 Create Branch** | `git branch` | 새 브랜치 생성 |
| **🔄 Switch Branch** | `git checkout` | 브랜치 전환 |
| **➡️ Merge Branch** | `git merge` | 브랜치 병합 |
| **🗑️ Delete Local Branch** | `git branch -d` | 로컬 브랜치 삭제 |

---

# 🧭 GitScope 기본 사용 흐름 (3-단계 워크플로우)

GitScope는 초보자도 Git을 안전하게 사용하도록 **3-Step Git Flow**를 제공합니다.

---

## 🥇 1단계 — 작업 준비 (Setup)

| 순서 | 명령 | 설명 |
|---|------|------|
| 1 | **🔑 Gemini API Key 설정 (필수)** | AI 기능 활성화를 위한 API Key 등록 |
| 2 | **🔗 원격 저장소 클론 (필수)** | 프로젝트 최초 클론 |
| 3 | **📥 원격 변경 사항 Pull** | 작업 시작 전 최신 코드 동기화 |

---

## 🥈 2단계 — 개발 및 커밋 (Development & Commit)

| 순서 | 명령 | 설명 |
|---|------|------|
| 1 | 코드 수정 | 일반적인 개발 작업 수행 |
| 2 | **🌳 Branch Name 추천 및 생성** | 기능 브랜치를 AI로 생성 |
| 3 | **🔄 Branch 전환** | 생성된 브랜치로 체크아웃 |
| 4 | **🪶 Commit Message 생성** | 변경된 파일 기반 AI 커밋 메시지 생성 |
| 5 | **🚀 변경 사항 Commit** | 메시지 적용 후 commit 실행 |

---

## 🥉 3단계 — 병합 및 공유 (Integration)

| 순서 | 명령 | 설명 |
|---|------|------|
| 1 | **🔄 Branch 전환** | 병합 대상 브랜치로 이동 |
| 2 | **📥 Pull** | 병합 충돌 예방을 위한 최신화 |
| 3 | **➡️ Merge 실행** | 작업 브랜치를 대상 브랜치로 병합 |
| 4 | **☁️ Push** | 병합된 내용 원격 저장소로 푸시 |
| 5 | **🗑️ Local Branch 삭제** | 작업 끝난 브랜치 정리 |

---

## 🧭 GitScope Navigator
잡한 Git 브랜치 전략도 버튼 클릭으로 간단하게!
GitScope Navigator는 프로젝트 규모와 팀 구성에 맞는 **4가지 브랜치 전략**을 시각적 UI로 제공합니다.

## 지원하는 브랜치 전략
- **Single-Branch** — 1인 개발
- **GitHub-Flow** — 2인~5인, 단순함
- **GitLab-Flow** — 5인 ~ 20인, 직관적, 테스트 브랜치
- **Git-Flow** — 대규모, 여러 버전 운영

## 사용법
1. Command Palette → `Git Scope: 🧭 GitScope Navigator 열기`
2. 프로젝트에 맞는 브랜치 전략 선택
3. 제공되는 버튼으로 Git 명령 실행

각 전략에 맞는 Git 명령을 **단계별 버튼**으로 제공하여 초보자도 쉽게 따라할 수 있습니다.

---

# ⚙️ 설치 및 설정

### 1. GitScope 설치  
VS Code Extensions Marketplace에서 **"GitScope"** 검색 후 설치.

### 2. AI Key 설정  
Command Palette (`Ctrl + Shift + P`) 또는 F1 →  
`🔑 [CONFIG] Gemini API Key 설정 (필수)` 실행 후 Key 등록.

### 3. 시작  
Command Palette에서 **"Git Scope"**를 검색하면 모든 명령을 확인할 수 있습니다.

---

# 🔒 보안 및 비용 안내

- API Key는 **VS Code SecretStorage**에 안전하게 암호화 저장됩니다.  
- 모든 AI 요청은 사용자의 **Gemini API Key**로 이루어지며, 비용은 사용자가 부담합니다.  
- GitScope는 API Key를 외부 서버로 전송하지 않습니다.

---

# 📘 GitScope 공식 문서  
더 자세한 가이드와 예시는 다음 공식 매뉴얼에서 확인하세요:

👉 **GitScope Extension 공식 매뉴얼**  
https://sparkling-0902.notion.site/GitScope-Extension-2af6a40f9fff804da616e999e8527349