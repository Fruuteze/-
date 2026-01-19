// Обработка форм обратной связи
document.addEventListener('DOMContentLoaded', function() {
    // Обработка общей формы обратной связи
    const contactForms = document.querySelectorAll('#contactForm');
    
    contactForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Валидация
                if (!data.name || !data.phone) {
                    alert('Пожалуйста, заполните все обязательные поля');
                    return;
                }
                
                // Здесь можно добавить отправку данных на сервер
                console.log('Данные формы:', data);
                
                // Показываем сообщение об успехе
                alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
                
                // Очищаем форму
                form.reset();
            });
        }
    });
    
    // Обработка формы записи на консультацию
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData);
            
            // Валидация
            if (!data.name || !data.phone) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Заявка на консультацию:', data);
            
            // Показываем сообщение об успехе
            alert('Спасибо за заявку! Я свяжусь с вами в ближайшее время для подтверждения записи.');
            
            // Очищаем форму
            appointmentForm.reset();
        });
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Добавление анимации при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Применяем анимацию к карточкам
    document.querySelectorAll('.advantage-card, .service-card, .pricing-card, .direction-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Мобильное меню (если нужно)
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        // Можно добавить функционал мобильного меню
    }
    
    // Валидация телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Удаляем все символы кроме цифр, +, -, (, )
            let value = e.target.value.replace(/[^\d\+\-\(\)\s]/g, '');
            e.target.value = value;
        });
    });
    
    // Валидация email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            const email = e.target.value;
            if (email && !isValidEmail(email)) {
                e.target.style.borderColor = '#ff6b6b';
                e.target.setCustomValidity('Пожалуйста, введите корректный email адрес');
            } else {
                e.target.style.borderColor = '';
                e.target.setCustomValidity('');
            }
        });
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Установка минимальной даты для формы записи
    const dateInput = document.getElementById('appointment-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
});

// Функция для показа уведомлений (можно заменить на более продвинутый вариант)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем стили для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
