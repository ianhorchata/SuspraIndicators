# SuspraIndicators Project Roadmap

## Project Overview
SuspraIndicators is a scoring application that calculates a "Suspra Score" based on user responses across seven key sustainability domains. The application helps users understand the environmental impacts of practices and measure sustainability against planetary boundaries.

## Core Architecture

### Technology Stack
- **Frontend Framework**: Vue 3 with Composition API
- **UI Framework**: Vuetify 3 (Material Design components)
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Data Persistence**: IndexedDB (via IDB wrapper)
- **Icons**: Material Design Icons (@mdi/font)

### Project Structure
```
src/
├── App.vue                 # Main application component with navigation
├── main.js                 # Application entry point
├── router/index.js         # Route definitions
├── suspra/index.js         # Core scoring logic and reactive state
├── config/constants.js     # Global constants and reference data
├── views/                  # Page components for each sustainability domain
│   ├── IntroScreen.vue     # Initial welcome screen
│   ├── ScreenerView.vue    # Survey screening questions
│   ├── HomeView.vue        # Dashboard/home page
│   ├── CommunityView.vue   # Community sustainability questions
│   ├── FoodView.vue        # Food consumption patterns
│   ├── WaterView.vue       # Water usage patterns
│   ├── MovementView.vue    # Transportation patterns
│   ├── EnergyView.vue      # Energy consumption patterns
│   ├── GoodsView.vue       # Material consumption patterns
│   ├── HabitatView.vue     # Land use and gardening patterns
│   ├── ScoreView.vue       # Final score display
│   └── UserName.vue        # User profile information
└── components/             # Reusable UI components
```

## Sustainability Domains & Scoring

### Seven Core Domains
1. **Community** - Knowledge and engagement in sustainability
2. **Food** - Plant-based diet percentage and water consumption
3. **Water** - Daily water consumption in gallons
4. **Movement** - Sustainable transportation percentage
5. **Energy** - Gasoline and diesel consumption
6. **Goods** - Recyclable materials and composting rates
7. **Habitat** - Synthetic fertilizer and pesticide usage

### Scoring Algorithm
- Uses sigmoid functions (exp1) for normalized scoring
- Each domain contributes to the total Suspra Score
- Scores are based on planetary boundaries and sustainable thresholds
- Positive scores indicate sustainable practices, negative scores indicate unsustainable practices

### Key Mathematical Functions
```javascript
// Sigmoid function for normalized scoring
function exp1(v, n) {
  return (1 / (1 + Math.exp(8 * v - 4)) - n) * 20
}

// Example scoring for food domain
const scoreFood = computed(() => 
  exp1(suspra.value.food.percentagePlantBased, 0.1192) +
  exp1(suspra.value.food.percentageWater, 0.5)
)
```

## Data Management

### IndexedDB Schema
- **Database Name**: SuspraDB
- **Object Stores**: 
  - `survey-status` - Tracks survey completion
  - `community`, `food`, `water`, `movement`, `energy`, `goods`, `habitat` - Domain-specific data
  - `user` - User profile information

### State Management
- Uses Vue 3 reactive refs for global state
- Centralized state in `src/suspra/index.js`
- Computed properties for real-time score calculations

## User Experience Flow

### Survey Progression
1. **Intro Screen** - Welcome and explanation
2. **Screener** - Initial qualifying questions
3. **Domain Surveys** - Seven sustainability domains
4. **Score Display** - Final calculated score
5. **User Profile** - Optional user information

### Navigation Logic
- App bar and navigation drawer only appear after survey completion
- Survey completion is determined by checking IndexedDB for data
- Users can navigate between completed domains freely

## Development Guidelines

### Code Style
- Use Vue 3 Composition API with `<script setup>`
- Follow Vuetify Material Design patterns
- Implement responsive design principles
- Use TypeScript-style JSDoc comments for documentation

### State Management Patterns
- Keep domain-specific data in IndexedDB
- Use reactive refs for UI state
- Implement computed properties for derived values
- Maintain separation between data persistence and UI state

### Component Architecture
- Each view component handles its own domain
- Reusable components in `src/components/`
- Consistent form patterns across all survey views
- Progressive disclosure for complex questions

## Future Development Priorities

### Short-term Goals
- [ ] Improve survey question clarity and flow
- [ ] Add data validation and error handling
- [ ] Implement score history and trends
- [ ] Add export/import functionality for user data

### Medium-term Goals
- [ ] Add comparative analytics (how user compares to others)
- [ ] Implement personalized sustainability recommendations
- [ ] Add offline functionality improvements
- [ ] Create admin dashboard for survey management

### Long-term Goals
- [ ] Advanced analytics and reporting

## Technical Debt & Known Issues
- Constants file has circular reference issues
- Scoring algorithms need validation against real-world data
- Error handling could be more robust

## Team Responsibilities
- **Eric**: Technical direction and architecture oversight
- **Fred**: Project management and forward momentum
- **Cordy**: Survey design, question wording, and survey logic
- **Everett**: User interface and data persistence
- **Ian**: Sustainability scoring algorithms and environmental impact calculations

## Deployment
- Single-page application (SPA) deployed on Netlify
- IndexedDB for client-side data storage
