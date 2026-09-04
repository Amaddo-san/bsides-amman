(function abbasOneko() {
  if (window.__ABBAS_ONEKO__?.destroy) {
    window.__ABBAS_ONEKO__.destroy();
  }

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  const nekoEl = document.createElement("div");
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = nekoPosX;
  let mousePosY = nekoPosY;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let forceSleep = false;
  let grabbing = false;
  let grabStop = true;
  let nudge = false;
  let grabStartX = 0;
  let grabStartY = 0;
  let grabStartNekoX = 0;
  let grabStartNekoY = 0;
  let grabTimeoutId = null;
  let animationFrameId = null;
  let intervalId = null;
  const chaseSpeed = 10;
  const updateInterval = 80;

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function isPointInsideNeko(x, y) {
    return (
      x >= nekoPosX - 18 &&
      x <= nekoPosX + 18 &&
      y >= nekoPosY - 18 &&
      y <= nekoPosY + 18
    );
  }

  function keepInsideViewport() {
    nekoPosX = Math.max(16, Math.min(window.innerWidth - 16, nekoPosX));
    nekoPosY = Math.max(16, Math.min(window.innerHeight - 16, nekoPosY));
  }

  function paintPosition() {
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  function getVisibleOnlineBadge() {
    return Array.from(document.querySelectorAll("[data-abbas-online-badge]")).find((badge) => {
      const rect = badge.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
  }

  function setStartPosition() {
    const onlineBadge = getVisibleOnlineBadge();

    if (onlineBadge) {
      const badgeRect = onlineBadge.getBoundingClientRect();
      nekoPosX = badgeRect.left + badgeRect.width / 2;
      nekoPosY = badgeRect.top - 18;
    } else {
      nekoPosX = window.innerWidth * 0.72;
      nekoPosY = window.innerHeight * 0.48;
    }

    keepInsideViewport();
    mousePosX = nekoPosX;
    mousePosY = nekoPosY;
  }

  function placeAtStartWhenReady() {
    setStartPosition();
    paintPosition();

    window.setTimeout(() => {
      setStartPosition();
      paintPosition();
    }, 150);
  }

  function sleep() {
    forceSleep = true;
    grabbing = false;
    nudge = false;
    idleAnimation = "sleeping";
    idleAnimationFrame = 8;
    mousePosX = nekoPosX;
    mousePosY = nekoPosY;
  }

  function wake() {
    forceSleep = false;
    nudge = false;
    resetIdleAnimation();
  }

  function toggleSleep() {
    if (forceSleep) {
      wake();
    } else {
      sleep();
    }
  }

  function idle() {
    idleTime += 1;

    if (forceSleep) {
      if (idleAnimationFrame < 8 && nudge) {
        setSprite("idle", 0);
        idleAnimationFrame += 1;
        return;
      }
      setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
      idleAnimationFrame += 1;
      return;
    }

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation === null
    ) {
      idleAnimation = Math.random() < 0.5 ? "sleeping" : "scratchSelf";
    }

    switch (idleAnimation) {
      case "sleeping":
        if (nudge) {
          nudge = false;
          resetIdleAnimation();
          setSprite("idle", 0);
          return;
        }
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
        } else {
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        }
        if (idleAnimationFrame > 192) resetIdleAnimation();
        idleAnimationFrame += 1;
        break;
      case "scratchSelf":
        setSprite("scratchSelf", idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        idleAnimationFrame += 1;
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        idleAnimationFrame += 1;
        break;
      default:
        setSprite("idle", 0);
    }
  }

  function frame() {
    frameCount += 1;

    if (grabbing) {
      if (grabStop) setSprite("alert", 0);
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < 8 || distance < 24) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = 0;
      return;
    }

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    if (!direction) direction = "idle";

    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * chaseSpeed;
    nekoPosY -= (diffY / distance) * chaseSpeed;

    keepInsideViewport();
    paintPosition();
  }

  function onMouseMove(event) {
    if (grabbing) {
      const deltaX = event.clientX - grabStartX;
      const deltaY = event.clientY - grabStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX > absDeltaY && absDeltaX > 10) {
        setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
      } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
        setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
      }

      if (
        grabStop ||
        absDeltaX > 10 ||
        absDeltaY > 10 ||
        Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10
      ) {
        grabStop = false;
        window.clearTimeout(grabTimeoutId);
        grabTimeoutId = window.setTimeout(() => {
          grabStop = true;
          nudge = false;
          grabStartX = event.clientX;
          grabStartY = event.clientY;
          grabStartNekoX = nekoPosX;
          grabStartNekoY = nekoPosY;
        }, 150);
      }

      nekoPosX = grabStartNekoX + deltaX;
      nekoPosY = grabStartNekoY + deltaY;
      mousePosX = event.clientX;
      mousePosY = event.clientY;
      keepInsideViewport();
      paintPosition();
      return;
    }

    if (forceSleep) return;

    mousePosX = event.clientX;
    mousePosY = event.clientY;
  }

  function onTouchMove(event) {
    const touch = event.touches[0];
    if (!touch || forceSleep) return;

    mousePosX = touch.clientX;
    mousePosY = touch.clientY;
  }

  function onTouchStart(event) {
    const touch = event.touches[0];
    if (!touch) return;

    wake();
    mousePosX = touch.clientX;
    mousePosY = touch.clientY;
  }

  function onMouseDown(event) {
    if (event.button !== 0 || !isPointInsideNeko(event.clientX, event.clientY)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    wake();
    grabbing = true;
    grabStop = true;
    grabStartX = event.clientX;
    grabStartY = event.clientY;
    grabStartNekoX = nekoPosX;
    grabStartNekoY = nekoPosY;
    setSprite("alert", 0);
  }

  function onMouseUp(event) {
    if (!grabbing) return;

    event.preventDefault();
    event.stopPropagation();
    grabbing = false;
    nudge = true;
    mousePosX = event.clientX;
    mousePosY = event.clientY;
    window.clearTimeout(grabTimeoutId);
    resetIdleAnimation();
  }

  function onDoubleClick(event) {
    if (!isPointInsideNeko(event.clientX, event.clientY)) return;

    event.preventDefault();
    event.stopPropagation();
    toggleSleep();
  }

  function onResize() {
    keepInsideViewport();
    paintPosition();
  }

  function destroy() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mousedown", onMouseDown, true);
    window.removeEventListener("mouseup", onMouseUp, true);
    window.removeEventListener("dblclick", onDoubleClick, true);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("resize", onResize);
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    if (intervalId) window.clearInterval(intervalId);
    if (grabTimeoutId) window.clearTimeout(grabTimeoutId);
    nekoEl.remove();
    delete window.__ABBAS_ONEKO__;
  }

  nekoEl.id = "abbas-oneko";
  nekoEl.ariaHidden = "true";
  nekoEl.style.width = "32px";
  nekoEl.style.height = "32px";
  nekoEl.style.position = "fixed";
  nekoEl.style.left = `${nekoPosX - 16}px`;
  nekoEl.style.top = `${nekoPosY - 16}px`;
  nekoEl.style.zIndex = "2147483647";
  nekoEl.style.pointerEvents = "none";
  nekoEl.style.imageRendering = "pixelated";
  nekoEl.style.backgroundImage = "url('/oneko/oneko-abbas.gif')";
  nekoEl.style.backgroundRepeat = "no-repeat";
  nekoEl.style.backgroundSize = "256px 128px";

  placeAtStartWhenReady();

  document.body.appendChild(nekoEl);
  setSprite("idle", 0);

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mousedown", onMouseDown, true);
  window.addEventListener("mouseup", onMouseUp, true);
  window.addEventListener("dblclick", onDoubleClick, true);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  intervalId = window.setInterval(() => {
    animationFrameId = window.requestAnimationFrame(frame);
  }, updateInterval);

  window.__ABBAS_ONEKO__ = { destroy };
})();
