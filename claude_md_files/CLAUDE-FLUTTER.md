# CLAUDE.md

This file provides comprehensive guidance to Claude Code when working with Flutter applications using Dart and Clean Architecture patterns.

## Core Development Philosophy

### Mobile-First Design
Build for mobile constraints and capabilities from the start. Consider battery life, memory usage, network connectivity, and platform-specific user interface guidelines.

### Performance-First Approach
Target 60fps animations, minimize widget rebuilds, optimize memory usage, and ensure fast app startup times. Mobile users expect instant responsiveness.

### Platform Integration
Leverage native platform capabilities through platform channels while maintaining code sharing. Adapt UI to platform conventions (Material Design for Android, Cupertino for iOS).

## 🤖 AI Assistant Guidelines

### Context Awareness
- When implementing Flutter features, always check existing Clean Architecture patterns first
- Use BLoC pattern for state management in complex features
- Check pubspec.yaml for existing dependencies before adding new ones
- Follow existing folder structure and naming conventions

### Common Pitfalls to Avoid
- Creating StatefulWidget when StatelessWidget suffices
- Forgetting to dispose controllers and streams
- Using BuildContext across async gaps
- Ignoring platform-specific design guidelines
- Deep widget nesting without composition

## Essential Development Commands

### Core Flutter Commands
- `flutter doctor` - Check Flutter development environment
- `flutter create <app_name>` - Create new Flutter project
- `flutter run` - Run app in debug mode
- `flutter run --release` - Run app in release mode
- `flutter build apk` - Build Android APK
- `flutter build ios` - Build iOS app (macOS only)

### Development Workflow
- `flutter hot reload` - Apply code changes instantly (r key in terminal)
- `flutter hot restart` - Restart app with new changes (R key in terminal)
- `flutter clean` - Clean build artifacts
- `flutter pub get` - Install dependencies
- `flutter pub upgrade` - Upgrade dependencies

### Code Quality Commands
- `flutter analyze` - Analyze Dart code for issues
- `dart format lib/` - Format Dart code
- `dart fix --apply` - Apply automated fixes
- `flutter test` - Run unit and widget tests
- `flutter test --coverage` - Generate test coverage report

### Platform-Specific Commands
- `flutter devices` - List connected devices/simulators
- `flutter emulators` - List available emulators
- `flutter logs` - View app logs
- `flutter drive` - Run integration tests

## Architecture Overview

### Clean Architecture Structure

```
lib/
├── main.dart                    # App entry point
├── core/                        # Shared core functionality
│   ├── error/                   # Error handling
│   │   ├── exceptions.dart
│   │   └── failures.dart
│   ├── usecases/               # Base use case classes
│   │   └── usecase.dart
│   ├── network/                # Network utilities
│   │   └── network_info.dart
│   ├── constants/              # App constants
│   └── di/                     # Dependency injection
│       └── injection_container.dart
├── features/                   # Feature modules
│   └── [feature_name]/
│       ├── data/               # Data layer
│       │   ├── models/         # Data models (JSON serialization)
│       │   ├── repositories/   # Repository implementations
│       │   └── datasources/    # Remote/local data sources
│       ├── domain/             # Domain layer (business logic)
│       │   ├── entities/       # Business entities
│       │   ├── usecases/       # Use cases
│       │   └── repositories/   # Repository interfaces
│       └── presentation/       # Presentation layer
│           ├── bloc/           # BLoC state management
│           ├── pages/          # Screen/page widgets
│           └── widgets/        # Feature-specific widgets
└── shared/                     # Shared UI components
    ├── widgets/                # Reusable widgets
    └── themes/                 # App themes and styling
```

### Technology Stack

**Core Framework**: Flutter SDK with Dart language
**State Management**: BLoC pattern with flutter_bloc
**Dependency Injection**: get_it with injectable
**Data Serialization**: json_annotation with freezed
**Network Layer**: dio for HTTP requests
**Local Storage**: shared_preferences, hive, or sqlite
**Testing**: flutter_test with mockito for mocking

### Key Patterns

#### BLoC Pattern Implementation

```dart
// Event
abstract class FeatureEvent extends Equatable {
  const FeatureEvent();
}

class LoadFeature extends FeatureEvent {
  final String id;
  const LoadFeature({required this.id});
  
  @override
  List<Object> get props => [id];
}

// State
abstract class FeatureState extends Equatable {
  const FeatureState();
}

class FeatureInitial extends FeatureState {
  @override
  List<Object> get props => [];
}

class FeatureLoading extends FeatureState {
  @override
  List<Object> get props => [];
}

class FeatureLoaded extends FeatureState {
  final FeatureEntity feature;
  const FeatureLoaded({required this.feature});
  
  @override
  List<Object> get props => [feature];
}

class FeatureError extends FeatureState {
  final String message;
  const FeatureError({required this.message});
  
  @override
  List<Object> get props => [message];
}

// BLoC
class FeatureBloc extends Bloc<FeatureEvent, FeatureState> {
  final GetFeatureUseCase getFeatureUseCase;
  
  FeatureBloc({required this.getFeatureUseCase}) : super(FeatureInitial()) {
    on<LoadFeature>(_onLoadFeature);
  }
  
  Future<void> _onLoadFeature(
    LoadFeature event,
    Emitter<FeatureState> emit,
  ) async {
    emit(FeatureLoading());
    
    final result = await getFeatureUseCase(Params(id: event.id));
    
    result.fold(
      (failure) => emit(FeatureError(message: failure.message)),
      (feature) => emit(FeatureLoaded(feature: feature)),
    );
  }
}
```

#### Repository Pattern

```dart
// Domain Repository Interface
abstract class FeatureRepository {
  Future<Either<Failure, FeatureEntity>> getFeature(String id);
  Future<Either<Failure, void>> saveFeature(FeatureEntity feature);
}

// Data Repository Implementation
class FeatureRepositoryImpl implements FeatureRepository {
  final FeatureRemoteDataSource remoteDataSource;
  final FeatureLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  FeatureRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, FeatureEntity>> getFeature(String id) async {
    if (await networkInfo.isConnected) {
      try {
        final remoteFeature = await remoteDataSource.getFeature(id);
        await localDataSource.cacheFeature(remoteFeature);
        return Right(remoteFeature.toEntity());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      try {
        final localFeature = await localDataSource.getLastFeature();
        return Right(localFeature.toEntity());
      } on CacheException {
        return Left(CacheFailure());
      }
    }
  }
}
```

#### Widget Composition Pattern

```dart
class FeaturePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: _buildBody(),
      floatingActionButton: _buildFAB(context),
    );
  }
  
  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      title: Text('Feature'),
      elevation: 0,
      backgroundColor: Theme.of(context).primaryColor,
    );
  }
  
  Widget _buildBody() {
    return BlocBuilder<FeatureBloc, FeatureState>(
      builder: (context, state) {
        return switch (state) {
          FeatureInitial() => _buildInitialWidget(),
          FeatureLoading() => _buildLoadingWidget(),
          FeatureLoaded(feature: final feature) => _buildLoadedWidget(feature),
          FeatureError(message: final message) => _buildErrorWidget(message),
        };
      },
    );
  }
  
  Widget _buildLoadingWidget() {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
  
  Widget _buildErrorWidget(String message) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.error, size: 64, color: Colors.red),
          SizedBox(height: 16),
          Text(message, textAlign: TextAlign.center),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () => context.read<FeatureBloc>().add(LoadFeature()),
            child: Text('Retry'),
          ),
        ],
      ),
    );
  }
}
```

## Performance Optimization

### Widget Performance

```dart
// Use const constructors
class CustomWidget extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  
  const CustomWidget({
    Key? key,
    required this.title,
    required this.onTap,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16.0), // const EdgeInsets
        child: Text(title),
      ),
    );
  }
}

// Use ListView.builder for long lists
class ItemList extends StatelessWidget {
  final List<Item> items;
  
  const ItemList({Key? key, required this.items}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return ItemWidget(item: items[index]);
      },
    );
  }
}
```

### Memory Management

```dart
class MyStatefulWidget extends StatefulWidget {
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget>
    with TickerProviderStateMixin {
  AnimationController? _controller;
  StreamSubscription? _subscription;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    
    _subscription = someStream.listen((data) {
      // Handle stream data
    });
  }
  
  @override
  void dispose() {
    _controller?.dispose();
    _subscription?.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## Testing Strategy

### Unit Testing

```dart
// test/features/feature/domain/usecases/get_feature_test.dart
void main() {
  late GetFeatureUseCase usecase;
  late MockFeatureRepository mockRepository;

  setUp(() {
    mockRepository = MockFeatureRepository();
    usecase = GetFeatureUseCase(mockRepository);
  });

  group('GetFeatureUseCase', () {
    final tFeature = FeatureEntity(
      id: '1',
      title: 'Test Feature',
      description: 'Test Description',
    );

    test('should get feature from repository', () async {
      // arrange
      when(mockRepository.getFeature(any))
          .thenAnswer((_) async => Right(tFeature));

      // act
      final result = await usecase(Params(id: '1'));

      // assert
      expect(result, equals(Right(tFeature)));
      verify(mockRepository.getFeature('1'));
      verifyNoMoreInteractions(mockRepository);
    });
  });
}
```

### Widget Testing

```dart
// test/features/feature/presentation/widgets/feature_widget_test.dart
void main() {
  testWidgets('FeatureWidget displays title', (WidgetTester tester) async {
    // arrange
    const testTitle = 'Test Title';
    
    // act
    await tester.pumpWidget(
      MaterialApp(
        home: FeatureWidget(title: testTitle),
      ),
    );

    // assert
    expect(find.text(testTitle), findsOneWidget);
  });

  testWidgets('FeatureWidget triggers callback on tap', (WidgetTester tester) async {
    // arrange
    bool wasTapped = false;
    void onTap() => wasTapped = true;

    // act
    await tester.pumpWidget(
      MaterialApp(
        home: FeatureWidget(
          title: 'Test',
          onTap: onTap,
        ),
      ),
    );
    
    await tester.tap(find.byType(FeatureWidget));

    // assert
    expect(wasTapped, isTrue);
  });
}
```

### Integration Testing

```dart
// integration_test/app_test.dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('App Integration Tests', () {
    testWidgets('complete user flow', (WidgetTester tester) async {
      // Start app
      await tester.pumpWidget(MyApp());
      
      // Wait for app to load
      await tester.pumpAndSettle();
      
      // Navigate to feature
      await tester.tap(find.text('Features'));
      await tester.pumpAndSettle();
      
      // Verify feature page loaded
      expect(find.text('Feature List'), findsOneWidget);
      
      // Test feature interaction
      await tester.tap(find.byType(FeatureItem).first);
      await tester.pumpAndSettle();
      
      // Verify detail page
      expect(find.text('Feature Details'), findsOneWidget);
    });
  });
}
```

## Platform-Specific Considerations

### iOS Adaptations

```dart
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

Widget _buildPlatformButton(BuildContext context, VoidCallback onPressed) {
  if (Platform.isIOS) {
    return CupertinoButton(
      child: Text('iOS Button'),
      onPressed: onPressed,
    );
  } else {
    return ElevatedButton(
      child: Text('Android Button'),
      onPressed: onPressed,
    );
  }
}

Widget _buildPlatformDialog(BuildContext context, String title, String content) {
  if (Platform.isIOS) {
    return CupertinoAlertDialog(
      title: Text(title),
      content: Text(content),
      actions: [
        CupertinoDialogAction(
          child: Text('OK'),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ],
    );
  } else {
    return AlertDialog(
      title: Text(title),
      content: Text(content),
      actions: [
        TextButton(
          child: Text('OK'),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ],
    );
  }
}
```

### Platform Channels

```dart
// lib/core/platform/platform_service.dart
class PlatformService {
  static const MethodChannel _channel = MethodChannel('com.app/platform');
  
  static Future<String> getPlatformVersion() async {
    try {
      final String version = await _channel.invokeMethod('getPlatformVersion');
      return version;
    } on PlatformException catch (e) {
      throw PlatformException(
        code: e.code,
        message: e.message,
      );
    }
  }
  
  static Future<void> openNativeSettings() async {
    try {
      await _channel.invokeMethod('openSettings');
    } on PlatformException catch (e) {
      // Handle platform-specific errors
      print('Error opening settings: ${e.message}');
    }
  }
}
```

## Error Handling and Validation

### Global Error Handling

```dart
// lib/core/error/error_handler.dart
class GlobalErrorHandler {
  static void handleError(Object error, StackTrace stackTrace) {
    if (error is FlutterError) {
      // Handle Flutter framework errors
      _logError('Flutter Error', error.toString(), stackTrace);
    } else if (error is PlatformException) {
      // Handle platform channel errors
      _logError('Platform Error', error.message ?? 'Unknown platform error', stackTrace);
    } else {
      // Handle other errors
      _logError('Unexpected Error', error.toString(), stackTrace);
    }
    
    // Report to crash analytics service
    _reportToAnalytics(error, stackTrace);
  }
  
  static void _logError(String type, String message, StackTrace stackTrace) {
    print('[$type] $message');
    print('Stack trace: $stackTrace');
  }
  
  static void _reportToAnalytics(Object error, StackTrace stackTrace) {
    // Report to Firebase Crashlytics, Sentry, etc.
  }
}

// main.dart
void main() {
  FlutterError.onError = (FlutterErrorDetails details) {
    GlobalErrorHandler.handleError(details.exception, details.stack ?? StackTrace.empty);
  };
  
  PlatformDispatcher.instance.onError = (Object error, StackTrace stack) {
    GlobalErrorHandler.handleError(error, stack);
    return true;
  };
  
  runApp(MyApp());
}
```

### Form Validation

```dart
class FeatureForm extends StatefulWidget {
  @override
  _FeatureFormState createState() => _FeatureFormState();
}

class _FeatureFormState extends State<FeatureForm> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  
  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _titleController,
            decoration: InputDecoration(labelText: 'Title'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a title';
              }
              if (value.length < 3) {
                return 'Title must be at least 3 characters';
              }
              return null;
            },
          ),
          TextFormField(
            controller: _descriptionController,
            decoration: InputDecoration(labelText: 'Description'),
            maxLines: 3,
            validator: (value) {
              if (value != null && value.length > 500) {
                return 'Description must be less than 500 characters';
              }
              return null;
            },
          ),
          ElevatedButton(
            onPressed: _submitForm,
            child: Text('Submit'),
          ),
        ],
      ),
    );
  }
  
  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Process form data
      final feature = FeatureEntity(
        title: _titleController.text,
        description: _descriptionController.text,
      );
      
      context.read<FeatureBloc>().add(SaveFeature(feature: feature));
    }
  }
}
```

## Security Best Practices

### Secure Storage

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: IOSAccessibility.first_unlock_this_device,
    ),
  );
  
  static Future<void> storeToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  static Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  static Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}
```

### Network Security

```dart
class SecureHttpClient {
  late final Dio _dio;
  
  SecureHttpClient() {
    _dio = Dio();
    
    // Add interceptors
    _dio.interceptors.add(LogInterceptor(
      requestBody: kDebugMode, // Only log in debug mode
      responseBody: kDebugMode,
    ));
    
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // Add auth token
        final token = await SecureStorageService.getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        
        // Add security headers
        options.headers['X-Requested-With'] = 'XMLHttpRequest';
        
        handler.next(options);
      },
      onError: (DioException e, handler) {
        // Handle authentication errors
        if (e.response?.statusCode == 401) {
          // Redirect to login
          _handleAuthError();
        }
        handler.next(e);
      },
    ));
  }
  
  void _handleAuthError() {
    // Clear stored token and redirect to login
    SecureStorageService.deleteToken();
    // Navigate to login screen
  }
}
```

## Deployment and Build Configuration

### Environment Configuration

```dart
// lib/core/config/environment.dart
class Environment {
  static const String dev = 'dev';
  static const String staging = 'staging';
  static const String prod = 'prod';
  
  static String get current {
    return const String.fromEnvironment('ENVIRONMENT', defaultValue: dev);
  }
  
  static bool get isDev => current == dev;
  static bool get isStaging => current == staging;
  static bool get isProd => current == prod;
  
  static String get baseUrl {
    switch (current) {
      case staging:
        return 'https://api-staging.example.com';
      case prod:
        return 'https://api.example.com';
      default:
        return 'https://api-dev.example.com';
    }
  }
}
```

### Build Commands for Different Environments

```bash
# Development build
flutter run --dart-define=ENVIRONMENT=dev

# Staging build
flutter build apk --dart-define=ENVIRONMENT=staging

# Production build
flutter build apk --release --dart-define=ENVIRONMENT=prod

# iOS production build
flutter build ios --release --dart-define=ENVIRONMENT=prod
```

## Common Anti-Patterns to Avoid

### Widget Anti-Patterns

```dart
// ❌ Bad: Deep nesting without composition
Widget badExample() {
  return Scaffold(
    body: Container(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Row(
                children: [
                  // ... more nesting
                ],
              ),
            ),
          ),
        ],
      ),
    ),
  );
}

// ✅ Good: Use composition
Widget goodExample() {
  return Scaffold(
    body: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          _buildCard(),
        ],
      ),
    ),
  );
}

Widget _buildCard() {
  return Card(
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: _buildCardContent(),
    ),
  );
}
```

### State Management Anti-Patterns

```dart
// ❌ Bad: Using setState for complex state
class BadCounterWidget extends StatefulWidget {
  @override
  _BadCounterWidgetState createState() => _BadCounterWidgetState();
}

class _BadCounterWidgetState extends State<BadCounterWidget> {
  int _counter = 0;
  bool _isLoading = false;
  String? _error;
  
  // Complex state logic in widget
  void _incrementCounter() async {
    setState(() => _isLoading = true);
    try {
      // API call
      final result = await api.incrementCounter(_counter);
      setState(() {
        _counter = result.value;
        _isLoading = false;
        _error = null;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        _error = e.toString();
      });
    }
  }
}

// ✅ Good: Use BLoC for complex state
class GoodCounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return switch (state) {
          CounterLoading() => CircularProgressIndicator(),
          CounterLoaded(value: final value) => Text('$value'),
          CounterError(message: final message) => Text('Error: $message'),
        };
      },
    );
  }
}
```

Remember: Flutter development should prioritize performance, maintainability, and platform consistency. Always consider mobile-specific constraints and leverage Flutter's reactive programming model effectively.