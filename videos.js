// ============================================================
//  YOUR VIDEOS: this is the only file you need to edit to add work.
//
//  To add a clip:
//    1. Put the video in the /videos folder   (e.g. gym-promo.mp4)
//    2. Put its cover image in /images         (e.g. gym-promo.jpg)
//    3. Add one line to the list below, newest first:
//       { file: "gym-promo.mp4", cover: "gym-promo.jpg", title: "Gym promo", type: "Instagram Reel" },
//
//  Leave file as "" to show a "coming soon" box instead.
//  Only add clips the client has agreed you can show.
// ============================================================

// Showreel at the top of the page. While file is "", the box is hidden.
window.SHOWREEL = { file: "", cover: "", title: "Showreel" };

window.VIDEOS = [
  { file: "ten-minutes-a-day.mp4", cover: "ten-minutes-a-day.jpg", title: "10 minutes a day", type: "Product promo" },
  { file: "growth-lives-in-discomfort.mp4", cover: "growth-lives-in-discomfort.jpg", title: "Growth lives in discomfort", type: "Talking-head Reel" },
  { file: "panel-q2.mp4", cover: "panel-q2.jpg", title: "Education panel", type: "Event highlight" },
  // HIDDEN until consent is confirmed (shows a student's face). The files are in
  // /not-published. To show it: move them into /videos and /images, then remove the //.
  // { file: "futsal-interview.mp4", cover: "futsal-interview.jpg", title: "Futsal interview", type: "Interview" },
];
