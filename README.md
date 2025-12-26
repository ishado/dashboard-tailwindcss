# TailwindCSS Admin Dashboard with RTL Support

A complete, production-ready admin dashboard built with TailwindCSS featuring full RTL (Right-to-Left) and LTR (Left-to-Right) support.

## Features

- ✅ **Full RTL/LTR Support**: Native RTL implementation with dynamic direction switching
- ✅ **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Clean Architecture**: Reusable components and organized folder structure
- ✅ **Arabic-First**: Designed with Arabic as the default language
- ✅ **Ready for Laravel Blade**: Template structure optimized for Laravel integration

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

### Modals
See `components/ui/components.html` for modal implementation with JavaScript.

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
