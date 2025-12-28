# TailwindCSS Admin Dashboard with RTL Support

A complete, production-ready admin dashboard built with TailwindCSS featuring full RTL (Right-to-Left) and LTR (Left-to-Right) support.

## Features

- ✅ **Full RTL/LTR Support**: Native RTL implementation with dynamic direction switching
- ✅ **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Clean Architecture**: Reusable components and organized folder structure
- ✅ **Arabic-First**: Designed with Arabic as the default language
- ✅ **Ready for Laravel Blade**: Template structure optimized for Laravel integration
- ✅ **Toast Notifications**: Advanced notification system with multiple types
- ✅ **Modal Components**: Responsive modal dialogs with animations
- ✅ **Dropdown Menus**: Accessible dropdown menus with keyboard support
- ✅ **Tabs & Accordion**: Interactive tabs and accordion components
- ✅ **Form Validation**: Comprehensive client-side form validation
- ✅ **State Management**: Simple reactive state management system
- ✅ **Interactive Charts**: Real-time charts using Chart.js library
- ✅ **Component Library**: Pre-built UI components ready to use

## Project Structure

```
dashboard-tw/
├── assets/
│   ├── css/
│   │   ├── input.css          # TailwindCSS source
│   │   └── output.css         # Compiled CSS (run npm run dev)
│   └── js/
│       └── main.js            # JavaScript for RTL/LTR & dark mode
├── components/
│   ├── layout/
│   │   └── app.html           # Base layout template
│   └── ui/
│       └── components.html    # Reusable UI components
├── pages/
│   ├── dashboard-content.html # Dashboard content
│   └── (Complete pages below)
├── dashboard.html              # Main dashboard
├── users.html                 # Users management
├── forms.html                 # Form examples
├── tables.html                # Table examples
├── login.html                 # Login page
├── register.html              # Register page
├── tailwind.config.js         # TailwindCSS configuration
├── package.json               # npm dependencies
└── README.md                  # This file
```

## Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Build for Production**:
```bash
npm run build
```

## RTL/LTR Implementation

The dashboard uses native HTML `dir` attribute for RTL support:

```html
<html lang="ar" dir="rtl">  <!-- RTL mode -->
<html lang="en" dir="ltr">  <!-- LTR mode -->
```

### Direction Management

The `DirectionManager` class in `assets/js/main.js` handles:
- Direction switching (RTL ↔ LTR)
- Persistance in localStorage
- Dynamic UI updates

### RTL-Aware Tailwind Utilities

Key RTL utilities used:
- `start-*` / `end-*` instead of `left-*` / `right-*`
- `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
- `ms-*` / `me-*` instead of `ml-*` / `mr-*`

Example:
```html
<!-- RTL-aware padding -->
<div class="ps-4 pe-6">...</div>

<!-- RTL-aware margins -->
<div class="ms-2 me-4">...</div>

<!-- RTL-aware positioning -->
<div class="start-0 top-0">...</div>
```

## Pages

### 1. Dashboard (`dashboard.html`)
- Statistics cards with trend indicators
- Bar and donut chart placeholders
- Recent orders table
- Quick actions panel

### 2. Users Management (`users.html`)
- User listing with avatars
- Search and filter functionality
- RTL-aware table with proper alignment
- Pagination with RTL support

### 3. Forms (`forms.html`)
- Basic input fields
- Form validation examples
- Select dropdowns
- Checkboxes and radio buttons
- Input states (disabled, readonly, etc.)

### 4. Tables (`tables.html`)
- Basic tables
- Sortable tables
- Tables with pagination
- RTL-aware column headers and content

### 5. Authentication Pages
- **Login** (`login.html`)
- **Register** (`register.html`)
- Social login options
- Form validation ready

## Components

### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-danger">Danger Button</button>
<button class="btn btn-success">Success Button</button>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
```

### Alerts
```html
<div class="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
    <!-- Success alert content -->
</div>
```

### Cards
```html
<div class="card p-6">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-gray-600">Card content</p>
</div>
```

### Toast Notifications
```javascript
Toast.success('Operation successful!');
Toast.error('An error occurred');
Toast.warning('Please check your input');
Toast.info('Information message');
```

### Modals
```html
<button data-modal="modalId">Open Modal</button>
<div id="modalId" class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h3>Modal Title</h3>
            <button data-modal-close>Close</button>
        </div>
        <div class="modal-body">Modal Content</div>
        <div class="modal-footer">
            <button data-modal-close>Cancel</button>
            <button>Confirm</button>
        </div>
    </div>
</div>
```

### Dropdowns
```html
<div id="dropdownId" class="dropdown">
    <button data-dropdown>Toggle Dropdown</button>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">Option 1</a>
        <a href="#" class="dropdown-item">Option 2</a>
    </div>
</div>
```

### Tabs
```html
<div data-tabs-group="tabs1">
    <button data-tab="tab1">Tab 1</button>
    <button data-tab="tab2">Tab 2</button>
    
    <div data-tab-content="tab1">Content 1</div>
    <div data-tab-content="tab2">Content 2</div>
</div>
```

### Accordion
```html
<div id="accordionId">
    <button data-accordion>Accordion Item</button>
    <div data-accordion-content>Accordion Content</div>
</div>
```

### Form Validation
```html
<input 
    type="email" 
    id="email"
    data-validate="required|email"
    data-label="Email"
    class="input"
>
<p id="email-error" class="text-red-600 hidden"></p>

<script>
FormValidator.init('formId', {
    onSuccess: (formData) => console.log(formData),
    onError: () => console.log('Validation failed')
});
</script>
```

### Charts
```javascript
ChartManager.createLineChart('canvasId', labels, datasets, 'Chart Title');
ChartManager.createBarChart('canvasId', labels, datasets, 'Chart Title');
ChartManager.createPieChart('canvasId', labels, data, 'Chart Title');
```

## Advanced Features

### State Management
The dashboard includes a simple state management system:

```javascript
// Get state
const user = StateManager.get('userName');
const isLoggedIn = StateManager.get('isLoggedIn');

// Dispatch actions
StateManager.dispatch('switchTheme');
StateManager.dispatch('switchDirection');
StateManager.dispatch('showNotification', { message: 'Hello!', type: 'success' });

// Subscribe to state changes
StateManager.subscribe((state) => {
    console.log('State changed:', state);
});
```

### Form Validation Rules
Available validation rules:

- `required` - Field is required
- `email` - Valid email format
- `phone` - Valid phone number
- `password` - Strong password (8+ chars, uppercase, lowercase, number)
- `url` - Valid URL
- `number` - Numeric value
- `positive` - Positive number
- `date` - Valid date
- `minLength:n` - Minimum length n
- `maxLength:n` - Maximum length n
- `confirm:fieldId` - Match with another field
- `age:n` - Minimum age n
- `custom` - Custom validator function

Example:
```html
<input 
    data-validate="required|minLength:3|email"
    data-label="Email Address"
    class="input"
>
```

## Dark Mode

Dark mode is handled via TailwindCSS `darkMode: 'class'`:

```html
<!-- Enable dark mode -->
<html class="dark">...</html>
```

Toggle dark mode using the theme button in the navbar. Preference is saved to localStorage.

## Customization

### Fonts
The dashboard uses Cairo and Tajawal Arabic fonts via Google Fonts. Configure in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      cairo: ['Cairo', 'sans-serif'],
      tajawal: ['Tajawal', 'sans-serif'],
    }
  }
}
```

### Colors
Primary color scheme is customizable in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... more shades
    600: '#0ea5e9',
    // ... more shades
  }
}
```

## Laravel Blade Integration

To integrate with Laravel Blade:

1. Create Blade templates from the HTML files
2. Use `@yield` and `@section` directives
3. Replace static content with Blade directives
4. Use Laravel's `lang()` for translations

Example Blade structure:
```blade
<!-- layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ __('app.direction') }}">
<head>
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/output.css') }}">
</head>
<body>
    @include('components.sidebar')
    @include('components.navbar')
    <main>
        @yield('content')
    </main>
    <script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Free to use for personal and commercial projects.

## Credits

- Built with TailwindCSS
- Icons from Heroicons
- Fonts: Cairo, Tajawal (Google Fonts)
