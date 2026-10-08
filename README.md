# LBvpn

A monochrome browser extension prototype for Chrome and Microsoft Edge.

**Demo only: browser traffic is not protected.** The interface simulates a connection. It does not connect to a VPN or proxy, change network settings, or request access to websites.

## Preview

Open `preview.html` directly in your browser. No server, package installation, or build step is required. Refresh the page after editing files. The preview embeds the same `extension/popup.html` used by the extension.

## Install locally

1. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
2. Enable **Developer mode**.
3. Select **Load unpacked** and choose the `extension` directory.
4. Pin LBvpn using the browser's extensions menu, then click its toolbar entry.

After making changes, reload the extension on the extensions page and reopen its popup.

## Try the demo

Choose Germany, Netherlands, or United States and select **Connect**. The interface shows **Connecting…**, then **Connected (demo)** after a short delay. Select **Disconnect** to reset it. Location selection is disabled during the demo connection. Reopening the popup starts disconnected.

All assets are local. There is no background service, network access, analytics, or persistent session storage.

## Project files

- `extension/manifest.json`: Manifest V3 extension metadata.
- `extension/popup.html`: the shared popup interface.
- `extension/popup.css`: monochrome styling and reduced-motion support.
- `extension/popup.js`: demo connection state transitions.
- `preview.html`: standalone browser preview.

## Branches

- `main`: the main project branch.
- `dev`: ongoing development.

## Configuration

Do not commit private keys, passwords, or active VPN configurations.

## Language

All repository content, code comments, commit messages, and pull request descriptions must be written in English.

## Typography

BioRhyme is bundled locally from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/biorhyme) under the SIL Open Font License. See `extension/fonts/OFL.txt`. No external font requests are made.
