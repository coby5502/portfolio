document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    // 언어 변경 함수
    function changeLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll(`[data-${lang}]`).forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.documentElement.lang = lang;
    }

    // 언어 버튼 이벤트 리스너
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // 브라우저 언어 감지 및 초기 설정
    const browserLang = navigator.language.split('-')[0];
    if (['ko', 'en', 'ja'].includes(browserLang)) {
        changeLanguage(browserLang);
    } else {
        changeLanguage('en');
    }

    // 모바일 메뉴 관련
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 메뉴 토글 함수
    function toggleMenu() {
        nav.classList.toggle('active');
    }

    // 메뉴 닫기 함수
    function closeMenu() {
        nav.classList.remove('active');
    }

    // 햄버거 메뉴 클릭 이벤트
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // 메뉴 항목 클릭시 닫기 및 스크롤
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            closeMenu(); // 메뉴 닫기
            
            // 부드러운 스크롤
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 문서 클릭시 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // 스크롤시 메뉴 닫기
    window.addEventListener('scroll', closeMenu);

    // 이메일 복사 알림 메시지 다국어 설정
    const copyMessages = {
        ko: '이메일 주소가 복사되었습니다!',
        en: 'Email address copied!',
        ja: 'メールアドレスをコピーしました！'
    };

    // 이메일 복사 기능
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const emailAddress = emailLink.getAttribute('href').replace('mailto:', '');

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 현재 설정된 언어 확인
        const currentLang = document.documentElement.lang || 'en';
        
        // 이메일 주소 복사
        navigator.clipboard.writeText(emailAddress).then(() => {
            // 현재 언어에 맞는 메시지로 알림 표시
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = copyMessages[currentLang] || copyMessages.en;
            document.body.appendChild(notification);

            // 3초 후 알림 제거
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    // 기존 코드 유지하고 DOMContentLoaded 이벤트 핸들러 안에 추가
    const modal = document.getElementById('readme-modal');
    const modalContent = modal.querySelector('.readme-content');
    const closeBtn = modal.querySelector('.modal-close');

    // README 버튼 클릭 이벤트
    document.querySelectorAll('.readme-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const repo = e.currentTarget.dataset.repo;
            try {
                // GitHub API로 README 내용 가져오기
                const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
                const data = await response.json();
                // Base64 디코딩 후 UTF-8로 처리
                const decoder = new TextDecoder('utf-8');
                const bytes = Uint8Array.from(atob(data.content), c => c.charCodeAt(0));
                const readmeContent = decoder.decode(bytes);
                
                // 마크다운을 HTML로 변환
                modalContent.innerHTML = marked.parse(readmeContent);
                
                // 모달 표시
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } catch (error) {
                console.error('README를 불러오는데 실패했습니다:', error);
            }
        });
    });

    // 모달 닫기
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 모달 외부 클릭시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 