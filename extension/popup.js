;(() => {
    const button = document.getElementById("connect")
    const buttonLabel = document.getElementById("button-label")
    const location = document.getElementById("location")
    const status = document.getElementById("status")
    const description = document.getElementById("description")
    const menu = document.getElementById("locations")
    const locationValue = document.getElementById("location-value")
    const options = Array.from(menu.querySelectorAll('[role="option"]'))
    let selectedIndex = 0

    function closeMenu(restoreFocus = false) {
        menu.hidden = true
        location.setAttribute("aria-expanded", "false")
        if (restoreFocus) location.focus()
    }

    function openMenu(index = selectedIndex) {
        if (location.disabled) return
        menu.hidden = false
        location.setAttribute("aria-expanded", "true")
        options[index].focus()
    }

    location.addEventListener("click", () => menu.hidden ? openMenu() : closeMenu(true))
    location.addEventListener("keydown", event => {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault()
            openMenu(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : selectedIndex)
        }
    })
    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            if (location.disabled) return
            selectedIndex = index
            locationValue.textContent = option.textContent
            options.forEach((item, i) => item.setAttribute("aria-selected", String(i === index)))
            closeMenu(true)
        })
        option.addEventListener("keydown", event => {
            let next = index
            if (event.key === "ArrowDown") next = (index + 1) % options.length
            else if (event.key === "ArrowUp") next = (index + options.length - 1) % options.length
            else if (event.key === "Home") next = 0
            else if (event.key === "End") next = options.length - 1
            else if (event.key === "Escape") { event.preventDefault(); closeMenu(true); return }
            else if (event.key === "Tab") { closeMenu(true); return }
            else if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
                const match = options.findIndex(item => item.textContent.toLowerCase().startsWith(event.key.toLowerCase()))
                if (match < 0) return
                next = match
            } else return
            event.preventDefault()
            options[next].focus()
        })
    })
    document.addEventListener("click", event => {
        if (!event.target.closest(".select-wrap")) closeMenu()
    })
    document.addEventListener("focusin", event => {
        if (!event.target.closest(".select-wrap")) closeMenu()
    })
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
                ? `Demo session · ${locationValue.textContent}`
                : state === "connecting"
                  ? "Preparing your demo session…"
                  : "A quieter corner of the internet."
    }

    function reset() {
        closeMenu()
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
        closeMenu()
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
