# Split Screen

![Logo](assets/icons/icon.png)

**Split Screen** is a Chrome extension that allows users to dynamically split their browser window into multiple side-by-side windows. Whether you're multitasking across multiple tabs or organizing your workspace across dual monitors, this extension enhances productivity by efficiently managing your browser windows.

## 📋 **Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## ✨ **Features**

- **Dynamic Splitting:** Split your current browser window into two, three, or more evenly distributed windows with a single click.
- **Multi-Monitor Support:** Automatically detects the active display and manages window splits within that screen.
- **Scalable Layout:** Handles an increasing number of splits by arranging windows in a grid layout, ensuring optimal use of screen real estate.
- **Automatic Rearrangement:** Automatically adjusts window positions and sizes when split windows are added or removed.
- **Persistent State:** Remembers split windows across browser sessions using Chrome's storage API.
- **User Notifications:** Provides feedback and error notifications for a seamless user experience.

## 🛠️ **Installation**

### **1. Clone the Repository**

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/bishwanathjha/split-screen.git

```

### **2. Navigate to the Extension Directory**
```bash
cd split-screen
```


### **3. Load the Extension into Chrome**

#### 1. Open Chrome Extensions Page:
- Navigate to chrome://extensions/ in your Chrome browser.

#### 2. Enable Developer Mode:
- Toggle the "Developer mode" switch on the top right corner.

#### 3. Load Unpacked Extension:
- Click on the "Load unpacked" button.
- Select the cloned split-screen folder.

#### 4. Confirm the Extension is Loaded:
- You should see the "Split Screen" extension listed with its icon in the toolbar.

#### 5. Create your own keyboard shortcut: (Optional)
- Navigate to chrome://extensions/shortcuts in your Chrome browser.
- Find the "Split Screen" in the list
- Click the 🖊️ edit (pen) icon
- Press the desired keyboard button of your choice (e.g; ⇧⌘S) to be the shortcut to trigger/activate the extension

## 🚀 Usage 

#### 1. Open a Webpage:
- Navigate to any webpage you wish to split.

#### 2. Activate the Extension:
- Use the shortcut set in #5 or Click on the extension's toolbar icon (🔗 "Split Screen" button).

#### 3. Observe the Behavior:
- First Click: Duplicates the current tab into a new window positioned alongside the original, splitting the screen into two.
- Second Click: Adds a third window, adjusting all to share the screen equally.
- Subsequent Clicks: Continues to add additional windows, automatically arranging them in a grid layout.

#### 3. Manage Split Windows:
- Closing a Window: Manually closing any split window will automatically update the tracking list and rearrange the remaining windows.

## 🙌 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project
- Create Your Feature Branch `git checkout -b feature/AmazingFeature`
- Commit Your Changes `git commit -m 'Add some AmazingFeature`
- Push to the Branch `git push origin feature/AmazingFeature`
- Open a Pull Request

## 📄 License
Distributed under the MIT License. See LICENSE for more information.


## 🙏 Acknowledgements
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Chrome API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [OpenAI ChatGPT](https://chat.openai.com/)
- [flaticon for icon](https://www.flaticon.com)

##  📫 Contact
Bishwanath Jha - [@BishwanathJha](https://x.com/BishwanathJha) or hello@bjha.in