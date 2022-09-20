export const Player = function (name, sign, isCurrentlyPlaying) {
  const player = {
    name,
    sign,
    isCurrentlyPlaying,
  };

  function togglePlayingStatus(player) {
    player.isCurrentlyPlaying = !player.isCurrentlyPlaying;
  }

  return { player, togglePlayingStatus };
};
