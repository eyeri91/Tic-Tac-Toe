export const Player = (name, sign, isCurrentlyPlaying) => {
  function togglePlayingStatus(player) {
    player.isCurrentlyPlaying = !player.isCurrentlyPlaying;
  }

  return { name, sign, isCurrentlyPlaying, togglePlayingStatus };
};
