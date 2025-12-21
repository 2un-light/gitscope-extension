# 🚀 GitScope — AI-Powered Git Workflow for VS Code  
Your Git process, simplified and accelerated by AI.

**GitScope** is an AI-powered Git extension designed to make Git operations faster, safer, and smarter within VS Code.  
Leveraging Gemini AI, it supports **branch name recommendations**, **commit message generation**, and **simplified Git command execution**.

---

# ✨ Key Features

## 🧠 1. AI-Based Git Automation  
GitScope provides AI tools to analyze changed files and create clean Git history.

### • 🌳 AI Branch Name Recommendation  
- **Automatic branch name suggestions** based on your work  
- Maintains consistent naming patterns following Git conventions
<img src="./images/demo_recommand_branch.gif" alt="AI Branch Name Recommendation Demo" width="1000" />

### • 🪶 AI Commit Message Generator  
- Analyzes staged files to **automatically generate optimal commit messages**  
- Generated messages are automatically copied to clipboard  
- Enables "clean commits in one go" without unnecessary descriptions  
<img src="./images/demo_recommand_commitmessage.gif" alt="AI Commit Message Recommendation Demo" width="1000" />

---

## 🔄 2. Simple and Intuitive Git Commands  
GitScope transforms complex Git commands into easy-to-use VS Code Command Palette commands.

| GitScope Command | Git Command | Description |
|-----------------|-------------|-------------|
| **🧭 Open GitScope Navigator** | - | Workflow UI by branch strategy |
| **🔭 GitScope User Guide** | - | Quick start guide and welcome message |
| **🤖 Select Gemini Model** | - | Choose AI model for recommendations |
| **🔑 Configure Gemini API Key** | - | Set up API key for AI features |
| **🔗 Clone Remote Repository** | `git clone` | Clone remote repository |
| **📥 Pull Changes** | `git pull` | Fetch latest changes |
| **🌳 Recommend and Create Branch** | `git branch` | AI-powered branch creation |
| **🔄 Switch Branch** | `git checkout` | Switch branch |
| **➕ Stage All Changes** | `git add .` | Stage all changes |
| **🪶 Generate Commit Message** | - | AI commit message generation |
| **🚀 Commit Changes** | `git commit` | Commit changes |
| **➡️ Merge Branch** | `git merge` | Merge branch |
| **☁️ Push to Remote** | `git push` | Push changes |
| **🗑️ Delete Local Branch** | `git branch -d` | Delete local branch |
| **🏷️ Create Tag and Push** | `git tag` + `git push` | Create version tag and push |

---

# 🧭 GitScope Basic Workflow (3-Step Git Flow)

GitScope provides a **3-Step Git Flow** to help beginners use Git safely.

---

## 🥇 Step 1 — Setup

| Order | Command | Description |
|-------|---------|-------------|
| 1 | **🔭 GitScope User Guide** | View welcome message and quick start guide |
| 2 | **🔑 Configure Gemini API Key (Required)** | Register API Key to activate AI features |
| 3 | **🤖 Select Gemini Model** | Choose AI model (optional, default model provided) |
| 4 | **🔗 Clone Remote Repository (Required)** | Initial project clone |
| 5 | **📥 Pull Remote Changes** | Sync latest code before starting work |

---

## 🥈 Step 2 — Development & Commit

| Order | Command | Description |
|-------|---------|-------------|
| 1 | Code Modification | Perform regular development work |
| 2 | **🌳 Recommend and Create Branch** | Create feature branch with AI |
| 3 | **🔄 Switch Branch** | Checkout to created branch |
| 4 | **➕ Stage All Changes** | Stage all modified files |
| 5 | **🪶 Generate Commit Message** | Generate AI commit message based on changed files |
| 6 | **🚀 Commit Changes** | Execute commit with applied message |

---

## 🥉 Step 3 — Integration

| Order | Command | Description |
|-------|---------|-------------|
| 1 | **🔄 Switch Branch** | Move to target branch for merge |
| 2 | **📥 Pull** | Update to prevent merge conflicts |
| 3 | **➡️ Merge Branch** | Merge work branch into target branch |
| 4 | **☁️ Push to Remote** | Push merged content to remote repository |
| 5 | **🗑️ Delete Local Branch** | Clean up finished work branch |
| 6 | **🏷️ Create Tag and Push** | Create version tag (optional, for releases) |

---

## 🧭 GitScope Navigator
Complex Git branching strategies made simple with button clicks!
GitScope Navigator provides **4 branching strategies** through a visual UI, tailored to your project scale and team size.

## Supported Branching Strategies
- **Single-Branch** — Solo development
- **GitHub-Flow** — 2-5 developers, simple
- **GitLab-Flow** — 5-20 developers, intuitive, test branches
- **Git-Flow** — Large scale, multiple version management

## How to Use
1. Command Palette → `GitScope: 🧭 Open GitScope Navigator`
2. Select a branching strategy that fits your project
3. Execute Git commands using provided buttons

Each strategy provides Git commands as **step-by-step buttons**, making it easy for beginners to follow.

---

# ⚙️ Installation and Setup

### 1. Install GitScope  
Search for **"GitScope"** in VS Code Extensions Marketplace and install.

### 2. View User Guide (Recommended)
Command Palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on Mac) →  
Run `🔭 GitScope User Guide` to see welcome message and quick start instructions.

### 3. Configure AI Key  
Command Palette →  
Run `🔑 Configure Gemini API Key (Required)` and register your key.

### 4. Select AI Model (Optional)
Command Palette →  
Run `🤖 Select Gemini Model` to choose your preferred AI model.  
(Default model is already set if skipped)

### 5. Change Language (Optional)
Press `Ctrl + ,` (or `Cmd + ,` on Mac) to open Settings →  
Search for **"gitscope"** →  
Select your preferred language (Korean/English) from the **Language** dropdown.

### 6. Get Started  
Search for **"GitScope"** in Command Palette to see all available commands.

---

# 🔒 Security and Cost Information

- API Keys are securely encrypted and stored in **VS Code SecretStorage**.  
- All AI requests are made using your **Gemini API Key**, and costs are borne by you.  
- GitScope does not transmit API Keys to external servers.

---

# 📘 GitScope Official Documentation  
For more detailed guides and examples, check out our official manual:

👉 **GitScope Extension Official Manual**  
https://sparkling-0902.notion.site/GitScope-Extension-Official-Manual-2cf6a40f9fff8147ac2be5308379e5ee?source=copy_link