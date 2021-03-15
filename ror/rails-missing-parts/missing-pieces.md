# The missing pieces
Rails points following distribution
- **Controllers** are responsible for HTTP
- **Views** manage the formatting and presentation
- **Records** deal with persistence

But what about the **business logic**? Where it should **live**?
- There should be small objects that collaborate with each other through exchange of messages.
- Each object needs to a **Single Responsibility**
- Each object needs a **Limited to a public interface**
- These objects need to be **not tied to Rails**
