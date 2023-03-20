sequenceDiagram
    participant server
    participant browser

    browser->>browser: user completes the form nima!
    Note right of browser: When user clicks the submit button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>server: notes.push({req.body.note,new Date()})
    server->>browser: Redirects to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate (maybe) server
