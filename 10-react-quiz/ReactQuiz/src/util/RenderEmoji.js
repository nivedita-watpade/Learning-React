export function renderEmoji(percentage) {
  if (percentage === 100) return "🥇";
  if (percentage >= 80 && percentage < 100) return "😊";
  if (percentage >= 50 && percentage < 80) return "🎉";
  if (percentage >= 0 && percentage < 50) return "😒";
  if (percentage === 0) return "😢";
}
