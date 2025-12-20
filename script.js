fetch("data.json")
  .then(res => res.json())
  .then(data => {

    document.getElementById("week-title").innerText = data.week;
    document.getElementById("banner-text").innerText = data.message;

    const students = [...data.students].sort((a, b) => b.score - a.score);
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    students.forEach((student, index) => {
      const row = document.createElement("div");
      row.className = `leader-row ${index < 3 ? "rank-" + (index + 1) : ""}`;
      row.style.animationDelay = `${index * 0.08}s`;

      row.innerHTML = `
        <div class="leader-left">
          <div class="leader-rank">
            ${
              index === 0 ? "🥇" :
              index === 1 ? "🥈" :
              index === 2 ? "🥉" :
              index + 1
            }
          </div>
          <div class="leader-name">${student.name}</div>
        </div>
        <div class="leader-score">${student.score}</div>
      `;

      leaderboard.appendChild(row);
    });

    // 🎉 Celebration animation only ONCE per session
    if (!sessionStorage.getItem("celebrated")) {
      launchConfetti();
      sessionStorage.setItem("celebrated", "true");
    }
  })
  .catch(err => console.error("Error loading data:", err));


/* =========================
   🎊 CONFETTI FUNCTION
========================= */

function launchConfetti() {
  const colors = ["#ffd700", "#0d6efd", "#28a745", "#ff6b6b", "#6f42c1"];

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}
