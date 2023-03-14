sequenceDiagram
    participant browser
    participant server
    
    browser->>browser: user completes the form
    Note right of browser: When user clicks the submit button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>server: notes.push({req.body.note,new Date()})
    server->>browser: Redirects to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server