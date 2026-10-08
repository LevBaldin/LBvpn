;(() => {
    const button = document.getElementById("connect")
    const buttonLabel = document.getElementById("button-label")
    const location = document.getElementById("location")
    const status = document.getElementById("status")
    const description = document.getElementById("description")
    let state = "disconnected"
    let timer

    function render() {
        document.body.dataset.state = state
        button.disabled = state === "connecting"
        location.disabled = state !== "disconnected"
        status.textContent = {
            disconnected: "Disconnected",
            connecting: "Connecting…",
            connected: "Connected (demo)"
        }[state]
        buttonLabel.textContent = state === "connected" ? "Disconnect" : state === "connecting" ? "Connecting…" : "Connect"
        description.textContent =
            state === "connected"
                ? `Demo session · ${location.value}`
                : state === "connecting"
                  ? "Preparing your demo session…"
                  : "A quieter corner of the internet."
    }

    function reset() {
        clearTimeout(timer)
        state = "disconnected"
        render()
    }

    button.addEventListener("click", () => {
        if (state === "connecting") return
        if (state === "connected") {
            reset()
            return
        }
        state = "connecting"
        render()
        timer = setTimeout(() => {
            state = "connected"
            render()
        }, 1100)
    })

    window.addEventListener("pagehide", reset)
    window.addEventListener("pageshow", reset)
    render()
})()
