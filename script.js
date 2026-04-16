// ========================================
// Profile Card - Time Update Script
// ========================================

/**
 * Initialize the profile card and set up time updates
 */
function initializeProfileCard() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    if (!timeElement) {
        console.error('Time element not found');
        return;
    }

    // Update time immediately on load
    updateTime(timeElement);

    // Update time every 500ms to keep it current
    const updateInterval = setInterval(() => {
        updateTime(timeElement);
    }, 500);

    // Optional: Clean up interval when page unloads
    window.addEventListener('beforeunload', () => {
        clearInterval(updateInterval);
    });
}

/**
 * Update the time display with current epoch time in milliseconds
 * @param {HTMLElement} timeElement - The element to update
 */
function updateTime(timeElement) {
    const currentTime = Date.now();
    timeElement.textContent = `Time: ${currentTime}`;
    
    // Update aria-label for screen reader announcement
    timeElement.setAttribute('aria-label', `Current time in milliseconds: ${currentTime}`);
}

/**
 * Handle keyboard navigation for social links
 * Ensures all links are keyboard-focusable with visible focus styles
 */
function initializeKeyboardNavigation() {
    const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');
    
    socialLinks.forEach(link => {
        // Ensure links are keyboard accessible
        if (!link.hasAttribute('tabindex') || link.getAttribute('tabindex') < 0) {
            // Links are naturally focusable, but this ensures it
            link.style.cursor = 'pointer';
        }

        // Add enter/space key support if needed
        link.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                link.click();
            }
        });
    });
}

/**
 * Validate that all required data-testid elements are present
 * Useful for debugging and testing
 */
function validateProfileCardStructure() {
    const requiredTestIds = [
        'test-profile-card',
        'test-user-name',
        'test-user-bio',
        'test-user-time',
        'test-user-avatar',
        'test-user-social-links',
        'test-user-hobbies',
        'test-user-dislikes'
    ];

    const missingElements = [];

    requiredTestIds.forEach(testId => {
        if (!document.querySelector(`[data-testid="${testId}"]`)) {
            missingElements.push(testId);
        }
    });

    if (missingElements.length > 0) {
        console.warn('Missing required data-testid elements:', missingElements);
    } else {
        console.log('✓ All required data-testid elements are present');
    }

    return missingElements.length === 0;
}

/**
 * Display profile card information in console
 * Useful for debugging and verification
 */
function logProfileCardInfo() {
    console.group('Profile Card Information');
    
    const profileCard = document.querySelector('[data-testid="test-profile-card"]');
    const userName = document.querySelector('[data-testid="test-user-name"]');
    const userBio = document.querySelector('[data-testid="test-user-bio"]');
    const userTime = document.querySelector('[data-testid="test-user-time"]');
    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
    const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');
    const hobbies = document.querySelector('[data-testid="test-user-hobbies"]');
    const dislikes = document.querySelector('[data-testid="test-user-dislikes"]');

    console.log('Name:', userName?.textContent);
    console.log('Bio:', userBio?.textContent);
    console.log('Time:', userTime?.textContent);
    console.log('Avatar Alt Text:', avatar?.alt);
    console.log('Social Links Count:', socialLinks.length);
    console.log('Hobbies:', Array.from(hobbies?.querySelectorAll('li') || []).map(li => li.textContent));
    console.log('Dislikes:', Array.from(dislikes?.querySelectorAll('li') || []).map(li => li.textContent));
    
    console.groupEnd();
}

/**
 * Verify accessibility features
 */
function verifyAccessibility() {
    console.group('Accessibility Checks');

    // Check avatar alt text
    const avatar = document.querySelector('[data-testid="test-user-avatar"]');
    if (avatar && avatar.alt) {
        console.log('✓ Avatar has alt text:', avatar.alt);
    } else {
        console.warn('⚠ Avatar missing alt text');
    }

    // Check for aria-live on time element
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    if (timeElement && timeElement.getAttribute('aria-live')) {
        console.log('✓ Time element has aria-live attribute');
    } else {
        console.warn('⚠ Time element missing aria-live attribute');
    }

    // Check social links for target="_blank" and rel
    const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');
    const allLinksSecure = Array.from(socialLinks).every(link => {
        return link.getAttribute('target') === '_blank' && 
               link.getAttribute('rel')?.includes('noopener');
    });
    if (allLinksSecure) {
        console.log('✓ All external links open safely in new tab');
    } else {
        console.warn('⚠ Some social links may not open safely');
    }

    // Check for focus styles
    const focusableElements = document.querySelectorAll('a, button');
    console.log(`✓ Found ${focusableElements.length} focusable elements`);

    console.groupEnd();
}

// ========================================
// Initialization
// ========================================

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeProfileCard();
        initializeKeyboardNavigation();
        validateProfileCardStructure();
        logProfileCardInfo();
        verifyAccessibility();
    });
} else {
    // DOM is already loaded
    initializeProfileCard();
    initializeKeyboardNavigation();
    validateProfileCardStructure();
    logProfileCardInfo();
    verifyAccessibility();
}
