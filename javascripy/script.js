//catch the msg div
let msgDiv = document.getElementById("msg");
//generate the random number from 1 to 100
let generateRandomNumber = () => {
  return Math.ceil(Math.random() * 100);
};
//the generated random number itself
let num = generateRandomNumber();
//displaying the generated random number
console.log(`random number: ${num}`);
//creating the speech recognition object
const speech = new webkitSpeechRecognition();
//  ويبكيت سبيتش ريكونجنيشن دى بيلت اند بترجعلك الريزلت بتاعك ارى اوف ارى
//starting listening to the user's speech
speech.start();
// الغرض منها بتسمع اللى انت بتقوله بتشغل المايك بتاع البراوزر
//show the input speech after converting it to text
let writeMessage = (msg) => {
  msgDiv.innerHTML = `<h3>You've said: <br><span class="box">${msg}</span> </h3>`;
};
let validateMsg = (msg) => {
  msg = +msg;
  //عشان انا لما اجى اقوله 15 هيعتبره سترينج فبكده انا حولته لنمبر
  if (isNaN(msg)) {
    msgDiv.innerHTML += `<h3>Invalid Number!</h3>`;
  } else if (msg < 1 || msg > 100) {
    msgDiv.innerHTML += `<h3>The input number must be between 1 and 100</h3>`;
  } else if (msg < num) {
    msgDiv.innerHTML += `<h3>Go higher</h3>`;
  } else if (msg > num) {
    msgDiv.innerHTML += `<h3>Go Lower</h3>`;
  } else {
    document.body.innerHTML = `<h2>Congratulation! You've guessed the random number</h2>
        <h3>it was ${num}</h3>
        <button class="play-again" onclick = "location.reload();">Play Again</button>`;
  }
};
//on recognizing, convert the speech into text
let onSpeak = (e) => {
  let msg = e.results[0][0].transcript;
  //  هنا بتقوله القيمه اللى فى اول صف اللى فى اول عمود وبيشيل اخر كلمه انت اتكلمتها
  // textوبعد اما تمسك الريزيلت بناخد الريزلت نعمله ترانسكريبت دى اداه جاهزه بيحول الريزلت من سبيتش ل
  writeMessage(msg);
  validateMsg(msg);
};
//fire the onSpeak on recognizing and getting a result
speech.addEventListener("result", onSpeak);
//الاسبيتش يشتغل عندى اول ميكون معاه ريزيلت
//restart the speech tool after ends it's job
speech.addEventListener("end", () => speech.start());
//الاسبيتش لما تنتهى تبتدى تشتغل تانى
