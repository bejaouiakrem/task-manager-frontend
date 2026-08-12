# TaskFlow Style Guide - Quick Reference

## Quick Start

### 1. Import Design Tokens
```css
/* In your component CSS */
.element {
  color: var(--text-primary);
  background: var(--surface-1);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

### 2. Use Utility Classes
```html
<div class="d-flex justify-content-between align-items-center p-4">
  <h2 class="text-primary">Title</h2>
  <button class="btn btn-primary">Action</button>
</div>
```

## Color Cheat Sheet

### Text Colors
- `text-primary` - Main text (#FFFFFF)
- `text-secondary` - Secondary text (#E0E0E0)
- `text-tertiary` - Tertiary text (#B0B0B0)
- `text-muted` - Disabled text (#707070)

### Background Colors
- `bg-primary` - Main background (#121212)
- `bg-secondary` - Cards, panels (#1E1E1E)
- `bg-tertiary` - Elevated surfaces (#252525)

### Status Colors
- `text-success` / `bg-success` - Success states (#10B981)
- `text-warning` / `bg-warning` - Warning states (#F59E0B)
- `text-danger` / `bg-danger` - Error states (#EF4444)
- `text-info` / `bg-info` - Info states (#3B82F6)

## Spacing Cheat Sheet

### Common Spacing Values
```css
/* 4px increments based on 8px grid */
.mt-1 { margin-top: 4px; }    /* --space-1 */
.mt-2 { margin-top: 8px; }    /* --space-2 */
.mt-3 { margin-top: 12px; }   /* --space-3 */
.mt-4 { margin-top: 16px; }   /* --space-4 */
.mt-5 { margin-top: 24px; }   /* --space-5 */
.mt-6 { margin-top: 32px; }   /* --space-6 */

.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
.p-3 { padding: 12px; }
.p-4 { padding: 16px; }
.p-5 { padding: 24px; }
.p-6 { padding: 32px; }
```

## Component Patterns

### Buttons
```html
<!-- Primary Action -->
<button class="btn btn-primary">
  <i class="bi bi-plus"></i>
  Create New
</button>

<!-- Secondary Action -->
<button class="btn btn-secondary">
  <i class="bi bi-x"></i>
  Cancel
</button>

<!-- Destructive Action -->
<button class="btn btn-danger">
  <i class="bi bi-trash"></i>
  Delete
</button>

<!-- Loading State -->
<button class="btn btn-primary loading">
  Processing...
</button>
```

### Cards
```html
<div class="project-card hover-lift">
  <div class="card-header">
    <h3 class="text-primary">Project Title</h3>
    <span class="badge bg-success">Active</span>
  </div>
  
  <p class="description text-secondary">
    Project description goes here...
  </p>
  
  <div class="card-footer">
    <div class="owner-info">
      <span class="owner-label text-tertiary">Owner:</span>
      <span class="owner-name text-secondary">John Doe</span>
    </div>
    <span class="text-tertiary">12 tasks</span>
  </div>
</div>
```

### Forms
```html
<div class="form-group">
  <label for="email" class="required text-secondary">
    Email Address
  </label>
  <input 
    type="email" 
    id="email" 
    class="form-input" 
    placeholder="name@example.com"
    required
  >
  <div class="validation-error text-danger">
    Please enter a valid email address
  </div>
</div>
```

### Navigation
```html
<nav class="navbar">
  <a href="/" class="navbar-brand">
    <i class="bi bi-kanban"></i>
    TaskFlow
  </a>
  
  <div class="nav-buttons">
    <a href="/dashboard" class="nav-btn nav-btn-secondary">
      <i class="bi bi-speedometer2"></i>
      Dashboard
    </a>
    
    <div class="user-dropdown">
      <button class="dropdown-toggle">
        <div class="user-avatar">
          <div class="initials">JD</div>
          <span class="text-secondary">John Doe</span>
        </div>
      </button>
    </div>
  </div>
</nav>
```

## Layout Utilities

### Flexbox
```html
<div class="d-flex justify-content-between align-items-center">
  <div>Left Content</div>
  <div>Right Content</div>
</div>

<div class="d-flex flex-column gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid
```html
<div class="d-grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

## Responsive Design

### Breakpoint Helpers
```css
/* Mobile-first: Style for mobile, enhance for larger */
.container {
  padding: var(--space-4); /* Mobile padding */
}

@media (min-width: 768px) {
  .container {
    padding: var(--space-6); /* Tablet/Desktop padding */
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px; /* Desktop max width */
  }
}
```

### Hide/Show by Breakpoint
```html
<!-- Hide on mobile, show on tablet+ -->
<div class="d-none d-md-block">
  Desktop-only content
</div>

<!-- Show on mobile, hide on tablet+ -->
<div class="d-block d-md-none">
  Mobile-only content
</div>
```

## Animation & Interaction

### Common Effects
```html
<!-- Hover lift -->
<div class="card hover-lift">
  Hover me to lift
</div>

<!-- Scale on hover -->
<button class="btn hover-scale">
  Hover to scale
</button>

<!-- Fade in -->
<div class="fade-in">
  Content fades in
</div>
```

### Loading States
```html
<!-- Skeleton loading -->
<div class="card">
  <div class="skeleton skeleton-title"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text short"></div>
</div>

<!-- Loading spinner -->
<div class="loading-spinner"></div>

<!-- Button loading -->
<button class="btn btn-primary loading">
  Processing...
</button>
```

## Accessibility Must-Dos

### 1. Semantic HTML
```html
<!-- Good -->
<button class="btn">Click me</button>
<a href="/page" class="btn">Go to page</button>

<!-- Bad -->
<div onclick="doSomething()" class="btn">Click me</div>
```

### 2. ARIA Labels
```html
<button class="btn" aria-label="Close modal">
  <i class="bi bi-x"></i>
</button>

<div role="alert" aria-live="polite">
  Success! Your changes have been saved.
</div>
```

### 3. Focus Management
```css
/* Always provide visible focus */
:focus-visible {
  outline: 3px solid var(--border-focus);
  outline-offset: 3px;
}
```

### 4. Color Contrast
- Text: Minimum 4.5:1 contrast ratio
- UI Components: Minimum 3:1 contrast ratio
- Use `text-primary` on `bg-primary` for best contrast

## Common Patterns

### Empty State
```html
<div class="empty-state">
  <div class="empty-icon">
    <i class="bi bi-inbox"></i>
  </div>
  <h3 class="text-primary">No Projects</h3>
  <p class="text-tertiary">
    You haven't created any projects yet.
  </p>
  <button class="btn btn-primary">
    <i class="bi bi-plus"></i>
    Create Your First Project
  </button>
</div>
```

### Error State
```html
<div class="error-message">
  <i class="bi bi-exclamation-triangle"></i>
  <span>An error occurred while loading projects.</span>
  <button class="btn btn-secondary ml-3">
    Try Again
  </button>
</div>
```

### Success State
```html
<div class="success-message">
  <i class="bi bi-check-circle"></i>
  <span>Project created successfully!</span>
</div>
```

## Performance Tips

### 1. Minimize CSS
- Use utility classes when possible
- Avoid deep nesting
- Remove unused styles

### 2. Optimize Images
- Use modern formats (WebP)
- Implement lazy loading
- Optimize for retina displays

### 3. Reduce JavaScript
- Use native browser APIs when possible
- Implement code splitting
- Defer non-critical scripts

## Browser Testing

### Required Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Test Scenarios
1. **Layout**: Check at 320px, 768px, 1024px, 1440px
2. **Interaction**: Hover, focus, active states
3. **Accessibility**: Keyboard navigation, screen readers
4. **Performance**: Lighthouse scores

## Troubleshooting

### Common Issues

1. **Colors not applying?**
   - Check if design tokens are imported
   - Verify CSS custom property names

2. **Spacing inconsistent?**
   - Use spacing utility classes
   - Check for conflicting margins/padding

3. **Components not aligning?**
   - Use flexbox utilities
   - Check parent container styles

4. **Accessibility warnings?**
   - Add proper ARIA labels
   - Ensure color contrast ratios
   - Test with keyboard navigation

### Debugging Tools
1. Browser DevTools
2. Lighthouse audits
3. axe accessibility testing
4. Responsive design mode

## Quick Commands

### Development
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run accessibility audit
npm run audit:a11y
```

### CSS Checks
```bash
# Check CSS specificity
npm run css:audit

# Check bundle size
npm run css:size

# Run performance audit
npm run perf:audit
```

## Support & Resources

### Internal Resources
- Design System: `/DESIGN_SYSTEM.md`
- Component Library: Storybook (if available)
- Figma Design Files: (link to design files)

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [CSS Tricks](https://css-tricks.com/)

### Getting Help
1. Check the design system documentation
2. Review existing component implementations
3. Ask team members for patterns
4. Create a reproducible test case

---

**Remember**: Consistency is key. When in doubt, follow established patterns and refer to the full design system documentation.