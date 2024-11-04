// background.js

// Helper: Promisify chrome.system.display.getInfo
function getDisplays() {
    return new Promise((resolve, reject) => {
      chrome.system.display.getInfo((displays) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(displays);
        }
      });
    });
  }
  
  // Helper: Get active window's display
  async function getActiveDisplay(currentWindow) {
    const displays = await getDisplays();
    for (const display of displays) {
      const { bounds } = display;
      if (
        currentWindow.left >= bounds.left &&
        currentWindow.left < bounds.left + bounds.width &&
        currentWindow.top >= bounds.top &&
        currentWindow.top < bounds.top + bounds.height
      ) {
        return display;
      }
    }
    throw new Error("Unable to determine the current display.");
  }
  
  // Helper: Retrieve split window IDs for a display
  async function getSplitWindowIds(displayId) {
    return new Promise((resolve) => {
      chrome.storage.local.get([`display_${displayId}`], (result) => {
        resolve(result[`display_${displayId}`] || []);
      });
    });
  }
  
  // Helper: Save split window IDs for a display
  function saveSplitWindowIds(displayId, windowIds) {
    const data = {};
    data[`display_${displayId}`] = windowIds;
    chrome.storage.local.set(data);
  }
  
  // Helper: Remove a window ID from a display's split list
  async function removeSplitWindowId(displayId, windowId) {
    let windowIds = await getSplitWindowIds(displayId);
    windowIds = windowIds.filter(id => id !== windowId);
    saveSplitWindowIds(displayId, windowIds);
  }
  
  // Rearrange windows to equally split the display
  async function rearrangeWindows(display, windowIds) {
    const { bounds } = display;
    const numWindows = windowIds.length;
    if (numWindows === 0) return;
  
    // Determine grid layout (rows and cols)
    let cols = Math.ceil(Math.sqrt(numWindows));
    let rows = Math.ceil(numWindows / cols);
  
    const windowWidth = Math.floor(bounds.width / cols);
    const windowHeight = Math.floor(bounds.height / rows);
  
    for (let i = 0; i < numWindows; i++) {
      const windowId = windowIds[i];
      const row = Math.floor(i / cols);
      const col = i % cols;
      const left = bounds.left + col * windowWidth;
      const top = bounds.top + row * windowHeight;
  
      chrome.windows.update(windowId, {
        left: left,
        top: top,
        width: windowWidth,
        height: windowHeight
      });
    }
  }
  
  // Listener: Extension icon clicked
  chrome.action.onClicked.addListener(async () => {
    try {
      // Get the active window
      const currentWindow = await chrome.windows.getCurrent();
      const activeTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
      
      // Determine the display
      const activeDisplay = await getActiveDisplay(currentWindow);
      const displayId = activeDisplay.id;
  
      // Retrieve existing split window IDs
      let splitWindowIds = await getSplitWindowIds(displayId);
  
      // Clean up any closed windows
      const validSplitWindowIds = [];
      for (const id of splitWindowIds) {
        const win = await chrome.windows.get(id).catch(() => null);
        if (win && win.state !== "minimized" && win.state !== "closed") {
          validSplitWindowIds.push(id);
        }
      }
  
      // Update storage with valid windows
      saveSplitWindowIds(displayId, validSplitWindowIds);
      splitWindowIds = validSplitWindowIds;
  
      // Add current window to the list if it's not already tracked
      if (!splitWindowIds.includes(currentWindow.id)) {
        splitWindowIds.push(currentWindow.id);
      }
  
      // Create a new window duplicating the active tab
      const newWindow = await chrome.windows.create({
        url: activeTab.url,
        left: activeDisplay.bounds.left,
        top: activeDisplay.bounds.top,
        width: Math.floor(activeDisplay.bounds.width / (splitWindowIds.length + 1)),
        height: activeDisplay.bounds.height,
        focused: true
      });
  
      // Add the new window's ID to the split list
      splitWindowIds.push(newWindow.id);
      saveSplitWindowIds(displayId, splitWindowIds);
  
      // Rearrange all split windows
      await rearrangeWindows(activeDisplay, splitWindowIds);
  
    } catch (error) {
      console.error("Error splitting screen:", error);
      // Notify the user of the error
      chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icons/icon.png",
        title: "Split Screen Error",
        message: error.message || "An error occurred while splitting the screen."
      });
    }
  });
  
  // Listener: Window removed to update storage
  chrome.windows.onRemoved.addListener(async (windowId) => {
    try {
      const displays = await getDisplays();
      for (const display of displays) {
        const displayId = display.id;
        let splitWindowIds = await getSplitWindowIds(displayId);
        if (splitWindowIds.includes(windowId)) {
          // Remove the window ID from storage
          await removeSplitWindowId(displayId, windowId);
          // Rearrange remaining windows
          await rearrangeWindows(display, splitWindowIds.filter(id => id !== windowId));
        }
      }
    } catch (error) {
      console.error("Error handling window removal:", error);
    }
  });