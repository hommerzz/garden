// 加载食谱数据并渲染表格
async function loadRecipes() {
    try {
        const response = await fetch('growagarden-recipes.json');
        const recipes = await response.json();
        renderRecipes(recipes);
        setupSorting();
    } catch (error) {
        console.error('Error loading recipes:', error);
        document.getElementById('recipe-table').innerHTML = 
            '<tr><td colspan="5">Failed to load recipes. Please try again later.</td></tr>';
    }
}

// 渲染食谱表格
function renderRecipes(recipes) {
    const tableBody = document.querySelector('#recipe-table tbody');
    tableBody.innerHTML = '';

    recipes.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.ingredients}</td>
            <td>${recipe.rewards}</td>
            <td>${recipe.rarity}</td>
            <td>${recipe.tips}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 设置表格排序功能
function setupSorting() {
    const table = document.getElementById('recipe-table');
    const headers = table.querySelectorAll('th');
    let sortDirection = 1; // 1 for ascending, -1 for descending

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });

    function sortTable(columnIndex) {
        const tableBody = table.querySelector('tbody');
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aValue = a.cells[columnIndex].textContent;
            const bValue = b.cells[columnIndex].textContent;
            return aValue.localeCompare(bValue) * sortDirection;
        });

        // 清除现有行
        tableBody.innerHTML = '';

        // 添加排序后的行
        rows.forEach(row => tableBody.appendChild(row));

        // 切换排序方向
        sortDirection *= -1;
    }
}

// 加载社区技巧
function loadCommunityTips() {
    const tips = [
        {
            title: "Event Timing",
            content: "Cook during special events for bonus rewards. Chris P. Bacon appears every weekend."
        },
        {
            title: "Rare Ingredients",
            content: "Trade with other players to get rare ingredients faster."
        },
        {
            title: "Daily Quests",
            content: "Complete 3 daily cooking quests for a bonus reward chest."
        },
        {
            title: "Combo Bonus",
            content: "Cook the same recipe 5 times in a row for a 10% bonus."
        }
    ];

    const tipsGrid = document.querySelector('.tips-grid');
    tips.forEach(tip => {
        const card = document.createElement('div');
        card.className = 'tip-card';
        card.innerHTML = `
            <h3>${tip.title}</h3>
            <p>${tip.content}</p>
        `;
        tipsGrid.appendChild(card);
    });
}

// 加载新手指南
function loadGuide() {
    const guideContent = document.querySelector('.guide-content');
    guideContent.innerHTML = `
        <div class="guide-item">
            <h3>Unlocking Chris P. Bacon</h3>
            <p>Complete the first 5 cooking quests to unlock this special NPC who offers premium recipes.</p>
        </div>
        <div class="guide-item">
            <h3>Ingredient Sourcing</h3>
            <p>Grow basic ingredients in your garden. Trade with friends for rare items.</p>
        </div>
        <div class="guide-item">
            <h3>Event Strategies</h3>
            <p>Check the in-game calendar for special cooking events with boosted rewards.</p>
        </div>
    `;
}

// 加载未来功能
function loadFutureFeatures() {
    const futureContent = document.querySelector('.future-content');
    futureContent.innerHTML = `
        <ul>
            <li>Player recipe submissions</li>
            <li>Real-time event tracking</li>
            <li>Video tutorials</li>
            <li>Community leaderboards</li>
        </ul>
    `;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
    loadCommunityTips();
    loadGuide();
    loadFutureFeatures();
});
