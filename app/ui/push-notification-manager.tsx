"use client"
import { useState } from "react"
import { NotificationService } from "@service/notification-service";
import { subscribeUser, unsubscribeUser, sendNotification } from "@actions/actions";

export const PushNotificationManager = () => {
  const isSupported =
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('');
 
  async function subscribeToPush() {
    const sub = await NotificationService.subscribeToPush();
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }
 
  async function unsubscribeFromPush() {
    await NotificationService.unsubscribeFromPush(subscription);
    setSubscription(null)
    await unsubscribeUser()
  }
 
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message)
      setMessage('')
    }
  }
 
  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
 
  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  )
}