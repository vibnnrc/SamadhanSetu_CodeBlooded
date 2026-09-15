import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const debugPort = 9231;
const chrome = spawn("/usr/bin/chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${debugPort}`,
  "--user-data-dir=/tmp/samadhan-setu-layout-check",
  "about:blank",
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let messageId = 0;

async function waitForDevTools() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (response.ok) return;
    } catch {}
    await wait(100);
  }
  throw new Error("Chromium DevTools did not start");
}

async function main() {
  await waitForDevTools();
  const target = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" }).then((response) => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && pending.has(payload.id)) {
      pending.get(payload.id)(payload);
      pending.delete(payload.id);
    }
  });
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = ++messageId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params }));
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: "https://3000-i81fiqw1uhhx9q7nlboar-cb40d6ca.us3.manus.computer" });
  await wait(1300);
  await send("Runtime.evaluate", { expression: `(() => { const role = document.querySelector('select'); role.value = 'university'; role.dispatchEvent(new Event('change', { bubbles: true })); })()` });
  await wait(250);
  await send("Runtime.evaluate", { expression: `(() => { Array.from(document.querySelectorAll('button')).find((button) => button.textContent.trim() === 'Explore challenges')?.click(); })()` });
  await wait(350);
  await send("Runtime.evaluate", { expression: `(() => { Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Air quality deterioration'))?.click(); })()` });
  await wait(350);
  await send("Runtime.evaluate", { expression: `(() => { const form = document.querySelector('input[placeholder="Institution name"]')?.closest('form'); form?.scrollIntoView({ block: 'center' }); })()` });
  await wait(250);
  await send("Runtime.evaluate", { expression: `(() => { Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Add another department'))?.click(); })()` });
  await wait(250);
  const metrics = await send("Runtime.evaluate", { expression: `JSON.stringify({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth })`, returnByValue: true });
  const capture = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile("/home/ubuntu/screenshots/mobile-team-selector.png", Buffer.from(capture.result.data, "base64"));
  console.log(metrics.result.result.value);
  socket.close();
  chrome.kill();
}

main().catch((error) => { chrome.kill(); console.error(error); process.exitCode = 1; });
