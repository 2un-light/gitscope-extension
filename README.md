# 🚀 GitScope: The AI-Powered Git Workflow for VS Code

**GitScope** is a VS Code extension designed to streamline your Git workflow using **AI (Gemini)**.  
It helps you create clean commits, generate branch names, and manage merges/pushes—all directly inside VS Code with intelligent guidance.

---

## ✨ Key Features

### 🧠 AI-Powered Commit & Branching

* **Intelligent Commit Messaging (🪶):** Analyzes your staged changes and generates concise, relevant commit messages, automatically copying them to your clipboard.  
* **Smart Branch Naming (🌳):** Recommends branch names based on your task or project context.

### 🔄 Simplified Git Commands

GitScope breaks Git into simple, step-by-step commands to reduce errors and save time.

| Command Title | Git Equivalent | Description |
| :--- | :--- | :--- |
| **🔑 Set Gemini API Key (Required)** | - | Unlocks all AI features with your API key. |
| **🔗 Clone Remote Repository (Required)** | `git clone` | Clones a repository for your project. |
| **➕ Stage All Changes** | `git add .` | Stage all modified files for commit. |
| **🪶 Generate Commit Message** | - | AI generates a commit message for your staged changes. |
| **🚀 Commit Changes** | `git commit` | Commit staged files using the suggested message. |
| **☁️ Push Changes** | `git push` | Push commits to the remote repository. |

### 🌳 Branch Management

* **Branch Switching (🔄):** Easily checkout any local branch.  
* **Local Branch Deletion (🗑️):** Safely delete merged or completed branches.  
* **Integration Tools:** Pull (📥) and Merge (➡️) commands to integrate work smoothly.

---

## 📝 Core Workflow (3-Step Guide)

GitScope organizes commands into three logical stages. Open the Command Palette and type `Git Scope` to see the commands.

### 🥇 Stage 1: Preparation & Setup

| Command Title | Order | Action |
| :--- | :--- | :--- |
| **Set API Key:** `Git Scope: 🔑 0. Gemini API Key 설정 (Required)` | 0 | Configure your Gemini API Key. |
| **Clone Repository:** `Git Scope: 🔗 0. 원격 저장소 클론 (Required)` | 0 | Clone a remote repository (first time only). |
| **Sync:** `GitScope: 📥 1. 원격 변경 사항 Pull` | 1 | Pull the latest changes from the base branch before starting work. |

---

### 🥈 Stage 2: Creating the Commit Record

| Command Title | Order | Action |
| :--- | :--- | :--- |
| **Code Changes** | - | Make your development changes. |
| **Create Branch:** `Git Scope: 🌳 2. Branch Name Recommendation & Creation` | 2 | Create a feature branch using AI suggestions. |
| **Switch Branch:** `Git Scope: 🔄 3. Branch Switch` | 3 | Checkout your feature branch. |
| **Generate Message:** `Git Scope: 🪶 4. Commit Message 생성` | 4 | AI suggests a commit message and copies it to clipboard. |
| **Commit:** `GitScope: 🚀 5. Commit Changes` | 5 | Commit the changes using the suggested message. |

---

### 🥉 Stage 3: Integration & Sharing

| Command Title | Order | Action |
| :--- | :--- | :--- |
| **Switch Branch:** `Git Scope: 🔄 3. Branch Switch` | 3 | Switch to the target branch for merge. |
| **Sync:** `GitScope: 📥 1. 원격 변경 사항 Pull` | 1 | Pull the latest changes from the target branch. |
| **Merge:** `GitScope: ➡️ 7. Branch Merge 실행` | 7 | Merge your feature branch into the target branch. |
| **Push:** `GitScope: ☁️ 6. 원격 저장소로 Push` | 6 | Push merged changes to the remote repository. |
| **Cleanup:** `GitScope: 🗑️ 8. Local Branch 삭제` | 8 | Delete completed local branches to clean workspace. |

---

## ⚙️ Requirements

* **Visual Studio Code** (Latest stable version)  
* **Gemini API Key** (Required for AI features)

---

## 🔧 Installation & Setup

1. Search for "**GitScope**" in VS Code Extensions Marketplace and click **Install**.  
2. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run:  
   `Git Scope: 🔑 0. Gemini API Key 설정 (Required)`  
3. Enter your Gemini API Key when prompted. It will be securely stored in VS Code's SecretStorage.

---

## 🔒 Security & Billing Notice

* **Secure Storage:** Your Gemini API Key is encrypted and stored safely in VS Code SecretStorage.  
* **Usage Costs:** GitScope uses your personal Gemini API Key for all AI features. You are responsible for any API usage fees. Review Gemini’s pricing policy.