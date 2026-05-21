# Photoshop Group Sort Script (Nested Folder A–Z Organizer)

## Overview
This script sorts **only the selected folder (group)** in Adobe Photoshop.

It alphabetically and numerically sorts **groups inside that folder**, including nested groups.

It does **not** affect individual layers.

---

## Install & Run

Install: Save the `.jsx` file to your Photoshop Scripts folder (typically located at `Program Files/Adobe/Adobe Photoshop [Version]/Presets/Scripts` on Windows or `Applications/Adobe Photoshop [Version]/Presets/Scripts` on Mac).

Run: Restart Photoshop, open your document, and go to `File > Scripts > Sort Groups`.

---

## Usage
- Select a **folder (group)** in the Layers panel
- Run the script
- The script will automatically sort all groups inside the selected folder

---

## What It Does

### ✔ Sorts
- Group names in A → Z order
- Natural numeric sorting (Group 1, Group 2, Group 10)
- Nested groups recursively

### ✖ Does NOT affect
- Individual layers
- Layer styles
- Smart objects
- Pixel content
  
---

## Notes
- Designed for Photoshop 2026
- Works with complex nested folder structures
- Safe for large PSD files
