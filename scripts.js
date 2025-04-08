
/******************** Bison Like Botton ***************/
document.addEventListener("DOMContentLoaded", () => {
    const likeButton = document.getElementById("likeButton");
    const likeCount = document.getElementById("likeCount");
  
    let liked = localStorage.getItem("appaLiked") === "true";
    let count = parseInt(localStorage.getItem("appaCount")) || 0;
  
    updateDisplay();
  
    likeButton.addEventListener("click", () => {
      liked = !liked;
      count += liked ? 1 : -1;
  
      localStorage.setItem("appaLiked", liked);
      localStorage.setItem("appaCount", count);
  
      updateDisplay();
    });
  
    function updateDisplay() {
      likeCount.textContent = `${count} like${count !== 1 ? 's' : ''}`;
      likeButton.classList.toggle("liked", liked);
    }
  });
  
  /******************** Contact - Emoji-Text ***************/
  document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("message");
    const emojiButtons = document.querySelectorAll(".emoji-btn");
  
    emojiButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const emoji = button.textContent;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
  
        textarea.value = text.slice(0, start) + emoji + text.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus(); 
      });
    });
  });


  /******************************************** Char Counter - Text *********************************/
  const messageField = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");
  const emojiButtons = document.querySelectorAll(".emoji-btn");
  const maxChars = 500;
  const warningThreshold = 480;
  
  function updateCharacterCount() {
    const chars = Array.from(messageField.value);
    let charCount = chars.length;
  
    if (charCount > maxChars) {
      messageField.value = chars.slice(0, maxChars).join("");
      charCount = maxChars;
  
      charCounter.style.animation = "shake 0.2s ease";
      setTimeout(() => {
        charCounter.style.animation = "";
      }, 200);
    }
  
    charCounter.textContent = `${charCount} / ${maxChars}`;
  
    if (charCount >= maxChars) {
      charCounter.classList.add("over-limit");
      charCounter.classList.remove("warn-limit");
    } else if (charCount >= warningThreshold) {
      charCounter.classList.add("warn-limit");
      charCounter.classList.remove("over-limit");
    } else {
      charCounter.classList.remove("over-limit", "warn-limit");
    }
  }
  
  messageField.addEventListener("input", updateCharacterCount);
  
  emojiButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); 
  
      const emoji = button.textContent;
      const current = Array.from(messageField.value);
  
      if (current.length < maxChars) {
        messageField.value += emoji;
        updateCharacterCount();
      }
    });
  });
/********************************* Sending The Form *****************/const form = document.querySelector("form");
const all_form = document.querySelector("form");
const sendButton = form.querySelector('button[type="submit"]');
const message_Content = document.getElementById("message");
const emailField = document.getElementById("email");

all_form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const message = message_Content.value.trim();
  const email = emailField.value.trim();

  if (message === "") {
    alert("🤔 Yip yip! You forgot to write your message.");
    return;
  }

  if (email === "") {
    alert("📧 Even the Avatar needs your email to respond!");
    return;
  }

  const isConfirmed = confirm("📨 Ready to send your message into the four nations?\nClick OK to send, or Cancel to keep writing.");

  if (isConfirmed) {
    sendButton.style.background = "linear-gradient(145deg, #4CAF50, #3b9442)";
    sendButton.textContent = "Message Sent! ✅";
    sendButton.disabled = true;
    sendButton.style.cursor = "default";

    setTimeout(() => {
      messageField.value = "";
      emailField.value = "";
      updateCharacterCount(); 

      sendButton.textContent = "Send Message";
      sendButton.style.background = "linear-gradient(145deg, #dab581, #c9a267)";
      sendButton.disabled = false;
      sendButton.style.cursor = "pointer";
    }, 1600); 
  }
});
