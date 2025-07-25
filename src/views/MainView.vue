<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToSignup = () => {
  if (import.meta.env.DEV) {
    // 開發環境
    // router.push('/signup')
    window.open(`${import.meta.env.BASE_URL}signup`, '_blank')
  } else {
    // 部署（GitHub Pages）
    window.open(`${import.meta.env.BASE_URL}#/signup`, '_blank')
  }
}

const goToStudentArea = () => {
  if (import.meta.env.DEV) {
    window.open(`${import.meta.env.BASE_URL}student-area`, '_blank')
  } else {
    window.open(`${import.meta.env.BASE_URL}#/student-area`, '_blank')
  }
}

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
    <img 
      id="tutor-logo"
      src="../../public/images/Education.png" 
      alt="Tutor Image" 
      style="margin-top:20px; max-width: 20%; height: auto; display: inline-block; border-radius: 12px"
    />
  </div>

  <!-- Introduction 說明 -->
  <div id="tutor-introduction">
    <h2>簡介</h2>

    <img 
      src="../../public/images/sunny.jpg" 
      alt="Teacher Sunny's profile photo" 
      style="
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
    <div id="anchor-container">
      <!-- <a id="docs" href="/signup" target="_blank">家教報名!(Router無法兼顧線上線下)</a> -->
      <a id="signup" class="me-2" href="#" @click.prevent="goToSignup">家教報名!</a>
      <a id="student-area" href="#" @click.prevent="goToStudentArea">學生專區!</a>
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
            <!-- <img src="../assets/.png" alt="Form" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px"> -->
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
            <button @click="handleLineClick" class="copy-btn">前往</button>
            <img src="../../public/images/LineQRcode.png" alt="LineQRcode" style="max-width: 40%; height: auto; border-radius: 12px; margin-left: 30%; margin-top: 50px">
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 2: 試聽課程</h2>
          <p>可預約試聽</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">3</div>
          <div class="code-block">
            <!-- <img src="../assets/.png" alt="Calendar" style="max-width: 20%; height: auto; display: inline-block; border-radius: 12px"> -->
          </div>
        </div>
        <div class="text-container description">
          <h2>Step 3: 學生專區報名</h2>
          <p>註冊學生帳號以確定上課</p>
        </div>
      </div>

      <!-- Step 4 -->
      <!-- <div class="step"> -->
      <!--   <div class="code-container"> -->
      <!--     <div class="step-circle">3</div> -->
      <!--     <div class="code-block"> -->
      <!---->
      <!--     </div> -->
      <!--   </div> -->
      <!--   <div class="text-container description"> -->
      <!--     <h2>Step 4: Line 私訊</h2> -->
      <!--     <p>透過 Line 私訊</p> -->
      <!--   </div> -->
      <!-- </div> -->

      <!-- Step 4 -->
      <div class="step">
        <div class="code-container">
          <div class="step-circle">4</div>
          <div class="code-block">
            <button  @click="handleMathClick"  class="copy-btn">前往</button>
            <pre><code class="language-text" style="text-align: center;">https://math.sunnytseng.com/</code></pre>
            <img src="../../public/images/MathWeb.png" alt="MathWeb" style="max-width: 100%; height: auto; border-radius: 12px;">
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
    <p class="text-center text-body-secondary">-- 目前目前網站功能還在開發中... --</p>
  </div>

  <!-- Summary -->
  <div class="education-summary">
    <h2>👋 更多課程</h2>
    <ul>
      <li><strong>吉他課程</strong> - 課程規劃中...</li>
      <li><strong>魔術課程</strong> - 課程規劃中...</li>
    </ul>
  </div>
</template>

<style scoped>
/* Logo */
.logo {
    width: 50px;
    position: absolute;
    top: 10px;
    left: 10px;
}

/* Navbar */
.navbar-light .navbar-nav .nav-link {
    color: black;
    margin: 0 3px;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 1px;
}

/* Headings */
h2 {
    color: #29b6f6;
    margin: 5px 0;
}

/* List */
ul {
    list-style: none;
    padding: 0;
}

/* 圖片 */
.profile-image {
    width: 200px;
    height: 200px;
}

/* Slide */
.slide {
    width: 100%;
    height: 100vh;
    position: relative;
}

#slide1 {
    background-image: url('../image/23.jpg');
    background-size: cover;
    background-position: center;
}

#slide2 {
    position: relative;
}

#slide2::before {
    content: "";
    background-image: url('../image/curry.png');
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: -1;
}

/* 導覽按鈕 */
.nav2 {
    position: absolute;
    top: 9px;
    right: 20px;
}

.upper {
    padding-top: 110px;
}

.upper h2 {
    font-size: 41px;
    margin-bottom: 0;
}

.upper p,
.upper p a {
    font-size: 14px;
    color: black;
}

.lower {
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
}

.lower .btn1,
.lower .btn2 {
    padding: 10px 40px;
    border-radius: 30px;
    font-size: 12px;
    width: 250px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    margin: 0 8px;
}

.lower .btn1 {
    background: #171a20;
    color: white;
}

.lower .btn2 {
    background: rgba(255, 255, 255, 0.5);
    color: black;
}

.lower .arrow {
    margin-top: 15px;
    display: inline-block;
}

/* 按鈕 */
button,
pre button {
    background-color: #4CAF50;
    color: white;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
}

button {
    padding: 12px 24px;
}

pre button {
    padding: 6px 12px;
    font-size: 12px;
    position: absolute;
    top: 10px;
    right: 10px;
}

/* Code Block Copy Button */
.copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background-color: #29b6f6;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    display: none;
}

.copy-btn:hover {
    background-color: #1e88e5;
    animation: shake 500ms;
}

.code-block:hover .copy-btn {
    display: block;
}

.code-block pre {
    margin: 0;
    background: transparent;
}

.code-block code {
    background: transparent;
    padding: 0;
    color: inherit;
}

/* Flowchart Container */
.flowchart-container {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

/* Flowchart */
.flowchart {
    background-color: #142b3a;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
}

.step {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px 0;
    width: 100%;
    position: relative;
}

.step-circle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background-color: #29b6f6;
    color: #0e2a38;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2em;
    z-index: 2;
}

.dotted-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: repeating-linear-gradient(
        to bottom,
        #29b6f6,
        #29b6f6 5px,
        transparent 5px,
        transparent 10px
    );
    height: 100%;
    z-index: 1;
}

.code-container,
.text-container {
    width: 45%;
    padding: 20px;
}

/* Animation Elements */
.code-block,
.text-container.description,
.education-summary {
    opacity: 0;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

/* Code Block Animations (Slide in from right) */
.code-block {
    transform: translateX(20%);
}

.code-block.in-view {
    transform: translateX(0);
    opacity: 1;
}

/* Text Container Animations (Slide in from left) */
.text-container.description {
    transform: translateX(-20%);
}

.text-container.description.in-view {
    transform: translateX(0);
    opacity: 1;
}

/* Centering and Animation for Education Summary */
.education-summary {
    margin: 40px auto;
    max-width: 800px;
    text-align: center;
    transform: scale(0.5);
    transform-origin: center;
    opacity: 0;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.education-summary.in-view {
    transform: scale(1);
    opacity: 1;
}

.code-block code {
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #ccc;  
}

code {
    color: inherit;
    display: block;
    white-space: pre-wrap;
    padding: 10px 0;
    font-family: Consolas, "Courier New", monospace;
    word-wrap: break-word;
} 

/* 教師介紹區塊 */
#tutor-introduction {
    padding: 25px;
    background-color: #7eaddb;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 30px auto;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#tutor-introduction:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

#tutor-introduction h2 {
    font-size: 2rem;
    color: #1976d2;
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    border-bottom: 2px solid #1976d2;
    padding-bottom: 10px;
    letter-spacing: 1px;
    opacity: 0;
    animation: slideInFromLeft 1s ease-out forwards;
    animation-delay: 0.2s;
    position: relative;
}

#tutor-introduction p {
    font-size: 1rem;
    color: #444444;
    line-height: 1.8;
    margin-bottom: 15px;
    text-align: justify;
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: 0.4s;
}

#tutor-introduction p:nth-of-type(2) { animation-delay: 0.6s; }
#tutor-introduction p:nth-of-type(3) { animation-delay: 0.8s; }

#tutor-introduction ul {
    padding-left: 20px;
    margin: 15px 0;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
    animation-delay: 1s;
}

#tutor-introduction ul li {
    font-size: 1rem;
    line-height: 1.6;
    padding: 5px 0 5px 20px;
    position: relative;
    opacity: 0;
    transform: translateX(-20px);
    animation: bounceIn 0.5s ease-out forwards;
}

#tutor-introduction ul li:nth-child(1) { animation-delay: 1.2s; }
#tutor-introduction ul li:nth-child(2) { animation-delay: 1.4s; }
#tutor-introduction ul li:nth-child(3) { animation-delay: 1.6s; }

#tutor-introduction code {
    background-color: #e0f7fa;
    color: #d6336c;
    padding: 3px 5px;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

#tutor-introduction code:hover {
    background-color: #1195a7;
    transform: scale(1.05);
}

/* 教師公告 */
#tutor-announcements {
    margin-top: 30px;
    background-color: #c8e2f7;
    padding: 30px;
    border-radius: 8px;
}

#tutor-announcements h3 {
    text-align: center;
    font-weight: bold;
    color: #1976d2;
}

#tutor-announcements label {
    color: #e43c36;
}

#tutor-announcements hr {
    color: black;
}

/* Anchor Buttons */
#anchor-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

#signup, #student-area {
    position: relative;
    display: inline-block;
    text-align: center;
    padding: 10px 20px;
    font-size: 16px;
    text-decoration: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

#signup {
    background-color: #007bff;
}

#signup:hover {
    background-color: #0056b3;
    animation: shake2 500ms;
}

#student-area {
    background-color: #4CAF50;
}

#student-area:hover {
    background-color: #388E3C;
    animation: shake2 500ms;
}

#signup::after,
#student-area::after {
    content: '★';
    position: absolute;
    top: -10px;
    left: 75%;
    transform: translateX(-50%) scale(0.5) rotate(0deg);
    font-size: 30px;
    color: gold;
    opacity: 0;
    pointer-events: none;
    font-family: Arial, sans-serif;
}

#signup:hover::after,
#student-area:hover::after {
    animation: star-animation 500ms ease-in-out forwards;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .profile-image {
        width: 100px;
        height: 100px;
    }

    .flowchart {
        flex-direction: column;
        align-items: flex-end;
    }

    .code-container,
    .text-container {
        width: 100%;
    }

    .step {
        flex-direction: column;
        align-items: flex-start;
    }

    .dotted-line {
        left: 0%;
        transform: none;
    }

    #tutor-introduction,
    .education-summary ul li,
    #tutor-introduction ul li {
        font-size: 0.85rem !important;
        line-height: 1.4;
        margin: 0px;
        padding: 3px;
    }

    #tutor-introduction {
        padding: 20px;
        width: 90%;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}

@media (max-width: 480px) {
    #tutor-introduction {
        width: 95%;
        padding: 15px;
        margin: 15px auto;
    }
}

@media only screen and (max-width: 990px) {
    .logo {
        width: 100px;
        top: 20px;
        right: 20px;
        left: auto;
    }

    .navbar {
        background: white;
    }

    .nav2 {
        position: relative;
        right: auto;
        top: 0;
    }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
    #tutor-announcements {
        max-width: 90%;
    }
    #tutor-logo {
      max-width: 10% !important;
    }
}

@media screen and (min-width: 1200px) {
    #tutor-announcements {
        max-width: 50%;
    }
    #tutor-logo {
      max-width: 10% !important;
    }
}

/* 動畫效果 */
@keyframes fadeIn {
    from {
        transform: translateY(7px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-7%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes bounceIn {
    0% {
        transform: translateX(-10px);
        opacity: 0;
    }
    60% {
        transform: translateX(2px);
        opacity: 1;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes shake {
    0% { rotate: 0deg; }
    30% { rotate: 17deg; }
    60% { rotate: -17deg; }
    100% { rotate: 0deg; }
}

@keyframes shake2 {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}

@keyframes star-animation {
    0% {
        opacity: 0;
        transform: scale(0.5) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.2) rotate(20deg);
    }
    100% {
        opacity: 0;
        transform: scale(0.5) rotate(40deg);
    }
}
</style>
