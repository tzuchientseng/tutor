<script setup lang="ts">
const teacherIntroduction = `
Hi~ 大家好，我是子千老師！



歡迎聯絡我了解更多課程內容喔 😊
`;

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
    );
}

function handleScroll() {
    const elements = document.querySelectorAll('.code-block, .text-container.description, .education-summary');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('in-view');
        } else {
            el.classList.remove('in-view');
        }
j   });
j

document.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const codeBlock = button.nextElementSibling;
        const range = document.createRange();
        range.selectNodeContents(codeBlock);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            button.textContent = 'Copied';
            setTimeout(() => {
                button.textContent = 'Copy Code';
            }, 1500);
        } catch (err) {
            console.error('Unable to copy', err);
        }

        selection.removeAllRanges();
    });
});
</script>

<template>
  <!-- Icon -->
  <div style="text-align: center;">
    <img src="../assets/Education.png" alt="Tutor Image" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px">
  </div>

  <!-- Introduction 說明 -->
  <div id="tutor-introduction">
    <h2>簡介</h2>
    <p>{{ teacherIntroduction }}</p>

    <h5>💡 教學理念</h5>
    <ul>
      <li>重視蘇格拉底式問答法（Socratic Method），透過提問引導學生思考與對話</li>
      <li>從理論（奧蘇貝爾 Ausubel：有意義學習）⭢ 範例（班杜拉 Bandura：社會學習理論）⭢ 實作（杜威 Dewey：做中學）</li>
      <li></li>
    </ul>
    <div id="container">
      <a id="docs" href="https://tutor.sunnytseng.com/register" target="_blank">家教報名!</a>
    </div>
  </div>

  <!-- Flowchart -->
  <div class="flowchart-container">
    <div class="flowchart">
      <div class="dotted-line"></div>

      <!-- Step 1 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">1</div>
          <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-text" style="text-align: center;">https://math.sunnytseng.com/</code></pre>
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 1: 探索我們的教學平台</h2>
          <p>訪問我們的網站，了解各種課程和教學資源。</p>
          <ul>
            <li style="font-size: 12px; color: rgb(226, 151, 12);"><strong>更多連接:</strong></li>
            <li style="color: rgb(241, 238, 230); text-align: center;">
              <strong>Math</strong> - 登入帳密
              <br />
              <code style="color: #d6336c; background-color: #2e2e2e; padding: 1px 3px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.85rem; display: inline-block; white-space: pre-wrap; word-break: break-word;">{帳號: guest; 密碼: guest}</code>
            </li>
          </ul>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">2</div>
          <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-bash">curl -X POST -H "Content-Type: application/json" -d "{\"subject\": \"Algebra\", \"level\": \"Grade 9\"}" https://tutor.sunnytseng.com/math</code></pre>
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 2: 使用 Curl 測試課程查詢</h2>
          <p>您可以使用 curl 命令來查詢課程詳情。例如，查詢數學課程如下：</p>
          <p>確保使用正確的 HTTP 方法和標頭以與平台正常通信。</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">3</div>
          <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-python">import requests
import json

url = "https://tutor.sunnytseng.com/math"
payload = {
    "subject": "Algebra",
    "level": "Grade 9"
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(payload), headers=headers)
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")</code></pre>
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 3: Python 課程查詢範例</h2>
          <p>以下是如何使用 Python 的 requests 模組查詢課程的範例：</p>
          <p>您可以根據需要調整課程類型和參數以獲取不同課程資訊。</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Bulletin Board -->
  <div class="container" id="tutor-announcements">
    <h3>教學公告</h3>
  </div>

  <!-- Summary -->
  <div class="education-summary">
    <h2>更多課程</h2>
    <ul>
      <li><strong>吉他課程</strong> - XXX</li>
      <li><strong>魔術課程</strong> - XXX</li>
    </ul>
  </div>
</template>

