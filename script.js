document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en'; // 기본 언어

    // 언어 변경 함수
    function changeLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll(`[data-${lang}]`).forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        // 활성 언어 버튼 스타일 변경
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // HTML lang 속성 업데이트
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

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // 네비게이션 링크 클릭시 모바일 메뉴 닫기
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });
}); 