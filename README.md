# Skip Selection Page Redesign - Coding Challenge

A complete redesign of the WeWantWaste skip selection page, built with Next.js 14, TypeScript, and Tailwind CSS. This project maintains the original functionality while delivering a modern, responsive user interface.

## 🎯 Assignment Overview

**Challenge**: Redesign the 'choose your skip size' page from https://wewantwaste.co.uk/ (postcode LE10 1SH → garden waste) to look completely different while keeping functionality intact.

**Requirements Met**:
- ✅ Complete page redesign with modern UI/UX
- ✅ Maintained original functionality 
- ✅ Responsive design (mobile & desktop)
- ✅ Clean, maintainable React code
- ✅ TypeScript implementation
- ✅ API integration with provided endpoint

## 🚀 Live Demo

**Sandbox Link**: https://waste-management-vert.vercel.app/

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: WeWantWaste API
- **State Management**: React Hooks

## 🏗️ My Approach

### 1. **Design Philosophy**
- **Modern Aesthetic**: Replaced the original design with a clean, card-based interface
- **Visual Hierarchy**: Clear progression steps and organized skip presentation
- **Brand Refresh**: Modern gradient backgrounds and contemporary styling

### 2. **Technical Architecture**
- **Component Separation**: Modular components for maintainability
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Performance**: API caching (5-minute TTL) and optimized rendering
- **Error Handling**: Graceful error states with retry mechanisms

### 3. **Key Improvements**

#### UI/UX Enhancements
- **Progress Indicator**: Clear step-by-step navigation
- **Skip Cards**: Visual skip representations with clear pricing
- **Loading States**: Professional loading spinners
- **Responsive Grid**: Adapts from single column (mobile) to multi-column (desktop)

#### Technical Improvements
- **Smart Caching**: Reduces API calls and improves performance
- **Error Boundaries**: Proper error handling throughout the application
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Code Organization**: Clean separation of concerns

## 📁 Project Structure

```
├── app/
│   └── page.tsx                    # Main application entry
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── loading-spinner.tsx     
│   │   └── error-state.tsx         
│   ├── skip-selection/             # Feature components
│   │   ├── progress-steps.tsx      # Step indicator
│   │   ├── skip-card.tsx          # Individual skip display
│   │   └── skip-selection-page.tsx # Main container
│   └── client-page-wrapper.tsx     # Client-side interaction wrapper
├── hooks/
│   └── use-skips.ts               # Custom hook for API data
├── lib/api/
│   └── skip-api.ts                # API client with caching
├── types/
│   └── skip.types.ts              # TypeScript definitions
└── utils/
    └── price.utils.ts             # Utility functions
```

## 🔌 API Integration

**Endpoint**: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

**Implementation Features**:
- Automatic caching with 5-minute TTL
- Error handling and retry logic
- Response filtering (4-14 yard skips only)
- TypeScript-typed responses

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked skip cards
- Simplified navigation
- Touch-friendly interactions

### Desktop (> 768px)
- Multi-column grid layout
- Enhanced hover effects
- Improved visual spacing
- Desktop-optimized interactions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd skip-selection-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **View application**
   Open [http://localhost:3000](http://localhost:3000)

## 🎨 Design Decisions

### Visual Changes
- **Original**: Basic list layout with minimal styling
- **Redesign**: Modern card-based interface with gradients and shadows
- **Typography**: Improved hierarchy with better font weights and spacing
- **Colors**: Contemporary color palette with proper contrast ratios

### Functional Enhancements
- **Progress Tracking**: Added clear step indicators
- **Loading States**: Professional loading animations
- **Error Handling**: User-friendly error messages with retry options
- **Price Display**: Clear VAT-inclusive pricing with formatting

## 🔍 Key Features

### Skip Selection Cards
- Visual skip size representation
- Clear pricing with VAT included
- Feature badges (road placement, heavy waste capability)
- Smooth hover animations

### Progress Steps
- Current step highlighting
- Completed step indicators
- Clear progression path
- Responsive design

### Error Handling
- Network error recovery
- API error handling
- Loading state management
- User-friendly messaging

## 📊 Performance Optimizations

- **API Caching**: 5-minute TTL to reduce redundant requests
- **Component Memoization**: Prevent unnecessary re-renders
- **Lazy Loading**: Efficient component loading
- **Bundle Optimization**: Next.js automatic optimizations

## 🧪 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Component Architecture**: Reusable, maintainable components
- **Separation of Concerns**: Clear distinction between UI, logic, and data
