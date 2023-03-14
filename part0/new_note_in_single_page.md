::: mermaid
sequenceDiagram
    participant browser
    participant JavaScript Code
    participant server
    
    
    browser->>browser: user completes the form
    Note right of browser: When user clicks the submit button

    JavaScript Code->>browser: detects submit, calls form.onSubmit and pushes note into notes, rerenders page
    JavaScript Code->>server: POST /new_note_spa (json)
    activate server
:::