# Execute Flutter BASE PRP

## PRP: $ARGUMENTS

## Flutter Execution Mission

Execute the specified Flutter PRP with **mobile-first implementation excellence** through systematic Flutter development workflow and rigorous mobile validation.

**Critical Understanding**: You are implementing a Flutter mobile application feature that must:

- Work seamlessly on both iOS and Android platforms
- Follow Flutter/Dart best practices and Clean Architecture
- Achieve smooth 60fps performance on mobile devices
- Pass all Flutter-specific validation gates

**Success Metric**: Complete, working Flutter feature that passes all 4 validation levels and meets mobile user experience standards.

## Flutter Execution Workflow

### Phase 1: Flutter PRP Analysis and Planning

1. **Load and Parse Flutter PRP**
   ```bash
   # Read the Flutter PRP file
   cat PRPs/flutter-{prp-name}.md
   ```

2. **Flutter Environment Validation**
   ```bash
   # Verify Flutter development environment
   flutter doctor
   flutter --version
   dart --version
   ```

3. **FLUTTER ULTRATHINK Planning**
   - Use TodoWrite tool to create comprehensive implementation plan
   - Break down Flutter PRP into specific mobile development tasks
   - Plan Flutter Clean Architecture layers (data/domain/presentation)
   - Identify Flutter dependencies and platform-specific requirements
   - Create systematic approach following the Flutter PRP blueprint

### Phase 2: Flutter Implementation Execution

1. **Execute Implementation Tasks**
   - Follow the exact task order from the Flutter PRP
   - Implement each Flutter layer systematically:
     - Data layer: Models, repositories, datasources
     - Domain layer: Entities, use cases, repository interfaces  
     - Presentation layer: BLoC/Cubit, pages, widgets
   - Create Flutter tests for each component as specified

2. **Use Flutter-Specialized Subagents**
   - Spawn flutter-architect for complex architectural decisions
   - Use codebase-analyst for Flutter pattern discovery
   - Leverage library-researcher for Flutter package integration

### Phase 3: Flutter Validation Loop Execution

**CRITICAL**: Run each validation level in sequence. Do not proceed to next level until current level passes completely.

#### Level 1: Flutter Analysis & Formatting
```bash
# Run after each Flutter file creation - fix before proceeding
flutter analyze lib/features/{new_feature}/     # Analyze specific feature
dart format lib/features/{new_feature}/ --fix  # Format Dart code
flutter pub get                                 # Update dependencies

# Project-wide Flutter validation  
flutter analyze                                 # Full project analysis
dart format lib/ --fix                         # Format all Dart code
flutter pub deps                                # Check dependency conflicts

# EXPECTED: Zero analysis issues. If errors exist, READ output and fix before proceeding.
```

#### Level 2: Flutter Testing
```bash
# Test each Flutter component as it's created
flutter test test/features/{domain}/data/       # Test data layer
flutter test test/features/{domain}/domain/     # Test domain layer  
flutter test test/features/{domain}/presentation/  # Test presentation layer

# Feature-wide Flutter testing
flutter test test/features/{domain}/            # All feature tests
flutter test --coverage                         # Generate coverage report

# Widget testing
flutter test test/widget_test.dart              # Widget integration tests

# EXPECTED: All Flutter tests pass. If failing, debug and fix implementation.
```

#### Level 3: Flutter App Integration
```bash
# Flutter app startup validation
flutter run --debug &                           # Start debug app
sleep 10                                        # Allow startup time

# Integration tests
flutter drive --target=test_driver/app_test.dart  # End-to-end tests

# Platform-specific validation
flutter build apk --debug                       # Android build test
flutter build ios --debug                       # iOS build test (macOS only)

# Performance testing
flutter run --profile --trace-startup           # Startup performance
flutter drive --profile --trace-startup         # Runtime performance

# EXPECTED: App builds and runs on target platforms, integration tests pass
```

#### Level 4: Flutter Production Readiness
```bash
# Flutter-specific validations
flutter doctor                                  # Environment check
flutter pub deps                                # Dependency analysis
flutter analyze --fatal-infos                  # Strict analysis

# Platform testing
flutter test integration_test/                 # Integration tests
flutter build apk --release                    # Release build validation
flutter build appbundle                        # Play Store bundle

# Performance validation
flutter run --profile                          # Performance profiling
dart devtools                                  # DevTools analysis

# Code quality
dart fix --apply                               # Apply suggested fixes
flutter pub publish --dry-run                  # Package quality check (if applicable)

# EXPECTED: All validations pass, performance meets mobile standards
```

### Phase 4: Flutter Final Validation

**Execute Flutter Final Validation Checklist from PRP**

Run through every item in the "Final Validation Checklist" section of the Flutter PRP:

- [ ] Technical Validation (all 4 levels pass)
- [ ] Mobile Feature Validation (user experience requirements)
- [ ] Flutter Code Quality Validation (architecture and conventions)
- [ ] Mobile Performance & UX (60fps, startup time, responsive design)

## Flutter Error Handling Protocol

### When Flutter Validation Fails

1. **Read Error Output Carefully**
   - Flutter analyzer provides specific line numbers and suggestions
   - Use `flutter doctor` to diagnose environment issues
   - Check Flutter logs with `flutter logs`

2. **Fix Issues Systematically**
   - Fix syntax and analysis errors first (Level 1)
   - Then address test failures (Level 2)
   - Finally resolve integration issues (Level 3)

3. **Use Flutter-Specific Debug Tools**
   ```bash
   # Flutter debugging commands
   flutter analyze --verbose                    # Detailed analysis
   flutter test --reporter=verbose             # Detailed test output
   flutter run --verbose                       # Detailed run output
   dart devtools                               # Visual debugging tools
   ```

4. **Leverage Flutter Subagents**
   - Use flutter-architect for architectural fixes
   - Spawn debugger subagent for complex Flutter issues
   - Use library-researcher for Flutter package problems

## Flutter Implementation Standards

### Flutter Code Organization
- Follow Clean Architecture in lib/ directory
- Use feature-based folder structure
- Implement proper separation of concerns
- Follow Flutter/Dart naming conventions

### Flutter Performance Requirements
- Maintain 60fps in animations and scrolling
- Optimize widget rebuilds with const constructors
- Use ListView.builder for long lists
- Implement proper disposal of resources

### Flutter Platform Integration
- Handle platform differences gracefully
- Use Platform.isIOS/isAndroid for platform-specific code
- Implement proper error handling for platform channels
- Follow Material Design and Human Interface Guidelines

## Output Requirements

**Upon Successful Completion:**

1. **Working Flutter Feature**
   - All implementation tasks completed
   - All 4 validation levels pass
   - Feature works on both iOS and Android

2. **Complete Test Coverage**
   - Unit tests for all business logic
   - Widget tests for all custom widgets
   - Integration tests for user flows

3. **Documentation**
   - Code is self-documenting with clear naming
   - Comments explain complex Flutter-specific patterns
   - README updated if new dependencies added

4. **Performance Validated**
   - Smooth animations and transitions
   - Fast app startup and navigation
   - Minimal memory usage and battery impact

**Success Confirmation**: The Flutter feature is production-ready and meets all mobile user experience standards specified in the original Flutter PRP.