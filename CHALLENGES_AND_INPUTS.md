# All Inputs and Challenges - Customization Guide

## 📝 LANDING SCREEN (First Question)

**Question Text (HTML - line 26):**
```
What's my favorite flower?
```

**Correct Answer (JavaScript - line 509):**
```javascript
this.correctAnswer = 'sunflower';
```

**Input Field:**
- ID: `flower-input`
- Placeholder: "Type your answer..."

---

## 🎯 CHALLENGE 1

**Title (HTML - line 51):**
```
Challenge 1 💕
```

**Question (JavaScript - line 598):**
```javascript
question: "Type your nickname for me"
```

**Correct Answers (JavaScript - line 599):**
```javascript
correctAnswers: ['pookie', 'baby', 'sunshine', 'love', 'sweetheart', 'honey']
```

**Reward Message (JavaScript - line 600):**
```javascript
reward: "Aww, you're so sweet! 💖"
```

**Reward Messages (JavaScript - lines 601-604):**
```javascript
rewardMessages: [
    "You melt me every time I think about you, pookie 💖",
    "I love seeing your smile 🌻"
]
```

**Input Field:**
- ID: `challenge-1-input`
- Placeholder: "Your answer..."

---

## 🎯 CHALLENGE 2

**Title (HTML - line 68):**
```
Challenge 2 🌻
```

**Question (JavaScript - line 608):**
```javascript
question: "What do I call you when I'm being sweet?"
```

**Correct Answers (JavaScript - line 609):**
```javascript
correctAnswers: ['pookie', 'baby', 'sunshine', 'love', 'sweetheart', 'honey', 'babe']
```

**Reward Message (JavaScript - line 610):**
```javascript
reward: "Exactly! You're my everything! 🌻"
```

**Reward Messages (JavaScript - lines 611-614):**
```javascript
rewardMessages: [
    "Can't wait to hug you again 😘",
    "You make my heart skip a beat 💕"
]
```

**Input Field:**
- ID: `challenge-2-input`
- Placeholder: "Your answer..."

---

## 🎮 CHALLENGE 3 (Catch Hearts Game)

**Title (HTML - line 85):**
```
Challenge 3 🎮
```

**Question (HTML - line 86):**
```
Catch 10 hearts to unlock! 💖
```

**Target Hearts (JavaScript - line 735):**
```javascript
this.targetHearts = 10;
```

**Completion Message (JavaScript - line 889):**
```javascript
rewardContainer.innerHTML = '<p>Amazing! You caught all the hearts! 💖</p>';
```

---

## 💌 MAIN SCREEN (Typewriter Messages)

**Messages (JavaScript - lines 950-953):**
```javascript
this.messages = [
    "You are so beautiful… I can't believe I have you.",
    "You melt me every time I think about you, my pookie.",
    "You're my sunflower, my baby, my everything 🌻💞"
];
```

---

## 🎬 ENDING SCREEN

**Ending Text (HTML - line 125):**
```
You melt me every day, baby 💖
```

---

## 📋 SUMMARY OF ALL CUSTOMIZABLE ELEMENTS

### Questions/Texts to Change:
1. **Landing Screen Question:** "What's my favorite flower?"
2. **Challenge 1 Question:** "Type your nickname for me"
3. **Challenge 2 Question:** "What do I call you when I'm being sweet?"
4. **Challenge 3 Question:** "Catch 10 hearts to unlock! 💖"
5. **Ending Text:** "You melt me every day, baby 💖"

### Answers to Change:
1. **Landing Answer:** `'sunflower'`
2. **Challenge 1 Answers:** `['pookie', 'baby', 'sunshine', 'love', 'sweetheart', 'honey']`
3. **Challenge 2 Answers:** `['pookie', 'baby', 'sunshine', 'love', 'sweetheart', 'honey', 'babe']`

### Reward Messages to Change:
1. **Challenge 1 Reward:** "Aww, you're so sweet! 💖"
2. **Challenge 1 Reward Messages:** (2 messages shown after correct answer)
3. **Challenge 2 Reward:** "Exactly! You're my everything! 🌻"
4. **Challenge 2 Reward Messages:** (2 messages shown after correct answer)
5. **Main Screen Messages:** (3 typewriter messages)
6. **Challenge 3 Completion:** "Amazing! You caught all the hearts! 💖"

### Game Settings:
- **Hearts to Catch:** 10 (Challenge 3)

---

## 📍 FILE LOCATIONS

- **HTML Questions/Texts:** `index.html`
- **JavaScript Answers & Logic:** `script.js`
  - Landing answer: Line 509
  - Challenge 1: Lines 597-604
  - Challenge 2: Lines 606-614
  - Challenge 3: Line 735 (target hearts), Line 889 (completion message)
  - Main messages: Lines 950-953

