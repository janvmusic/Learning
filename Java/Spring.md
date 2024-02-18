## Spring beans

- via XML
- via annotation and AnnotationConfigApplicationContext
- via annotation and ComponentScan
- all beans are singletons by default
  - prototype: a new instance each time
  - request: a new instance for each HTTP request
  - session: a new instance for each HTTP session
  - global-session: a new instance for each global HTTP session
- beans can be injected via constructor or setter or autowired
- component scan can be configured to scan only specific packages

## life-cycle

- beans are initialized by Spring container
- When the context is closed, the Spring container calls the `destroy()` method on all the beans
- we can override postInit and preDestroy methods

## AOP

## Inversion of Control

- Spring container is responsible for instantiating, configuring, and assembling objects
- the definition of inversion of control is: use abstraction, not concrete implementation

## Autowired

- by type
- by name
- by constructor
- by @Qualifier annotation

## types

- Component: this is a discoverable bea by spring can be wired
- Controller: used in MVC and it is used with @RequestMapping
- Repository: DAO, data read, write and search
- Service: business logic

## Dispatcher servlet

- Loads the spring bean configuration file and initializes all the beans that are configured (via XML or annotation)

## View Resolver

- ViewResolver implementations are used to resolve the view pages by name

## ExceptionHandler

- @ExceptionHandler annotation is used to handle exceptions in Spring MVC
- Controller-Based:
- Global Exception Handler: this is a cross-cutting concern

## MVC

- @Controller – for controller classes in Spring MVC project.
- @RequestMapping – for configuring URI mapping in controller handler methods. This is a very important annotation, so you should go through Spring MVC RequestMapping Annotation Examples
- @ResponseBody – for sending Object as a response, usually for sending XML or JSON data as a response.
- @PathVariable – for mapping dynamic values from the URI to handler method arguments.
- @Autowired – for auto wiring dependencies in spring beans.
- @Qualifier – with @Autowired annotation to avoid confusion when multiple instances of bean type are present.
- @Service – for service classes.
- @Scope – for configuring scope of the spring bean.
- @Configuration, @ComponentScan, and @Bean – for java based configurations.
- AspectJ annotations for configuring aspects and advice, @Aspect, @Before, @After, @Around, @Pointcut, etc.

## Spring Transactional

Spring framework provides two type of transaction management supports:

    Programmatic Transaction Management: should be used for few transaction operations.
    Declarative Transaction Management: should be used for many transaction operations.

# ACID

- Atomicity: all or nothing
- Consistency: data is consistent before and after the transaction
- Isolation: concurrent transactions do not interfere with each other
- Durability: once a transaction is committed, it is permanent
