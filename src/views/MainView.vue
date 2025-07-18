<script setup lang="ts">
const teacherIntroduction = `
Hi~ 大家好，我是子千老師！



歡迎聯絡我了解更多課程內容喔 😊
`;

const handleLineClick = () => {
  window.open('https://line.me/ti/p/d9qdqMvPM7', '_blank')
}

const handleMathClick = () => {
  window.open('https://math.sunnytseng.com/', '_blank')
}

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
    });
}

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

    <img 
      src="../assets/sunny.jpg" 
      alt="Teacher Sunny's profile photo" 
      style="
        width: 200px; 
        height: 200px; 
        border-radius: 50%; 
        display: block; 
        margin: 0 auto 20px; 
        object-fit: cover; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        border: 2px solid gray;
        transition: transform 0.3s ease;
      "
      class="profile-image"
    />

    <p class="text-center">{{ teacherIntroduction }}</p>

    <h5>💡 教學理念</h5>
    <ul>
      <li>📌 重視蘇格拉底式問答法（Socratic Method），透過提問引導學生思考與對話</li>
      <li>📌 從理論（奧蘇貝爾 Ausubel：有意義學習）⭢ 範例（班杜拉 Bandura：社會學習理論）⭢ 實作（杜威 Dewey：做中學）</li>
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
            <img src="../assets/.png" alt="Form" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 1: 點選報名</h2>
          <p>填入表單(學生姓名與電話)</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">2</div>
          <div class="code-block">
            <button class="copy-btn">前往</button>
            <img src="../assets/.png" alt="Lesson" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 2: 選取課程</h2>
          <p></p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">3</div>
          <div class="code-block">
            <img src="../assets/.png" alt="Calendar" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 3: 課程時段查詢</h2>
          <p></p>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">3</div>
          <div class="code-block">
            <button @click="handleLineClick" class="copy-btn">前往</button>
            <img src="../assets/LineQRcode.png" alt="LineQRcode" style="max-width: 40%; height: auto; border-radius: 12px; margin-left: 30%; margin-top: 50px">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 3: Line 私訊</h2>
          <p>透過 Line 私訊</p>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">4</div>
          <div class="code-block">
            <button  @click="handleMathClick"  class="copy-btn">前往</button>
            <pre><code class="language-text" style="text-align: center;">https://math.sunnytseng.com/</code></pre>
            <img src="../assets/MathWeb.png" alt="MathWeb" style="max-width: 100%; height: auto; border-radius: 12px;">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 4: 探索我們的教學平台</h2>
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

      <!-- Step Demo -->
    <!--   <div class="step"> -->
    <!--     <div class="code-container"> -->
    <!--       <div class="step-circle">2</div> -->
    <!--       <div class="code-block"> -->
    <!--         <button class="copy-btn">Copy</button> -->
    <!--         <pre><code class="language-python">import requests -->
    <!-- print(f"Error: {response.status_code} - {response.text}")</code></pre> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--     <div class="text-container description"> -->
    <!--       <h2>Step 3: Python 課程查詢範例</h2> -->
    <!--       <p>您可以根據需要調整課程類型和參數以獲取不同課程資訊。</p> -->
    <!--     </div> -->
    <!--   </div> -->


    </div>
  </div>

  <!-- Bulletin Board -->
  <div class="container" id="tutor-announcements">
    <h3>教學公告</h3>
  </div>

  <!-- Summary -->
  <div class="education-summary">
    <h2>👋 更多課程</h2>
    <ul>
      <li><strong>吉他課程</strong> - XXX</li>
      <li><strong>魔術課程</strong> - XXX</li>
    </ul>
  </div>
</template>

