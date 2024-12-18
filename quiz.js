// 預設題庫
const quizData = [
    {
        question: "1+1=?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    },
    {
        question: "2+2=?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2
    },
    // 可以繼續添加更多題目...
];

let userAnswers = [];

// 當頁面載入時直接顯示題目
document.addEventListener('DOMContentLoaded', function() {
    displayQuestions();
});

function displayQuestions() {
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';

    quizData.forEach((q, index) => {
        const questionHTML = `
            <div class="question">
                <p><strong>第 ${index + 1} 題：${q.question}</strong></p>
                ${q.options.map((option, i) => `
                    <label class="option-label">
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        questionsDiv.innerHTML += questionHTML;
    });

    // 顯示測驗區域
    document.getElementById('quizSection').style.display = 'block';
}

function submitQuiz() {
    try {
        // 檢查是否有題目
        if (!quizData || quizData.length === 0) {
            alert('沒有題目可以提交！');
            return;
        }

        userAnswers = [];
        let score = 0;
        let answeredQuestions = 0;

        // 收集答案
        quizData.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                answeredQuestions++;
                const userAnswer = parseInt(selected.value);
                userAnswers.push(userAnswer);
                if (userAnswer === q.correctAnswer) {
                    score++;
                }
            } else {
                userAnswers.push(null);
            }
        });

        // 檢查是否有作答
        if (answeredQuestions === 0) {
            alert('請至少回答一題！');
            return;
        }

        // 顯示結果
        displayResults(score, answeredQuestions);
        console.log('測驗提交成功！');

    } catch (error) {
        console.error('提交答案時發生錯誤：', error);
        alert('提交答案時發生錯誤：' + error.message);
    }
}

function displayResults(score, answered) {
    try {
        const totalQuestions = quizData.length;
        const percentage = (score / totalQuestions * 100).toFixed(1);
        
        const scoreDiv = document.getElementById('score');
        const analysisDiv = document.getElementById('analysis');

        // 顯示總分和百分比
        scoreDiv.innerHTML = `
            <div class="percentage-circle">
                ${percentage}%
            </div>
            <div class="score-display">
                <p>總分：${score}/${totalQuestions}</p>
                <p>作答題數：${answered}/${totalQuestions}</p>
            </div>
        `;

        // 顯示每題分析
        let analysisHTML = '<h3>詳細題目分析</h3>';
        quizData.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            
            analysisHTML += `
                <div class="question-analysis">
                    <p><strong>題目 ${index + 1}</strong> 
                        <span class="${isCorrect ? 'correct' : 'incorrect'}">
                            ${isCorrect ? '✅ 正確' : '❌ 錯誤'}
                        </span>
                    </p>
                    <p><strong>題目：</strong>${q.question}</p>
                    ${userAnswer !== null ? 
                        `<p><strong>您的答案：</strong>${q.options[userAnswer]}</p>` : 
                        '<p><strong>您未作答此題</strong></p>'}
                    <p><strong>正確答案：</strong>${q.options[q.correctAnswer]}</p>
                </div>
            `;
        });

        analysisDiv.innerHTML = analysisHTML;

        // 切換顯示區域
        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';

        // 捲動到頁面頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('結果顯示成功！');

    } catch (error) {
        console.error('顯示結果時發生錯誤：', error);
        alert('顯示結果時發生錯誤：' + error.message);
    }
}

// 新增：重新測驗按鈕功能
function resetQuiz() {
    try {
        // 清空答案
        userAnswers = [];
        
        // 重新顯示題目
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'block';
        
        // 清除所有選擇的答案
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);

        // 捲動到頁面頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('重置測驗時發生錯誤：', error);
        alert('重置測驗時發生錯誤：' + error.message);
    }
} 