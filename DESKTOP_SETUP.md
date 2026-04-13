# Desktop App Setup Guide

## Overview
Your S4 Plan web application has been configured to work as a **Tauri desktop application** for Windows, Mac, and Linux.

## Prerequisites

### 1. Rust Toolchain (Required)
Tauri requires Rust to compile the desktop application. Install it from:
- **Windows**: Download from https://www.rust-lang.org/tools/install
- **Mac/Linux**: Run `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

After installation, restart your terminal and verify:
```bash
cargo --version
```

### 2. Additional Windows Requirements
On Windows, you may need:
- **Visual Studio Build Tools** (if not already installed)
- **WebView2 Runtime** (can be installed separately or bundled)

## Project Structure

```
web site/
├── src/                      # React source code (web)
├── src-tauri/                # Rust backend (NEW)
│   ├── src/
│   │   └── main.rs          # Rust entry point
│   ├── Cargo.toml           # Rust dependencies
│   └── build.rs             # Build script
├── tauri.conf.json          # Tauri configuration (NEW)
├── vite.config.js           # Updated for Tauri
├── package.json             # Updated with new scripts
└── dist/                    # Built web assets (created during build)
```

## Development Workflow

### Run Development Server (Live Reload)
```bash
cd "c:\Users\pc\Desktop\STADING\S4\web site"
npm install
npm run dev
```

This will:
1. Start the Vite dev server on http://localhost:5173
2. Open the Tauri window connected to the dev server
3. Enable hot-reload as you edit code

### Build Production App

#### Windows
```bash
npm run build
```

This creates the installers in:
- `src-tauri/target/release/bundle/msi/S4_Plan_1.0.0_x64_en-US.msi`

#### Build for Distribution
```bash
npm run build -- --release
```

## Features Available in Desktop Version

✅ **All existing web features:**
- Module navigation (hash routing works inside desktop window)
- Progress tracking (localStorage persists)
- Dark mode toggle
- Resource hub with web links and Drive integration
- Notes and revision pages
- Standing and analytics

✅ **New desktop capabilities:**
- Runs completely offline (after first load)
- File system access (if needed in future)
- Native window controls
- Bundled installer distribution
- System tray integration (can be added)

## Troubleshooting

### "npm run dev" fails
- Ensure Rust is installed: `rustc --version`
- Install dependencies: `npm install`
- Windows: Install Visual Studio Build Tools if missing

### Build fails on Windows
- Install WebView2 Runtime from Microsoft
- Ensure Rust toolchain is up-to-date: `rustup update`

### Port 5173 already in use
- The dev server will automatically try the next available port
- Kill the process using port 5173: `lsof -i :5173` or use Task Manager

## Configuration

### Change App Name/Title
Edit `tauri.conf.json`:
```json
{
  "package": {
    "productName": "S4 Plan",
    "version": "1.0.0"
  },
  "tauri": {
    "windows": [{
      "title": "S4 MIP Study Plan"
    }]
  }
}
```

### Window Size and Behavior
Edit `tauri.conf.json` in the `windows` array:
```json
{
  "width": 1024,
  "height": 768,
  "minWidth": 800,
  "minHeight": 600,
  "resizable": true,
  "fullscreen": false
}
```
rustc --version

### Add Custom Permissions
Edit `allowlist` in `tauri.conf.json` to enable file access, clipboard, etc.

## Next Steps

1. **Install Rust** if not already done
2. **Run development server**: `npm run dev`
3. **Test the app** - all features should work as expected
4. **Build production** when ready: `npm run build`
5. **Distribute** the installer to users

## Resources

- **Tauri Documentation**: https://tauri.app/v1/guides/
- **Tauri API**: https://tauri.app/v1/api/
- **Rust Book**: https://doc.rust-lang.org/book/

## Common Commands

```bash
# Development
npm run dev              # Start dev server with live reload
npm run web:dev         # Just start Vite (without Tauri window)

# Building
npm run build           # Build release for current platform
npm run tauri build     # Just build Tauri, skip web build

# Cleanup
rm -r src-tauri/target  # Clear build cache (large, ~1-2GB)
rm -r node_modules      # Clear npm cache
npm install             # Reinstall all dependencies
```

## App Distribution

After building, the installer is available in:
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **Mac**: `src-tauri/target/release/bundle/dmg/`
- **Linux**: `src-tauri/target/release/bundle/appimage/`

You can distribute the `.msi`, `.dmg`, or `.appimage` file to users for installation.
