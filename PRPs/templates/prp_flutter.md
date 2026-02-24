name: "Flutter/Dart PRP Template v1 - Mobile-First Implementation"
description: |

---

## Goal

**Feature Goal**: [Specific, measurable Flutter app feature - widget, screen, service integration]

**Deliverable**: [Concrete artifact - Flutter widget, screen, service class, platform integration]

**Success Definition**: [How you'll know this is complete and working on target platforms]

## 🌐 Multilingual Requirements

**Required Languages**: 
- ✅ English (Primary)
- ✅ French (Required)

**Optional Languages** (implement as needed):
- 🔄 German
- 🔄 Portuguese  
- 🔄 Spanish
- 🔄 Mandarin Chinese

**Flutter i18n Strategy**:
- [ ] flutter_localizations and intl package integration from project start
- [ ] ARB files for translation management (app_en.arb, app_fr.arb)
- [ ] Locale detection and device language support
- [ ] Localized date/time/number formatting
- [ ] Directionality support for RTL languages (if needed)
- [ ] Platform-specific locale handling (iOS/Android)
- [ ] Dynamic locale switching within app

**Implementation Notes**:
- All user-facing strings must use localized methods (S.of(context).text)
- Images with text must have localized variants
- App name and descriptions must be translated in platform stores
- Error messages and validation text must be translatable
- Date pickers, time formatters must respect locale
- Number formatting must follow locale conventions

## 🎭 Flutter Animation & GSAP-Inspired Typography System Requirements

### **GSAP-Inspired Flutter Animation Strategy** (Cross-Platform Motion Consistency)

**1. GSAP Animation Pattern Translation to Flutter:**
```yaml
gsap_flutter_equivalents:
  gsap_timeline_to_flutter:
    - [ ] GSAP timeline sequences → AnimationController with multiple Tweens
    - [ ] GSAP stagger animations → Interval-based animations with delays
    - [ ] GSAP scroll triggers → ScrollController with animation listeners
    - [ ] GSAP easing functions → Custom Curves or built-in Flutter curves
  
  animation_tier_mapping:
    essential_flutter: # GSAP Essential → Flutter Basic
      - [ ] gsap.to() → AnimatedContainer or Tween animations
      - [ ] Hover effects → GestureDetector with AnimatedBuilder
      - [ ] Page transitions → Custom PageRouteBuilder
      - [ ] Loading states → CircularProgressIndicator with custom animations
    
    advanced_flutter: # GSAP Advanced → Flutter Complex
      - [ ] ScrollTrigger → ScrollController with animation coordination
      - [ ] Timeline sequences → AnimationController with multiple Intervals
      - [ ] Interactive drag → Draggable with AnimationController
      - [ ] Modal transitions → Hero animations with custom routes
    
    performance_flutter: # GSAP Performance → Flutter Optimized
      - [ ] 60fps consistency → vsync: this in StatefulWidget
      - [ ] Memory management → dispose() patterns for AnimationController
      - [ ] Custom ticker → SingleTickerProviderStateMixin
      - [ ] Optimized rebuilds → AnimatedBuilder and selective setState
```

**2. Cross-Platform Animation Language Consistency:**
```yaml
animation_consistency_strategy:
  timing_synchronization:
    - [ ] Match GSAP web timing with Flutter animation durations
    - [ ] Use consistent easing curves across platforms
    - [ ] Maintain same visual rhythm and pacing
    - [ ] Coordinate gesture response times (web vs mobile)
  
  visual_parity:
    - [ ] Translate GSAP scroll effects to Flutter scroll physics
    - [ ] Match micro-interaction patterns between web and mobile
    - [ ] Ensure brand animation language consistency
    - [ ] Adapt web animations for touch interfaces
```

**3. Flutter Animation Framework Selection:**
- [ ] **Built-in Flutter Animations**: Core system using AnimationController, Tween, AnimatedWidget
- [ ] **Rive Integration**: Interactive vector animations for complex micro-interactions
- [ ] **Lottie Flutter**: After Effects animations for brand consistency with web
- [ ] **Custom Physics**: SpringDescription for natural feeling animations
- [ ] Using custom Animation Controllers? (Complex timeline animations)
- [ ] Using AnimatedBuilder patterns? (Custom animation widgets)
- [ ] Using Implicit vs Explicit animations? (Specify usage patterns)

**2. Flutter Typography & Text System**:
- [ ] Using Material Design 3 TextTheme? (Specify customizations to headline, body, label styles)
- [ ] Using Cupertino typography? (iOS-style text with SF Pro font family)
- [ ] Using Google Fonts package? (Specify primary and accent font families)
- [ ] Using custom font families? (Font files, licensing, multilingual support)
- [ ] Using responsive text scaling? (TextScaler, MediaQuery textScaleFactor)
- [ ] Using rich text formatting? (RichText, TextSpan, markdown rendering)

**3. Flutter Animation Implementation:**
```yaml
flutter_animations:
  micro_interactions:
    - [ ] Button press animations (scale, ripple, color transitions)
    - [ ] Loading animations (spinners, progress indicators, skeleton screens)
    - [ ] Input focus animations (border highlight, label movement, validation states)
    - [ ] List item interactions (swipe actions, selection states, reorder animations)
    - [ ] Navigation transitions (slide, fade, scale, hero transitions)
    
  hero_animations:
    - [ ] Image gallery transitions (shared element transitions)
    - [ ] Product detail expansions (card to detail screen)
    - [ ] Profile avatar animations (thumbnail to full view)
    - [ ] FAB to page transitions (Material Design morph)
    
  content_animations:
    - [ ] Staggered list animations (cascade entrance effects)
    - [ ] Tab switching animations (slide, crossfade, scale)
    - [ ] Modal presentations (slide up, fade in, scale)
    - [ ] Pull to refresh animations (Material and Cupertino styles)
    - [ ] Empty state animations (illustrations, call-to-action)
    
  performance_targets:
    - [ ] 60 FPS on target devices (iPhone 12+, Android API 26+)
    - [ ] Battery efficient animations (avoid expensive operations)
    - [ ] Reduced motion accessibility (respect system preferences)
    - [ ] Memory conscious animations (dispose controllers properly)
```

**4. Flutter Typography Implementation:**
```yaml
flutter_typography:
  text_theme_customization:
    - [ ] Heading hierarchy (displayLarge, headlineLarge, titleLarge, etc.)
    - [ ] Body text optimization (bodyLarge, bodyMedium for readability)
    - [ ] Label and caption styling (labelLarge, bodySmall for UI elements)
    - [ ] Font weight variations (light, regular, medium, bold, black)
    - [ ] Letter spacing and line height (tracking, leading for readability)
    
  responsive_typography:
    - [ ] Screen size adaptation (phone, tablet, desktop scaling)
    - [ ] Accessibility scaling (large text support, min/max constraints)
    - [ ] Orientation handling (portrait vs landscape text sizing)
    - [ ] Platform conventions (Material vs Cupertino typography scales)
    
  multilingual_typography:
    - [ ] Font fallbacks for non-Latin scripts (Chinese, Arabic, etc.)
    - [ ] Right-to-left text support (Arabic, Hebrew directionality)
    - [ ] Script-specific line spacing (CJK languages, Devanagari)
    - [ ] Locale-specific number formatting (digits, currencies)
    
  performance_optimization:
    - [ ] Font loading strategy (preload critical fonts)
    - [ ] Font subsetting (include only required characters)
    - [ ] Font display optimization (swap, fallback, block strategies)
    - [ ] Text rendering performance (avoid expensive text operations)
```

**5. Flutter Animation Architecture:**
```dart
// Animation System Structure
lib/core/animations/
├── animation_constants.dart      # Duration, curve, and timing constants
├── animation_controllers.dart    # Reusable animation controller patterns
├── transition_builders.dart      # Custom page transition builders
└── micro_interactions.dart       # Button, input, and gesture animations

lib/shared/widgets/animated/
├── animated_button.dart          # Standardized button animations
├── animated_list_item.dart       # List item interaction animations
├── loading_animations.dart       # Various loading state animations
└── hero_wrappers.dart           # Hero animation wrapper widgets

// Typography System Structure
lib/core/typography/
├── text_theme.dart              # Custom TextTheme definitions
├── font_weights.dart            # Semantic font weight constants
├── text_styles.dart             # Reusable text style components
└── responsive_text.dart         # Screen-size adaptive text widgets
```

**6. Professional Animation & Typography Standards:**
```yaml
animation_quality_standards:
  - [ ] Consistent easing curves throughout app (Material curves: standard, decelerate, accelerate)
  - [ ] Appropriate animation durations (150ms micro, 300ms standard, 500ms complex)
  - [ ] Respect user's reduced motion preferences (MediaQuery.disableAnimations)
  - [ ] Smooth performance on lower-end devices (animation frame budget)
  - [ ] Accessible animation descriptions (Semantics for screen readers)
  
typography_quality_standards:
  - [ ] Consistent text hierarchy and spacing system
  - [ ] Optimal reading experience (contrast ratios, line lengths)
  - [ ] Platform-appropriate font rendering (iOS vs Android differences)
  - [ ] Multilingual text rendering accuracy (proper fonts for all locales)
  - [ ] Performance-optimized font loading and rendering
```

## 🎨 Template & Design System Requirements

**Flutter Template/Design Framework Questions (Must Answer Before Development)**:

**1. Existing Flutter UI Framework/Template?**
- [ ] Using Flutter Material Design 3? (Specify theme customizations)
- [ ] Using Flutter Cupertino (iOS-style)? (iPhone/iPad specific needs)
- [ ] Using custom Flutter template? (Template source and structure)
- [ ] Using design system package? (FlutterFlow, Widgetbook, custom package)
- [ ] Starting from scratch? (Justify approach and design decisions)

**2. Template Structure & Framework:**
- **Template Source**: `[Material 3 / Cupertino / Custom Template / Design System Package / Figma Design]`
- **Template Path**: `[/path/to/flutter/template/folder or pub.dev package]`
- **Theming Approach**: `[Material ThemeData / CupertinoThemeData / Custom Theme / Design Tokens]`
- **State Management**: `[BLoC / Provider / Riverpod / GetX / Custom]`
- **Navigation**: `[Go Router / Auto Route / Native Navigator / Custom]`

**3. Flutter-Specific Asset Strategy:**
- **Asset Organization**: `[assets/images / assets/icons / assets/fonts / lib/assets]`
- **Asset Requirements**:
  - **App Icons**: `[Adaptive icons / Platform-specific / Template icons]`
  - **Images**: `[Hero images / Product photos / Background images / Illustrations]`
  - **Icons**: `[Material Icons / Cupertino Icons / Custom SVG / Icon fonts]`
  - **Fonts**: `[Google Fonts / Custom fonts / System fonts]`
- **Asset Generation**: `[AI-generated / Designer-provided / Template assets / None needed]`
- **Responsive Strategy**: `[flutter_screenutil / MediaQuery / LayoutBuilder / Custom]`

**4. Mobile Layout & Component Architecture:**
- **App Structure**: `[Single page / Tab-based / Drawer navigation / Bottom nav / Custom]`
- **Screen Types**: `[Dashboard / List/Detail / Forms / Settings / Profile / Onboarding]`
- **UI Patterns**: `[Cards / Lists / Grids / Carousels / Bottom sheets / Modals]`
- **Platform Adaptivity**: `[Material on Android / Cupertino on iOS / Unified design / Custom per platform]`

**5. Flutter Component & Theme Configuration:**
```yaml
# Material Design 3 Setup (if using)
material_setup:
  theme_customizations:
    - [ ] Custom color scheme (primary, secondary, surface)
    - [ ] Typography customization (headings, body, labels)
    - [ ] Shape customization (rounded corners, borders)
    - [ ] Component theme overrides (buttons, cards, inputs)
  
  components_needed:
    - [ ] AppBar, BottomNavigationBar, Drawer
    - [ ] Card, ListTile, Chip, Badge  
    - [ ] TextField, Button, FloatingActionButton
    - [ ] Dialog, BottomSheet, SnackBar
    - [ ] DataTable, Expansion panels

# Custom Theme Configuration
flutter_theming:
  - [ ] Light and dark theme support
  - [ ] Brand color integration
  - [ ] Typography scale and fonts
  - [ ] Spacing and sizing system
```

**6. Development Workflow Strategy:**
```yaml
pre_development_phase:
  - [ ] Template analysis and widget inventory
  - [ ] Asset planning and generation strategy
  - [ ] Theme customization and color scheme
  - [ ] Screen flow and navigation structure
  - [ ] Platform-specific adaptation needs
  
development_phase:
  - [ ] Follow Flutter/Dart conventions from template
  - [ ] Extend existing widgets vs custom widgets
  - [ ] Maintain design consistency across screens
  - [ ] Implement responsive design patterns
  - [ ] Test on multiple screen sizes and platforms
```

## User Persona (if applicable)

**Target User**: [Mobile app user - end user, developer, admin, etc.]

**Use Case**: [Primary mobile scenario when this feature will be used]

**User Journey**: [Step-by-step mobile interaction flow with this feature]

**Pain Points Addressed**: [Mobile-specific user frustrations this feature solves]

## Why

- [Mobile user value and engagement impact]
- [Integration with existing app features]
- [Platform-specific problems this solves]

## What

[User-visible mobile behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable outcomes on target platforms]
- [ ] [Performance metrics - load times, memory usage]
- [ ] [Platform compatibility - iOS/Android specific requirements]

## Recommended Skills for This PRP

> **Reference**: See `skills-ecosystem/prp-skill-maps/SKILL-PRP-MAPPING.md` for full mapping.

```yaml
# Flutter skills activation
skills_context:
  flutter_core: # REQUIRED for all Flutter projects
    required:
      - flutter-expert            # Flutter 3+, Riverpod/Bloc, GoRouter, performance
      - flutter-adaptive-ui       # Responsive across all platforms and screen sizes
      - flutter-animations        # Implicit, explicit, hero, staggered, physics
      - flutter-testing           # Unit, widget, integration tests, mocking
      - flutter-internationalization # gen-l10n, intl, ARB, locale detection

  mobile_ux: # REQUIRED for polished mobile apps
    required:
      - mobile-touch              # iOS/Android gestures, haptic feedback, touch
    recommended:
      - ui-ux-pro-max             # Design intelligence for mobile UI
      - icon-design               # Semantic icon selection

  typography: # For text-heavy apps
    recommended:
      - typography                # Type scales, hierarchy, dark mode
      - font-pairing-suggester   # Font combinations for mobile

  backend_integration: # For apps with API backends
    recommended:
      - python-pro                # If Python backend
      - nodejs-backend-patterns   # If Node.js backend
      - better-auth-best-practices # Authentication
```

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about Flutter or this codebase, would they have everything needed to implement this mobile feature successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://docs.flutter.dev/development/ui/widgets/[specific-widget-category]
  why: [Specific Flutter widget patterns needed for implementation]
  critical: [Key Flutter insights that prevent common mobile development errors]

- url: https://pub.dev/packages/[package-name]#[section]
  why: [Specific package methods/patterns needed]
  critical: [Package gotchas and mobile-specific configurations]

- file: lib/[domain]/[existing_pattern_file].dart
  why: [Specific Flutter pattern to follow - widget structure, state management, etc.]
  pattern: [Brief description of Flutter pattern to extract]
  gotcha: [Known Flutter/mobile constraints or limitations to avoid]

- docfile: PRPs/ai_docs/flutter_patterns.md
  why: [Custom Flutter documentation for complex mobile patterns]
  section: [Specific section if document is large]
```

### Current Codebase tree (run `find lib -name "*.dart" | head -20` to understand Flutter structure)

```bash
lib/
├── main.dart
├── app/
├── features/
├── shared/
└── core/
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
lib/
├── features/[feature_name]/
│   ├── data/
│   │   ├── models/[feature]_model.dart        # Data models and JSON serialization
│   │   ├── repositories/[feature]_repository.dart  # Data access layer
│   │   └── datasources/[feature]_remote_datasource.dart  # API integration
│   ├── domain/
│   │   ├── entities/[feature]_entity.dart     # Business entities
│   │   ├── usecases/[feature]_usecase.dart    # Business logic
│   │   └── repositories/[feature]_repository.dart  # Repository interface
│   └── presentation/
│       ├── bloc/[feature]_bloc.dart          # State management
│       ├── pages/[feature]_page.dart         # Screen/page widget
│       └── widgets/[feature]_widget.dart     # Feature-specific widgets
```

### Known Gotchas of Flutter & Dart Quirks

```dart
// CRITICAL: Flutter requires async/await patterns for most operations
// Example: Navigator operations should be awaited
await Navigator.pushNamed(context, '/route');

// CRITICAL: StatefulWidget lifecycle management
// Always dispose controllers in dispose() method
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}

// CRITICAL: BuildContext usage in async operations
// Store context reference before async operations
final navigator = Navigator.of(context);
await someAsyncOperation();
navigator.pushNamed('/next');

// CRITICAL: Platform-specific code requires platform checks
if (Platform.isIOS) {
  // iOS-specific implementation
} else if (Platform.isAndroid) {
  // Android-specific implementation
}
```

## Implementation Blueprint

### Data models and structure

Create the core Flutter data models ensuring type safety and JSON serialization.

```dart
// Data Models Examples:
// - Freezed data classes for immutability
// - JSON serialization with json_annotation
// - Equatable for value equality
// - Input validation with built_value or similar

@freezed
class FeatureModel with _$FeatureModel {
  const factory FeatureModel({
    required String id,
    required String title,
    String? description,
    @Default(false) bool isActive,
  }) = _FeatureModel;

  factory FeatureModel.fromJson(Map<String, dynamic> json) =>
      _$FeatureModelFromJson(json);
}
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task -1: ANALYZE Flutter template and design system
  - ANALYZE: Template widget structure, theming, and design patterns  
  - INVENTORY: Available Material/Cupertino widgets, custom components, assets
  - MAP: Template screens and flows to project requirements
  - IDENTIFY: Required custom widgets and theme modifications
  - PLAN: Asset generation strategy (icons, images, illustrations)  
  - DOCUMENT: Template customization rules and Flutter conventions
  - VALIDATE: Template compatibility with target platforms and project goals

Task -0.7: SETUP Flutter database and authentication system (IF database required)
  - CONFIGURE: Firebase Authentication with email/password and OAuth providers
  - SETUP: Firestore security rules for user data and role-based access
  - CREATE: User model with proper serialization (freezed/json_annotation)
  - IMPLEMENT: Authentication service with auto sign-in and user state management
  - CREATE: Database service with CRUD operations and offline support
  - SETUP: Multi-platform authentication (Google Sign-In, Apple Sign-In)
  - CONFIGURE: Secure storage for user tokens and sensitive data
  - INTEGRATE: Authentication state with app navigation and UI components

Task -0.6: SETUP Flutter payment system (IF payments required)
  - CONFIGURE: Stripe Flutter SDK with publishable keys
  - IMPLEMENT: Payment sheet integration for iOS and Android
  - SETUP: Apple Pay and Google Pay native integration
  - CREATE: Shopping cart provider/bloc with persistent state
  - IMPLEMENT: Checkout flow with payment validation and error handling
  - SETUP: Webhook listeners for payment status updates
  - CREATE: Order management with local database synchronization
  - INTEGRATE: In-app purchases for digital products (if applicable)

Task -0.5: SETUP Flutter animation and typography system
  - CREATE: lib/core/animations/ directory structure with constants, controllers, transitions
  - CREATE: lib/core/typography/ directory with text themes, font weights, responsive text
  - CONFIGURE: AnimationController base classes and common curves (standard, decelerate, accelerate)
  - CONFIGURE: TextTheme customizations for Material/Cupertino with proper hierarchy
  - SETUP: Font loading strategy with Google Fonts or custom fonts
  - SETUP: Animation performance monitoring and reduced motion support
  - CREATE: lib/shared/widgets/animated/ with reusable animated components
  - VALIDATE: Animation performance targets (60fps) and typography rendering
  - DOCUMENT: Animation and typography usage patterns and best practices

Task 0: SETUP Flutter i18n infrastructure
  - ADD: flutter_localizations and intl to pubspec.yaml dependencies
  - CREATE: l10n.yaml configuration file
  - CREATE: lib/l10n/app_en.arb and lib/l10n/app_fr.arb files
  - GENERATE: lib/l10n/app_localizations.dart using flutter gen-l10n
  - CONFIGURE: MaterialApp with localizationsDelegates and supportedLocales
  - CREATE: lib/core/localization/ directory for locale management
  - FOLLOW pattern: Flutter official i18n documentation
  - NAMING: Standard locale codes and ARB key conventions
  - PLACEMENT: Root level l10n setup with generated delegates

Task 1: CREATE lib/features/[domain]/data/models/[domain]_model.dart
  - IMPLEMENT: [Domain]Model with Freezed and JSON serialization
  - FOLLOW pattern: lib/features/existing/data/models/existing_model.dart
  - NAMING: PascalCase for classes, camelCase for properties
  - DEPENDENCIES: freezed, json_annotation packages
  - PLACEMENT: Feature-specific data layer

Task 2: CREATE lib/features/[domain]/domain/entities/[domain]_entity.dart
  - IMPLEMENT: [Domain]Entity business object
  - FOLLOW pattern: lib/features/existing/domain/entities/
  - NAMING: Entity suffix, pure business logic
  - DEPENDENCIES: Import models from Task 1
  - PLACEMENT: Domain layer for business rules

Task 3: CREATE lib/features/[domain]/data/repositories/[domain]_repository.dart
  - IMPLEMENT: [Domain]RepositoryImpl with error handling
  - FOLLOW pattern: lib/features/existing/data/repositories/
  - NAMING: RepositoryImpl suffix, async methods
  - DEPENDENCIES: Import entities from Task 2, datasources
  - PLACEMENT: Data layer implementation

Task 4: CREATE lib/features/[domain]/presentation/bloc/[domain]_bloc.dart
  - IMPLEMENT: [Domain]Bloc with states and events using bloc pattern
  - FOLLOW pattern: lib/features/existing/presentation/bloc/
  - NAMING: Bloc suffix, sealed classes for states/events
  - DEPENDENCIES: Import usecases, flutter_bloc
  - PLACEMENT: Presentation layer state management

Task 5: CREATE lib/features/[domain]/presentation/pages/[domain]_page.dart
  - IMPLEMENT: [Domain]Page StatelessWidget with BlocProvider
  - FOLLOW pattern: lib/features/existing/presentation/pages/
  - NAMING: Page suffix, responsive design
  - DEPENDENCIES: Import bloc from Task 4, Material/Cupertino widgets
  - PLACEMENT: Presentation layer screens

Task 6: CREATE test/features/[domain]/[domain]_test.dart
  - IMPLEMENT: Unit tests for all layers (data, domain, presentation)
  - FOLLOW pattern: test/features/existing/
  - NAMING: test suffix, group by layers
  - MOCK: External dependencies with mockito
  - COVERAGE: All public methods, widget tests, bloc tests
  - PLACEMENT: Mirror lib structure in test/
```

### Implementation Patterns & Key Details

```dart
// Flutter BLoC pattern for state management
class FeatureBloc extends Bloc<FeatureEvent, FeatureState> {
  FeatureBloc({required this.usecase}) : super(FeatureInitial()) {
    on<LoadFeature>(_onLoadFeature);
    on<RefreshFeature>(_onRefreshFeature);
  }

  Future<void> _onLoadFeature(
    LoadFeature event,
    Emitter<FeatureState> emit,
  ) async {
    emit(FeatureLoading());
    try {
      final result = await usecase(event.params);
      emit(FeatureLoaded(data: result));
    } catch (e) {
      emit(FeatureError(message: e.toString()));
    }
  }
}

// Flutter widget pattern with responsive design
class FeatureWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<FeatureBloc, FeatureState>(
      builder: (context, state) {
        return switch (state) {
          FeatureInitial() => const SizedBox.shrink(),
          FeatureLoading() => const Center(child: CircularProgressIndicator()),
          FeatureLoaded(:final data) => _buildContent(context, data),
          FeatureError(:final message) => _buildError(context, message),
        };
      },
    );
  }
}

// Flutter platform-specific implementations
class PlatformService {
  static Future<String> getPlatformInfo() async {
    if (Platform.isIOS) {
      return await _getIOSInfo();
    } else if (Platform.isAndroid) {
      return await _getAndroidInfo();
    }
    return 'Unsupported platform';
  }
}
```

### Integration Points

```yaml
DEPENDENCIES:
  - add to: pubspec.yaml
  - pattern: |
      dependencies:
        flutter_bloc: ^8.1.3
        freezed: ^2.4.5
        json_annotation: ^4.9.0
      dev_dependencies:
        build_runner: ^2.4.6
        freezed_annotation: ^2.4.1

ROUTING:
  - add to: lib/app/router.dart or lib/main.dart
  - pattern: |
      routes: {
        '/feature': (context) => FeaturePage(),
      }

STATE_MANAGEMENT:
  - add to: lib/app/app.dart or relevant provider
  - pattern: |
      BlocProvider<FeatureBloc>(
        create: (context) => sl<FeatureBloc>(),
        child: FeaturePage(),
      )

DEPENDENCY_INJECTION:
  - add to: lib/core/injection.dart or service_locator.dart
  - pattern: |
      sl.registerLazySingleton<FeatureRepository>(
        () => FeatureRepositoryImpl(remoteDataSource: sl()),
      );
```

## Validation Loop

### Level 1: Flutter Analysis & Formatting (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
flutter analyze lib/features/[new_feature]/     # Analyze specific feature
dart format lib/features/[new_feature]/ --fix  # Format code
flutter pub get                                 # Update dependencies

# Project-wide validation  
flutter analyze                                 # Full project analysis
dart format lib/ --fix                         # Format all code
flutter pub deps                                # Check dependency conflicts

# Expected: Zero analysis issues. If errors exist, READ output and fix before proceeding.
```

### Level 2: Unit Tests (Component Validation)

```bash
# Test each component as it's created
flutter test test/features/[domain]/data/      # Test data layer
flutter test test/features/[domain]/domain/    # Test domain layer  
flutter test test/features/[domain]/presentation/  # Test presentation layer

# Feature-wide testing
flutter test test/features/[domain]/           # All feature tests
flutter test --coverage                        # Generate coverage report

# Widget testing
flutter test test/widget_test.dart             # Widget integration tests

# Expected: All tests pass. If failing, debug and fix implementation.
```

### Level 3: Integration Testing (App Validation)

```bash
# Flutter app startup validation
flutter run --debug &                          # Start debug app
sleep 10                                       # Allow startup time

# Integration tests
flutter drive --target=test_driver/app_test.dart  # End-to-end tests

# Platform-specific validation
flutter build apk --debug                      # Android build test
flutter build ios --debug                      # iOS build test (macOS only)

# Performance testing
flutter run --profile --trace-startup          # Startup performance
flutter drive --profile --trace-startup        # Runtime performance

# Expected: App builds and runs on target platforms, integration tests pass
```

### Level 4: Flutter-Specific & Creative Validation

```bash
# ═══════════════════════════════════════════════════════════
# SKILL-POWERED VALIDATION GATES
# ═══════════════════════════════════════════════════════════

# --- Flutter Core (skills: flutter-expert, flutter-testing) ---
flutter doctor                                  # Environment check
flutter pub deps                                # Dependency analysis
flutter analyze --fatal-infos                  # Strict analysis
dart fix --apply                               # Apply suggested fixes

# --- Platform Build (skills: flutter-adaptive-ui) ---
flutter test integration_test/                 # Integration tests
flutter build apk --release                    # Release build validation
flutter build appbundle                        # Play Store bundle
# iOS: flutter build ios && xcrun simctl boot "iPhone 14"
# Android: flutter build apk && flutter install

# --- Performance (skills: flutter-animations) ---
flutter run --profile                          # Performance profiling
dart devtools                                  # DevTools analysis
flutter pub publish --dry-run                  # Package quality check (if applicable)

# --- Animation Validation (skills: flutter-animations) ---
flutter test test/animations/                      # Animation widget tests
flutter run --profile --trace-startup             # Animation performance profiling
dart devtools                                      # Monitor animation frame times
# Check: animations run at 60fps, no jank frames

# --- Typography & Design (skills: typography, mobile-touch) ---
flutter test test/typography/                      # Typography rendering tests
flutter run --dart-define=FLUTTER_WEB_USE_SKIA=true  # Font rendering validation
# Check: font pairings match platform conventions (Material/Cupertino)
# Check: touch targets minimum 48dp, proper spacing scale

# --- Internationalization (skills: flutter-internationalization) ---
# Verify locale files complete, RTL layout support if needed
# flutter test test/l10n/                         # Localization tests

# Expected: All validations pass, performance meets mobile standards, animations run at 60fps
```

## Final Validation Checklist

### Technical Validation

- [ ] All 4 validation levels completed successfully
- [ ] All tests pass: `flutter test`
- [ ] No analysis issues: `flutter analyze`
- [ ] Code properly formatted: `dart format lib/ --set-exit-if-changed`
- [ ] Dependencies updated: `flutter pub get`

### Mobile Feature Validation

- [ ] All success criteria from "What" section met
- [ ] Manual testing on target platforms successful
- [ ] Error cases handled gracefully with user-friendly messages
- [ ] Navigation and state management work as specified
- [ ] Mobile user experience requirements satisfied

### Flutter Code Quality Validation

- [ ] Follows Flutter/Dart conventions and naming patterns
- [ ] File placement matches Clean Architecture structure
- [ ] Anti-patterns avoided (check against Anti-Patterns section)
- [ ] Platform-specific code properly implemented
- [ ] Memory leaks prevented (controllers disposed)
- [ ] Responsive design works across screen sizes

### Mobile Performance & UX

- [ ] App startup time within acceptable limits (<3s)
- [ ] Smooth animations and transitions (60fps)
- [ ] Proper loading states and error handling
- [ ] Offline functionality considered (if applicable)
- [ ] Platform-specific UI guidelines followed (Material/Cupertino)

---

## Anti-Patterns to Avoid

- ❌ Don't use StatefulWidget when StatelessWidget suffices
- ❌ Don't forget to dispose controllers and streams
- ❌ Don't use BuildContext across async gaps
- ❌ Don't ignore platform-specific design guidelines
- ❌ Don't create deep widget trees - use composition
- ❌ Don't use setState for complex state - use BLoC/Provider
- ❌ Don't hardcode screen dimensions - use MediaQuery
- ❌ Don't ignore memory management on mobile devices