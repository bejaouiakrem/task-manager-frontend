# TaskFlow Design System

## Overview
A professional dark corporate design system for the TaskFlow task management application. This design system follows modern SaaS standards with a focus on accessibility, consistency, and professional polish.

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Accessibility](#accessibility)
7. [Responsive Design](#responsive-design)
8. [Animation & Interaction](#animation--interaction)
9. [Implementation Guidelines](#implementation-guidelines)

## Design Tokens

### CSS Custom Properties
All design decisions are encapsulated in CSS custom properties (variables) located in:
- `src/assets/css/design-tokens.css` - Core design tokens
- `src/assets/css/animations.css` - Animation tokens
- `src/assets/css/accessibility.css` - Accessibility tokens

### Usage
```css
/* Always use design tokens */
.element {
  color: var(--text-primary);
  background: var(--surface-1);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## Typography

### Font Families
```css
--font-family-base: system-ui, sans-serif;
--font-family-mono: monospace;
```

### Font Sizes (8px baseline)
| Token | Size | Use Case |
|-------|------|----------|
| `--text-xs` | 12px | Labels, captions |
| `--text-sm` | 14px | Body text, buttons |
| `--text-base` | 16px | Default body text |
| `--text-lg` | 18px | Subheadings |
| `--text-xl` | 20px | Section headings |
| `--text-2xl` | 24px | Page headings |
| `--text-3xl` | 30px | Main titles |

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## Color System

### Base Surfaces (Dark Theme)
| Token | Hex | Use Case |
|-------|-----|----------|
| `--surface-0` | `#121212` | Main background |
| `--surface-1` | `#1E1E1E` | Cards, panels |
| `--surface-2` | `#252525` | Elevated surfaces |
| `--surface-3` | `#2D2D2D` | Modals, overlays |

### Primary Brand (Corporate Blue)
| Token | Hex | Use Case |
|-------|-----|----------|
| `--primary-500` | `#0066CC` | Main brand color |
| `--primary-400` | `#4D9FFF` | Hover states |
| `--primary-600` | `#0052A3` | Active states |

### Neutral Colors
| Token | Hex | Use Case |
|-------|-----|----------|
| `--neutral-100` | `#FFFFFF` | Primary text |
| `--neutral-200` | `#E0E0E0` | Secondary text |
| `--neutral-300` | `#B0B0B0` | Tertiary text |
| `--neutral-400` | `#707070` | Placeholders |

### Semantic Colors
| Token | Hex | Use Case |
|-------|-----|----------|
| `--success-500` | `#10B981` | Success states |
| `--warning-500` | `#F59E0B` | Warning states |
| `--danger-500` | `#EF4444` | Error states |
| `--info-500` | `#3B82F6` | Information states |

### Semantic Aliases
For common use cases:
```css
--text-primary: var(--neutral-100);
--text-secondary: var(--neutral-200);
--text-tertiary: var(--neutral-300);
--text-muted: var(--neutral-400);

--bg-primary: var(--surface-0);
--bg-secondary: var(--surface-1);
--bg-tertiary: var(--surface-2);

--border-primary: var(--neutral-500);
--border-secondary: var(--neutral-600);
--border-focus: var(--primary-500);

--interactive-primary: var(--primary-500);
--interactive-primary-hover: var(--primary-400);
--interactive-primary-active: var(--primary-600);

--status-success: var(--success-500);
--status-warning: var(--warning-500);
--status-danger: var(--danger-500);
--status-info: var(--info-500);
```

## Spacing & Layout

### Spacing Scale (8px grid)
| Token | Size | Use Case |
|-------|------|----------|
| `--space-1` | 4px | Micro spacing |
| `--space-2` | 8px | Small spacing |
| `--space-3` | 12px | Medium spacing |
| `--space-4` | 16px | Default spacing |
| `--space-5` | 24px | Large spacing |
| `--space-6` | 32px | XL spacing |
| `--space-8` | 48px | XXL spacing |

### Border Radius
| Token | Size | Use Case |
|-------|------|----------|
| `--radius-sm` | 4px | Small elements |
| `--radius-md` | 8px | Default elements |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Large containers |
| `--radius-full` | 9999px | Circular elements |

### Shadows
| Token | Value | Use Case |
|-------|-------|----------|
| `--shadow-sm` | Light elevation | Buttons, badges |
| `--shadow-md` | Medium elevation | Cards, panels |
| `--shadow-lg` | High elevation | Modals, dialogs |
| `--shadow-xl` | Highest elevation | Floating elements |

## Components

### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">
  <i class="bi bi-plus"></i>
  <span>Create Project</span>
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">
  <i class="bi bi-x"></i>
  <span>Cancel</span>
</button>

<!-- Success Button -->
<button class="btn btn-success">
  <i class="bi bi-check"></i>
  <span>Save Changes</span>
</button>

<!-- Danger Button -->
<button class="btn btn-danger">
  <i class="bi bi-trash"></i>
  <span>Delete</span>
</button>
```

### Cards
```html
<div class="project-card">
  <div class="card-header">
    <h3>Project Title</h3>
    <span class="category-badge">Development</span>
  </div>
  <p class="description">Project description goes here...</p>
  <div class="card-footer">
    <div class="owner-info">
      <span class="owner-label">Owner:</span>
      <span class="owner-name">John Doe</span>
    </div>
    <span>12 tasks</span>
  </div>
  <div class="collaborators">
    <span class="collaborator-badge">JD</span>
    <span class="collaborator-badge">AS</span>
  </div>
</div>
```

### Forms
```html
<div class="form-group">
  <label for="name" class="required">Project Name</label>
  <input type="text" id="name" class="form-input" placeholder="Enter project name">
  <div class="validation-error">Project name is required</div>
</div>

<div class="form-group">
  <label for="description">Description</label>
  <textarea id="description" class="form-input" placeholder="Enter project description"></textarea>
</div>

<div class="form-actions">
  <button class="btn btn-secondary">Cancel</button>
  <button class="btn btn-primary">Save</button>
</div>
```

### Navigation
```html
<header class="navbar">
  <a class="navbar-brand" routerLink="/dashboard">
    <svg>...</svg>
    <span>TaskFlow</span>
  </a>
  
  <div class="nav-buttons">
    <a class="nav-btn nav-btn-secondary">
      <i class="bi bi-kanban"></i>
      <span>Dashboard</span>
    </a>
    
    <div class="user-dropdown">
      <button class="dropdown-toggle">
        <div class="user-avatar">
          <div class="initials">JD</div>
          <span>John Doe</span>
        </div>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item">
          <i class="bi bi-person"></i>
          <span>Profile</span>
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item">
          <i class="bi bi-box-arrow-right"></i>
          <span>Sign Out</span>
        </a>
      </div>
    </div>
  </div>
</header>
```

## Accessibility

### WCAG 2.1 AA Compliance
- All colors meet minimum contrast ratios (4.5:1 for text, 3:1 for UI components)
- Keyboard navigation support with visible focus indicators
- Screen reader support with proper ARIA labels
- Reduced motion support

### Focus Management
```css
/* Enhanced focus indicators */
:focus-visible {
  outline: 3px solid var(--border-focus);
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(var(--interactive-primary), 0.1);
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Enhanced contrast colors */
  --text-primary: #FFFFFF;
  --border-primary: #FFFFFF;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints
| Breakpoint | Width | Use Case |
|------------|-------|----------|
| Mobile | < 768px | Phone layouts |
| Tablet | 768px - 1024px | Tablet layouts |
| Desktop | > 1024px | Desktop layouts |

### Responsive Utilities
```css
/* Mobile-first approach */
.container {
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Touch Targets
- Minimum touch target size: 44px × 44px
- All interactive elements meet this requirement
- Adequate spacing between touch targets

## Animation & Interaction

### Transition Timing
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
```css
/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Scale on hover */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Fade in */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

### Loading States
```css
/* Skeleton loading */
.skeleton {
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%);
  animation: shimmer 1.5s infinite;
}

/* Loading spinner */
.loading-spinner {
  border: 3px solid var(--border-secondary);
  border-top-color: var(--interactive-primary);
  animation: spin 1s linear infinite;
}
```

## Implementation Guidelines

### CSS Architecture
1. **Design Tokens First**: Always use CSS custom properties
2. **Component-Scoped Styles**: Keep styles with components
3. **Utility Classes**: Use for common patterns
4. **Mobile-First**: Start with mobile styles, enhance for larger screens

### File Structure
```
src/
├── assets/
│   └── css/
│       ├── design-tokens.css
│       ├── animations.css
│       └── accessibility.css
├── app/
│   ├── component/
│   │   ├── component.css
│   │   ├── component.html
│   │   └── component.ts
│   └── app.css
└── styles.css
```

### Best Practices
1. **Consistency**: Use the same spacing, colors, and patterns throughout
2. **Accessibility**: Test with keyboard and screen readers
3. **Performance**: Minimize CSS bundle size
4. **Maintainability**: Document decisions and patterns

### Testing
1. **Visual Testing**: Check across browsers and devices
2. **Accessibility Testing**: Use tools like Lighthouse, axe
3. **Performance Testing**: Monitor CSS performance impact
4. **User Testing**: Get feedback on interactions

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Version History
- **v1.0.0**: Initial design system implementation
  - Dark corporate theme
  - Professional component library
  - Accessibility enhancements
  - Responsive design patterns

## Contributing
1. Follow the established design patterns
2. Use design tokens for all styling
3. Test accessibility changes
4. Update documentation when adding new patterns

## Resources
- [Figma Design File](#) (Link to design files)
- [Component Library](#) (Storybook or similar)
- [Accessibility Checklist](#) (Internal guidelines)
- [Performance Budget](#) (CSS size limits)