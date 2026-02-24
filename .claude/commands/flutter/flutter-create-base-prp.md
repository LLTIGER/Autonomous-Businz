# Create Flutter BASE PRP

## Feature: $ARGUMENTS

## Flutter PRP Creation Mission

Create a comprehensive Flutter PRP that enables **one-pass mobile implementation success** through systematic Flutter-specific research and context curation.

**Critical Understanding**: The executing AI agent only receives:

- Start by reading and understanding the PRP concepts PRPs/README.md
- The Flutter PRP content you create
- Flutter/Dart SDK documentation and training data
- Access to Flutter codebase files (but needs guidance on which ones)

**Therefore**: Your Flutter research and mobile context curation directly determines implementation success. Incomplete mobile context = Flutter implementation failure.

## Flutter-Specific Research Process

> During the Flutter research process, create clear tasks and spawn Flutter-specialized agents using the batch tools. Focus on mobile-first patterns, performance optimization, and platform-specific requirements.

1. **Flutter Codebase Analysis**
   - Create clear todos and spawn flutter-architect subagent to analyze existing Flutter patterns
   - Identify Flutter-specific file structures (lib/, pubspec.yaml, platform channels)
   - Note existing Flutter conventions (BLoC, Provider, state management patterns)
   - Check existing Flutter test patterns for widget and integration testing
   - Analyze existing Flutter dependencies and version constraints
   - Use flutter-architect subagent to identify similar mobile features/patterns

2. **Flutter External Research**
   - Create todos and spawn library-researcher subagent for Flutter-specific research
   - Flutter documentation (include specific URLs with anchors)
   - pub.dev package documentation for dependencies
   - For critical Flutter packages, add .md files to PRPs/ai_docs with Flutter-specific patterns
   - Flutter best practices and mobile performance optimization
   - Platform-specific considerations (iOS/Android differences)
   - Use library-researcher to find similar Flutter implementations with GitHub examples

3. **Mobile User Experience Research**
   - Mobile-first design patterns and responsive layouts
   - Platform-specific UI guidelines (Material Design, Cupertino)
   - Mobile performance benchmarks and optimization strategies
   - Offline functionality and state persistence patterns

## Flutter PRP Generation Process

### Step 1: Choose Flutter Template

Use `PRPs/templates/prp_flutter.md` as your template structure - it contains all necessary Flutter-specific sections and mobile development patterns.

### Step 2: Flutter Context Completeness Validation

Before writing, apply the **"Flutter Newcomer Test"** from the template:
_"If someone knew nothing about Flutter or mobile development, would they have everything needed to implement this mobile feature successfully?"_

### Step 3: Flutter Research Integration

Transform your Flutter research findings into the template sections:

**Goal Section**: Define specific mobile user outcomes and Flutter app deliverables
**Context Section**: Populate with Flutter documentation URLs, pub.dev packages, existing lib/ patterns
**Implementation Tasks**: Create Flutter-specific tasks using Clean Architecture layers (data/domain/presentation)
**Validation Gates**: Use Flutter-specific validation commands (flutter analyze, flutter test, flutter build)

### Step 4: Mobile Information Density Standards

Ensure every Flutter reference is **mobile-specific and actionable**:

- Flutter URLs include widget/API specific documentation sections
- lib/ file references include specific Flutter patterns to follow
- Task specifications include Flutter naming conventions and Clean Architecture placement
- Validation commands are Flutter project-specific and tested working

### Step 5: FLUTTER ULTRATHINK Before Writing

After Flutter research completion, create comprehensive Flutter PRP writing plan using TodoWrite tool:

- Plan how to structure each Flutter template section with mobile research findings
- Identify Flutter/mobile gaps that need additional research
- Create systematic approach to filling template with Flutter-actionable context
- Consider platform-specific requirements (iOS/Android)

## Output

Save as: `PRPs/flutter-{feature-name}.md`

## Flutter PRP Quality Gates

### Flutter Context Completeness Check

- [ ] Passes "Flutter Newcomer Test" from template
- [ ] All Flutter YAML references are specific and accessible
- [ ] Implementation tasks include exact Flutter file placement (lib/features/domain/)
- [ ] Validation commands are Flutter-project-specific and verified working
- [ ] Mobile performance and platform considerations addressed

### Flutter Template Structure Compliance

- [ ] All required Flutter template sections completed
- [ ] Goal section has specific mobile user outcomes and Flutter deliverables
- [ ] Implementation Tasks follow Clean Architecture pattern (data/domain/presentation)
- [ ] Flutter-specific validation checklist is comprehensive

### Flutter Information Density Standards

- [ ] No generic references - all are Flutter-specific and mobile-actionable
- [ ] lib/ file patterns point at specific Flutter examples to follow
- [ ] Flutter/pub.dev URLs include API anchors for exact guidance
- [ ] Task specifications use Flutter information-dense keywords from codebase
- [ ] Platform-specific (iOS/Android) considerations included

## Flutter Success Metrics

**Mobile Confidence Score**: Rate 1-10 for Flutter one-pass implementation success likelihood

**Flutter Validation**: The completed Flutter PRP should enable an AI agent unfamiliar with Flutter to implement the mobile feature successfully using only the PRP content and Flutter codebase access.

## Flutter-Specific Considerations

### Flutter Performance Requirements
- Target 60fps animations and smooth scrolling
- Memory usage optimization for mobile devices
- App startup time under 3 seconds
- Battery life impact considerations

### Platform Integration
- Platform channels for native functionality
- iOS/Android specific UI adaptations
- App store deployment requirements
- Push notifications and background processing

### Flutter Development Workflow
- Hot reload development cycle
- Widget inspector debugging
- Flutter DevTools profiling
- Platform-specific testing (iOS Simulator, Android Emulator)