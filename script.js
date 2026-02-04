// script.js - Perbaikan Galeri Sederhana
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Gallery images
    const galleryImages = [
        'img/gambar11.jpeg',
        'img/gambar2.jpeg',
        'img/gambar3.jpeg',
        'img/gambar4.jpeg',
        'img/gambar5.jpeg',
        'img/gambar6.jpeg',
        'img/gambar7.jpeg',
        'img/gambar8.jpeg',
        'img/gambar9.jpeg',
        'img/gambar10.jpeg',
        'img/gambar1.jpeg',
        'img/gambar12.jpeg'
    ];
    
    const galleryContainer = document.getElementById('galleryContainer');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    
    // Function to render gallery items
    function renderGallery() {
        galleryContainer.innerHTML = '';
        
        galleryImages.forEach((src, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            
            const imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.alt = `Gallery image ${index + 1}`;
            imgElement.loading = 'lazy';
            
            galleryItem.appendChild(imgElement);
            galleryContainer.appendChild(galleryItem);
            
            // Add click event to open lightbox
            galleryItem.addEventListener('click', () => openLightbox(index));
        });
        
        // Trigger animation after render
        setTimeout(() => {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => {
                item.classList.add('animate');
            });
        }, 100);
    }
    
    // Lightbox functionality
    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = galleryImages[currentIndex];
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex];
    }
    
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentIndex];
    }
    
    // Event listeners for lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showNextImage);
    lightboxNext.addEventListener('click', showPrevImage);
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });
    
    // Initial render
    renderGallery();
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .insight-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Package selection
    const packageButtons = document.querySelectorAll('.btn-card');
    const packageSelect = document.getElementById('package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            packageSelect.value = packageName;
            
            // Scroll to contact form
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the selected option
            packageSelect.focus();
            
            // Add visual feedback
            this.style.backgroundColor = '#ff8fa3';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Contact form WhatsApp integration
    const collabForm = document.getElementById('collabForm');
    
    collabForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const package = document.getElementById('package').value;
        const message = document.getElementById('message').value;
        
        const whatsappMessage = `Halo Athaya Rizka, saya ${name} tertarik untuk berkolaborasi. Email: ${email} Paket yang diminati: ${package} Detail proyek: ${message} Terima kasih!`;
        
        const whatsappURL = `https://wa.me/628561747876?text=${whatsappMessage}`;
        
        window.open(whatsappURL, '_blank');
        
        // Reset form with visual feedback
        this.reset();
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent! Redirecting...';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });
    
    // Add smooth scroll animation for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add lazy loading for images
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    // Initialize lazy loading
    lazyLoadImages();
});
