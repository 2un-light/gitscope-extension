import { COMMAND_MAP, MESSAGE_DISPLAY_TIME, getFlowSteps, getNoopMessages, getUIStrings } from './constants.js';

const t = window.I18N_DATA;

const FLOW_STEPS = getFlowSteps(t);
const UI_STRINGS = getUIStrings(t);
const NOOP_MESSAGES = getNoopMessages(t);

// --- 전역 변수 초기화 ---
let currentFlow = 'common';
const vscode = typeof acquireVsCodeApi !== 'undefined' ? acquireVsCodeApi() : {
    postMessage: (message) => console.log('VS Code postMessage:', message)
};

//클릭된 버튼들의 상태 저장
let clickedButtons = new Set();

window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.type) {
        case 'commandSuccess':
            // 명령어 성공 시 해당 버튼을 완료 상태로 변경
            markButtonAsCompleted(message.buttonId);
            break;
        case 'commandError':
            // 명령어 실패 시 에러 메시지 표시
            showMessage(message.error || 'Failed to execute the command.', 'error');
            break;
                
    }
});

// 버튼을 완료 상태로 마킹하는 함수
function markButtonAsCompleted(buttonId) {
    // 현재 Flow에서 해당 commandId를 가진 버튼 찾기
    const button = document.querySelector(`[data-button-id="${buttonId}"]`);
    


    if (button && !button.classList.contains('command-button-noop')) {
        button.classList.add('clicked');

        clickedButtons.add(buttonId);
        
        // 액션 텍스트를 "완료"로 변경
        const actionText = button.querySelector('.action-text');
        if (actionText) {
            actionText.textContent = UI_STRINGS.ACTION_COMPLETED;
        }
    }


    // 상태 저장
    const currentState = vscode.getState() || {};
    vscode.setState({
        ...currentState,
        clickedButtons: Array.from(clickedButtons)
    });

}

// ## DOM 헬퍼 함수 (Utility Functions)

/**
 * HTML 요소와 클래스 배열을 받아 요소를 생성하는 헬퍼 함수
 * @param {string} tagName 생성할 HTML 태그 이름
 * @param {string[]} classes 추가할 CSS 클래스 배열
 * @returns {HTMLElement} 생성된 요소
 */
function createEl(tagName, classes = []) {
    const el = document.createElement(tagName);
    if (classes.length > 0) {
        el.classList.add(...classes);
    }
    return el;
}

/**
 * 사용자에게 메시지 표시
 */
function showMessage(message, type = 'info') {
    const messageArea = document.getElementById('message-area');
    clearTimeout(messageArea.dataset.timer);

    messageArea.textContent = message;
    
    messageArea.className = 'message-area'; 
    if (type === 'error') {
        messageArea.classList.add('message-area-error');
    } else if (type === 'success') {
        messageArea.classList.add('message-area-success');
    } else {
        messageArea.classList.add('message-area-info');
    }

    messageArea.classList.remove('hidden');

    messageArea.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
    
    const timer = setTimeout(() => {
        messageArea.classList.add('hidden');
    }, MESSAGE_DISPLAY_TIME);

    messageArea.dataset.timer = timer;
}

/**
 * 현재 DOM에 열려 있는 아코디언의 제목을 배열로 반환
 */
function getAccordionStates() {
    const openedTitles = [];
    const suffix = UI_STRINGS.ACCORDION_SUMMARY_SUFFIX.trim(); 
    
    document.querySelectorAll('#flow-content details.accordion-details[open]').forEach(detailsEl => {
        const summary = detailsEl.querySelector('.accordion-summary');
        if(summary) {
            const titleText = summary.textContent.split(suffix)[0].trim();
            openedTitles.push(titleText);
        }
    });
    return openedTitles;
}

function applyAccordionStates(savedStates) {
    const suffix = UI_STRINGS.ACCORDION_SUMMARY_SUFFIX.trim();

    document.querySelectorAll('#flow-content details.accordion-details').forEach(detailsEl => {
        const summary = detailsEl.querySelector('.accordion-summary');
        if(summary) {
            const titleText = summary.textContent.split(suffix)[0].trim();
            if(savedStates.includes(titleText)) {
                detailsEl.setAttribute('open', true);
            }
        }
    });
}

//클릭된 버튼 상태 복원 함수
function applyClickedButtonStates(clickedButtonsArray) {
    clickedButtonsArray.forEach(buttonId => {
        const button = document.querySelector(`[data-button-id="${buttonId}"]`);
        if (button && !button.classList.contains('command-button-noop')) {
            button.classList.add('clicked');

            const actionText = button.querySelector('.action-text');
            if (actionText) {
                actionText.textContent = UI_STRINGS.ACTION_COMPLETED;
            }
        }
    });
}

// ## 컴포넌트 생성 함수 (Component Rendering)


/**
 * 플로우별 태그(Tags) 섹션을 생성하고 반환
 */
function createTagsSection(tags) {
    const tagsContainer = createEl('div', ['tags-container']);

    tags.forEach(tag => {
        const tagSpan = createEl('span', ['tag-item']);
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
    });
    return tagsContainer;
}

/**
 * 플로우별 주요 브랜치(Branches) 섹션을 생성하고 반환
 */
function createBranchesSection(branches) {
    const details = createEl('details', ['branch-details']);

    const summary = createEl('summary', ['branch-summary']);
    
    const titleSpan = createEl('span');
    titleSpan.textContent = UI_STRINGS.BRANCH_SUMMARY_TITLE;

    const suffixSpan = createEl('span', ['text-sm', 'text-gray-400', 'ml-2']);
    suffixSpan.textContent = UI_STRINGS.BRANCH_SUMMARY_SUFFIX;

    summary.appendChild(titleSpan);
    summary.appendChild(suffixSpan);

    details.appendChild(summary);

    const branchList = createEl('ul', ['branch-list']);

    branches.forEach(branch => {
        const listItem = createEl('li', ['branch-list-item']);
        listItem.innerHTML = `
            <span class="font-bold text-gray-200">${branch.name}</span>: 
            <span class="text-gray-400 text-sm">${branch.description}</span>
        `;
        branchList.appendChild(listItem);
    });

    details.appendChild(branchList);
    return details;
}

/**
 * 단일 명령어 버튼 요소를 생성하고 반환
 */
function createCommandButton(step, stepIndex) {
    const isNoop = step.cmd === "noop";
    const button = createEl('button', ['command-button']);
    button.setAttribute('data-cmd', step.cmd);

    const buttonId = `${currentFlow}-step-${stepIndex}`;
    button.setAttribute('data-button-id', buttonId);

    const arrowSpan = createEl('span', ['action-text']);
    arrowSpan.textContent = isNoop ? `${UI_STRINGS.ACTION_NOOP}` : `${UI_STRINGS.ACTION_RUN}`;

    button.onclick = (event) => {
        executeCommand(step.cmd, buttonId, event);
    };

    const labelContainer = createEl('div', ['flex', 'items-center', 'space-x-4']);

    const iconSpan = createEl('span', ['step-number']);
    iconSpan.textContent = step.icon || '▶️';

    const textSpan = createEl('span', ['font-medium', 'text-base', 'step-label-text']); 
    textSpan.textContent = step.label;

    labelContainer.appendChild(iconSpan);
    labelContainer.appendChild(textSpan);

    
    if(isNoop) {
        button.classList.add('command-button-noop');
        arrowSpan.classList.add('action-text-noop');
    }

    button.appendChild(labelContainer);
    button.appendChild(arrowSpan);

    return button;
}

/**
 * 아코디언 섹션을 생성하고 반환
 */
function createAccordionSection(title, steps, startIndex) {
    const details = createEl('details', ['accordion-details']);

    details.addEventListener('toggle', () => {
        const accordionStates = getAccordionStates();
        const currentState = vscode.getState() || {};

        vscode.setState({
            ...currentState,
            accordionStates: accordionStates
        })
    })

    const summary = createEl('summary', ['accordion-summary']);
    
    const titleSpan = createEl('span');
    titleSpan.textContent = title;

    const suffixSpan = createEl('span', ['text-sm', 'text-gray-400', 'ml-2']);
    suffixSpan.textContent = UI_STRINGS.ACCORDION_SUMMARY_SUFFIX;

    summary.appendChild(titleSpan);
    summary.appendChild(suffixSpan);

    details.appendChild(summary);

    const stepsContainer = createEl('div', ['accordion-steps-container']);

    steps.forEach((step, index) => {
        stepsContainer.appendChild(createCommandButton(step, startIndex + index));
    });

    details.appendChild(stepsContainer);
    return details;
}


// ## 비즈니스 로직 및 이벤트 핸들러 (Core Logic)

/**
 * VS Code 확장 기능으로 명령을 전송
 */
function executeCommand(commandId, buttonId, event) {
    if (commandId === "noop") {
        const buttonElement = event.currentTarget;
        const label = buttonElement.querySelector('.step-label-text').textContent.trim(); 

        let customMessage = NOOP_MESSAGES.DEFAULT;

        for (const key in NOOP_MESSAGES) {
            if (key === "DEFAULT") continue;
            
            if (label.includes(key)) {
                customMessage = NOOP_MESSAGES[key];
                break;
            }
        }

        showMessage(customMessage, 'info');
        return;
    }

    const command = COMMAND_MAP[commandId];
    if (!command) {
        showMessage(`Error: Unknown command ID ${commandId}`, 'error');
        return;
    }

    vscode.postMessage({
        command: command,
        buttonId: buttonId,
    });
}

/**
 * 선택된 Git Flow 전략에 맞게 UI를 업데이트
 * @param {string} flowKey 선택된 전략의 키
 */
export function selectFlow(flowKey) {

    const messageArea = document.getElementById('message-area');
    clearTimeout(messageArea.dataset.timer); // 현재 숨겨질 때까지 대기하는 타이머 취소
    messageArea.classList.add('hidden');
    
    const accordionStates = getAccordionStates();

    if (currentFlow !== flowKey) {
        clickedButtons.clear();
    }
    
    vscode.setState({ 
        currentFlow: flowKey, 
        accordionStates: accordionStates,
        clickedButtons: Array.from(clickedButtons) // ✅ [추가] 클릭 상태 저장
    });

    currentFlow = flowKey;
    
    const flowData = FLOW_STEPS[flowKey];
    const contentArea = document.getElementById('flow-content');
    contentArea.innerHTML = ''; 

    // 1. 탭 버튼 스타일 업데이트 (새로운 CSS 클래스 사용)
    document.querySelectorAll('.tab-button').forEach(btn => {
        if (btn.dataset.flow === flowKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Title 및 Description 생성
    const flowTitle = createEl('h2', ['flow-title']); 
    flowTitle.textContent = flowData.title;
    contentArea.appendChild(flowTitle);

    const flowDescription = createEl('p', ['flow-description']);
    flowDescription.textContent = flowData.description;
    contentArea.appendChild(flowDescription);

    // 3. 태그 섹션 생성
    if (flowData.tags && flowData.tags.length > 0) {
        contentArea.appendChild(createTagsSection(flowData.tags));
    }

    // 4. 브랜치 설명 섹션 및 구분선 생성
    if (flowData.branches && flowData.branches.length > 0 && flowKey !== 'common') {
        contentArea.appendChild(createBranchesSection(flowData.branches));

        const separator = createEl('div', ['flow-separator']);
        contentArea.appendChild(separator);
    }


    // 5. 명령어 목록 생성 (아코디언 또는 단순 목록)
    let globalStepIndex = 0;
    flowData.steps.forEach(step => {
        if (step.isAccordion) {
            contentArea.appendChild(createAccordionSection(step.accordionTitle, step.accordionSteps, globalStepIndex));
            globalStepIndex += step.accordionSteps.length;
        } else {
            contentArea.appendChild(createCommandButton(step, globalStepIndex));
            globalStepIndex++;
        }
    });

    applyClickedButtonStates(Array.from(clickedButtons));

}


/**
 * 초기화 함수: 이벤트 리스너 등록 및 초기 플로우 선택
 */
function init() {
    // 탭 버튼에 이벤트 리스너 등록
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => selectFlow(btn.dataset.flow));
    });

    const state = vscode.getState();
    const savedFlow = state ? state.currentFlow : null;
    const savedAccordionStates = state ? state.accordionStates : [];
    const savedClickedButtons = state ? state.clickedButtons : [];

    if (savedClickedButtons && savedClickedButtons.length > 0) {
        clickedButtons = new Set(savedClickedButtons);
    }

    // 초기 로드 시 'common' flow를 선택
    selectFlow(savedFlow || 'common');

    // DOM이 생성된 후, 저장된 아코디언 상태 적용
    if (savedAccordionStates && savedAccordionStates.length > 0 && savedFlow === currentFlow) {
        applyAccordionStates(savedAccordionStates);
    }

    if (savedClickedButtons && savedClickedButtons.length > 0) {
        applyClickedButtonStates(savedClickedButtons);
    }
}

// 초기화 함수 실행
document.addEventListener("DOMContentLoaded", () => {
  init();
});
