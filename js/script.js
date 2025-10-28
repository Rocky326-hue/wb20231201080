// 百度贴吧 - 统一JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端导航菜单
    initMobileMenu();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化页面交互
    initPageInteractions();
    
    // 初始化滚动效果
    initScrollEffects();
});

// 移动端菜单功能
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // 点击菜单链接后关闭菜单
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// 搜索功能
function initSearch() {
    const searchForm = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // 跳转到搜索页面
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

// 页面交互功能
function initPageInteractions() {
    // 贴吧项目点击事件
    const tiebaItems = document.querySelectorAll('.tieba-item');
    tiebaItems.forEach(item => {
        item.addEventListener('click', function() {
            const tiebaName = this.querySelector('.tieba-name').textContent;
            window.location.href = `tieba-detail.html?name=${encodeURIComponent(tiebaName)}`;
        });
    });
    
    // 帖子项目点击事件
    const postItems = document.querySelectorAll('.post-item');
    postItems.forEach(item => {
        item.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id') || '1';
            window.location.href = `post-detail.html?id=${postId}`;
        });
    });
    
    // 按钮悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 滚动效果
function initScrollEffects() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
            
            // 隐藏/显示导航栏
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        }
    });
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.card, .tieba-item, .post-item');
    animatedElements.forEach(el => observer.observe(el));
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 本地存储工具
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available');
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Local storage not available');
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Local storage not available');
        }
    }
};

// 页面特定功能
function initHomePage() {
    // 首页特定功能
    console.log('首页初始化完成');
}

function initTiebaDetailPage() {
    // 贴吧详情页特定功能
    console.log('贴吧详情页初始化完成');
}

function initPostDetailPage() {
    if (!document.querySelector('.post-detail')) return;
    
    // 点赞功能
    const likeBtn = document.querySelector('.post-actions .btn-primary');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const currentText = this.textContent;
            const match = currentText.match(/(\d+)/);
            if (match) {
                const currentLikes = parseInt(match[1]);
                const newLikes = currentLikes + 1;
                this.textContent = `点赞(${newLikes.toLocaleString()})`;
                showToast('点赞成功');
            }
        });
    }
    
    // 收藏功能
    const collectBtn = document.querySelector('.post-actions .btn-secondary:nth-child(2)');
    if (collectBtn) {
        collectBtn.addEventListener('click', function() {
            const isCollected = this.textContent.includes('取消');
            this.textContent = isCollected ? '收藏' : '取消收藏';
            showToast(isCollected ? '已取消收藏' : '收藏成功');
        });
    }
    
    // 分享功能
    const shareBtn = document.querySelector('.post-actions .btn-secondary:nth-child(3)');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            showToast('分享功能开发中...');
        });
    }
    
    // 评论排序
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            sortComments(sortType);
            showToast(`已按${sortType === 'time' ? '时间' : '热度'}排序`);
        });
    }
    
    // 发表评论
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        const commentInput = commentForm.querySelector('.comment-input');
        const submitBtn = commentForm.querySelector('.btn-primary');
        
        submitBtn.addEventListener('click', function() {
            const content = commentInput.value.trim();
            if (content) {
                addNewComment(content);
                commentInput.value = '';
                showToast('评论发表成功');
            } else {
                showToast('请输入评论内容');
            }
        });
        
        // 回车发表评论
        commentInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                submitBtn.click();
            }
        });
    }
    
    // 评论工具
    const commentTools = document.querySelectorAll('.tool');
    commentTools.forEach(tool => {
        tool.addEventListener('click', function() {
            const toolType = this.textContent;
            showToast(`${toolType}功能开发中...`);
        });
    });
    
    // 评论点赞
    document.addEventListener('click', function(e) {
        if (e.target.matches('.like-btn')) {
            const commentItem = e.target.closest('.comment-item');
            if (commentItem) {
                likeComment(commentItem, e.target);
            }
        }
        
        // 回复功能
        if (e.target.matches('.reply-btn')) {
            const commentItem = e.target.closest('.comment-item');
            if (commentItem) {
                showReplyForm(commentItem);
            }
        }
        
        // 分享评论
        if (e.target.matches('.share-btn')) {
            showToast('评论分享功能开发中...');
        }
    });
}

// 排序评论
function sortComments(sortType) {
    const commentsList = document.querySelector('.comments-list');
    const comments = Array.from(commentsList.querySelectorAll('.comment-item'));
    
    comments.sort((a, b) => {
        if (sortType === 'hot') {
            const aLikes = parseInt(a.querySelector('.comment-likes')?.textContent.match(/(\d+)/)?.[1] || 0);
            const bLikes = parseInt(b.querySelector('.comment-likes')?.textContent.match(/(\d+)/)?.[1] || 0);
            return bLikes - aLikes;
        } else {
            // 按时间排序（这里简单实现，实际应该根据时间戳）
            return 0;
        }
    });
    
    // 重新排列评论
    comments.forEach(comment => commentsList.appendChild(comment));
}

// 添加新评论
function addNewComment(content) {
    const commentsList = document.querySelector('.comments-list');
    const commentCount = document.querySelector('.comments-header h3');
    
    // 更新评论数量
    const currentCount = parseInt(commentCount.textContent.match(/(\d+)/)?.[1] || 0);
    commentCount.textContent = `评论 (${currentCount + 1})`;
    
    // 创建新评论
    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="https://via.placeholder.com/40x40" alt="用户头像">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">当前用户</span>
                <span class="comment-time">刚刚</span>
                <span class="comment-likes">👍 0</span>
            </div>
            <div class="comment-text">${content}</div>
            <div class="comment-actions">
                <button class="like-btn">点赞</button>
                <button class="reply-btn">回复</button>
                <button class="share-btn">分享</button>
            </div>
        </div>
    `;
    
    // 插入到评论列表顶部
    commentsList.insertBefore(newComment, commentsList.firstChild);
}

// 点赞评论
function likeComment(commentItem, likeBtn) {
    const likesSpan = commentItem.querySelector('.comment-likes');
    const currentLikes = parseInt(likesSpan.textContent.match(/(\d+)/)?.[1] || 0);
    const newLikes = currentLikes + 1;
    likesSpan.textContent = `👍 ${newLikes}`;
    
    // 添加动画效果
    likeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 200);
    
    showToast('点赞成功');
}

// 显示回复表单
function showReplyForm(commentItem) {
    // 移除现有的回复表单
    const existingForm = commentItem.querySelector('.reply-form');
    if (existingForm) {
        existingForm.remove();
        return;
    }
    
    // 创建回复表单
    const replyForm = document.createElement('div');
    replyForm.className = 'reply-form';
    replyForm.innerHTML = `
        <div class="reply-input-container">
            <textarea placeholder="回复@${commentItem.querySelector('.comment-author').textContent}..." class="reply-input"></textarea>
            <div class="reply-actions">
                <button class="btn btn-primary btn-sm">回复</button>
                <button class="btn btn-secondary btn-sm cancel-reply">取消</button>
            </div>
        </div>
    `;
    
    // 插入到评论操作下方
    const commentActions = commentItem.querySelector('.comment-actions');
    commentActions.parentNode.insertBefore(replyForm, commentActions.nextSibling);
    
    // 焦点到回复输入框
    const replyInput = replyForm.querySelector('.reply-input');
    replyInput.focus();
    
    // 回复提交
    const submitBtn = replyForm.querySelector('.btn-primary');
    submitBtn.addEventListener('click', function() {
        const content = replyInput.value.trim();
        if (content) {
            addReply(commentItem, content);
            replyForm.remove();
            showToast('回复成功');
        }
    });
    
    // 取消回复
    const cancelBtn = replyForm.querySelector('.cancel-reply');
    cancelBtn.addEventListener('click', function() {
        replyForm.remove();
    });
    
    // 回车提交回复
    replyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            submitBtn.click();
        }
    });
}

// 添加回复
function addReply(commentItem, content) {
    let repliesList = commentItem.querySelector('.replies-list');
    
    // 如果没有回复列表，创建一个
    if (!repliesList) {
        repliesList = document.createElement('div');
        repliesList.className = 'replies-list';
        commentItem.querySelector('.comment-content').appendChild(repliesList);
    }
    
    // 创建新回复
    const newReply = document.createElement('div');
    newReply.className = 'reply-item';
    newReply.innerHTML = `
        <div class="reply-avatar">
            <img src="https://via.placeholder.com/30x30" alt="用户头像">
        </div>
        <div class="reply-content">
            <span class="reply-author">当前用户</span>
            <span class="reply-text">${content}</span>
        </div>
    `;
    
    repliesList.appendChild(newReply);
}

function initSearchPage() {
    // 搜索页特定功能
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        console.log('搜索关键词:', query);
        // 这里可以添加搜索逻辑
    }
}

function initProfilePage() {
    if (!document.querySelector('.profile-container')) return;
    
    // 菜单切换功能
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有激活状态
            menuItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 显示对应内容区域
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // 帖子管理功能
    const deleteButtons = document.querySelectorAll('.btn-delete-post');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            if (confirm('确定要删除这篇帖子吗？此操作不可撤销。')) {
                deletePost(postId, this);
            }
        });
    });
    
    // 回复管理功能
    const deleteReplyButtons = document.querySelectorAll('.btn-delete-reply');
    deleteReplyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const replyId = this.getAttribute('data-reply-id');
            if (confirm('确定要删除这条回复吗？此操作不可撤销。')) {
                deleteReply(replyId, this);
            }
        });
    });
    
    // 收藏管理功能
    const unfavoriteButtons = document.querySelectorAll('.btn-unfavorite');
    unfavoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const favoriteId = this.getAttribute('data-favorite-id');
            if (confirm('确定要取消收藏吗？')) {
                unfavorite(favoriteId, this);
            }
        });
    });
    
    // 贴吧关注管理
    const unfollowButtons = document.querySelectorAll('.btn-unfollow');
    unfollowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tiebaId = this.getAttribute('data-tieba-id');
            if (confirm('确定要取消关注这个贴吧吗？')) {
                unfollowTieba(tiebaId, this);
            }
        });
    });
    
    // 设置表单提交
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(this);
        });
    }
    
    // 头像编辑功能
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            openAvatarEditor();
        });
    }
    
    console.log('个人中心页初始化完成');
}

// 删除帖子
function deletePost(postId, button) {
    // 模拟删除操作
    const postItem = button.closest('.post-item');
    if (postItem) {
        postItem.style.opacity = '0.5';
        postItem.style.pointerEvents = 'none';
        
        // 模拟API调用延迟
        setTimeout(() => {
            postItem.remove();
            showToast('帖子删除成功', 'success');
            updatePostCount();
        }, 500);
    }
}

// 删除回复
function deleteReply(replyId, button) {
    // 模拟删除操作
    const replyItem = button.closest('.reply-item');
    if (replyItem) {
        replyItem.style.opacity = '0.5';
        replyItem.style.pointerEvents = 'none';
        
        // 模拟API调用延迟
        setTimeout(() => {
            replyItem.remove();
            showToast('回复删除成功', 'success');
            updateReplyCount();
        }, 500);
    }
}

// 取消收藏
function unfavorite(favoriteId, button) {
    // 模拟取消收藏操作
    const favoriteItem = button.closest('.favorite-item');
    if (favoriteItem) {
        favoriteItem.style.opacity = '0.5';
        favoriteItem.style.pointerEvents = 'none';
        
        // 模拟API调用延迟
        setTimeout(() => {
            favoriteItem.remove();
            showToast('已取消收藏', 'success');
            updateFavoriteCount();
        }, 500);
    }
}

// 取消关注贴吧
function unfollowTieba(tiebaId, button) {
    // 模拟取消关注操作
    const tiebaItem = button.closest('.tieba-item');
    if (tiebaItem) {
        tiebaItem.style.opacity = '0.5';
        tiebaItem.style.pointerEvents = 'none';
        
        // 模拟API调用延迟
        setTimeout(() => {
            tiebaItem.remove();
            showToast('已取消关注', 'success');
            updateFollowedTiebaCount();
        }, 500);
    }
}

// 保存设置
function saveSettings(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // 显示加载状态
    submitBtn.textContent = '保存中...';
    submitBtn.disabled = true;
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showToast('设置保存成功', 'success');
        
        // 更新显示的用户名
        const username = formData.get('username');
        if (username) {
            const usernameElements = document.querySelectorAll('.user-details h2');
            usernameElements.forEach(element => {
                element.textContent = username;
            });
        }
        
        // 更新个人简介
        const bio = formData.get('bio');
        if (bio) {
            const bioElement = document.querySelector('.user-bio');
            if (bioElement) {
                bioElement.textContent = bio;
            }
        }
        
    }, 1000);
}

// 打开头像编辑器
function openAvatarEditor() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            uploadAvatar(file);
        }
    });
    
    input.click();
}

// 上传头像
function uploadAvatar(file) {
    if (!file.type.match('image.*')) {
        showToast('请选择图片文件', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB限制
        showToast('图片大小不能超过5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarImg = document.querySelector('.user-avatar img');
        if (avatarImg) {
            avatarImg.src = e.target.result;
            showToast('头像上传成功', 'success');
        }
    };
    
    reader.readAsDataURL(file);
}

// 更新帖子数量
function updatePostCount() {
    const postCountElement = document.querySelector('.stat-item:nth-child(1) .stat-number');
    if (postCountElement) {
        const currentCount = parseInt(postCountElement.textContent);
        postCountElement.textContent = Math.max(0, currentCount - 1);
    }
}

// 更新回复数量
function updateReplyCount() {
    const replyCountElement = document.querySelector('.stat-item:nth-child(2) .stat-number');
    if (replyCountElement) {
        const currentCount = parseInt(replyCountElement.textContent);
        replyCountElement.textContent = Math.max(0, currentCount - 1);
    }
}

// 更新收藏数量
function updateFavoriteCount() {
    const favoriteCountElement = document.querySelector('.stat-item:nth-child(3) .stat-number');
    if (favoriteCountElement) {
        const currentCount = parseInt(favoriteCountElement.textContent);
        favoriteCountElement.textContent = Math.max(0, currentCount - 1);
    }
}

// 更新关注贴吧数量
function updateFollowedTiebaCount() {
    const tiebaCountElement = document.querySelector('.stat-item:nth-child(4) .stat-number');
    if (tiebaCountElement) {
        const currentCount = parseInt(tiebaCountElement.textContent);
        tiebaCountElement.textContent = Math.max(0, currentCount - 1);
    }
}

// 显示提示消息
function showToast(message, type = 'info') {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // 设置背景色
    const bgColors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3'
    };
    toast.style.backgroundColor = bgColors[type] || bgColors.info;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后自动消失
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function initAuthPage() {
    // 登录注册页特定功能
    
    // 登录/注册标签切换
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // 移除所有激活状态
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            
            // 显示对应表单
            const targetForm = document.getElementById(target);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
    
    // 密码可见性切换
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // 切换图标
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
    
    // 登录表单提交
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    // 注册表单提交
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister(this);
        });
    }
    
    // 表单验证
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    console.log('登录注册页初始化完成');
}

// 处理登录
function handleLogin(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.auth-button');
    const originalText = submitBtn.textContent;
    
    // 验证表单
    if (!validateForm(form)) {
        return;
    }
    
    // 显示加载状态
    submitBtn.textContent = '登录中...';
    submitBtn.disabled = true;
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 模拟登录成功
        const username = formData.get('username');
        const rememberMe = formData.get('remember-me');
        
        // 保存登录状态
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        
        showToast('登录成功！', 'success');
        
        // 2秒后跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 1500);
}

// 处理注册
function handleRegister(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.auth-button');
    const originalText = submitBtn.textContent;
    
    // 验证表单
    if (!validateForm(form)) {
        return;
    }
    
    // 验证密码确认
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    
    if (password !== confirmPassword) {
        showFieldError(form.querySelector('[name="confirm-password"]'), '两次输入的密码不一致');
        return;
    }
    
    // 显示加载状态
    submitBtn.textContent = '注册中...';
    submitBtn.disabled = true;
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 模拟注册成功
        const username = formData.get('username');
        
        showToast('注册成功！请登录', 'success');
        
        // 切换到登录标签
        const loginTab = document.querySelector('[data-target="login-form"]');
        if (loginTab) {
            loginTab.click();
        }
        
    }, 1500);
}

// 验证表单
function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    // 清除之前的错误
    clearFieldError(field);
    
    // 必填验证
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, '此字段为必填项');
        return false;
    }
    
    // 邮箱验证
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '请输入有效的邮箱地址');
            return false;
        }
    }
    
    // 用户名验证
    if (fieldName === 'username' && value) {
        if (value.length < 3 || value.length > 20) {
            showFieldError(field, '用户名长度应在3-20个字符之间');
            return false;
        }
        
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(value)) {
            showFieldError(field, '用户名只能包含字母、数字和下划线');
            return false;
        }
    }
    
    // 密码验证
    if (fieldName === 'password' && value) {
        if (value.length < 6) {
            showFieldError(field, '密码长度不能少于6个字符');
            return false;
        }
    }
    
    return true;
}

// 显示字段错误
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #f44336; font-size: 0.8rem; margin-top: 5px;';
    
    field.style.borderColor = '#f44336';
    field.parentNode.appendChild(errorDiv);
}

// 清除字段错误
function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// 导出函数供其他脚本使用
window.tiebaApp = {
    initHomePage,
    initTiebaDetailPage,
    initPostDetailPage,
    initSearchPage,
    initProfilePage,
    initAuthPage,
    storage,
    debounce,
    throttle
};