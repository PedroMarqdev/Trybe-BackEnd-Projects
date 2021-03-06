CREATE VIEW historico_reproducao_usuarios AS 
SELECT u.user_name AS 'usuario', s.song_name as 'nome' FROM SpotifyClone.playback_list AS p
INNER JOIN SpotifyClone.users AS u ON
p.user_id = u.user_id
INNER JOIN SpotifyClone.songs AS s ON
s.song_id = p.song_id
ORDER BY u.user_name, s.song_name;
