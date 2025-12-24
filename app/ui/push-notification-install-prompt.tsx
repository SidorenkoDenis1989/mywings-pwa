"use client"
import { useState } from "react";
export const PushNotificationInstallPrompt = () => {
  const [isIOS] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !("MSStream" in window)
    );
  });

  const [isStandalone] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(display-mode: standalone)").matches;
  });
 
  if (isStandalone) {
    return null
  }
 
  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            *{' '}
          </span>
          and then Add to Home Screen
          <span role="img" aria-label="plus icon">
            {' '}
            +{' '}
          </span>
          .
        </p>
      )}
    </div>
  )
}