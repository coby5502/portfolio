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

    // 이메일 복사 기능
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const emailAddress = emailLink.getAttribute('href').replace('mailto:', '');

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 이메일 주소 복사
        navigator.clipboard.writeText(emailAddress).then(() => {
            // 복사 성공 알림 표시
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = '이메일 주소가 복사되었습니다!';
            document.body.appendChild(notification);

            // 3초 후 알림 제거
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });
}); 